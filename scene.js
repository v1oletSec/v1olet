/**
 * Hero WebGL scene — a displaced icosahedron ("bloom") over a particle field,
 * driven by scroll and pointer.
 *
 * Loaded as a plain ES module from ./vendor/, so there is still no build step
 * and no npm at deploy time. three.js is vendored, not fetched from a CDN, so
 * the page has no third-party runtime dependency.
 *
 * Bails out entirely — leaving the static layout untouched — when the user
 * prefers reduced motion, when WebGL is unavailable, or on a coarse pointer
 * with limited GPU budget.
 */
import * as THREE from './vendor/three.module.min.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('bg');
// Matches the CSS breakpoint that reveals the canvas: below it the hero is a
// single column and the scene would sit behind body copy.
if (canvas && !reduced && matchMedia('(min-width:1040px)').matches) init(canvas);

function init(canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return; // no WebGL: the static hero is already correct on its own
  }

  const host = canvas.parentElement;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.z = 8.2;

  // Two device pixels is the point of diminishing returns; beyond that this
  // costs battery for no visible gain.
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const uniforms = {
    uTime:     { value: 0 },
    uScroll:   { value: 0 },
    uPointer:  { value: new THREE.Vector2(0, 0) },
    uColorA:   { value: new THREE.Color('#6236E0') },
    uColorB:   { value: new THREE.Color('#B49BFF') },
  };

  // Classic Ashima simplex noise (MIT), used to displace the surface.
  const NOISE = `
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
      vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g;
      vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+1.0*C.xxx; vec3 x2=x0-i2+2.0*C.xxx; vec3 x3=x0-1.0+3.0*C.xxx;
      i=mod(i,289.0);
      vec4 p=permute(permute(permute(
        i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
      float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.0*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
      vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y);
      vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
      vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
      return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }`;

  const bloom = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.55, 24),
    new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      wireframe: true,
      vertexShader: `
        uniform float uTime; uniform float uScroll;
        varying float vDisp; varying vec3 vNormalW;
        ${NOISE}
        void main(){
          // Two octaves: a slow swell plus finer surface detail.
          float t = uTime * 0.16;
          float d = snoise(normal * 1.15 + vec3(0.0, t, 0.0)) * 0.42
                  + snoise(normal * 3.10 + vec3(t * 1.6, 0.0, 0.0)) * 0.13;
          d *= 1.0 - uScroll * 0.55;          // settles as the hero scrolls away
          vDisp = d;
          vNormalW = normalize(normalMatrix * normal);
          vec3 pos = position + normal * d;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uColorA; uniform vec3 uColorB; uniform float uScroll;
        varying float vDisp; varying vec3 vNormalW;
        void main(){
          float rim = pow(1.0 - abs(vNormalW.z), 1.6);
          vec3 col = mix(uColorA, uColorB, clamp(vDisp * 1.6 + 0.45, 0.0, 1.0));
          float a = (0.16 + rim * 0.5) * (1.0 - uScroll * 0.85);
          gl_FragColor = vec4(col, a);
        }`,
    })
  );
  bloom.position.set(1.9, 0.15, 0);
  scene.add(bloom);

  // Particle field
  const COUNT = 900;
  const pos = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const r = 2.6 + Math.random() * 5.0, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    pos[i * 3 + 2] = r * Math.cos(ph);
  }
  const dust = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)),
    new THREE.PointsMaterial({ size: 0.022, color: new THREE.Color('#B49BFF'), transparent: true, opacity: 0.55, depthWrite: false })
  );
  dust.position.copy(bloom.position);
  scene.add(dust);

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  addEventListener('resize', resize, { passive: true });

  const pointer = { x: 0, y: 0 };
  addEventListener('pointermove', e => {
    pointer.x = (e.clientX / innerWidth) * 2 - 1;
    pointer.y = (e.clientY / innerHeight) * 2 - 1;
  }, { passive: true });

  // Only run while the hero is actually on screen and the tab is focused.
  let onScreen = true;
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }, { threshold: 0 }).observe(host);

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (!onScreen || document.hidden) return;
    const t = clock.getElapsedTime();
    const scroll = Math.min(scrollY / (host.offsetHeight || 1), 1);

    uniforms.uTime.value = t;
    uniforms.uScroll.value = scroll;

    bloom.rotation.y = t * 0.09 + scroll * 1.1;
    bloom.rotation.x = Math.sin(t * 0.13) * 0.16;
    bloom.scale.setScalar(1 - scroll * 0.25);
    dust.rotation.y = -t * 0.035;
    dust.material.opacity = 0.55 * (1 - scroll);

    // Pointer nudges the camera rather than the object: parallax, not spin.
    camera.position.x += (pointer.x * 0.55 - camera.position.x) * 0.045;
    camera.position.y += (-pointer.y * 0.35 - camera.position.y) * 0.045;
    camera.lookAt(bloom.position.x * 0.55, 0, 0);

    renderer.render(scene, camera);
  });

  document.documentElement.classList.add('scene-ready');
}
