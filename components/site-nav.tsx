'use client'

import Image from 'next/image'
import { APPLY_URL } from '@/lib/data'

const links = [
  { label: 'about', href: '#about' },
  { label: 'services', href: '#services' },
  { label: 'events', href: '#events' },
  { label: 'roster', href: '#roster' },
  { label: 'contact', href: '#contact' },
]

export function SiteNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center gap-7 border-b border-border bg-background/80 px-5 py-3 backdrop-blur-md md:px-7">
      <a href="#top" className="flex items-center gap-2.5 font-mono text-[17px] font-extrabold text-foreground">
        <Image src="/v1olet-flower-light.png" alt="v1olet logo" width={32} height={32} className="size-8" />
        <span>
          v<span className="text-primary">1</span>olet
        </span>
      </a>
      <div className="ml-auto hidden items-center gap-6 font-mono text-[13px] md:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="text-muted-foreground transition-colors hover:text-lavender">
            {l.label}
          </a>
        ))}
      </div>
      <a
        href={APPLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[13px] font-bold text-primary-foreground transition-colors bg-primary px-4 py-1.5 hover:bg-lavender hover:text-accent-foreground"
      >
        apply →
      </a>
    </nav>
  )
}
