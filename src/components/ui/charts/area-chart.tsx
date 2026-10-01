import {
  Children,
  createContext,
  isValidElement,
  use,
  useCallback,
  useId,
  useMemo,
  useState,
  type ComponentProps,
  type FC,
  type ReactElement,
  type ReactNode
} from 'react'
import {
  axisValueToPercentFormatter,
  type ChartConfig,
  ChartContainer,
  DEFAULT_CHART_REVEAL_ANIMATION,
  getColorsCount,
  getLoadingData,
  LoadingIndicator
} from '#/components/ui/charts/chart'
import {
  Area as RechartsArea,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis
} from 'recharts'
import {
  ChartTooltip,
  ChartTooltipContent
} from '#/components/ui/charts/tooltip'
import {
  ChartLegend,
  ChartLegendContent,
  type ChartLegendVariant
} from '#/components/ui/charts/legend'
import { Brush, useBrush, type BrushRange } from '#/components/ui/charts/brush'
import { ChartDot, type DotVariant } from '#/components/ui/charts/dot'
import { motion, useReducedMotion } from 'motion/react'

const STROKE_WIDTH = 0.8
const LOADING_AREA_DATA_KEY = 'loading'
const STACK_ID = 'area-stacked'
const REVEAL_DURATION = 1
const REVEAL_EASE: [number, number, number, number] = [0, 0.7, 0.5, 1]

type CurveType = ComponentProps<typeof RechartsArea>['type']
type AreaDotProp = ComponentProps<typeof RechartsArea>['dot']
type AreaActiveDotProp = ComponentProps<typeof RechartsArea>['activeDot']
type AreaVariant =
  | 'gradient'
  | 'gradient-reverse'
  | 'solid'
  | 'dotted'
  | 'lines'
  | 'hatched'
type StrokeVariant = 'solid' | 'dashed'
type StackType = 'default' | 'expanded' | 'stacked'

type AreaAnimationType =
  | 'none'
  | 'left-to-right'
  | 'right-to-left'
  | 'center-out'
  | 'edges-in'
type RevealAnimationType = Exclude<AreaAnimationType, 'none'>

type AreaChartContextValue = {
  config: ChartConfig
  curveType: CurveType
  animationType: AreaAnimationType
  isStacked: boolean
  isExpanded: boolean
  isLoading: boolean
  selectedDataKey: string | null
  selectDataKey: (dataKey: string | null) => void
}

const AreaChartContext = createContext<AreaChartContextValue | null>(null)

function useAreaChart() {
  const context = use(AreaChartContext)

  if (!context) {
    throw new Error(
      'Area chart parts (<Area />, <XAxis />, …) must be used within <AreaChart />'
    )
  }

  return context
}

type ValidateConfigKeys<TData, TConfig> = {
  [K in keyof TConfig]: K extends keyof TData ? ChartConfig[string] : never
}

type AreaChartBaseProps<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>
> = {
  config: TConfig & ValidateConfigKeys<TData, TConfig>
  data: TData[]
  children: ReactNode
  className?: string
  chartProps?: ComponentProps<typeof RechartsAreaChart>
  curveType?: CurveType
  animationType?: AreaAnimationType
  stackType?: StackType
  defaultSelectedDataKey?: string | null
  onSelectionChange?: (selectedDataKey: string | null) => void
  isLoading?: boolean
  loadingPoints?: number
  showBrush?: boolean
  xDataKey?: keyof TData & string
  brushHeight?: number
  brushFormatLabel?: (value: unknown, index: number) => string
  onBrushChange?: (range: BrushRange) => void
}

type AreaChartProps<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>
> = AreaChartBaseProps<TData, TConfig>

export function AreaChart<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>
>({
  config,
  data,
  children,
  className,
  chartProps,
  curveType = 'linear',
  animationType = DEFAULT_CHART_REVEAL_ANIMATION,
  stackType = 'default',
  defaultSelectedDataKey = null,
  onSelectionChange,
  isLoading = false,
  loadingPoints,
  showBrush = false,
  xDataKey,
  brushHeight,
  brushFormatLabel,
  onBrushChange
}: AreaChartProps<TData, TConfig>) {
  const chartId = useId().replace(/:/g, '')
  const [selectedDataKey, setSelectedDataKey] = useState<string | null>(
    defaultSelectedDataKey
  )
  const loadingData = useLoadingData(loadingPoints)
  const { visibleData, brushProps } = useBrush({ data })

  const isExpanded = stackType === 'expanded'
  const isStacked = stackType === 'stacked' || isExpanded
  const displayData = showBrush && !isLoading ? visibleData : data

  const selectDataKey = useCallback(
    (newSelectedDataKey: string | null) => {
      setSelectedDataKey(newSelectedDataKey)
      onSelectionChange?.(newSelectedDataKey)
    },
    [onSelectionChange]
  )

  const contextValue = useMemo<AreaChartContextValue>(
    () => ({
      config,
      curveType,
      animationType,
      isStacked,
      isExpanded,
      isLoading,
      selectedDataKey,
      selectDataKey
    }),
    [
      config,
      curveType,
      animationType,
      isStacked,
      isExpanded,
      isLoading,
      selectedDataKey,
      selectDataKey
    ]
  )

  return (
    <AreaChartContext value={contextValue}>
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
              variant="area"
              curveType={curveType}
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
        <RechartsAreaChart
          id={chartId}
          accessibilityLayer
          stackOffset={isExpanded ? 'expand' : undefined}
          data={isLoading ? loadingData : displayData}
          {...chartProps}
        >
          {children}
          {isLoading && <LoadingArea curveType={curveType} />}
        </RechartsAreaChart>
      </ChartContainer>
    </AreaChartContext>
  )
}

type AreaProps = {
  dataKey: string
  variant?: AreaVariant
  strokeVariant?: StrokeVariant
  curveType?: CurveType
  animationType?: AreaAnimationType
  connectNulls?: boolean
  isClickable?: boolean
  children?: ReactNode
  areaProps?: ComponentProps<typeof RechartsArea>
}

export function Area({
  dataKey,
  variant = 'gradient',
  strokeVariant = 'solid',
  curveType,
  animationType,
  connectNulls = false,
  isClickable = false,
  children,
  areaProps
}: AreaProps) {
  const {
    config,
    curveType: defaultCurve,
    animationType: defaultAnimation,
    isStacked,
    isExpanded,
    isLoading,
    selectedDataKey,
    selectDataKey
  } = useAreaChart()
  const id = useId().replace(/:/g, '')
  const shouldReduceMotion = useReducedMotion()

  if (isLoading) return null

  const resolvedCurve = curveType ?? defaultCurve

  const revealType: AreaAnimationType = shouldReduceMotion
    ? 'none'
    : (animationType ?? defaultAnimation)
  const maskId = revealType === 'none' ? undefined : `${id}-reveal-mask`

  const isSelected = selectedDataKey === dataKey
  const hasSelection = selectedDataKey !== null
  const opacity = getOpacity(selectedDataKey, dataKey)
  const showUnselected = hasSelection && !isSelected

  const { dot, activeDot } = resolveDots(
    children,
    id,
    dataKey,
    opacity.dot,
    maskId
  )

  const isDashed = strokeVariant === 'dashed'

  return (
    <>
      <RechartsArea
        type={resolvedCurve}
        dataKey={dataKey}
        connectNulls={connectNulls}
        fillOpacity={opacity.fill}
        strokeOpacity={opacity.stroke}
        fill={getFillPattern(variant, showUnselected, id)}
        stroke={`url(#${id}-colors-${dataKey})`}
        stackId={isStacked ? STACK_ID : undefined}
        dot={dot}
        activeDot={activeDot}
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={isDashed ? '3 3' : undefined}
        isAnimationActive={false}
        style={{
          ...(maskId ? { mask: `url(#${maskId})` } : {}),
          ...(isClickable ? { cursor: 'pointer' } : {})
        }}
        onClick={() => {
          if (!isClickable) return
          selectDataKey(isSelected ? null : dataKey)
        }}
        {...areaProps}
      />
      <defs>
        {revealType !== 'none' && <RevealMask id={id} type={revealType} />}
        <ColorGradient
          id={id}
          dataKey={dataKey}
          config={config}
          isExpanded={isExpanded}
        />
        {variant === 'gradient' && (
          <GradientPattern id={id} dataKey={dataKey} />
        )}
        {variant === 'gradient-reverse' && (
          <ReverseGradientPattern id={id} dataKey={dataKey} />
        )}
        {variant === 'solid' && <SolidPattern id={id} dataKey={dataKey} />}
        {variant === 'dotted' && <DottedPattern id={id} dataKey={dataKey} />}
        {variant === 'lines' && <LinesPattern id={id} dataKey={dataKey} />}
        {variant === 'hatched' && <HatchedPattern id={id} dataKey={dataKey} />}
        {showUnselected && <UnselectedPattern id={id} dataKey={dataKey} />}
      </defs>
    </>
  )
}

type DotProps = {
  variant?: DotVariant
}

export const Dot: FC<DotProps> = () => null

export const ActiveDot: FC<DotProps> = () => null

type XAxisProps = ComponentProps<typeof RechartsXAxis>

export function XAxis({
  tickLine = false,
  axisLine = false,
  tickMargin = 8,
  minTickGap = 8,
  ...props
}: XAxisProps) {
  const { isLoading } = useAreaChart()

  if (isLoading) return null

  return (
    <RechartsXAxis
      tickLine={tickLine}
      axisLine={axisLine}
      tickMargin={tickMargin}
      minTickGap={minTickGap}
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
  tickFormatter,
  ...props
}: YAxisProps) {
  const { isLoading, isExpanded } = useAreaChart()

  if (isLoading) return null

  return (
    <RechartsYAxis
      tickLine={tickLine}
      axisLine={axisLine}
      tickMargin={tickMargin}
      minTickGap={minTickGap}
      width={width}
      tickFormatter={isExpanded ? axisValueToPercentFormatter : tickFormatter}
      {...props}
    />
  )
}

type GridProps = ComponentProps<typeof CartesianGrid>

export function Grid({
  vertical = false,
  strokeDasharray = '3 3',
  ...props
}: GridProps) {
  return (
    <CartesianGrid
      vertical={vertical}
      strokeDasharray={strokeDasharray}
      {...props}
    />
  )
}

type TooltipProps = {
  defaultIndex?: number
  cursor?: boolean
}

export function Tooltip({ defaultIndex, cursor = true }: TooltipProps) {
  const { isLoading, selectedDataKey } = useAreaChart()

  if (isLoading) return null

  return (
    <ChartTooltip
      defaultIndex={defaultIndex}
      cursor={
        cursor ? { strokeDasharray: '3 3', strokeWidth: STROKE_WIDTH } : false
      }
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
  const { selectedDataKey, selectDataKey } = useAreaChart()

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

const getOpacity = (selectedDataKey: string | null, dataKey: string) => {
  if (selectedDataKey === null) {
    return { fill: 0.8, stroke: 0.8, dot: 1 }
  }

  return selectedDataKey === dataKey
    ? { fill: 0.8, stroke: 0.8, dot: 1 }
    : { fill: 0.2, stroke: 0.3, dot: 0.3 }
}

const getFillPattern = (
  variant: AreaVariant,
  showUnselected: boolean,
  id: string
): string => {
  if (showUnselected) return `url(#${id}-unselected)`

  return `url(#${id}-${variant})`
}

const resolveDots = (
  children: ReactNode,
  id: string,
  dataKey: string,
  dotOpacity: number,
  maskId: string | undefined
): { dot: AreaDotProp; activeDot: AreaActiveDotProp } => {
  let dot: AreaDotProp = false
  let activeDot: AreaActiveDotProp = false

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return

    if (child.type === Dot) {
      const { variant } = (child as ReactElement<DotProps>).props
      dot = (
        <ChartDot
          type={variant}
          dataKey={dataKey}
          chartId={id}
          fillOpacity={dotOpacity}
          maskId={maskId}
        />
      )
    }

    if (child.type === ActiveDot) {
      const { variant } = (child as ReactElement<DotProps>).props
      activeDot = (
        <ChartDot
          type={variant}
          dataKey={dataKey}
          chartId={id}
          fillOpacity={dotOpacity}
        />
      )
    }
  })

  return { dot, activeDot }
}

type StyleProps = {
  id: string
  dataKey: string
}

const SINGLE_REVEAL_ORIGIN: Record<
  Exclude<RevealAnimationType, 'edges-in'>,
  number
> = {
  'left-to-right': 0,
  'right-to-left': 1,
  'center-out': 0.5
}

const RevealMask = ({
  id,
  type
}: {
  id: string
  type: RevealAnimationType
}) => {
  const reveal = {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE }
  }

  return (
    <mask
      id={`${id}-reveal-mask`}
      maskUnits="userSpaceOnUse"
      maskContentUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="100%"
      height="100%"
    >
      {type === 'edges-in' ? (
        <>
          <motion.rect
            {...reveal}
            x="0"
            y="0"
            width="50%"
            height="100%"
            fill="white"
            style={{ originX: 0 }}
          />
          <motion.rect
            {...reveal}
            x="50%"
            y="0"
            width="50%"
            height="100%"
            fill="white"
            style={{ originX: 1 }}
          />
        </>
      ) : (
        <motion.rect
          {...reveal}
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="white"
          style={{ originX: SINGLE_REVEAL_ORIGIN[type] }}
        />
      )}
    </mask>
  )
}

const ColorGradient = ({
  id,
  dataKey,
  config,
  isExpanded
}: StyleProps & { config: ChartConfig; isExpanded: boolean }) => {
  const colorsCount = getColorsCount(config[dataKey] ?? {})

  return (
    <linearGradient
      id={`${id}-colors-${dataKey}`}
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
      gradientUnits={isExpanded ? 'userSpaceOnUse' : 'objectBoundingBox'}
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
  )
}

const GradientPattern = ({ id, dataKey }: StyleProps) => {
  return (
    <>
      <linearGradient id={`${id}-vertical-fade`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity={0.1} />
        <stop offset="100%" stopColor="white" stopOpacity={0} />
      </linearGradient>
      <mask id={`${id}-gradient-mask`}>
        <rect width="100%" height="100%" fill={`url(#${id}-vertical-fade)`} />
      </mask>
      <pattern
        id={`${id}-gradient`}
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-colors-${dataKey})`}
          mask={`url(#${id}-gradient-mask)`}
        />
      </pattern>
    </>
  )
}

const ReverseGradientPattern = ({ id, dataKey }: StyleProps) => {
  return (
    <>
      <linearGradient
        id={`${id}-vertical-fade-reverse`}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop offset="0%" stopColor="white" stopOpacity={0} />
        <stop offset="100%" stopColor="white" stopOpacity={0.1} />
      </linearGradient>
      <mask id={`${id}-gradient-reverse-mask`}>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-vertical-fade-reverse)`}
        />
      </mask>
      <pattern
        id={`${id}-gradient-reverse`}
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-colors-${dataKey})`}
          mask={`url(#${id}-gradient-reverse-mask)`}
        />
      </pattern>
    </>
  )
}

const SolidPattern = ({ id, dataKey }: StyleProps) => {
  return (
    <>
      <linearGradient id={`${id}-solid-fade`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity={0.1} />
        <stop offset="100%" stopColor="white" stopOpacity={0.1} />
      </linearGradient>
      <mask id={`${id}-solid-mask`}>
        <rect width="100%" height="100%" fill={`url(#${id}-solid-fade)`} />
      </mask>
      <pattern
        id={`${id}-solid`}
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-colors-${dataKey})`}
          mask={`url(#${id}-solid-mask)`}
        />
      </pattern>
    </>
  )
}

const LinesPattern = ({ id, dataKey }: StyleProps) => {
  return (
    <>
      <pattern
        id={`${id}-lines-texture`}
        patternUnits="userSpaceOnUse"
        width="5"
        height="5"
        patternTransform="rotate(45)"
      >
        <line x1="0" y1="0" x2="0" y2="5" stroke="white" strokeWidth="1" />
      </pattern>
      <mask id={`${id}-lines-mask`}>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-lines-texture)`}
          fillOpacity="0.3"
        />
      </mask>
      <pattern
        id={`${id}-lines`}
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-colors-${dataKey})`}
          mask={`url(#${id}-lines-mask)`}
        />
      </pattern>
    </>
  )
}

const DottedPattern = ({ id, dataKey }: StyleProps) => {
  return (
    <>
      <pattern
        id={`${id}-dotted-texture`}
        x="0"
        y="0"
        width="6"
        height="6"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="4" cy="4" r="0.5" fill="white" />
      </pattern>
      <mask id={`${id}-dotted-mask`}>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-dotted-texture)`}
          fillOpacity="0.5"
        />
      </mask>
      <pattern
        id={`${id}-dotted`}
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-colors-${dataKey})`}
          mask={`url(#${id}-dotted-mask)`}
        />
      </pattern>
    </>
  )
}

const HatchedPattern = ({ id, dataKey }: StyleProps) => {
  return (
    <>
      <linearGradient id={`${id}-hatched-stripe`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="50%" stopColor="white" stopOpacity={0.2} />
        <stop offset="50%" stopColor="white" stopOpacity={1} />
      </linearGradient>
      <pattern
        id={`${id}-hatched-texture`}
        x="0"
        y="0"
        width="20"
        height="10"
        patternUnits="userSpaceOnUse"
        overflow="visible"
        patternTransform="rotate(20)"
      >
        <rect width="20" height="10" fill={`url(#${id}-hatched-stripe)`} />
      </pattern>
      <mask id={`${id}-hatched-mask`}>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-hatched-texture)`}
          fillOpacity="0.2"
        />
      </mask>
      <pattern
        id={`${id}-hatched`}
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-colors-${dataKey})`}
          mask={`url(#${id}-hatched-mask)`}
        />
      </pattern>
    </>
  )
}

const UnselectedPattern = ({ id, dataKey }: StyleProps) => {
  return (
    <>
      <pattern
        id={`${id}-unselected-texture`}
        patternUnits="userSpaceOnUse"
        width="5"
        height="5"
        patternTransform="rotate(45)"
      >
        <line x1="0" y1="0" x2="0" y2="5" stroke="white" strokeWidth="1" />
      </pattern>
      <mask id={`${id}-unselected-mask`}>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-unselected-texture)`}
          fillOpacity="0.3"
        />
      </mask>
      <pattern
        id={`${id}-unselected`}
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-colors-${dataKey})`}
          mask={`url(#${id}-unselected-mask)`}
        />
      </pattern>
    </>
  )
}

export function useLoadingData(loadingPoints: number = 14) {
  return useMemo(() => getLoadingData(loadingPoints), [loadingPoints])
}

const LoadingArea = ({ curveType }: { curveType: CurveType }) => (
  <RechartsArea
    type={curveType}
    dataKey={LOADING_AREA_DATA_KEY}
    fillOpacity={0.08}
    fill="currentColor"
    stroke="currentColor"
    strokeOpacity={0.3}
    isAnimationActive={false}
    legendType="none"
    tooltipType="none"
    activeDot={false}
    dot={false}
  />
)
