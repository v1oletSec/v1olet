'use client';

/**
 * Hero canvas.
 *
 * This module is only ever reached through `SceneGate`, which has already
 * confirmed the device should run it. Its own job is the render budget:
 *
 *   - device pixel ratio capped at 1.5 (a 3× retina display would otherwise
 *     quadruple the fragment cost for no perceptible gain on point sprites);
 *   - particle count scaled to the viewport;
 *   - the render loop stopped entirely when the hero scrolls out of view or
 *     the tab is hidden, via `frameloop="never"` plus manual invalidation.
 *
 * Scroll and pointer are tracked in refs rather than state: this runs at
 * 60fps and must not schedule a single React re-render while doing so.
 */

import { Canvas } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BloomField } from '@/components/three/BloomField';
import { useResolvedTheme } from '@/hooks/useResolvedTheme';

/** Palette per theme, sampled from the brand ramp in globals.css. */
const THEME_COLORS = {
  dark: { core: '#a98bff', edge: '#4e2bcc', opacity: 0.34, additive: true },
  light: { core: '#6840f4', edge: '#4e2bcc', opacity: 0.22, additive: false },
} as const;

export default function HeroScene({ className }: { className?: string }) {
  const theme = useResolvedTheme();
  const hostRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(true);
  const [count, setCount] = useState(20_000);

  // Particle budget follows the viewport. A 1280px laptop does not need the
  // same field as a 4K desktop, and the smaller count is invisible.
  useEffect(() => {
    const width = window.innerWidth;
    setCount(width >= 1920 ? 26_000 : width >= 1440 ? 20_000 : 14_000);
  }, []);

  // Track page scroll progress (0 at top, 1 once the hero has fully left).
  useEffect(() => {
    const onScroll = () => {
      const host = hostRef.current;
      if (!host) return;
      const height = host.offsetHeight || 1;
      scrollRef.current = Math.min(Math.max(window.scrollY / height, 0), 1);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Normalised pointer, -1..1 on both axes.
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Stop rendering when off-screen or backgrounded. This is the single
  // largest power saving available here — a hero scene that keeps rendering
  // four sections down is pure waste.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { threshold: 0 },
    );
    observer.observe(host);

    const onVisibility = () => setActive(!document.hidden && isOnScreen(host));
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const colors = useMemo(() => THEME_COLORS[theme], [theme]);

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          // The scene is additive point sprites; a depth buffer buys nothing.
          depth: false,
          stencil: false,
        }}
        camera={{ fov: 42, position: [0, 0, 8.4], near: 0.1, far: 100 }}
        style={{ pointerEvents: 'none' }}
      >
        <BloomField
          count={count}
          colorCore={colors.core}
          colorEdge={colors.edge}
          opacity={colors.opacity}
          additive={colors.additive}
          scrollRef={scrollRef}
          pointerRef={pointerRef}
        />
      </Canvas>
    </div>
  );
}

function isOnScreen(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}
