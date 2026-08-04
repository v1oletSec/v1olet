'use client';

/**
 * The hero's particle bloom.
 *
 * The v1olet mark is a six-petal flower, so the scene is built on the polar
 * rose r = |cos(3θ)|, which produces exactly six petals. Particles are seeded
 * twice — once as a diffuse cloud, once on the rose — and the vertex shader
 * interpolates between the two. Scrolling drives that interpolation, so the
 * mark assembles as the page loads and dissolves back into noise as the
 * visitor moves down: the brand resolving out of entropy, which is a fair
 * description of the work.
 *
 * Everything is one draw call: a single `THREE.Points` with a custom shader.
 * No post-processing, no shadow maps, no per-frame allocation. That is what
 * keeps a 40k-particle scene inside a sensible frame budget on a laptop GPU.
 */

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;      // 0 = dispersed cloud, 1 = resolved flower
  uniform float uSize;
  uniform vec2  uPointer;

  attribute vec3  aTarget;   // position on the rose curve
  attribute float aSeed;     // stable per-particle randomness
  attribute float aScale;

  varying float vSeed;
  varying float vRadius;

  // Cheap rotation about Y — enough motion to feel alive, no noise texture.
  vec3 rotateY(vec3 p, float a) {
    float s = sin(a), c = cos(a);
    return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
  }

  void main() {
    // Particles resolve at slightly different rates so the mark assembles
    // rather than snapping into place.
    float stagger = clamp(uMorph * 1.35 - aSeed * 0.35, 0.0, 1.0);
    float eased = stagger * stagger * (3.0 - 2.0 * stagger);

    vec3 pos = mix(position, aTarget, eased);

    // Idle drift, strongest on the dispersed particles.
    float drift = (1.0 - eased) * 0.55 + 0.06;
    pos.x += sin(uTime * 0.35 + aSeed * 24.0) * drift * 0.35;
    pos.y += cos(uTime * 0.28 + aSeed * 19.0) * drift * 0.35;
    pos.z += sin(uTime * 0.22 + aSeed * 31.0) * drift * 0.5;

    // Bounded sway, not a spin. The rose is a planar shape: rotate it freely
    // about Y and it goes edge-on, and the mark disappears for half of every
    // revolution. A sine keeps it within ±16° of face-on.
    pos = rotateY(pos, sin(uTime * 0.16) * 0.28 + uPointer.x * 0.22);
    pos.y += uPointer.y * 0.35;
    pos.x += uPointer.x * 0.18;

    vSeed = aSeed;
    vRadius = length(aTarget.xy);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Perspective-correct point scaling, clamped so nothing becomes a blob
    // when a particle passes close to the camera.
    float size = uSize * aScale * (1.0 + eased * 0.6);
    gl_PointSize = clamp(size * (240.0 / -mvPosition.z), 1.0, 5.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;

  uniform vec3  uColorCore;
  uniform vec3  uColorEdge;
  uniform float uOpacity;

  varying float vSeed;
  varying float vRadius;

  void main() {
    // Round, soft-edged point. Discarding early is cheaper than blending a
    // fully transparent fragment.
    vec2 uv = gl_PointCoord - 0.5;
    float d = dot(uv, uv);
    if (d > 0.25) discard;

    float falloff = smoothstep(0.25, 0.0, d);

    // Colour by distance from the flower's centre: hot core, cool petal tips.
    vec3 color = mix(uColorCore, uColorEdge, clamp(vRadius / 2.6, 0.0, 1.0));

    // A few particles run brighter, which reads as depth without a light.
    float sparkle = step(0.982, fract(vSeed * 97.31));
    color += sparkle * 0.22;

    gl_FragColor = vec4(color, falloff * uOpacity);
  }
`;

interface BloomFieldProps {
  /** Particle count. Lowered on smaller viewports by the caller. */
  count: number;
  /** Hot core colour. */
  colorCore: string;
  /** Petal-tip colour. */
  colorEdge: string;
  opacity: number;
  /** Additive reads well on near-black; normal blending is required on white. */
  additive: boolean;
  /** Live 0–1 page-scroll progress, supplied by the parent. */
  scrollRef: React.RefObject<number>;
  /** Live normalised pointer position, supplied by the parent. */
  pointerRef: React.RefObject<{ x: number; y: number }>;
}

export function BloomField({
  count,
  colorCore,
  colorEdge,
  opacity,
  additive,
  scrollRef,
  pointerRef,
}: BloomFieldProps) {
  const { viewport } = useThree();

  // Geometry is built once. Rebuilding it on a colour or theme change would
  // be the single most expensive mistake available in this component.
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      // --- dispersed cloud: a thick shell, so the "before" state has volume
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3.1 + Math.random() * 2.1;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.75;
      positions[i * 3 + 2] = radius * Math.cos(phi) * 0.8;

      // --- resolved state: the six-petal rose, r = |cos(3θ)|
      const t = Math.random() * Math.PI * 2;
      const petal = Math.abs(Math.cos(3 * t));
      // sqrt biases samples outward so petals read as filled shapes rather
      // than clusters bunched at the centre.
      const along = Math.sqrt(Math.random());
      const r = petal * along * 2.55;

      // Thickness: a small out-of-plane offset that grows toward the tips,
      // giving the bloom a physical body instead of a flat decal.
      const thickness = (Math.random() - 0.5) * (0.16 + petal * 0.42);
      // Petal tips lift slightly, as they do on the mark.
      const lift = Math.pow(along, 2.2) * petal * 0.55;

      targets[i * 3] = Math.cos(t) * r;
      targets[i * 3 + 1] = Math.sin(t) * r;
      targets[i * 3 + 2] = thickness + lift;

      seeds[i] = Math.random();
      // A minority of larger particles gives the field a sense of scale.
      scales[i] = 0.55 + Math.pow(Math.random(), 3) * 1.9;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aTarget', new THREE.BufferAttribute(targets, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    // The shader moves vertices well outside their authored bounds; an
    // explicit sphere stops three.js frustum-culling the whole cloud.
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 9);
    return geo;
  }, [count]);

  /**
   * The material is constructed here rather than declared as
   * `<shaderMaterial uniforms={...} />`.
   *
   * That is not a style preference. Handing a uniforms object to the
   * declarative element does not guarantee the material ends up holding *that
   * object*, so mutating it from `useFrame` can update a copy the GPU never
   * sees — the shader then renders its initial state forever while the render
   * loop happily runs. Owning the instance makes `material.uniforms` the
   * single source of truth.
   */
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uSize: { value: 2.0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uColorCore: { value: new THREE.Color('#ffffff') },
        uColorEdge: { value: new THREE.Color('#ffffff') },
        uOpacity: { value: 0 },
      },
    });
    // Colours, opacity and blending are pushed in imperatively below, so a
    // theme change never rebuilds the material or the geometry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uniforms = material.uniforms;

  // Blending is a material flag rather than a uniform: additive over near
  // black, normal over white.
  material.blending = additive ? THREE.AdditiveBlending : THREE.NormalBlending;

  // Release the GPU program when the hero unmounts.
  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  // Uniforms are mutated in place every frame, on the material this component
  // constructed — see the note on `material` above for why that matters.
  useFrame((state, delta) => {
    // Clamp delta: a backgrounded tab returns a huge first frame, which would
    // otherwise jump the animation forward by seconds.
    const dt = Math.min(delta, 0.05);
    uniforms.uTime.value += dt;

    // Morph is *derived* each frame rather than integrated toward a target.
    // An exponential chase would resolve at a rate that depends on the frame
    // rate, so a slow device would still be assembling the mark seconds after
    // a fast one had finished.
    //
    //   intro     — 0→1 over the first ~1.4s, the bloom assembling
    //   dissolve  — scroll pulls it back apart, to a floor of 15%
    const intro = Math.min(uniforms.uTime.value / 1.4, 1);
    const scroll = scrollRef.current ?? 0;
    const dissolve = Math.min(scroll * 2.4, 0.85);
    uniforms.uMorph.value = intro * (1 - dissolve);

    // Pointer is eased rather than applied directly, so a fast mouse does not
    // snap the scene.
    const pointer = pointerRef.current ?? { x: 0, y: 0 };
    uniforms.uPointer.value.x += (pointer.x - uniforms.uPointer.value.x) * Math.min(dt * 2.4, 1);
    uniforms.uPointer.value.y += (pointer.y - uniforms.uPointer.value.y) * Math.min(dt * 2.4, 1);

    // Colours are updated in place when the theme flips.
    uniforms.uColorCore.value.set(colorCore);
    uniforms.uColorEdge.value.set(colorEdge);
    uniforms.uOpacity.value += (opacity - uniforms.uOpacity.value) * Math.min(dt * 4, 1);

    state.camera.position.z = 8.4 + scroll * 2.2;
  });

  return (
    // Offset to the right: the bloom is a companion to the headline, not a
    // backdrop for it. Keeping it out of the left column is what keeps the
    // copy legible at every viewport width.
    <points
      geometry={geometry}
      material={material}
      frustumCulled={false}
      position={[1.9, 0.15, 0]}
      scale={0.8}
    />
  );
}
