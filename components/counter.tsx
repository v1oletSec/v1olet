'use client'

import { useEffect, useRef, useState } from 'react'

export function Counter({ end, prefix = '' }: { end: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          io.unobserve(e.target)
          if (reduced) {
            setValue(end)
            return
          }
          const t0 = performance.now()
          const step = (t: number) => {
            const p = Math.min((t - t0) / 1200, 1)
            setValue(Math.round(end * (1 - Math.pow(1 - p, 3))))
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        })
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [end])

  return (
    <span ref={ref}>
      {prefix}
      {value}
    </span>
  )
}
