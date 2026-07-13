import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { APPLY_URL } from '@/lib/data'

const channels = [
  { label: 'hello@v1olet.team', href: 'mailto:hello@v1olet.team' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/e0sec/' },
  { label: 'CTFtime', href: 'https://ctftime.org/team/436674' },
  { label: 'CTF Writeups', href: 'https://github.com/e0sec/ctf-writeups' },
]

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1100px] px-6 py-20 md:py-24">
      <Reveal>
        <SectionHeading tag="// reach_us">
          contact <span className="text-lavender">&amp; join</span>
        </SectionHeading>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="border border-border bg-panel p-8">
            <h3 className="mb-4 font-mono text-lg text-foreground">&gt; channels</h3>
            <div className="grid gap-3 font-mono text-sm">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 border border-border px-3.5 py-2.5 text-foreground transition-all hover:translate-x-1 hover:border-primary hover:text-lavender"
                >
                  <span className="text-accent">→</span> {c.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center border border-accent bg-gradient-to-b from-accent/10 to-panel p-8">
            <h3 className="font-mono text-2xl text-foreground">join the team_</h3>
            <p className="my-3 text-[15px] leading-relaxed text-muted-foreground">
              We&apos;re looking for players who love breaking things. Pwn, rev, web, crypto,
              forensics — if you grind CTFs and want a team that competes internationally, apply.
            </p>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-accent px-6 py-3 font-mono text-sm font-bold text-accent transition-all hover:bg-accent hover:text-accent-foreground"
            >
              apply to v1olet →
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
