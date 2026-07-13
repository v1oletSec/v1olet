import { FlowerRain } from '@/components/flower-rain'

export function GridBg() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* scrolling grid */}
      <div
        className="absolute inset-0 opacity-[0.5] [animation:gridScroll_3.5s_linear_infinite]"
        style={{
          backgroundImage:
            'linear-gradient(oklch(0.52 0.24 285 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(0.52 0.24 285 / 0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
        }}
      />
      {/* top violet glow */}
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: 'oklch(0.52 0.24 285 / 0.16)' }}
      />
      {/* drifting accent glow */}
      <div
        className="absolute right-[8%] top-1/3 h-[380px] w-[380px] rounded-full blur-[130px] [animation:float_9s_ease-in-out_infinite]"
        style={{ background: 'oklch(0.78 0.11 292 / 0.09)' }}
      />
      {/* falling v1olet flowers */}
      <FlowerRain />
    </div>
  )
}
