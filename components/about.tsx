import { Counter } from '@/components/counter'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const stats = [
  { end: 11, prefix: '', label: 'COMPETITIONS · 2026' },
  { end: 3, prefix: '#', label: 'BEST PLACEMENT · BRONCOCTF' },
  { end: 1351, prefix: '', label: 'LARGEST FIELD FACED' },
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1100px] px-6 py-20 md:py-24">
      <Reveal>
        <SectionHeading tag="// whoami">
          about <span className="text-lavender">v1olet</span>
        </SectionHeading>
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-3.5 text-[16px] leading-relaxed text-foreground">
            <p>
              Independent offensive security research team specialising in penetration testing,
              vulnerability research, and red team operations.
            </p>
            <p>
              Active CTF competitors under team tag{' '}
              <strong className="text-lavender">v1olet</strong> — regularly placing in
              international competitions against fields of 500–1300+ teams.
            </p>
          </div>
          <div className="grid gap-5 border border-border bg-panel p-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-3xl font-extrabold text-lavender">
                  <Counter end={s.end} prefix={s.prefix} />
                </div>
                <div className="mt-1 font-mono text-xs tracking-wide text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
