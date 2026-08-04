'use client';

/**
 * Cursor companion.
 *
 * A small ring that trails the pointer and expands over interactive elements,
 * reading the target's `data-cursor` attribute for a label. The native cursor
 * is never hidden — hiding it is the single most common accessibility failure
 * in custom-cursor implementations, and it breaks text selection, drag, and
 * anyone relying on OS cursor settings.
 *
 * Mounted only on fine pointers with motion allowed; otherwise it renders
 * nothing at all.
 */

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery, useMotionAllowed } from '@/lib/motion';

export function Cursor() {
  const motionAllowed = useMotionAllowed();
  const finePointer = useMediaQuery('(pointer: fine)');
  const enabled = motionAllowed && finePointer;

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.4 });

  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      if (!visible) setVisible(true);

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        'a, button, [role="button"], [data-cursor]',
      );
      setActive(Boolean(target));
      setLabel(target?.dataset.cursor ?? null);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, rawX, rawY, visible]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden lg:block"
      style={{ x, y }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2"
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="rounded-full border border-accent"
          animate={{
            width: active ? 44 : 22,
            height: active ? 44 : 22,
            opacity: active ? 0.9 : 0.45,
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        />
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="label absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap bg-accent px-2 py-1 text-[10px] text-accent-contrast"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
