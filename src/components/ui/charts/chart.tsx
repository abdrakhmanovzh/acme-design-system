import * as RechartsPrimitive from 'recharts'
import { cn } from '#/lib/cn'
import * as React from 'react'

const THEMES = { light: '', dark: '.dark' } as const

type ThemeKey = keyof typeof THEMES

type ThemeColorsBase = {
  [K in ThemeKey]?: string[]
}

type AtLeastOneThemeColor = {
  [K in ThemeKey]: Required<Pick<ThemeColorsBase, K>> &
    Partial<Omit<ThemeColorsBase, K>>
}[ThemeKey]

const VALID_THEME_KEYS = Object.keys(THEMES) as ThemeKey[]

function validateChartConfigColors(config: ChartConfig): void {
  for (const [key, value] of Object.entries(config)) {
    if (value.colors) {
      const hasValidThemeKey = VALID_THEME_KEYS.some(
        (themeKey) => value.colors?.[themeKey] !== undefined
      )

      if (!hasValidThemeKey) {
        throw new Error(
          `[Chart] Invalid chart config for "${key}": colors object must have at least one theme key (${VALID_THEME_KEYS.join(', ')}). Received empty object or invalid keys.`
        )
      }
    }
  }
}

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
    colors?: AtLeastOneThemeColor
  }
>

interface ChartContextProps {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

export function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }

  return context
}

interface ChartContainerProps
  extends
    Omit<React.ComponentProps<'div'>, 'children'>,
    Pick<
      React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>,
      | 'initialDimension'
      | 'aspect'
      | 'debounce'
      | 'minHeight'
      | 'minWidth'
      | 'maxHeight'
      | 'height'
      | 'width'
      | 'onResize'
      | 'children'
    > {
  config: ChartConfig
  innerResponsiveContainerStyle?: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >['style']
  footer?: React.ReactNode
}

function ChartContainer({
  id,
  config,
  initialDimension = { width: 320, height: 200 },
  aspect,
  debounce,
  minHeight,
  minWidth,
  maxHeight,
  height,
  width,
  onResize,
  innerResponsiveContainerStyle,
  className,
  children,
  footer,
  ...props
}: Readonly<ChartContainerProps>) {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, '')}`

  validateChartConfigColors(config)

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          'min-h-0 w-full flex-1',
          "relative flex flex-col justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-angle-axis-tick-value]:fill-muted-foreground [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-polar-radius-axis-tick-value]:fill-muted-foreground [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          !footer && 'aspect-video',
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer
          className="min-h-0 w-full flex-1"
          initialDimension={initialDimension}
          aspect={aspect}
          debounce={debounce}
          minHeight={minHeight}
          minWidth={minWidth}
          maxHeight={maxHeight}
          height={height}
          width={width}
          onResize={onResize}
          style={innerResponsiveContainerStyle}
        >
          {children}
        </RechartsPrimitive.ResponsiveContainer>
        {footer}
      </div>
    </ChartContext.Provider>
  )
}

function LoadingIndicator({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) {
    return null
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="rounded-md border bg-popover px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase shadow-md supports-backdrop-filter:bg-popover/70 supports-backdrop-filter:backdrop-blur-2xl supports-backdrop-filter:backdrop-saturate-180">
        Loading
      </div>
    </div>
  )
}

function distributeColors(colorsArray: string[], maxCount: number): string[] {
  const availableCount = colorsArray.length
  if (availableCount >= maxCount) {
    return colorsArray.slice(0, maxCount)
  }

  const result: string[] = []
  const baseSlots = Math.floor(maxCount / availableCount)
  const extraSlots = maxCount % availableCount

  for (let colorIdx = 0; colorIdx < availableCount; colorIdx++) {
    const isExtraColor = colorIdx >= availableCount - extraSlots
    const slotsForThisColor = baseSlots + (isExtraColor ? 1 : 0)
    for (let j = 0; j < slotsForThisColor; j++) {
      result.push(colorsArray[colorIdx])
    }
  }

  return result
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.colors
  )

  if (!colorConfig.length) {
    return null
  }

  const generateCssVars = (theme: keyof typeof THEMES) =>
    colorConfig
      .flatMap(([key, itemConfig]) => {
        const colorsArray = itemConfig.colors?.[theme]
        if (
          !colorsArray ||
          !Array.isArray(colorsArray) ||
          colorsArray.length === 0
        ) {
          return []
        }

        const maxCount = getColorsCount(itemConfig)
        const distributedColors = distributeColors(colorsArray, maxCount)

        return distributedColors.map(
          (color, index) => `  --color-${key}-${index}: ${color};`
        )
      })
      .filter(Boolean)
      .join('\n')

  const css = Object.entries(THEMES)
    .map(
      ([theme, prefix]) =>
        `${prefix} [data-chart=${id}] {\n${generateCssVars(theme as keyof typeof THEMES)}\n}`
    )
    .join('\n')

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

export function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined
  }

  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}

function axisValueToPercentFormatter(value: number) {
  return `${Math.round(value * 100).toFixed(0)}%`
}

function getColorsCount(config: ChartConfig[string]): number {
  if (!config.colors) return 1
  const counts = VALID_THEME_KEYS.map(
    (theme) => config.colors?.[theme]?.length ?? 0
  )
  return Math.max(...counts, 1)
}

export const getLoadingData = (
  points: number = 10,
  min: number = 20,
  max: number = 70
) => {
  const range = max - min
  return Array.from({ length: points }, (_, i) => ({
    loading: min + Math.round(range * (0.5 + 0.5 * Math.sin(i * 0.9)))
  }))
}

const CHART_SERIES_VARS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--muted-foreground)'
] as const

type ChartSeriesToken = 1 | 2 | 3 | 4 | 5 | 'neutral'

function toChartSeriesColors(
  color: string
): NonNullable<ChartConfig[string]['colors']> {
  return { light: [color], dark: [color] }
}

/** Theme-aware colors for a chart series using design tokens. */
export function chartSeriesColors(
  token: ChartSeriesToken
): NonNullable<ChartConfig[string]['colors']> {
  const color =
    token === 'neutral' ? 'var(--muted-foreground)' : `var(--chart-${token})`
  return toChartSeriesColors(color)
}

/** Cycles chart-1…chart-5, then muted-foreground for additional series. */
export function chartSeriesColorsByIndex(
  index: number
): NonNullable<ChartConfig[string]['colors']> {
  const color = CHART_SERIES_VARS[index % CHART_SERIES_VARS.length]
  return toChartSeriesColors(color)
}

/** Default motion reveal when charts mount (area, line, bar). */
export const DEFAULT_CHART_REVEAL_ANIMATION = 'left-to-right' as const

export {
  ChartContainer,
  ChartStyle,
  axisValueToPercentFormatter,
  LoadingIndicator,
  getColorsCount
}
