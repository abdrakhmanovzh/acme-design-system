import {
  type ChartConfig,
  ChartContainer,
  getColorsCount,
  LoadingIndicator
} from '#/components/ui/charts/chart'
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
import { ChartDot, type DotVariant } from '#/components/ui/charts/dot'
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
  PolarAngleAxis as RechartsPolarAngleAxis,
  PolarGrid as RechartsPolarGrid,
  PolarRadiusAxis as RechartsPolarRadiusAxis,
  Radar as RechartsRadar,
  RadarChart as RechartsRadarChart
} from 'recharts'

const STROKE_WIDTH = 1
const DEFAULT_FILL_OPACITY = 0.3
const LOADING_POINTS = 6
const LOADING_RADAR_DATA_KEY = 'value'

type RadarVariant = 'filled' | 'lines'

type RadarChartContextValue = {
  config: ChartConfig
  isLoading: boolean
  selectedDataKey: string | null
  selectDataKey: (dataKey: string | null) => void
}

const RadarChartContext = createContext<RadarChartContextValue | null>(null)

function useRadarChart() {
  const context = use(RadarChartContext)

  if (!context) {
    throw new Error(
      'Radar chart parts (<Radar />, <PolarAngleAxis />, …) must be used within <RadarChart />'
    )
  }

  return context
}

type ValidateConfigKeys<TData, TConfig> = {
  [K in keyof TConfig]: K extends keyof TData ? ChartConfig[string] : never
}

type RadarChartBaseProps<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>
> = {
  config: TConfig & ValidateConfigKeys<TData, TConfig>
  data: TData[]
  children: ReactNode
  className?: string
  chartProps?: ComponentProps<typeof RechartsRadarChart>
  backgroundVariant?: BackgroundVariant
  defaultSelectedDataKey?: string | null
  onSelectionChange?: (selectedDataKey: string | null) => void
  isLoading?: boolean
  loadingPoints?: number
}

type RadarChartProps<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>
> = RadarChartBaseProps<TData, TConfig>

export function RadarChart<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>
>({
  config,
  data,
  children,
  className,
  chartProps,
  backgroundVariant,
  defaultSelectedDataKey = null,
  onSelectionChange,
  isLoading = false,
  loadingPoints
}: RadarChartProps<TData, TConfig>) {
  const chartId = useId().replace(/:/g, '')
  const [selectedDataKey, setSelectedDataKey] = useState<string | null>(
    defaultSelectedDataKey
  )
  const loadingData = useLoadingData(loadingPoints)

  const selectDataKey = useCallback(
    (newSelectedDataKey: string | null) => {
      setSelectedDataKey(newSelectedDataKey)
      onSelectionChange?.(newSelectedDataKey)
    },
    [onSelectionChange]
  )

  const contextValue = useMemo<RadarChartContextValue>(
    () => ({
      config,
      isLoading,
      selectedDataKey,
      selectDataKey
    }),
    [config, isLoading, selectedDataKey, selectDataKey]
  )

  return (
    <RadarChartContext value={contextValue}>
      <ChartContainer className={className} config={config}>
        <LoadingIndicator isLoading={isLoading} />
        <RechartsRadarChart
          id={chartId}
          data={isLoading ? loadingData : data}
          {...chartProps}
          layout="centric"
        >
          {backgroundVariant && <ChartBackground variant={backgroundVariant} />}
          {children}
          {isLoading && <LoadingRadar />}
        </RechartsRadarChart>
      </ChartContainer>
    </RadarChartContext>
  )
}

type RadarProps = {
  dataKey: string
  variant?: RadarVariant
  fillOpacity?: number
  isGlowing?: boolean
  isClickable?: boolean
  children?: ReactNode
  radarProps?: Omit<ComponentProps<typeof RechartsRadar>, 'dataKey'>
}

export function Radar({
  dataKey,
  variant = 'filled',
  fillOpacity = DEFAULT_FILL_OPACITY,
  isGlowing = false,
  isClickable = false,
  children,
  radarProps
}: RadarProps) {
  const { config, isLoading, selectedDataKey, selectDataKey } = useRadarChart()
  const id = useId().replace(/:/g, '')

  if (isLoading) return null

  const isSelected = selectedDataKey === null || selectedDataKey === dataKey
  const opacity = isClickable && !isSelected ? 0.2 : 1
  const isFilled = variant === 'filled'

  const { dot, activeDot } = resolveDots(children, id, dataKey, opacity)

  return (
    <>
      <RechartsRadar
        dataKey={dataKey}
        stroke={`url(#${id}-radar-stroke-${dataKey})`}
        strokeOpacity={opacity}
        strokeWidth={STROKE_WIDTH}
        fill={isFilled ? `url(#${id}-radar-fill-${dataKey})` : 'none'}
        fillOpacity={isFilled ? fillOpacity * opacity : 0}
        dot={dot}
        activeDot={activeDot}
        filter={isGlowing ? `url(#${id}-radar-glow-${dataKey})` : undefined}
        className="transition-opacity duration-200"
        style={isClickable ? { cursor: 'pointer' } : undefined}
        onClick={() => {
          if (!isClickable) return
          selectDataKey(selectedDataKey === dataKey ? null : dataKey)
        }}
        {...radarProps}
      />
      <defs>
        <ColorGradient id={id} dataKey={dataKey} config={config} />
        <StrokeGradient id={id} dataKey={dataKey} config={config} />
        {isFilled && <FillGradient id={id} dataKey={dataKey} config={config} />}
        {isGlowing && <GlowFilter id={id} dataKey={dataKey} />}
      </defs>
    </>
  )
}

type DotProps = {
  variant?: DotVariant
}

export const Dot: FC<DotProps> = () => null

export const ActiveDot: FC<DotProps> = () => null

type PolarGridProps = ComponentProps<typeof RechartsPolarGrid>

export function PolarGrid({
  gridType = 'polygon',
  stroke = 'currentColor',
  strokeOpacity = 0.2,
  strokeDasharray = '3 4',
  ...props
}: PolarGridProps) {
  return (
    <RechartsPolarGrid
      gridType={gridType}
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeDasharray={strokeDasharray}
      {...props}
    />
  )
}

type PolarAngleAxisProps = ComponentProps<typeof RechartsPolarAngleAxis>

export function PolarAngleAxis({
  tick = { fill: 'currentColor', fontSize: 12 },
  tickLine = false,
  type = 'category',
  ...props
}: PolarAngleAxisProps) {
  const { isLoading } = useRadarChart()

  if (isLoading) return null

  return (
    <RechartsPolarAngleAxis
      type={type}
      tick={tick}
      tickLine={tickLine}
      {...props}
    />
  )
}

type PolarRadiusAxisProps = ComponentProps<typeof RechartsPolarRadiusAxis>

export function PolarRadiusAxis({
  tick = false,
  tickLine = false,
  axisLine = false,
  angle = 90,
  type = 'number',
  ...props
}: PolarRadiusAxisProps) {
  const { isLoading } = useRadarChart()

  if (isLoading) return null

  return (
    <RechartsPolarRadiusAxis
      type={type}
      angle={angle}
      tick={tick}
      tickLine={tickLine}
      axisLine={axisLine}
      {...props}
    />
  )
}

type TooltipProps = {
  defaultIndex?: number
}

export function Tooltip({ defaultIndex }: TooltipProps) {
  const { isLoading, selectedDataKey } = useRadarChart()

  if (isLoading) return null

  return (
    <ChartTooltip
      defaultIndex={defaultIndex}
      cursor={false}
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
  align = 'center',
  verticalAlign = 'bottom',
  isClickable = false
}: LegendProps) {
  const { isLoading, selectedDataKey, selectDataKey } = useRadarChart()

  if (isLoading) return null

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

type RadarDotProp = ComponentProps<typeof RechartsRadar>['dot']
type RadarActiveDotProp = ComponentProps<typeof RechartsRadar>['activeDot']

const resolveDots = (
  children: ReactNode,
  id: string,
  dataKey: string,
  dotOpacity: number
): { dot: RadarDotProp; activeDot: RadarActiveDotProp } => {
  let dot: RadarDotProp = false
  let activeDot: RadarActiveDotProp = false

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
  config: ChartConfig
}

type ColorStopsProps = {
  dataKey: string
  colorsCount: number
  opacities?: number[]
}

const ColorStops = ({ dataKey, colorsCount, opacities }: ColorStopsProps) => {
  if (colorsCount === 1) {
    return (
      <>
        <stop
          offset="0%"
          stopColor={`var(--color-${dataKey}-0)`}
          stopOpacity={opacities?.[0]}
        />
        <stop
          offset="100%"
          stopColor={`var(--color-${dataKey}-0)`}
          stopOpacity={opacities?.[opacities.length - 1]}
        />
      </>
    )
  }

  return (
    <>
      {Array.from({ length: colorsCount }, (_, index) => {
        const offset = `${(index / (colorsCount - 1)) * 100}%`
        return (
          <stop
            key={offset}
            offset={offset}
            stopColor={`var(--color-${dataKey}-${index}, var(--color-${dataKey}-0))`}
            stopOpacity={opacities?.[index]}
          />
        )
      })}
    </>
  )
}

const ColorGradient = ({ id, dataKey, config }: StyleProps) => {
  const colorsCount = getColorsCount(config[dataKey] ?? {})

  return (
    <linearGradient id={`${id}-colors-${dataKey}`} x1="0" y1="0" x2="1" y2="0">
      <ColorStops dataKey={dataKey} colorsCount={colorsCount} />
    </linearGradient>
  )
}

/** Diagonal color gradient used for the radar's outline stroke. */
const StrokeGradient = ({ id, dataKey, config }: StyleProps) => {
  const colorsCount = getColorsCount(config[dataKey] ?? {})

  return (
    <linearGradient
      id={`${id}-radar-stroke-${dataKey}`}
      x1="0"
      y1="0"
      x2="1"
      y2="1"
    >
      <ColorStops dataKey={dataKey} colorsCount={colorsCount} />
    </linearGradient>
  )
}

/** Radial color gradient used for the radar's filled area, fading toward the edge. */
const FillGradient = ({ id, dataKey, config }: StyleProps) => {
  const colorsCount = getColorsCount(config[dataKey] ?? {})
  const opacities =
    colorsCount === 1
      ? [0.8, 0.3]
      : Array.from({ length: colorsCount }, (_, i) => (i === 0 ? 0.8 : 0.3))

  return (
    <radialGradient
      id={`${id}-radar-fill-${dataKey}`}
      cx="50%"
      cy="50%"
      r="50%"
    >
      <ColorStops
        dataKey={dataKey}
        colorsCount={colorsCount}
        opacities={opacities}
      />
    </radialGradient>
  )
}

/** Soft outer glow filter applied to a radar when `isGlowing` is set. */
const GlowFilter = ({ id, dataKey }: Pick<StyleProps, 'id' | 'dataKey'>) => {
  return (
    <filter
      id={`${id}-radar-glow-${dataKey}`}
      x="-50%"
      y="-50%"
      width="200%"
      height="200%"
    >
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0"
        result="glow"
      />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  )
}

export function useLoadingData(loadingPoints: number = LOADING_POINTS) {
  return useMemo(() => {
    const categories = ['A', 'B', 'C', 'D', 'E', 'F']
    return categories.slice(0, loadingPoints).map((category, i) => ({
      skill: category,
      [LOADING_RADAR_DATA_KEY]: 50 + Math.round(20 * Math.sin(i * 1.1))
    }))
  }, [loadingPoints])
}

const LoadingRadar = () => {
  return (
    <RechartsRadar
      dataKey={LOADING_RADAR_DATA_KEY}
      stroke="currentColor"
      strokeOpacity={0.3}
      strokeWidth={2}
      fill="currentColor"
      fillOpacity={0.1}
      dot={false}
      isAnimationActive={false}
    />
  )
}
