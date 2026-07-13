import type { ReactNode } from 'react'

export function SectionHeading({ tag, children }: { tag: string; children: ReactNode }) {
  return (
    <>
      <div className="font-mono text-[13px] tracking-[2px] text-accent">{tag}</div>
      <h2 className="mb-9 mt-2 font-mono text-2xl font-bold text-foreground md:text-4xl">{children}</h2>
    </>
  )
}
