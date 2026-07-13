import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { services } from '@/lib/data'

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1100px] px-6 py-20 md:py-24">
      <Reveal>
        <SectionHeading tag="// services">
          what we <span className="text-lavender">do</span>
        </SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden border border-border bg-panel p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_14px_34px_rgba(0,0,0,0.45)]"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-x-100" />
              <div className="font-mono text-xl font-bold text-lavender">{s.icon}</div>
              <h3 className="mb-2 mt-3 font-mono text-base text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
