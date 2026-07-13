import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { events } from '@/lib/data'

export function Events() {
  return (
    <section id="events" className="mx-auto max-w-[1100px] px-6 py-20 md:py-24">
      <Reveal>
        <SectionHeading tag="// scoreboard">
          competition <span className="text-lavender">log</span>
        </SectionHeading>
        <div className="ml-2 grid gap-3.5 border-l-2 border-border pl-8">
          {events.map((e) => (
            <div
              key={e.name}
              className={`relative flex flex-wrap items-center gap-4 border px-5 py-4 transition-all duration-300 hover:translate-x-1.5 ${
                e.top 
                  ? 'border-accent bg-accent/5 shadow-[0_0_15px_-5px_var(--color-accent)] hover:border-accent' 
                  : 'border-border bg-panel hover:border-primary'
              }`}
            >
              <span
                className={`absolute -left-[38px] top-1/2 size-2.5 -translate-y-1/2 rotate-45 border-2 bg-background ${
                  e.top ? 'border-accent' : 'border-primary'
                }`}
              />
              <div
                className={`min-w-[86px] font-mono text-2xl font-extrabold ${
                  e.top ? 'text-accent' : 'text-lavender'
                }`}
              >
                {e.rank}
              </div>
              <div className="min-w-[220px] flex-1">
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground transition-colors hover:text-lavender"
                >
                  {e.name}
                </a>
                <div className="mt-1 font-mono text-xs text-muted-foreground">
                  {e.date}
                  {e.teams ? ` · ${e.teams}` : ''} · captained by {e.captain}
                </div>
              </div>
              {e.badge && (
                <span className="border border-accent px-2 py-0.5 font-mono text-[10.5px] tracking-wide text-accent">
                  {e.badge}
                </span>
              )}
              {e.top && (
                <span className="border border-accent bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] tracking-wide text-accent">
                  TOP RUN
                </span>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}