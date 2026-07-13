'use client'

import { useEffect, useRef } from 'react'

type Flower = {
  x: number
  y: number
  size: number
  speed: number
  drift: number
  sway: number
  swayAmp: number
  angle: number
  spin: number
  hue: 'primary' | 'lavender'
  alpha: number
}

// Palette tuned to the v1olet theme tokens.
const COLORS = {
  primary: { petal: 'oklch(0.52 0.24 285', core: 'oklch(0.78 0.11 292' },
  lavender: { petal: 'oklch(0.78 0.11 292', core: 'oklch(0.52 0.24 285' },
}

/** Draws a 6-petal flower centered at the current transform origin. */
function drawFlower(ctx: CanvasRenderingContext2D, r: number, kind: Flower['hue'], alpha: number) {
  const c = COLORS[kind]
  const petals = 6
  ctx.shadowColor = `${c.petal} / 0.9)`
  ctx.shadowBlur = r * 0.9
  for (let i = 0; i < petals; i++) {
    ctx.save()
    ctx.rotate((i / petals) * Math.PI * 2)
    ctx.beginPath()
    // petal as an ellipse offset from center
    ctx.ellipse(0, -r * 0.62, r * 0.34, r * 0.6, 0, 0, Math.PI * 2)
    ctx.fillStyle = `${c.petal} / ${alpha})`
    ctx.fill()
    ctx.restore()
  }
  ctx.shadowBlur = 0
  // center dot
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2)
  ctx.fillStyle = `${c.core} / ${Math.min(1, alpha + 0.25)})`
  ctx.fill()
}

export function FlowerRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let flowers: Flower[] = []
    let raf = 0

    const spawn = (initial = false): Flower => {
      const size = 6 + Math.random() * 14
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -size * 2,
        size,
        speed: 14 + Math.random() * 30 + size, // px/sec, bigger falls faster
        drift: (Math.random() - 0.5) * 16,
        sway: Math.random() * Math.PI * 2,
        swayAmp: 8 + Math.random() * 26,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 1.2,
        hue: Math.random() > 0.5 ? 'primary' : 'lavender',
        alpha: 0.28 + Math.random() * 0.4,
      }
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.round((width * height) / 42000)
      const count = Math.max(14, Math.min(38, target))
      flowers = Array.from({ length: count }, () => spawn(true))
    }

    resize()

    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, width, height)

      for (const f of flowers) {
        f.y += f.speed * dt
        f.sway += dt * 1.4
        f.angle += f.spin * dt
        const sx = f.x + f.drift * dt + Math.sin(f.sway) * f.swayAmp * dt

        f.x = sx
        ctx.save()
        ctx.translate(f.x, f.y)
        ctx.rotate(f.angle)
        drawFlower(ctx, f.size, f.hue, f.alpha)
        ctx.restore()

        if (f.y - f.size > height) {
          Object.assign(f, spawn(false))
        }
        if (f.x < -40) f.x = width + 40
        if (f.x > width + 40) f.x = -40
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  )
}
