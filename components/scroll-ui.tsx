'use client'

import { ArrowUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ScrollUI() {
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      setProgress(scrolled * 100)
      setShowTop(h.scrollTop > 600)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[200] h-[2.5px] bg-gradient-to-r from-primary to-accent shadow-[0_0_12px_oklch(0.52_0.24_285/0.6)]"
        style={{ width: `${progress}%` }}
      />
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-[150] flex size-11 items-center justify-center border border-primary bg-background/85 text-lavender backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground ${
          showTop ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ArrowUpIcon className="size-5" />
      </button>
    </>
  )
}
