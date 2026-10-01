import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform
} from 'motion/react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar
} from 'recharts'
import {
  ChartStyle,
  getColorsCount,
  type ChartConfig
} from '#/components/ui/charts/chart'
import { useCallback, useEffect, type ComponentProps } from 'react'
import type { MotionValue } from 'motion/react'
import { cn } from '#/lib/cn'
import * as React from 'react'

type BrushVariant = 'line' | 'area' | 'bar'
type CurveType = ComponentProps<typeof Area>['type']

interface BrushRange {
  startIndex: number
  endIndex: number
}

interface BrushProps {
  /** Full dataset – always rendered in the miniature chart */
  data: Record<string, unknown>[]
  /** Chart config with colour definitions */
  chartConfig: ChartConfig
  /** Data keys to plot (default: all keys from chartConfig) */
  dataKeys?: string[]
  /** X-axis data key – used for handle labels */
  xDataKey?: string
  /** Visual variant of the mini chart */
  variant?: BrushVariant
  /** Pixel height of the brush */
  height?: number
  /** Extra className */
  className?: string
  /** Whether areas/bars should be stacked in the mini chart */
  stacked?: boolean
  /** Stroke variant for line / area strokes in the mini chart */
  strokeVariant?: 'solid' | 'dashed'
  /** Whether to connect null data points in line / area variants */
  connectNulls?: boolean
  /** Radius for bar corners in the bar variant */
  barRadius?: number

  /** Controlled start index */
  startIndex?: number
  /** Controlled end index */
  endIndex?: number

  /** Initial start index (uncontrolled) */
  defaultStartIndex?: number
  /** Initial end index (uncontrolled) */
  defaultEndIndex?: number

  /** Fired whenever the visible range changes */
  onChange?: (range: BrushRange) => void
  /** Format the handle label from the xDataKey value */
  formatLabel?: (value: unknown, index: number) => string
  /** Curve type for line / area variants */
  curveType?: CurveType
  /** Minimum number of data points that must remain selected */
  minSpan?: number
  /** Whether to render labels on the handles */
  showLabels?: boolean
  /** Skip rendering own ChartStyle (when inside a ChartContainer that already provides CSS vars) */
  skipStyle?: boolean
}

const SPRING_CONFIG = { stiffness: 300, damping: 35, mass: 0.8 }

type DragType = 'left' | 'right' | 'middle'

interface DragState {
  type: DragType
  originX: number
  originRange: BrushRange
}

function useBrushDrag({
  range,
  totalPoints,
  containerRef,
  commit
}: {
  range: BrushRange
  totalPoints: number
  containerRef: React.RefObject<HTMLDivElement | null>
  commit: (next: BrushRange, mode?: DragType) => void
}) {
  const dragRef = React.useRef<DragState | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  const toIndexDelta = useCallback(
    (px: number) => {
      if (!containerRef.current || totalPoints <= 1) return 0
      return Math.round(
        (px / containerRef.current.getBoundingClientRect().width) *
          (totalPoints - 1)
      )
    },
    [totalPoints, containerRef]
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent, type: DragType) => {
      e.preventDefault()
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      dragRef.current = { type, originX: e.clientX, originRange: { ...range } }
      setIsDragging(true)
    },
    [range]
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const d = dragRef.current
      if (!d) return

      const delta = toIndexDelta(e.clientX - d.originX)
      const { type, originRange: o } = d

      if (type === 'left') {
        commit(
          { startIndex: o.startIndex + delta, endIndex: o.endIndex },
          'left'
        )
      } else if (type === 'right') {
        commit(
          { startIndex: o.startIndex, endIndex: o.endIndex + delta },
          'right'
        )
      } else {
        const span = o.endIndex - o.startIndex
        let s = o.startIndex + delta
        let e2 = s + span
        if (s < 0) {
          s = 0
          e2 = span
        }
        if (e2 > totalPoints - 1) {
          e2 = totalPoints - 1
          s = Math.max(0, e2 - span)
        }
        commit({ startIndex: s, endIndex: e2 }, 'middle')
      }
    },
    [toIndexDelta, totalPoints, commit]
  )

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    dragRef.current = null
    setIsDragging(false)
  }, [])

  const bind = useCallback(
    (type: DragType) => ({
      onPointerDown: (e: React.PointerEvent) => onPointerDown(e, type),
      onPointerMove,
      onPointerUp
    }),
    [onPointerDown, onPointerMove, onPointerUp]
  )

  return { isDragging, bind }
}

function Brush({
  data,
  chartConfig,
  dataKeys,
  xDataKey,
  variant = 'area',
  height = 56,
  className,
  stacked = false,
  strokeVariant = 'solid',
  connectNulls = false,
  barRadius,
  startIndex: controlledStart,
  endIndex: controlledEnd,
  defaultStartIndex = 0,
  defaultEndIndex,
  onChange,
  formatLabel,
  curveType = 'monotone',
  minSpan = 2,
  showLabels = true,
  skipStyle = false
}: BrushProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const keys = React.useMemo(
    () => dataKeys ?? Object.keys(chartConfig),
    [dataKeys, chartConfig]
  )
  const totalPoints = data.length
  const chartId = React.useId().replace(/:/g, '')

  const isControlled =
    controlledStart !== undefined && controlledEnd !== undefined

  const [internalRange, setInternalRange] = React.useState<BrushRange>(() => ({
    startIndex: Math.max(0, Math.min(defaultStartIndex, totalPoints - 1)),
    endIndex: Math.max(
      0,
      Math.min(defaultEndIndex ?? totalPoints - 1, totalPoints - 1)
    )
  }))

  const lastCommittedRef = React.useRef<BrushRange>(internalRange)

  useEffect(() => {
    if (!isControlled) {
      setInternalRange((prev) => {
        const adjusted = {
          startIndex: Math.min(prev.startIndex, Math.max(0, totalPoints - 1)),
          endIndex: Math.min(prev.endIndex, Math.max(0, totalPoints - 1))
        }
        lastCommittedRef.current = adjusted
        return adjusted
      })
    }
  }, [totalPoints, isControlled])

  const clampRange = useCallback(
    (range: BrushRange, mode?: DragType): BrushRange => {
      let { startIndex, endIndex } = range
      const maxIndex = Math.max(0, totalPoints - 1)

      startIndex = Math.max(0, Math.min(startIndex, maxIndex))
      endIndex = Math.max(0, Math.min(endIndex, maxIndex))

      if (mode === 'left') {
        const maxStart = Math.max(0, endIndex - minSpan)
        startIndex = Math.min(startIndex, maxStart)
        return { startIndex, endIndex }
      }

      if (mode === 'right') {
        const minEnd = Math.min(maxIndex, startIndex + minSpan)
        endIndex = Math.max(endIndex, minEnd)
        return { startIndex, endIndex }
      }

      if (endIndex - startIndex < minSpan) {
        endIndex = Math.min(startIndex + minSpan, maxIndex)
        if (endIndex - startIndex < minSpan) {
          startIndex = Math.max(0, endIndex - minSpan)
        }
      }
      return { startIndex, endIndex }
    },
    [totalPoints, minSpan]
  )

  const commit = useCallback(
    (next: BrushRange, mode?: DragType) => {
      const clamped = clampRange(next, mode)
      const last = lastCommittedRef.current

      if (
        last.startIndex === clamped.startIndex &&
        last.endIndex === clamped.endIndex
      ) {
        return
      }

      lastCommittedRef.current = clamped
      setInternalRange(clamped)
      React.startTransition(() => {
        onChange?.(clamped)
      })
    },
    [clampRange, onChange]
  )

  const { isDragging, bind } = useBrushDrag({
    range: internalRange,
    totalPoints,
    containerRef,
    commit
  })

  const range = internalRange

  useEffect(() => {
    if (isControlled && !isDragging) {
      const syncedRange = {
        startIndex: controlledStart,
        endIndex: controlledEnd
      }
      setInternalRange(syncedRange)
      lastCommittedRef.current = syncedRange
    }
  }, [isControlled, controlledStart, controlledEnd, isDragging])

  const leftPct =
    totalPoints > 1 ? (range.startIndex / (totalPoints - 1)) * 100 : 0
  const rightPct =
    totalPoints > 1 ? (range.endIndex / (totalPoints - 1)) * 100 : 100

  const leftTarget = useMotionValue(leftPct)
  const rightTarget = useMotionValue(rightPct)
  if (leftTarget.get() !== leftPct) leftTarget.set(leftPct)
  if (rightTarget.get() !== rightPct) rightTarget.set(rightPct)

  const leftSpring = useSpring(leftTarget, SPRING_CONFIG)
  const rightSpring = useSpring(rightTarget, SPRING_CONFIG)
  const leftPosition = useTransform(leftSpring, (v) => `${v}%`)
  const rightPosition = useTransform(rightSpring, (v) => `${v}%`)
  const leftOverlayWidth = useTransform(leftSpring, (v) => `${v}%`)
  const rightOverlayWidth = useTransform(
    rightSpring,
    (v) => `${Math.max(0, 100 - v)}%`
  )
  const selectedWidth = useMotionValue(`${Math.max(0, rightPct - leftPct)}%`)

  const updateSelectedWidth = useCallback(() => {
    selectedWidth.set(`${Math.max(0, rightSpring.get() - leftSpring.get())}%`)
  }, [leftSpring, rightSpring, selectedWidth])

  useMotionValueEvent(leftSpring, 'change', updateSelectedWidth)
  useMotionValueEvent(rightSpring, 'change', updateSelectedWidth)

  const onHandleKeyDown = (side: 'left' | 'right', e: React.KeyboardEvent) => {
    const current = side === 'left' ? range.startIndex : range.endIndex
    let next: number
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = current - 1
        break
      case 'ArrowRight':
      case 'ArrowUp':
        next = current + 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = totalPoints - 1
        break
      default:
        return
    }
    e.preventDefault()
    commit(
      side === 'left'
        ? { startIndex: next, endIndex: range.endIndex }
        : { startIndex: range.startIndex, endIndex: next },
      side
    )
  }

  const getLabel = useCallback(
    (idx: number) => {
      if (!xDataKey) return String(idx)
      const v = data[idx]?.[xDataKey]
      return formatLabel ? formatLabel(v, idx) : String(v ?? idx)
    },
    [data, xDataKey, formatLabel]
  )

  if (totalPoints === 0) return null

  return (
    <div
      ref={containerRef}
      data-chart={skipStyle ? undefined : chartId}
      className={cn('group relative select-none', className)}
      style={{ height }}
    >
      {!skipStyle && <ChartStyle id={chartId} config={chartConfig} />}

      {/* Mini chart – always shows all data */}
      <div className="absolute inset-0 overflow-hidden rounded-md">
        <MiniChart
          data={data}
          keys={keys}
          chartConfig={chartConfig}
          variant={variant}
          curveType={curveType}
          chartId={chartId}
          stacked={stacked}
          strokeVariant={strokeVariant}
          connectNulls={connectNulls}
          barRadius={barRadius}
        />
      </div>

      {/* Dim overlay – left */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 rounded-l-md bg-background/70 backdrop-blur-[2px]"
        style={{ width: leftOverlayWidth }}
      />
      {/* Dim overlay – right */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 rounded-r-md bg-background/70 backdrop-blur-[2px]"
        style={{ width: rightOverlayWidth }}
      />

      {/* Selected region – draggable to pan */}
      <motion.div
        className="absolute inset-y-0 cursor-grab touch-none rounded-sm border active:cursor-grabbing"
        style={{ left: leftPosition, width: selectedWidth }}
        {...bind('middle')}
      />

      {/* Left handle */}
      <BrushHandle
        side="left"
        position={leftPosition}
        label={showLabels ? getLabel(range.startIndex) : undefined}
        bind={bind('left')}
        onKeyDown={(e) => onHandleKeyDown('left', e)}
        aria-label="Range start"
        aria-valuemin={0}
        aria-valuemax={Math.max(0, range.endIndex - minSpan)}
        aria-valuenow={range.startIndex}
        aria-valuetext={getLabel(range.startIndex)}
      />

      {/* Right handle */}
      <BrushHandle
        side="right"
        position={rightPosition}
        label={showLabels ? getLabel(range.endIndex) : undefined}
        bind={bind('right')}
        onKeyDown={(e) => onHandleKeyDown('right', e)}
        aria-label="Range end"
        aria-valuemin={Math.min(totalPoints - 1, range.startIndex + minSpan)}
        aria-valuemax={totalPoints - 1}
        aria-valuenow={range.endIndex}
        aria-valuetext={getLabel(range.endIndex)}
      />
    </div>
  )
}

function BrushHandle({
  side,
  position,
  label,
  bind,
  ...sliderProps
}: {
  side: 'left' | 'right'
  position: MotionValue<string>
  label?: string
  bind: {
    onPointerDown: (e: React.PointerEvent) => void
    onPointerMove: (e: React.PointerEvent) => void
    onPointerUp: (e: React.PointerEvent) => void
  }
} & Pick<
  React.ComponentProps<'div'>,
  | 'onKeyDown'
  | 'aria-label'
  | 'aria-valuemin'
  | 'aria-valuemax'
  | 'aria-valuenow'
  | 'aria-valuetext'
>) {
  const isLeft = side === 'left'

  return (
    <motion.div className="absolute inset-y-0 z-10" style={{ left: position }}>
      <div
        role="slider"
        tabIndex={0}
        aria-orientation="horizontal"
        className={cn(
          "group peer/handle absolute inset-y-0 flex w-3 cursor-ew-resize touch-none items-center justify-center outline-none after:absolute after:inset-y-0 after:-left-4 after:w-11 after:content-['']",
          isLeft ? '' : '-translate-x-full'
        )}
        {...bind}
        {...sliderProps}
      >
        <div
          className={cn(
            'relative flex h-4 w-1.5 items-center justify-center rounded-md bg-muted-foreground transition-colors group-hover:bg-foreground group-focus-visible:bg-foreground group-focus-visible:shadow-frame-ring-strong',
            isLeft ? 'left-[-5.5px]' : 'right-[-5.5px]'
          )}
        >
          <div className="flex flex-col gap-0.5">
            <div className="h-0.5 w-0.5 rounded-full bg-background/70" />
            <div className="h-0.5 w-0.5 rounded-full bg-background/70" />
            <div className="h-0.5 w-0.5 rounded-full bg-background/70" />
          </div>
        </div>
      </div>

      {label && (
        <div
          className={cn(
            'pointer-events-none absolute -bottom-3 -translate-y-1/2 rounded-[3px] bg-foreground px-1 py-px text-[8px] leading-tight font-medium whitespace-nowrap text-background opacity-0 group-hover:opacity-100 peer-focus-visible/handle:opacity-100',
            isLeft ? 'left-1.5' : 'right-1.5'
          )}
        >
          {label}
        </div>
      )}
    </motion.div>
  )
}

function MiniChart({
  data,
  keys,
  chartConfig,
  variant,
  curveType,
  chartId,
  stacked,
  strokeVariant = 'solid',
  connectNulls = false,
  barRadius
}: {
  data: Record<string, unknown>[]
  keys: string[]
  chartConfig: ChartConfig
  variant: BrushVariant
  curveType: CurveType
  chartId: string
  stacked: boolean
  strokeVariant?: 'solid' | 'dashed'
  connectNulls?: boolean
  barRadius?: number
}) {
  const gradients = React.useMemo(
    () =>
      Object.entries(chartConfig)
        .filter(([key]) => keys.includes(key))
        .map(([dataKey, config]) => ({
          dataKey,
          colorsCount: getColorsCount(config)
        })),
    [chartConfig, keys]
  )

  const dashArray = strokeVariant === 'dashed' ? '4 4' : undefined

  const defsContent = (
    <>
      {/* Vertical fade gradient for area fill mask */}
      {variant === 'area' && (
        <linearGradient
          id={`${chartId}-zm-vertical-fade`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="white" stopOpacity={0.15} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </linearGradient>
      )}
      {gradients.map(({ dataKey, colorsCount }) => {
        const colorStops =
          colorsCount === 1 ? (
            <>
              <stop offset="0%" stopColor={`var(--color-${dataKey}-0)`} />
              <stop offset="100%" stopColor={`var(--color-${dataKey}-0)`} />
            </>
          ) : (
            Array.from({ length: colorsCount }, (_, i) => (
              <stop
                key={i}
                offset={`${(i / (colorsCount - 1)) * 100}%`}
                stopColor={`var(--color-${dataKey}-${i}, var(--color-${dataKey}-0))`}
              />
            ))
          )

        return (
          <React.Fragment key={dataKey}>
            {/* Vertical color gradient (stroke + bar fill) */}
            <linearGradient
              id={`${chartId}-zm-${dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              {colorStops}
            </linearGradient>

            {/* Area fill: color gradient masked with vertical fade */}
            {variant === 'area' && (
              <>
                <mask id={`${chartId}-zm-fill-mask-${dataKey}`}>
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#${chartId}-zm-vertical-fade)`}
                  />
                </mask>
                <pattern
                  id={`${chartId}-zm-fill-${dataKey}`}
                  patternUnits="userSpaceOnUse"
                  width="100%"
                  height="100%"
                >
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#${chartId}-zm-${dataKey})`}
                    mask={`url(#${chartId}-zm-fill-mask-${dataKey})`}
                  />
                </pattern>
              </>
            )}
          </React.Fragment>
        )
      })}
    </>
  )

  if (variant === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
        >
          <defs>{defsContent}</defs>
          {keys.map((dk) => (
            <Line
              key={dk}
              type={curveType}
              dataKey={dk}
              stroke={`url(#${chartId}-zm-${dk})`}
              strokeWidth={1}
              strokeOpacity={0.5}
              strokeDasharray={dashArray}
              connectNulls={connectNulls}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (variant === 'bar') {
    const r = barRadius ?? 3
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 2, right: 0, bottom: 0, left: 0 }}
          barGap={2}
          barSize={14}
        >
          <defs>{defsContent}</defs>
          {keys.map((dk) => (
            <Bar
              key={dk}
              dataKey={dk}
              fill={`url(#${chartId}-zm-${dk})`}
              fillOpacity={0.35}
              stackId={stacked ? 'zm-stack' : undefined}
              isAnimationActive={false}
              radius={[r, r, r, r]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>{defsContent}</defs>
        {keys.map((dk) => (
          <Area
            key={dk}
            type={curveType}
            dataKey={dk}
            stroke={`url(#${chartId}-zm-${dk})`}
            fill={`url(#${chartId}-zm-fill-${dk})`}
            strokeWidth={1}
            strokeOpacity={0.5}
            strokeDasharray={dashArray}
            connectNulls={connectNulls}
            fillOpacity={1}
            stackId={stacked ? 'zm-stack' : undefined}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

function useBrush<TData extends Record<string, unknown>>({
  data,
  defaultStartIndex = 0,
  defaultEndIndex
}: {
  data: TData[]
  defaultStartIndex?: number
  defaultEndIndex?: number
}) {
  const [range, setRange] = React.useState<BrushRange>({
    startIndex: defaultStartIndex,
    endIndex: defaultEndIndex ?? Math.max(0, data.length - 1)
  })

  const deferredRange = React.useDeferredValue(range)

  useEffect(() => {
    setRange({
      startIndex: 0,
      endIndex: Math.max(0, data.length - 1)
    })
  }, [data.length])

  const visibleData = React.useMemo(
    () => data.slice(deferredRange.startIndex, deferredRange.endIndex + 1),
    [data, deferredRange.startIndex, deferredRange.endIndex]
  )

  return {
    range,
    visibleData,
    brushProps: {
      startIndex: range.startIndex,
      endIndex: range.endIndex,
      onChange: setRange
    } satisfies Pick<BrushProps, 'startIndex' | 'endIndex' | 'onChange'>
  }
}

export { Brush, useBrush, type BrushProps, type BrushRange, type BrushVariant }
