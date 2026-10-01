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
  RadialBar as RechartsRadialBar,
  RadialBarChart as RechartsRadialBarChart,
  Sector,
  type SectorProps
} from 'recharts'
import type { TypedDataKey } from 'recharts/types/util/typedDataKey'

const DEFAULT_INNER_RADIUS = '30%'
const DEFAULT_OUTER_RADIUS = '100%'
const DEFAULT_CORNER_RADIUS = 5
const DEFAULT_BAR_SIZE = 14
const LOADING_BARS = 5
const EMPTY_GLOWING_BARS: string[] = []

type RadialBarChartProps = ComponentProps<typeof RechartsRadialBarChart>
type RadialBarRechartsProps = ComponentProps<typeof RechartsRadialBar>

type RadialVariant = 'full' | 'semi'

type RadialChartContextValue = {
  config: ChartConfig
  nameKey: string
  chartId: string
  isLoading: boolean
  selectedBar: string | null
  selectBar: (barName: string | null, value?: number) => void
}

const RadialChartContext = createContext<RadialChartContextValue | null>(null)

function useRadialChart() {
  const context = use(RadialChartContext)

  if (!context) {
    throw new Error(
      'Radial chart parts (<RadialBar />, <Tooltip />, …) must be used within <RadialChart />'
    )
  }

  return context
}

type RadialChartBaseProps<TData extends Record<string, unknown>> = {
  config: ChartConfig
  data: TData[]
  nameKey: keyof TData & string
  children: ReactNode
  className?: string
  chartProps?: RadialBarChartProps
  variant?: RadialVariant
  innerRadius?: number | string
  outerRadius?: number | string
  defaultSelectedDataKey?: string | null
  onSelectionChange?: (
    selection: { dataKey: string; value: number } | null
  ) => void
  isLoading?: boolean
  backgroundVariant?: BackgroundVariant
}

type RadialChartProps<TData extends Record<string, unknown>> =
  RadialChartBaseProps<TData>

export function RadialChart<TData extends Record<string, unknown>>({
  config,
  data,
  nameKey,
  children,
  className,
  chartProps,
  variant = 'full',
  innerRadius = DEFAULT_INNER_RADIUS,
  outerRadius = DEFAULT_OUTER_RADIUS,
  defaultSelectedDataKey = null,
  onSelectionChange,
  isLoading = false,
  backgroundVariant
}: RadialChartProps<TData>) {
  const chartId = useId().replace(/:/g, '')
  const [selectedBar, setSelectedBar] = useState<string | null>(
    defaultSelectedDataKey
  )
  const loadingData = useLoadingData()

  const variantConfig = getVariantConfig(variant)

  const selectBar = useCallback(
    (barName: string | null, value?: number) => {
      setSelectedBar(barName)
      onSelectionChange?.(
        barName === null ? null : { dataKey: barName, value: value ?? 0 }
      )
    },
    [onSelectionChange]
  )

  const preparedData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        fill: `url(#${chartId}-radial-colors-${item[nameKey] as string})`
      })),
    [data, nameKey, chartId]
  )

  const contextValue = useMemo<RadialChartContextValue>(
    () => ({
      config,
      nameKey,
      chartId,
      isLoading,
      selectedBar,
      selectBar
    }),
    [config, nameKey, chartId, isLoading, selectedBar, selectBar]
  )

  return (
    <RadialChartContext value={contextValue}>
      <ChartContainer className={className} config={config}>
        <LoadingIndicator isLoading={isLoading} />
        <RechartsRadialBarChart
          id={chartId}
          data={isLoading ? loadingData : preparedData}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={variantConfig.startAngle}
          endAngle={variantConfig.endAngle}
          cx={variantConfig.cx}
          cy={variantConfig.cy}
          {...chartProps}
        >
          {backgroundVariant && <ChartBackground variant={backgroundVariant} />}
          {children}
          {isLoading && <LoadingRadialBar />}
          <defs>
            <ColorGradientStyle config={config} chartId={chartId} />
          </defs>
        </RechartsRadialBarChart>
      </ChartContainer>
    </RadialChartContext>
  )
}

type RadialBarProps = {
  dataKey: string
  cornerRadius?: number
  barSize?: number
  showBackground?: boolean
  isClickable?: boolean
  glowingBars?: string[]
  radialBarProps?: Omit<RadialBarRechartsProps, 'dataKey'>
}

export function RadialBar({
  dataKey,
  cornerRadius = DEFAULT_CORNER_RADIUS,
  barSize = DEFAULT_BAR_SIZE,
  showBackground = true,
  isClickable = false,
  glowingBars = EMPTY_GLOWING_BARS,
  radialBarProps
}: RadialBarProps) {
  const { nameKey, chartId, isLoading, selectedBar, selectBar } =
    useRadialChart()

  if (isLoading) return null

  return (
    <>
      <RechartsRadialBar
        dataKey={dataKey as TypedDataKey<Record<string, unknown>>}
        cornerRadius={cornerRadius}
        barSize={barSize}
        background={showBackground}
        className="drop-shadow-sm"
        style={isClickable ? { cursor: 'pointer' } : undefined}
        onClick={(payload, index) => {
          if (!isClickable) return
          const entry = payload as Record<string, unknown>
          const barName =
            (entry?.[nameKey] as string | undefined) ?? String(index)
          const value = Number(entry?.[dataKey] ?? 0)
          selectBar(selectedBar === barName ? null : barName, value)
        }}
        shape={(props: SectorProps) => {
          const barName = (props as unknown as Record<string, unknown>)[
            nameKey
          ] as string
          const isGlowing = glowingBars.includes(barName)
          const isSelected = selectedBar === null || selectedBar === barName

          return (
            <Sector
              {...props}
              filter={
                isGlowing
                  ? `url(#${chartId}-radial-glow-${barName})`
                  : undefined
              }
              opacity={isClickable && !isSelected ? 0.3 : 1}
              className="transition-opacity duration-200"
            />
          )
        }}
        {...radialBarProps}
      />
      <defs>
        {glowingBars.length > 0 && (
          <GlowFilterStyle chartId={chartId} glowingBars={glowingBars} />
        )}
      </defs>
    </>
  )
}

type TooltipProps = {
  defaultIndex?: number
}

export function Tooltip({ defaultIndex }: TooltipProps) {
  const { nameKey, isLoading } = useRadialChart()

  if (isLoading) return null

  return (
    <ChartTooltip
      defaultIndex={defaultIndex}
      cursor={false}
      content={<ChartTooltipContent nameKey={nameKey} hideLabel />}
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
  const { nameKey, isLoading, selectedBar, selectBar } = useRadialChart()

  if (isLoading) return null

  return (
    <ChartLegend
      verticalAlign={verticalAlign}
      align={align}
      content={
        <ChartLegendContent
          selected={selectedBar}
          onSelectChange={selectBar}
          isClickable={isClickable}
          nameKey={nameKey}
          variant={variant}
        />
      }
    />
  )
}

function getVariantConfig(variant: RadialVariant) {
  switch (variant) {
    case 'semi':
      return { startAngle: 180, endAngle: 0, cx: '50%', cy: '70%' }
    case 'full':
    default:
      return { startAngle: 90, endAngle: -270, cx: '50%', cy: '50%' }
  }
}

/** Diagonal color gradient applied to every radial bar, one per config key. */
const ColorGradientStyle = ({
  config,
  chartId
}: {
  config: ChartConfig
  chartId: string
}) => {
  return (
    <>
      {Object.entries(config).map(([dataKey, colorConfig]) => {
        const colorsCount = getColorsCount(colorConfig)

        return (
          <linearGradient
            key={`${chartId}-radial-colors-${dataKey}`}
            id={`${chartId}-radial-colors-${dataKey}`}
            x1="0"
            y1="0"
            x2="1"
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
        )
      })}
    </>
  )
}

/** Soft outer-glow SVG filter, one per glowing bar. */
const GlowFilterStyle = ({
  chartId,
  glowingBars
}: {
  chartId: string
  glowingBars: string[]
}) => {
  return (
    <>
      {glowingBars.map((barName) => (
        <filter
          key={`${chartId}-radial-glow-${barName}`}
          id={`${chartId}-radial-glow-${barName}`}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
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
      ))}
    </>
  )
}

function useLoadingData() {
  return useMemo(
    () =>
      Array.from({ length: LOADING_BARS }, (_, i) => ({
        name: `loading${i}`,
        value: 50 + Math.round(20 * Math.sin(i * 1.3))
      })),
    []
  )
}

const LoadingRadialBar = () => {
  return (
    <RechartsRadialBar
      dataKey="value"
      cornerRadius={DEFAULT_CORNER_RADIUS}
      barSize={DEFAULT_BAR_SIZE}
      background
      isAnimationActive={false}
      shape={(props: SectorProps) => (
        <Sector {...props} fill="currentColor" fillOpacity={0.15} />
      )}
    />
  )
}
