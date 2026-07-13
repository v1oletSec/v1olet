import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { roster, type Member } from '@/lib/data'

function initials(name: string) {
  return name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || '??'
}

/**
 * Circular avatar that shows the member's profile image when `avatar` is set,
 * otherwise falls back to their mono initials. `sizeClass` controls dimensions
 * and `textClass` the fallback initials size.
 */
function Avatar({
  member,
  sizeClass,
  textClass,
}: {
  member: Member
  sizeClass: string
  textClass: string
}) {
  const base = `flex ${sizeClass} items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-background font-mono ${textClass} font-extrabold text-lavender`
  if (member.avatar) {
    return (
      <div className={base}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.avatar || '/placeholder.svg'}
          alt={`${member.name} profile photo`}
          crossOrigin="anonymous"
          className="size-full object-cover"
        />
      </div>
    )
  }
  return <div className={base}>{initials(member.name)}</div>
}

const socialClass =
  'flex size-8 items-center justify-center border border-primary/60 text-lavender transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent'

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.05.78 2.12v3.14c0 .3.2.67.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.93 9h-3.02a15.6 15.6 0 0 0-1.2-5.02A8.03 8.03 0 0 1 19.93 11zM12 4.04c.86 1.16 1.62 2.94 1.9 4.96h-3.8c.28-2.02 1.04-3.8 1.9-4.96zM4.07 13h3.02c.15 1.8.57 3.52 1.2 5.02A8.03 8.03 0 0 1 4.07 13zm3.02-2H4.07a8.03 8.03 0 0 1 4.22-5.02A15.6 15.6 0 0 0 7.09 11zM12 19.96c-.86-1.16-1.62-2.94-1.9-4.96h3.8c-.28 2.02-1.04 3.8-1.9 4.96zM10.1 13h3.8a13.7 13.7 0 0 1 0-2h-3.8a13.7 13.7 0 0 1 0 2zm5.61 5.02c.63-1.5 1.05-3.22 1.2-5.02h3.02a8.03 8.03 0 0 1-4.22 5.02z" />
    </svg>
  )
}

function Socials({ member }: { member: Member }) {
  if (!member.links) return null
  return (
    <div className="mt-4 flex justify-center gap-3 border-t border-border pt-3.5">
      {member.links.linkedin && (
        <a
          href={member.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className={socialClass}
        >
          <LinkedinIcon />
        </a>
      )}
      {member.links.github && (
        <a
          href={member.links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on GitHub`}
          className={socialClass}
        >
          <GithubIcon />
        </a>
      )}
      {member.links.website && (
        <a
          href={member.links.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} website`}
          className={socialClass}
        >
          <GlobeIcon />
        </a>
      )}
    </div>
  )
}

function Skills({ skills }: { skills: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-1.5">
      {skills.map((s) => (
        <span
          key={s}
          className="border border-primary/60 bg-primary/10 px-2 py-0.5 font-mono text-[10.5px] text-lavender transition-colors group-hover:border-accent"
        >
          {s}
        </span>
      ))}
    </div>
  )
}

function CaptainCard({ member }: { member: Member }) {
  return (
    <div className="group relative overflow-hidden border border-primary/40 bg-gradient-to-b from-panel-2 to-panel p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-[0_0_40px_oklch(0.52_0.24_285/0.3)]">
      <span className="card-sheen absolute inset-0 z-10" aria-hidden="true" />
      {/* corner rank tag */}
      <span className="absolute right-0 top-0 bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-[2px] text-primary-foreground">
        {member.role}
      </span>

      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <span
            className="absolute -inset-1.5 rounded-full border border-dashed border-primary/50 [animation:spinSlow_14s_linear_infinite]"
            aria-hidden="true"
          />
          <Avatar member={member} sizeClass="size-[76px]" textClass="text-2xl" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-mono text-[19px] text-foreground">{member.name}</h3>
          <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[1.5px] text-accent">
            <span className="inline-block size-1.5 rounded-full bg-accent [animation:borderPulse_2s_ease-in-out_infinite]" />
            {member.specialty}
          </div>
        </div>
      </div>

      <blockquote className="relative mt-5 border-l-2 border-primary/60 pl-3.5 text-[13.5px] italic leading-relaxed text-muted-foreground">
        <span className="absolute -left-1 -top-2 font-mono text-2xl text-primary/50">&ldquo;</span>
        {member.quote}
      </blockquote>

      {member.stats && (
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
          {member.stats.map((st) => (
            <div key={st.label} className="text-center">
              <div className="font-mono text-lg font-bold text-lavender">{st.value}</div>
              <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-wide text-muted-foreground">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <Skills skills={member.skills} />
    </div>
  )
}

function CoreCard({ member }: { member: Member }) {
  return (
    <div className="group relative overflow-hidden border border-border bg-gradient-to-b from-panel-2 to-panel p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_0_30px_oklch(0.52_0.24_285/0.25)]">
      <span className="card-sheen absolute inset-0 z-10" aria-hidden="true" />
      <div className="mx-auto mb-4 w-fit transition-transform duration-300 group-hover:scale-105">
        <Avatar member={member} sizeClass="size-[92px]" textClass="text-3xl" />
      </div>
      <h3 className="font-mono text-[17px] text-foreground">{member.name}</h3>
      <div className="my-1.5 font-mono text-[11.5px] uppercase tracking-[2px] text-accent">
        {member.specialty}
      </div>
      <blockquote className="mt-2 text-[13px] italic leading-relaxed text-muted-foreground">
        &ldquo;{member.quote}&rdquo;
      </blockquote>
      <Skills skills={member.skills} />
      <Socials member={member} />
    </div>
  )
}

export function Roster() {
  const captains = roster.filter((m) => m.tier === 'captain')
  const core = roster.filter((m) => m.tier === 'core')

  return (
    <section id="roster" className="mx-auto max-w-[1100px] px-6 py-20 md:py-24">
      <Reveal>
        <SectionHeading tag="// core_roster">
          the <span className="text-lavender">operators</span>
        </SectionHeading>
      </Reveal>

      <Reveal delay={80}>
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-[12px] uppercase tracking-[3px] text-accent">
            team_captains
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
        </div>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {captains.map((m, i) => (
          <Reveal key={m.name} delay={i * 90}>
            <CaptainCard member={m} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={80}>
        <div className="mb-5 mt-14 flex items-center gap-3">
          <span className="font-mono text-[12px] uppercase tracking-[3px] text-accent">
            core_members
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
        </div>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {core.map((m, i) => (
          <Reveal key={m.name} delay={i * 90}>
            <CoreCard member={m} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
