'use client';

/**
 * Motion contract.
 *
 * Every animated component in this codebase asks `useMotionAllowed()` before
 * it animates. Gating at the source rather than overriding at the end of a
 * stylesheet matters for three reasons:
 *
 *   1. A reduced-motion visitor never pays for the work — no rAF loop, no
 *      IntersectionObserver, no WebGL context.
 *   2. Elements start in their *final* state instead of animating to it in
 *      0.01ms, so nothing flickers.
 *   3. The preference is live: switching it in the OS updates the page
 *      without a reload.
 *
 * `useDeviceCapability()` extends the same idea to the expensive 3D scene,
 * which additionally requires a real GPU budget and a viewport large enough
 * for the scene to be visible rather than decorative.
 */

import { useEffect, useState, useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeToQuery(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  };
}

/**
 * True when the visitor has *not* asked for reduced motion.
 *
 * The server snapshot is `false` on purpose: server-rendered markup is the
 * static, already-revealed state, so a visitor with JS disabled or still
 * hydrating sees finished content rather than an empty page waiting for an
 * animation that will never run.
 */
export function useMotionAllowed(): boolean {
  return useSyncExternalStore(
    subscribeToQuery(REDUCED_MOTION_QUERY),
    () => !window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/** Generic live media-query hook with the same SSR-safe contract. */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    subscribeToQuery(query),
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export interface DeviceCapability {
  /** Safe to mount the WebGL hero scene. */
  canRender3D: boolean;
  /** Resolution of the probe; `false` until the effect has run. */
  ready: boolean;
  /** Why the scene was declined — surfaced in dev, useful when debugging. */
  reason: string | null;
}

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
}

/**
 * Probes whether this device should run the hero scene.
 *
 * Deliberately conservative — the static poster is a perfectly good hero, and
 * a dropped-frame 3D scene is worse than no 3D scene. The WebGL context
 * created here is released immediately; it exists only to answer the
 * question.
 */
export function useDeviceCapability(): DeviceCapability {
  const motionAllowed = useMotionAllowed();
  const isWide = useMediaQuery('(min-width: 1024px)');
  const finePointer = useMediaQuery('(pointer: fine)');
  const [probe, setProbe] = useState<{ ok: boolean; reason: string | null } | null>(null);

  useEffect(() => {
    if (probe) return;

    const nav = navigator as NavigatorWithHints;

    if (nav.connection?.saveData) {
      setProbe({ ok: false, reason: 'save-data enabled' });
      return;
    }
    if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) {
      setProbe({ ok: false, reason: `deviceMemory ${nav.deviceMemory}GB` });
      return;
    }
    if (nav.hardwareConcurrency && nav.hardwareConcurrency < 4) {
      setProbe({ ok: false, reason: `${nav.hardwareConcurrency} logical cores` });
      return;
    }

    // WebGL2 specifically: the scene's instancing path assumes it.
    let canvas: HTMLCanvasElement | null = document.createElement('canvas');
    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) as WebGL2RenderingContext | null;
    } catch {
      gl = null;
    }

    if (!gl) {
      setProbe({ ok: false, reason: 'no WebGL2 context' });
    } else {
      // A software rasteriser will happily hand back a context and then run at
      // 4fps, so check the renderer string where the browser exposes it.
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo
        ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) ?? '')
        : '';
      const software = /swiftshader|llvmpipe|software|microsoft basic/i.test(renderer);
      setProbe(software ? { ok: false, reason: `software renderer (${renderer})` } : { ok: true, reason: null });
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }

    canvas = null;
  }, [probe]);

  if (!motionAllowed) return { canRender3D: false, ready: true, reason: 'prefers-reduced-motion' };
  if (!isWide) return { canRender3D: false, ready: true, reason: 'viewport below 1024px' };
  if (!finePointer) return { canRender3D: false, ready: true, reason: 'coarse pointer' };
  if (!probe) return { canRender3D: false, ready: false, reason: null };

  return { canRender3D: probe.ok, ready: true, reason: probe.reason };
}

/** Shared spring, so unrelated components still feel like one system. */
export const spring = { type: 'spring' as const, stiffness: 220, damping: 30, mass: 0.9 };

/** Shared ease, matching `--ease-out-expo` in globals.css. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
