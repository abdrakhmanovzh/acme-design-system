import { Progress as ProgressPrimitive } from '@base-ui/react/progress'
import * as React from 'react'

import { cn } from '#/lib/cn'

type ProgressVariant = 'segmented' | 'simple'
type ProgressSize = 'sm' | 'md'

const SIZE_TOKENS = {
  sm: {
    segmentedTrackHeight: 'h-3',
    segmentedTickPx: 4,
    segmentedMaskSize: 'mask-size-[4px_12px]',
    segmentedMaskWebkit: '[-webkit-mask-size:4px_12px]',
    segmentedViewBox: '0 0 4 12',
    segmentedPillWidth: 1.5,
    segmentedPillHeight: 11,
    segmentedPillY: 0.5,
    segmentedPillRx: 0.75,
    segmentedTrackPadding: 'p-2',
    simpleTrackHeight: 'h-2',
    simpleTrackPadding: 'p-1.5',
    trackRadius: 'rounded-md'
  },
  md: {
    segmentedTrackHeight: 'h-4',
    segmentedTickPx: 5.25,
    segmentedMaskSize: 'mask-size-[5.25px_16px]',
    segmentedMaskWebkit: '[-webkit-mask-size:5.25px_16px]',
    segmentedViewBox: '0 0 5.25 16',
    segmentedPillWidth: 2,
    segmentedPillHeight: 15,
    segmentedPillY: 0.5,
    segmentedPillRx: 1,
    segmentedTrackPadding: 'p-2',
    simpleTrackHeight: 'h-2.5',
    simpleTrackPadding: 'p-2',
    trackRadius: 'rounded-lg'
  }
} as const

const FILL_RAMP_MS = 500

const TICK_MASKS: Record<ProgressSize, string> = {
  sm: buildTickMaskFromTokens(SIZE_TOKENS.sm),
  md: buildTickMaskFromTokens(SIZE_TOKENS.md)
}

function buildTickMaskFromTokens(t: (typeof SIZE_TOKENS)[ProgressSize]) {
  return buildTickMask({
    viewBox: t.segmentedViewBox,
    width: t.segmentedPillWidth,
    height: t.segmentedPillHeight,
    y: t.segmentedPillY,
    rx: t.segmentedPillRx
  })
}

const ProgressContext = React.createContext<{
  variant: ProgressVariant
  size: ProgressSize
}>({
  variant: 'simple',
  size: 'md'
})

function Progress({
  className,
  children,
  variant = 'simple',
  size = 'md',
  value,
  min = 0,
  max = 100,
  indicatorClassName,
  ...props
}: ProgressPrimitive.Root.Props & {
  variant?: ProgressVariant
  size?: ProgressSize
  indicatorClassName?: string
}) {
  return (
    <ProgressContext.Provider value={{ variant, size }}>
      <ProgressPrimitive.Root
        {...props}
        value={value ?? null}
        min={min}
        max={max}
        data-slot="progress"
        data-variant={variant}
        data-size={size}
        className={cn(
          'flex w-full flex-wrap items-center gap-x-3 gap-y-2',
          className
        )}
      >
        {children}
        <ProgressTrack>
          {variant === 'simple' ? (
            <SimpleMeter
              min={min}
              max={max}
              value={value ?? null}
              size={size}
              indicatorClassName={indicatorClassName}
            />
          ) : (
            <SegmentedMeter
              min={min}
              max={max}
              value={value ?? null}
              size={size}
              indicatorClassName={indicatorClassName}
            />
          )}
        </ProgressTrack>
      </ProgressPrimitive.Root>
    </ProgressContext.Provider>
  )
}

function ProgressTrack({
  className,
  children,
  ...props
}: ProgressPrimitive.Track.Props) {
  const { variant, size } = React.useContext(ProgressContext)
  const tokens = SIZE_TOKENS[size]
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      data-variant={variant}
      className={cn(
        'w-full min-w-0 border border-border bg-muted',
        tokens.trackRadius,
        variant === 'segmented'
          ? tokens.segmentedTrackPadding
          : tokens.simpleTrackPadding,
        className
      )}
      {...props}
    >
      {children}
    </ProgressPrimitive.Track>
  )
}

type MeterProps = {
  min: number
  max: number
  value: number | null
  size: ProgressSize
  indicatorClassName?: string
}

function getProgressPercent({ min, max, value }: Omit<MeterProps, 'size'>) {
  const valid = value !== null && Number.isFinite(value) ? value : null
  if (valid === null) return null
  if (max === min) return 100
  return Math.min(100, Math.max(0, ((valid - min) / (max - min)) * 100))
}

function buildTickMask(opts: {
  viewBox: string
  width: number
  height: number
  y: number
  rx: number
}) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${opts.viewBox}'>` +
    `<rect x='0' y='${opts.y}' width='${opts.width}' height='${opts.height}' rx='${opts.rx}' fill='black'/>` +
    `</svg>`
  return `url("data:image/svg+xml,${svg
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')}")`
}

function SegmentedMeter({ size, indicatorClassName, ...rest }: MeterProps) {
  const tokens = SIZE_TOKENS[size]
  const pct = getProgressPercent(rest)
  const indeterminate = pct === null

  const trackRef = React.useRef<HTMLDivElement>(null)
  const [filledPx, setFilledPx] = React.useState(0)

  React.useEffect(() => {
    if (indeterminate) return
    const node = trackRef.current
    if (!node) return
    const update = () => {
      const w = node.clientWidth
      const tick = tokens.segmentedTickPx
      if (w <= 0 || pct === null) {
        setFilledPx(0)
        return
      }
      const exact = (pct / 100) * w
      const segments = Math.floor(exact / tick)
      const snapped = pct > 0 ? Math.max(1, segments) : 0
      setFilledPx(snapped * tick)
    }
    const raf = requestAnimationFrame(() => requestAnimationFrame(update))
    const ro = new ResizeObserver(update)
    ro.observe(node)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [pct, indeterminate, tokens.segmentedTickPx])

  const maskStyle: React.CSSProperties & { '--progress-tick-mask': string } = {
    '--progress-tick-mask': TICK_MASKS[size]
  }

  return (
    <div
      ref={trackRef}
      aria-hidden
      data-slot="progress-segments"
      className={cn(
        'relative w-full min-w-0 overflow-hidden',
        tokens.segmentedTrackHeight,
        'opacity-100 transition-[opacity,transform] duration-300 ease-out-quint starting:opacity-0',
        'motion-reduce:transition-opacity motion-safe:starting:translate-y-1'
      )}
      style={maskStyle}
    >
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 bg-current',
          'mask-(--progress-tick-mask) mask-repeat-x',
          tokens.segmentedMaskSize,
          '[-webkit-mask-image:var(--progress-tick-mask)] [-webkit-mask-repeat:repeat-x]',
          tokens.segmentedMaskWebkit,
          'text-muted-foreground/30 dark:text-muted-foreground/45',
          indeterminate &&
            'text-muted-foreground/18 dark:text-muted-foreground/25'
        )}
      />
      {!indeterminate && (
        <div
          aria-hidden
          className={cn(
            'absolute inset-y-0 left-0 bg-current text-primary',
            'mask-(--progress-tick-mask) mask-repeat-x',
            tokens.segmentedMaskSize,
            '[-webkit-mask-image:var(--progress-tick-mask)] [-webkit-mask-repeat:repeat-x]',
            tokens.segmentedMaskWebkit,
            'transition-[width] ease-out-quint motion-reduce:transition-none',
            indicatorClassName
          )}
          style={{
            transitionDuration: `${FILL_RAMP_MS}ms`,
            width: `${filledPx}px`
          }}
        />
      )}
    </div>
  )
}

function SimpleMeter({ size, indicatorClassName, ...rest }: MeterProps) {
  const tokens = SIZE_TOKENS[size]
  const pct = getProgressPercent(rest)
  const indeterminate = pct === null

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    )
    return () => cancelAnimationFrame(raf)
  }, [])
  const displayPct = mounted ? pct : 0

  return (
    <div
      aria-hidden
      data-slot="progress-simple"
      className={cn(
        'relative w-full min-w-0 overflow-hidden rounded-full bg-muted-foreground/25 dark:bg-muted-foreground/25',
        tokens.simpleTrackHeight,
        'opacity-100 transition-[opacity,transform] duration-300 ease-out-quint starting:opacity-0',
        'motion-reduce:transition-opacity motion-safe:starting:translate-y-1'
      )}
    >
      {!indeterminate && (
        <div
          aria-hidden
          className={cn(
            'absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] ease-out-quint motion-reduce:transition-none',
            indicatorClassName
          )}
          style={{
            transitionDuration: `${FILL_RAMP_MS}ms`,
            width: `${displayPct}%`
          }}
        />
      )}
    </div>
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn('text-sm font-medium text-foreground', className)}
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn(
        'ml-auto text-sm text-muted-foreground tabular-nums',
        className
      )}
      {...props}
    />
  )
}

export { Progress, ProgressTrack, ProgressLabel, ProgressValue }
export type { ProgressVariant, ProgressSize }
