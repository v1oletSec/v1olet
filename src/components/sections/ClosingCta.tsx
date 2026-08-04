'use client';

/**
 * Closing call to action.
 *
 * Two routes, side by side, because the site serves two audiences: a client
 * with a scope, and an operator who wants to compete. Separating them here
 * keeps the commercial path uncluttered while still giving recruiting a real
 * position rather than a footer link.
 */

import { Reveal } from '@/components/motion/Reveal';
import { Scramble } from '@/components/motion/Scramble';
import { Button } from '@/components/ui/Button';
import { contact, recruitingFlag, socials } from '@content/site';
import { mailto } from '@/lib/utils';

export function ClosingCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-rule bg-surface-panel py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <div>
          <Scramble text="Start here" className="label text-accent" />
          <h2 className="mt-5 max-w-[16ch] text-balance text-4xl uppercase lg:text-5xl">
            Tell us what you are shipping.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            Send the stack, the deadline, and what worries you. We come back with an approach, a
            timeline, and a fixed price — {contact.responseTime}.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              href={mailto(contact.email, contact.engagementSubject)}
              size="lg"
              cursorLabel="email us"
            >
              Request an engagement
            </Button>
            <Button href="/contact/" variant="outline" size="lg">
              Build a scoping brief
            </Button>
          </div>

          <p className="numeric mt-8 text-sm text-fg-faint">
            Or write directly:{' '}
            <a href={mailto(contact.email)} className="text-accent underline-offset-4 hover:underline">
              {contact.email}
            </a>
          </p>
        </div>

        <Reveal direction="left">
          <aside className="ticked flex h-full flex-col border border-rule bg-surface-raised p-7">
            <p className="label text-fg-faint">Careers</p>
            <h3 className="mt-4 text-2xl uppercase">We are still recruiting operators.</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
              If you compete seriously in pwn, rev, web, crypto, forensics or OSINT, send us your
              record. We read every application, and we care more about what you have broken than
              where you studied.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <Button href={socials.careers} variant="quiet" flat>
                Apply to v1olet
              </Button>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-[0.6rem] text-fg-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                Message us on LinkedIn ↗
              </a>
            </div>

            {/* Same idea as the flag the previous site hid in its markup:
                visible only to whoever opens the source. */}
            <span className="sr-only" data-flag={recruitingFlag}>
              Mention this string in your application.
            </span>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
