'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { APPLY_URL } from '@/lib/data'

const lines = [
  './init --team v1olet --mode offensive',
  'capture the flag. break the box. write it up.',
  'pwn | rev | web | crypto | forensics',
]

function useTyped() {
  const [text, setText] = useState('')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setText(lines[0])
      return
    }
    let li = 0
    let ci = 0
    let del = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const l = lines[li]
      setText(l.slice(0, ci))
      if (!del && ci < l.length) {
        ci++
        timer = setTimeout(tick, 42)
      } else if (!del) {
        del = true
        timer = setTimeout(tick, 2100)
      } else if (ci > 0) {
        ci--
        timer = setTimeout(tick, 14)
      } else {
        del = false
        li = (li + 1) % lines.length
        timer = setTimeout(tick, 350)
      }
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  return text
}

export function Hero() {
  const typed = useTyped()

  return (
    <header
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 pb-16 pt-28 text-center"
    >
      <Image
        src="/v1olet-flower-light.png"
        alt="v1olet flower emblem"
        width={190}
        height={190}
        priority
        className="size-40 animate-[float_6s_ease-in-out_infinite] drop-shadow-[0_0_40px_oklch(0.52_0.24_285/0.5)] md:size-48"
      />
      <h1 className="mt-5 font-mono text-6xl font-extrabold leading-none text-foreground md:text-8xl">
        v
        <span className="text-primary drop-shadow-[0_0_18px_oklch(0.52_0.24_285/0.7)]">1</span>
        olet
      </h1>

      <div className="mt-6 min-h-[52px] max-w-[720px] font-mono text-[13px] text-muted-foreground md:text-base">
        <span className="text-lavender">root@v1olet:~$</span>{' '}
        <span>{typed}</span>
        <span className="ml-0.5 inline-block h-4 w-2 animate-[blink_1s_steps(1)_infinite] bg-lavender align-[-2px]" />
      </div>

      <div className="mt-9 flex flex-wrap justify-center gap-3.5">
        <a
          href="#roster"
          className="btn-shine bg-primary px-6 py-3 font-mono text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender hover:text-accent-foreground hover:shadow-[0_0_30px_oklch(0.52_0.24_285/0.6)]"
        >
          meet the team
        </a>
        <a
          href="#events"
          className="border border-primary px-6 py-3 font-mono text-sm font-bold text-lavender transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_oklch(0.52_0.24_285/0.45)]"
        >
          see results
        </a>
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-accent px-6 py-3 font-mono text-sm font-bold text-accent transition-all duration-300 [animation:btnGlow_2.8s_ease-in-out_infinite] hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground"
        >
          join v1olet
        </a>
      </div>

      <div className="absolute bottom-7 animate-[blink_2s_infinite] font-mono text-[11px] tracking-[3px] text-muted-foreground">
        ▼ SCROLL ▼
      </div>
    </header>
  )
}
