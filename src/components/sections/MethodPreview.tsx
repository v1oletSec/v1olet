'use client';

/**
 * Method section.
 *
 * The four stages rendered as a horizontal progression on desktop and a
 * vertical timeline on mobile, with a scroll-driven rail that fills as the
 * section passes. The rail is the only decorative element; the stages
 * themselves are an ordered list, which is what they are.
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionHead } from '@/components/ui/SectionHead';
import { methodStages } from '@content/method';
import { useMotionAllowed } from '@/lib/motion';

export function MethodPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const motionAllowed = useMotionAllowed();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 60%'],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="method" className="relative border-y border-rule bg-surface-panel py-24 lg:py-32">
      <div className="shell">
        <SectionHead
          index="02"
          eyebrow="How it works"
          title="Four stages, no surprises on the invoice."
          lede="The same sequence on every engagement, from a two-week web assessment to a six-week red team operation."
        />

        <div ref={ref} className="relative mt-16">
          {/* Progress rail: horizontal on desktop, vertical on mobile. */}
          <div
            aria-hidden="true"
            className="absolute left-[1.05rem] top-0 h-full w-px bg-rule lg:left-0 lg:top-[1.05rem] lg:h-px lg:w-full"
          >
            <motion.span
              className="block h-full w-full origin-top bg-accent lg:origin-left"
              style={motionAllowed ? { scaleY: railScale, scaleX: railScale } : { scaleY: 1, scaleX: 1 }}
            />
          </div>

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {methodStages.map((stage, i) => (
              <Reveal as="li" key={stage.index} delay={i * 0.08} className="relative pl-12 lg:pl-0 lg:pt-12">
                <span
                  aria-hidden="true"
                  className="numeric absolute left-0 top-0 flex h-[2.1rem] w-[2.1rem] items-center justify-center border border-accent bg-surface text-[0.7rem] text-accent lg:left-0"
                >
                  {stage.index}
                </span>

                <h3 className="text-lg uppercase">{stage.title}</h3>
                <p className="mt-2 text-sm font-medium text-accent">{stage.headline}</p>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted">{stage.body}</p>

                <ul className="mt-5 space-y-2 border-t border-rule pt-4">
                  {stage.artefacts.map((artefact) => (
                    <li key={artefact} className="flex gap-2 text-xs text-fg-faint">
                      <span className="mt-1.5 h-px w-2 shrink-0 bg-accent" aria-hidden="true" />
                      {artefact}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14">
            <Button href="/method/" variant="outline">
              Read the full method
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
