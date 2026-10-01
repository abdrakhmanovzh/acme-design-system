import {
  type ChartConfig,
  ChartContainer,
  DEFAULT_CHART_REVEAL_ANIMATION,
  getColorsCount,
  getLoadingData,
  LoadingIndicator
} from '#/components/ui/charts/chart'
import { Brush, useBrush, type BrushRange } from '#/components/ui/charts/brush'
import {
  ChartTooltip,
  ChartTooltipContent
} from '#/components/ui/charts/tooltip'
import {
  ChartLegend,
  ChartLegendContent,
  type ChartLegendVariant
} from '#/components/ui/charts/legend'
import {
  ChartBackground,
  type BackgroundVariant
} from '#/components/ui/charts/background'
import {
  createContext,
  use,
  useCallback,
  useId,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode
} from 'react'
import {
  Bar as RechartsBar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Rectangle,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis
} from 'recharts'
import type { RectRadius } from 'recharts/types/shape/Rectangle'
import { motion, useReducedMotion } from 'motion/react'

const DEFAULT_BAR_RADIUS = 2
const LOADING_BAR_DATA_KEY = 'loading'
const STACK_ID = 'bar-stacked'
const BAR_GROW_DURATION = 0.5
const BAR_STAGGER = 0.05
const BAR_BASELINE_GAP = 3
const REVEAL_EASE: [number, number, number, number] = [0, 0.7, 0.5, 1]

type BarVariant =
  | 'default'
  | 'hatched'
  | 'duotone'
  | 'duotone-reverse'
  | 'gradient'
  | 'stripped'
type StackType = 'default' | 'stacked' | 'percent'
type BarLayout = 'vertical' | 'horizontal'

type BarAnimationType =
  | 'none'
  | 'left-to-right'
  | 'right-to-left'
  | 'center-out'
  | 'edges-in'

type BarChartContextValue = {
  config: ChartConfig
  isStacked: boolean
  isHorizontal: boolean
  isLoading: boolean
  barRadius: number
  animationType: BarAnimationType
  introStartedAt: number
  dataLength: number
  selectedDataKey: string | null
  selectDataKey: (dataKey: string | null) => void
  isMouseInChart: boolean
}

const BarChartContext = createContext<BarChartContextValue | null>(null)

function useBarChart() {
  const context = use(BarChartContext)

  if (!context) {
    throw new Error(
      'Bar chart parts (<Bar />, <XAxis />, …) must be used within <BarChart />'
    )
  }

  return context
}

type ValidateConfigKeys<TData, TConfig> = {
  [K in keyof TConfig]: K extends keyof TData ? ChartConfig[string] : never
}

type BarChartBaseProps<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>
> = {
  config: TConfig & ValidateConfigKeys<TData, TConfig>
  data: TData[]
  children: ReactNode
  className?: string
  chartProps?: ComponentProps<typeof RechartsBarChart>
  stackType?: StackType
  layout?: BarLayout
  barRadius?: number
  animationType?: BarAnimationType
  barGap?: number
  barCategoryGap?: number
  backgroundVariant?: BackgroundVariant
  defaultSelectedDataKey?: string | null
  onSelectionChange?: (selectedDataKey: string | null) => void
  isLoading?: boolean
  loadingBars?: number
  showBrush?: boolean
  xDataKey?: keyof TData & string
  brushHeight?: number
  brushFormatLabel?: (value: unknown, index: number) => string
  onBrushChange?: (range: BrushRange) => void
}

type BarChartProps<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>
> = BarChartBaseProps<TData, TConfig>

export function BarChart<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>
>({
  config,
  data,
  children,
  className,
  chartProps,
  stackType = 'default',
  layout = 'vertical',
  barRadius = DEFAULT_BAR_RADIUS,
  animationType = DEFAULT_CHART_REVEAL_ANIMATION,
  barGap,
  barCategoryGap,
  backgroundVariant,
  defaultSelectedDataKey = null,
  onSelectionChange,
  isLoading = false,
  loadingBars,
  showBrush = false,
  xDataKey,
  brushHeight,
  brushFormatLabel,
  onBrushChange
}: BarChartProps<TData, TConfig>) {
  const chartId = useId().replace(/:/g, '')
  const [introStartedAt] = useState(() => Date.now())
  const [selectedDataKey, setSelectedDataKey] = useState<string | null>(
    defaultSelectedDataKey
  )
  const [isMouseInChart, setIsMouseInChart] = useState(false)
  const loadingData = useLoadingData(loadingBars)
  const { visibleData, brushProps } = useBrush({ data })

  const isStacked = stackType === 'stacked' || stackType === 'percent'
  const isHorizontal = layout === 'horizontal'
  const displayData = showBrush && !isLoading ? visibleData : data

  const selectDataKey = useCallback(
    (newSelectedDataKey: string | null) => {
      setSelectedDataKey(newSelectedDataKey)
      onSelectionChange?.(newSelectedDataKey)
    },
    [onSelectionChange]
  )

  const contextValue = useMemo<BarChartContextValue>(
    () => ({
      config,
      isStacked,
      isHorizontal,
      isLoading,
      barRadius,
      animationType,
      introStartedAt,
      dataLength: displayData.length,
      selectedDataKey,
      selectDataKey,
      isMouseInChart
    }),
    [
      config,
      isStacked,
      isHorizontal,
      isLoading,
      barRadius,
      animationType,
      introStartedAt,
      displayData.length,
      selectedDataKey,
      selectDataKey,
      isMouseInChart
    ]
  )

  return (
    <BarChartContext value={contextValue}>
      <ChartContainer
        className={className}
        config={config}
        footer={
          showBrush &&
          !isLoading && (
            <Brush
              data={data}
              chartConfig={config}
              xDataKey={xDataKey}
              variant="bar"
              barRadius={barRadius}
              height={brushHeight}
              formatLabel={brushFormatLabel}
              stacked={isStacked}
              skipStyle
              className="mt-1"
              {...brushProps}
              onChange={(range) => {
                brushProps.onChange(range)
                onBrushChange?.(range)
              }}
            />
          )
        }
      >
        <LoadingIndicator isLoading={isLoading} />
        <RechartsBarChart
          id={chartId}
          accessibilityLayer
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          data={isLoading ? loadingData : displayData}
          barGap={barGap}
          barCategoryGap={barCategoryGap}
          stackOffset={stackType === 'percent' ? 'expand' : undefined}
          onMouseEnter={() => setIsMouseInChart(true)}
          onMouseLeave={() => setIsMouseInChart(false)}
          {...chartProps}
        >
          {backgroundVariant && <ChartBackground variant={backgroundVariant} />}
          {children}
          {isLoading && <LoadingBar />}
        </RechartsBarChart>
      </ChartContainer>
    </BarChartContext>
  )
}

type BarProps = {
  dataKey: string
  variant?: BarVariant
  radius?: number
  animationType?: BarAnimationType
  isClickable?: boolean
  enableHoverHighlight?: boolean
  glowing?: boolean
  bufferBar?: boolean
  barProps?: ComponentProps<typeof RechartsBar>
}

export function Bar({
  dataKey,
  variant = 'default',
  radius,
  animationType,
  isClickable = false,
  enableHoverHighlight = false,
  glowing = false,
  bufferBar = false,
  barProps
}: BarProps) {
  const {
    config,
    isStacked,
    isHorizontal,
    isLoading,
    barRadius: defaultRadius,
    animationType: defaultAnimation,
    introStartedAt,
    dataLength,
    selectedDataKey,
    selectDataKey,
    isMouseInChart
  } = useBarChart()
  const id = useId().replace(/:/g, '')

  const shouldReduceMotion = useReducedMotion()

  if (isLoading) return null

  const resolvedRadius = radius ?? defaultRadius
  const isSelected = selectedDataKey === dataKey

  const revealType: BarAnimationType = shouldReduceMotion
    ? 'none'
    : (animationType ?? defaultAnimation)

  const customBarProps = {
    id,
    dataKey,
    variant,
    barRadius: resolvedRadius,
    glowing,
    bufferBar,
    isClickable,
    enableHoverHighlight,
    isMouseInChart,
    isHorizontal,
    introStartedAt,
    selectedDataKey,
    dataLength,
    onClick: () => {
      if (!isClickable) return
      selectDataKey(isSelected ? null : dataKey)
    }
  }

  return (
    <>
      <RechartsBar
        dataKey={dataKey}
        stackId={isStacked ? STACK_ID : undefined}
        fill={`url(#${id}-colors-${dataKey})`}
        radius={resolvedRadius}
        isAnimationActive={false}
        style={
          isClickable || enableHoverHighlight
            ? { cursor: 'pointer' }
            : undefined
        }
        shape={(props: unknown) => (
          <CustomBar
            {...(props as BarShapeProps)}
            {...customBarProps}
            animationType={revealType}
          />
        )}
        activeBar={(props: unknown) => (
          <CustomBar
            {...(props as BarShapeProps)}
            {...customBarProps}
            animationType="none"
          />
        )}
        {...barProps}
      />
      <defs>
        <ColorGradient id={id} dataKey={dataKey} config={config} />
        {variant === 'hatched' && <HatchedPattern id={id} dataKey={dataKey} />}
        {variant === 'duotone' && (
          <DuotonePattern id={id} dataKey={dataKey} config={config} />
        )}
        {variant === 'duotone-reverse' && (
          <DuotoneReversePattern id={id} dataKey={dataKey} config={config} />
        )}
        {variant === 'gradient' && (
          <GradientPattern id={id} dataKey={dataKey} />
        )}
        {variant === 'stripped' && (
          <StrippedPattern id={id} dataKey={dataKey} />
        )}
        {bufferBar && <BufferHatchedPattern id={id} dataKey={dataKey} />}
        {glowing && <GlowFilter id={id} dataKey={dataKey} />}
      </defs>
    </>
  )
}

type XAxisProps = ComponentProps<typeof RechartsXAxis>

export function XAxis({
  tickLine = false,
  axisLine = false,
  tickMargin = 8,
  minTickGap = 8,
  type,
  ...props
}: XAxisProps) {
  const { isLoading, isHorizontal } = useBarChart()

  if (isLoading) return null

  return (
    <RechartsXAxis
      tickLine={tickLine}
      axisLine={axisLine}
      tickMargin={tickMargin}
      minTickGap={minTickGap}
      type={type ?? (isHorizontal ? 'number' : 'category')}
      {...props}
    />
  )
}

type YAxisProps = ComponentProps<typeof RechartsYAxis>

export function YAxis({
  tickLine = false,
  axisLine = false,
  tickMargin = 8,
  minTickGap = 8,
  width = 'auto',
  type,
  ...props
}: YAxisProps) {
  const { isLoading, isHorizontal } = useBarChart()

  if (isLoading) return null

  return (
    <RechartsYAxis
      tickLine={tickLine}
      axisLine={axisLine}
      tickMargin={tickMargin}
      minTickGap={minTickGap}
      width={width}
      type={type ?? (isHorizontal ? 'category' : 'number')}
      {...props}
    />
  )
}

type GridProps = ComponentProps<typeof CartesianGrid>

export function Grid({
  strokeDasharray = '3 3',
  vertical,
  horizontal,
  ...props
}: GridProps) {
  const { isHorizontal } = useBarChart()

  return (
    <CartesianGrid
      strokeDasharray={strokeDasharray}
      vertical={vertical ?? isHorizontal}
      horizontal={horizontal ?? !isHorizontal}
      {...props}
    />
  )
}

type TooltipProps = {
  defaultIndex?: number
}

export function Tooltip({ defaultIndex }: TooltipProps) {
  const { isLoading, selectedDataKey } = useBarChart()

  if (isLoading) return null

  return (
    <ChartTooltip
      cursor={false}
      defaultIndex={defaultIndex}
      content={<ChartTooltipContent selected={selectedDataKey} />}
    />
  )
}

type LegendProps = {
  variant?: ChartLegendVariant
  align?: 'left' | 'center' | 'right'
  verticalAlign?: 'top' | 'middle' | 'bottom'
  isClickable?: boolean
}

export function Legend({
  variant,
  align = 'right',
  verticalAlign = 'top',
  isClickable = false
}: LegendProps) {
  const { selectedDataKey, selectDataKey } = useBarChart()

  return (
    <ChartLegend
      verticalAlign={verticalAlign}
      align={align}
      content={
        <ChartLegendContent
          selected={selectedDataKey}
          onSelectChange={selectDataKey}
          isClickable={isClickable}
          variant={variant}
        />
      }
    />
  )
}

type BarShapeProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string
  fillOpacity?: number
  dataKey?: string
  index?: number
  [key: string]: unknown
}

type CustomBarProps = {
  id: string
  dataKey: string
  variant: BarVariant
  barRadius: number
  glowing?: boolean
  bufferBar?: boolean
  isClickable?: boolean
  enableHoverHighlight?: boolean
  isMouseInChart?: boolean
  isHorizontal?: boolean
  animationType?: BarAnimationType
  introStartedAt?: number
  selectedDataKey?: string | null
  isActive?: boolean
  dataLength?: number
  onClick?: () => void
} & BarShapeProps

const CustomBar = (props: CustomBarProps) => {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    id,
    dataKey,
    variant,
    barRadius,
    glowing,
    bufferBar,
    isClickable,
    enableHoverHighlight,
    isMouseInChart,
    isHorizontal = false,
    animationType = 'none',
    introStartedAt = 0,
    selectedDataKey,
    isActive,
    dataLength = 0,
    onClick
  } = props

  const index = typeof props.index === 'number' ? props.index : -1
  const isLastBar = bufferBar && dataLength > 0 && index === dataLength - 1
  const isStripped = variant === 'stripped'
  const grow = getBarGrowAnimation(
    animationType,
    index,
    dataLength,
    isHorizontal,
    introStartedAt
  )

  const fill = isLastBar
    ? `url(#${id}-buffer-hatched-${dataKey})`
    : getVariantFill(variant, id, dataKey)
  const filter = glowing ? `url(#${id}-bar-glow-${dataKey})` : undefined

  const fillOpacity = getBarOpacity({
    isClickable,
    selectedDataKey,
    dataKey,
    enableHoverHighlight,
    isMouseInChart,
    isActive
  })
  const cursorStyle =
    isClickable || enableHoverHighlight ? { cursor: 'pointer' } : undefined

  // Trim the baseline end of the bar (bottom, or left for horizontal bars) to
  // leave a gap between stacked segments; skip it when the bar is too short.
  const length = isHorizontal ? width : height
  const gap = length > BAR_BASELINE_GAP * 2 ? BAR_BASELINE_GAP : 0
  // Stripped bars square off the end touching the cap strip.
  const radius: RectRadius = !isStripped
    ? barRadius
    : isHorizontal
      ? [0, barRadius, barRadius, 0]
      : [barRadius, barRadius, 0, 0]

  const visibleBar = (
    <>
      <Rectangle
        x={isHorizontal ? x + gap : x}
        y={y}
        width={isHorizontal ? width - gap : width}
        height={isHorizontal ? height : height - gap}
        opacity={fillOpacity}
        radius={radius}
        fill={fill}
        filter={filter}
        stroke={isLastBar ? `url(#${id}-colors-${dataKey})` : undefined}
        strokeWidth={isLastBar ? 1 : undefined}
      />
      {isStripped && (
        <Rectangle
          x={isHorizontal ? x + width + 2 : x}
          y={isHorizontal ? y : y - 4}
          width={isHorizontal ? 2 : width}
          height={isHorizontal ? height : 2}
          radius={1}
          fill={`url(#${id}-colors-${dataKey})`}
        />
      )}
    </>
  )

  return (
    <g style={cursorStyle} onClick={onClick}>
      {/* Full-height invisible rect keeps the whole column hoverable/clickable */}
      <Rectangle {...props} fill="transparent" />
      {/* The painted bar grows in from its baseline; the hit rect above stays put */}
      {grow ? (
        <motion.g
          initial={grow.initial}
          animate={grow.animate}
          transition={grow.transition}
          style={grow.style}
        >
          {visibleBar}
        </motion.g>
      ) : (
        visibleBar
      )}
    </g>
  )
}

const getBarGrowAnimation = (
  animationType: BarAnimationType,
  index: number,
  dataLength: number,
  isHorizontal: boolean,
  introStartedAt: number
) => {
  if (animationType === 'none' || index < 0 || dataLength <= 0) return null

  const lastIndex = dataLength - 1
  const center = lastIndex / 2

  let step: number
  switch (animationType) {
    case 'right-to-left':
      step = lastIndex - index
      break
    case 'center-out':
      step = Math.abs(index - center)
      break
    case 'edges-in':
      step = center - Math.abs(index - center)
      break
    default:
      step = index
  }

  const startMs = step * BAR_STAGGER * 1000
  const durationMs = BAR_GROW_DURATION * 1000
  const endMs = startMs + durationMs
  const elapsed = Date.now() - introStartedAt

  if (elapsed >= endMs) return null

  const from = elapsed <= startMs ? 0 : (elapsed - startMs) / durationMs
  const transition = {
    duration: (endMs - Math.max(elapsed, startMs)) / 1000,
    ease: REVEAL_EASE,
    delay: Math.max(0, startMs - elapsed) / 1000
  }

  return isHorizontal
    ? {
        initial: { scaleX: from },
        animate: { scaleX: 1 },
        transition,
        style: { originX: 0 }
      }
    : {
        initial: { scaleY: from },
        animate: { scaleY: 1 },
        transition,
        style: { originY: 1 }
      }
}

const getVariantFill = (
  variant: BarVariant,
  id: string,
  dataKey: string
): string => {
  switch (variant) {
    case 'hatched':
      return `url(#${id}-hatched-${dataKey})`
    case 'duotone':
      return `url(#${id}-duotone-${dataKey})`
    case 'duotone-reverse':
      return `url(#${id}-duotone-reverse-${dataKey})`
    case 'gradient':
      return `url(#${id}-gradient-${dataKey})`
    case 'stripped':
      return `url(#${id}-stripped-${dataKey})`
    default:
      return `url(#${id}-colors-${dataKey})`
  }
}

const getBarOpacity = ({
  isClickable,
  selectedDataKey,
  dataKey,
  enableHoverHighlight,
  isMouseInChart,
  isActive
}: {
  isClickable?: boolean
  selectedDataKey?: string | null
  dataKey: string
  enableHoverHighlight?: boolean
  isMouseInChart?: boolean
  isActive?: boolean
}) => {
  const isSelectedDataKey =
    selectedDataKey === null || selectedDataKey === dataKey
  const clickOpacity =
    isClickable && selectedDataKey !== null ? (isSelectedDataKey ? 1 : 0.3) : 1

  if (enableHoverHighlight && isMouseInChart) {
    return isActive ? clickOpacity : clickOpacity * 0.3
  }

  return clickOpacity
}

type StyleProps = {
  id: string
  dataKey: string
}

const ColorGradient = ({
  id,
  dataKey,
  config
}: StyleProps & { config: ChartConfig }) => {
  const colorsCount = getColorsCount(config[dataKey] ?? {})

  return (
    <linearGradient id={`${id}-colors-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
      {colorsCount === 1 ? (
        <>
          <stop offset="0%" stopColor={`var(--color-${dataKey}-0)`} />
          <stop offset="100%" stopColor={`var(--color-${dataKey}-0)`} />
        </>
      ) : (
        Array.from({ length: colorsCount }, (_, index) => {
          const offset = `${(index / (colorsCount - 1)) * 100}%`
          return (
            <stop
              key={offset}
              offset={offset}
              stopColor={`var(--color-${dataKey}-${index}, var(--color-${dataKey}-0))`}
            />
          )
        })
      )}
    </linearGradient>
  )
}

/** Diagonal hatched-stripe fill, masked from the series color gradient. */
const HatchedPattern = ({ id, dataKey }: StyleProps) => {
  return (
    <>
      <pattern
        id={`${id}-hatched-mask-pattern`}
        x="0"
        y="0"
        width="5"
        height="5"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-45)"
      >
        <rect width="5" height="5" fill="white" fillOpacity={0.3} />
        <rect width="1.5" height="5" fill="white" fillOpacity={1} />
      </pattern>
      <mask id={`${id}-hatched-mask-${dataKey}`}>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-hatched-mask-pattern)`}
        />
      </mask>
      <pattern
        id={`${id}-hatched-${dataKey}`}
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-colors-${dataKey})`}
          mask={`url(#${id}-hatched-mask-${dataKey})`}
        />
      </pattern>
    </>
  )
}

/** Hatched diagonal lines with no background fill, used for the buffer bar. */
const BufferHatchedPattern = ({ id, dataKey }: StyleProps) => {
  return (
    <>
      <pattern
        id={`${id}-buffer-hatched-mask-pattern`}
        x="0"
        y="0"
        width="5"
        height="5"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-45)"
      >
        <rect width="5" height="5" fill="black" fillOpacity={0} />
        <rect width="1" height="5" fill="white" fillOpacity={1} />
      </pattern>
      <mask id={`${id}-buffer-hatched-mask-${dataKey}`}>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-buffer-hatched-mask-pattern)`}
        />
      </mask>
      <pattern
        id={`${id}-buffer-hatched-${dataKey}`}
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-colors-${dataKey})`}
          mask={`url(#${id}-buffer-hatched-mask-${dataKey})`}
        />
      </pattern>
    </>
  )
}

/** Two-tone fill — a half-faded, half-solid split applied per bar bounding box. */
const DuotonePattern = ({
  id,
  dataKey,
  config
}: StyleProps & { config: ChartConfig }) => {
  const colorsCount = getColorsCount(config[dataKey] ?? {})

  return (
    <>
      <linearGradient
        id={`${id}-duotone-mask-gradient-${dataKey}`}
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
      >
        <stop offset="50%" stopColor="white" stopOpacity={0.4} />
        <stop offset="50%" stopColor="white" stopOpacity={1} />
      </linearGradient>
      <linearGradient
        id={`${id}-duotone-colors-${dataKey}`}
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        {colorsCount === 1 ? (
          <>
            <stop offset="0%" stopColor={`var(--color-${dataKey}-0)`} />
            <stop offset="100%" stopColor={`var(--color-${dataKey}-0)`} />
          </>
        ) : (
          Array.from({ length: colorsCount }, (_, index) => {
            const offset = `${(index / (colorsCount - 1)) * 100}%`
            return (
              <stop
                key={offset}
                offset={offset}
                stopColor={`var(--color-${dataKey}-${index}, var(--color-${dataKey}-0))`}
              />
            )
          })
        )}
      </linearGradient>
      <mask
        id={`${id}-duotone-mask-${dataKey}`}
        maskContentUnits="objectBoundingBox"
      >
        <rect
          x="0"
          y="0"
          width="1"
          height="1"
          fill={`url(#${id}-duotone-mask-gradient-${dataKey})`}
        />
      </mask>
      <pattern
        id={`${id}-duotone-${dataKey}`}
        patternUnits="objectBoundingBox"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <rect
          x="0"
          y="0"
          width="1"
          height="1"
          fill={`url(#${id}-duotone-colors-${dataKey})`}
          mask={`url(#${id}-duotone-mask-${dataKey})`}
        />
      </pattern>
    </>
  )
}

/** Two-tone fill with the solid and faded halves reversed from `duotone`. */
const DuotoneReversePattern = ({
  id,
  dataKey,
  config
}: StyleProps & { config: ChartConfig }) => {
  const colorsCount = getColorsCount(config[dataKey] ?? {})

  return (
    <>
      <linearGradient
        id={`${id}-duotone-reverse-mask-gradient-${dataKey}`}
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
      >
        <stop offset="50%" stopColor="white" stopOpacity={1} />
        <stop offset="50%" stopColor="white" stopOpacity={0.4} />
      </linearGradient>
      <linearGradient
        id={`${id}-duotone-reverse-colors-${dataKey}`}
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        {colorsCount === 1 ? (
          <>
            <stop offset="0%" stopColor={`var(--color-${dataKey}-0)`} />
            <stop offset="100%" stopColor={`var(--color-${dataKey}-0)`} />
          </>
        ) : (
          Array.from({ length: colorsCount }, (_, index) => {
            const offset = `${(index / (colorsCount - 1)) * 100}%`
            return (
              <stop
                key={offset}
                offset={offset}
                stopColor={`var(--color-${dataKey}-${index}, var(--color-${dataKey}-0))`}
              />
            )
          })
        )}
      </linearGradient>
      <mask
        id={`${id}-duotone-reverse-mask-${dataKey}`}
        maskContentUnits="objectBoundingBox"
      >
        <rect
          x="0"
          y="0"
          width="1"
          height="1"
          fill={`url(#${id}-duotone-reverse-mask-gradient-${dataKey})`}
        />
      </mask>
      <pattern
        id={`${id}-duotone-reverse-${dataKey}`}
        patternUnits="objectBoundingBox"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <rect
          x="0"
          y="0"
          width="1"
          height="1"
          fill={`url(#${id}-duotone-reverse-colors-${dataKey})`}
          mask={`url(#${id}-duotone-reverse-mask-${dataKey})`}
        />
      </pattern>
    </>
  )
}

/** Gradient fill that fades the series color from solid at the top to clear. */
const GradientPattern = ({ id, dataKey }: StyleProps) => {
  return (
    <>
      <linearGradient
        id={`${id}-gradient-mask-gradient`}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop offset="20%" stopColor="white" stopOpacity={1} />
        <stop offset="90%" stopColor="white" stopOpacity={0} />
      </linearGradient>
      <mask id={`${id}-gradient-mask-${dataKey}`}>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-gradient-mask-gradient)`}
        />
      </mask>
      <pattern
        id={`${id}-gradient-${dataKey}`}
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-colors-${dataKey})`}
          mask={`url(#${id}-gradient-mask-${dataKey})`}
        />
      </pattern>
    </>
  )
}

/** Low-opacity body fill, paired with a solid top strip drawn by CustomBar. */
const StrippedPattern = ({ id, dataKey }: StyleProps) => {
  return (
    <>
      <linearGradient
        id={`${id}-stripped-mask-gradient`}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop offset="0%" stopColor="white" stopOpacity={0.2} />
        <stop offset="100%" stopColor="white" stopOpacity={0.2} />
      </linearGradient>
      <mask id={`${id}-stripped-mask-${dataKey}`}>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-stripped-mask-gradient)`}
        />
      </mask>
      <pattern
        id={`${id}-stripped-${dataKey}`}
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-colors-${dataKey})`}
          mask={`url(#${id}-stripped-mask-${dataKey})`}
        />
      </pattern>
    </>
  )
}

/** Soft outer-glow filter applied to a glowing bar. */
const GlowFilter = ({ id, dataKey }: StyleProps) => {
  return (
    <filter
      id={`${id}-bar-glow-${dataKey}`}
      x="-100%"
      y="-100%"
      width="300%"
      height="300%"
    >
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.5 0"
        result="glow"
      />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  )
}

export function useLoadingData(loadingBars: number = 12) {
  return useMemo(() => getLoadingData(loadingBars, 20, 80), [loadingBars])
}

const LoadingBar = () => (
  <RechartsBar
    dataKey={LOADING_BAR_DATA_KEY}
    fill="currentColor"
    fillOpacity={0.12}
    radius={DEFAULT_BAR_RADIUS}
    isAnimationActive={false}
    legendType="none"
  />
)
