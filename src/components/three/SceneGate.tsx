'use client';

/**
 * The gate in front of the 3D hero.
 *
 * Two responsibilities, and they are deliberately separated from the scene
 * itself:
 *
 *   1. **Capability** — `useDeviceCapability()` decides whether this device
 *      should run WebGL at all (reduced motion, viewport, pointer type,
 *      device memory, core count, software renderers).
 *   2. **Delivery** — the scene is a `next/dynamic` import with `ssr: false`,
 *      so three.js and the R3F reconciler land in their own chunk that is
 *      only ever requested by devices that passed step 1. A phone never
 *      downloads it.
 *
 * The fallback is not an apology. It is a CSS-only bloom built from the same
 * geometry idea — six radial petals — which means the hero always has a
 * visual centre even with JavaScript disabled entirely.
 */

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useDeviceCapability } from '@/lib/motion';
import { cx } from '@/lib/utils';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
});

/**
 * Manual override, for demoing and debugging the scene on hardware the probe
 * declines (headless browsers, CI screenshots, a reviewer's VM):
 *
 *   ?scene=force  → mount the scene regardless of the probe
 *   ?scene=off    → never mount it, show the static bloom
 *
 * Read once, after mount, so it cannot affect the server-rendered markup.
 */
function useSceneOverride(): 'force' | 'off' | null {
  const [override, setOverride] = useState<'force' | 'off' | null>(null);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('scene');
    if (value === 'force' || value === 'off') setOverride(value);
  }, []);

  return override;
}

export function SceneGate({ className }: { className?: string }) {
  const { canRender3D: probeAllows, ready, reason } = useDeviceCapability();
  const override = useSceneOverride();
  const canRender3D = override === 'force' ? true : override === 'off' ? false : probeAllows;

  if (process.env.NODE_ENV === 'development' && ready && !canRender3D && reason) {
    // Visible in the console during development only; the production build
    // strips the branch.
    console.info(`[v1olet] hero scene skipped: ${reason}`);
  }

  return (
    <div className={cx('pointer-events-none absolute inset-0 -z-10', className)}>
      <StaticBloom visible={!canRender3D} />
      {/* Masked so the field fades out over the left column: the bloom must
          never compete with the headline it sits behind. */}
      {canRender3D && (
        <HeroScene className="absolute inset-0 [mask-image:radial-gradient(58%_74%_at_68%_47%,black_25%,transparent_80%)]" />
      )}
    </div>
  );
}

/**
 * CSS-only bloom: six conic petals plus a radial core, rendered from the same
 * rose geometry the shader uses. No images, no JavaScript, no layout cost.
 */
function StaticBloom({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        'absolute inset-0 overflow-hidden transition-opacity duration-700',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2">
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <span
            key={angle}
            className="absolute inset-0 rounded-full opacity-[0.16] blur-3xl dark:opacity-25"
            style={{
              transform: `rotate(${angle}deg) scaleY(0.42)`,
              background:
                'radial-gradient(closest-side, var(--color-brand-400), transparent 72%)',
            }}
          />
        ))}
        <span
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-2xl dark:opacity-45"
          style={{ background: 'radial-gradient(closest-side, var(--color-brand-300), transparent 70%)' }}
        />
      </div>
    </div>
  );
}
