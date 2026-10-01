import { useReducedMotion } from 'motion/react'

import { cn } from '#/lib/cn'

const PILL_BARS = [
  { x: 3, width: 3.5, minHeight: 7, maxHeight: 11, delay: '0s' },
  { x: 8.25, width: 4.5, minHeight: 10, maxHeight: 15, delay: '0.12s' },
  { x: 14.5, width: 6, minHeight: 8, maxHeight: 12.5, delay: '0.24s' }
] as const

const SPINNER_CONFIG = {
  width: 24,
  height: 18,
  centerY: 9,
  radius: 999,
  duration: '0.72s'
} as const

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  const prefersReducedMotion = useReducedMotion() ?? false

  return (
    <svg
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      viewBox={`0 0 ${SPINNER_CONFIG.width} ${SPINNER_CONFIG.height}`}
      fill="none"
      className={cn('size-4 shrink-0 text-current', className)}
      {...props}
    >
      {PILL_BARS.map((bar) => {
        const minY = SPINNER_CONFIG.centerY - bar.minHeight / 2
        const maxY = SPINNER_CONFIG.centerY - bar.maxHeight / 2

        return (
          <rect
            key={`${bar.x}-${bar.width}-${bar.delay}`}
            x={bar.x}
            y={minY}
            width={bar.width}
            height={bar.minHeight}
            rx={SPINNER_CONFIG.radius}
            fill="currentColor"
            opacity={0.9}
          >
            {!prefersReducedMotion && (
              <>
                <animate
                  attributeName="y"
                  values={`${minY};${maxY};${minY}`}
                  keyTimes="0;0.5;1"
                  calcMode="spline"
                  keySplines="0.16 1 0.3 1;0.42 0 1 1"
                  dur={SPINNER_CONFIG.duration}
                  begin={bar.delay}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="height"
                  values={`${bar.minHeight};${bar.maxHeight};${bar.minHeight}`}
                  keyTimes="0;0.5;1"
                  calcMode="spline"
                  keySplines="0.16 1 0.3 1;0.42 0 1 1"
                  dur={SPINNER_CONFIG.duration}
                  begin={bar.delay}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.45;1;0.45"
                  keyTimes="0;0.5;1"
                  calcMode="spline"
                  keySplines="0.16 1 0.3 1;0.42 0 1 1"
                  dur={SPINNER_CONFIG.duration}
                  begin={bar.delay}
                  repeatCount="indefinite"
                />
              </>
            )}
          </rect>
        )
      })}
    </svg>
  )
}

export { Spinner }
