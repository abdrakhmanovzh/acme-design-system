import {
  getPayloadConfigFromPayload,
  getColorsCount,
  useChart
} from '#/components/ui/charts/chart'
import * as RechartsPrimitive from 'recharts'
import { cn } from '#/lib/cn'
import * as React from 'react'

type ChartLegendVariant =
  | 'square'
  | 'circle'
  | 'circle-outline'
  | 'rounded-square'
  | 'rounded-square-outline'
  | 'vertical-bar'
  | 'horizontal-bar'

function ChartLegendContent({
  className,
  hideIcon = false,
  nameKey,
  payload,
  verticalAlign,
  align = 'right',
  selected,
  onSelectChange,
  isClickable,
  variant = 'rounded-square'
}: React.ComponentProps<'div'> & {
  hideIcon?: boolean
  nameKey?: string
  selected?: string | null
  isClickable?: boolean
  onSelectChange?: (selected: string | null) => void
  variant?: ChartLegendVariant
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase select-none',
        align === 'left' && 'justify-start',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        verticalAlign === 'top' ? 'pb-4' : 'pt-4',
        className
      )}
    >
      {payload
        .filter((item) => item.type !== 'none')
        .map((item) => {
          const payloadName =
            nameKey && item.payload
              ? (item.payload as Record<string, unknown>)[nameKey]
              : undefined
          const key = `${payloadName ?? item.value ?? item.dataKey ?? 'value'}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const isSelected = selected === null || selected === key
          const colorsCount = itemConfig ? getColorsCount(itemConfig) : 1

          const itemClassName = cn(
            'flex items-center gap-1.5 transition-opacity [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground',
            !isSelected && 'opacity-30'
          )
          const content = (
            <>
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <LegendIndicator
                  variant={variant}
                  dataKey={key}
                  colorsCount={colorsCount}
                />
              )}
              {itemConfig?.label}
            </>
          )

          if (!isClickable) {
            return (
              <div key={key} className={itemClassName}>
                {content}
              </div>
            )
          }

          return (
            <button
              key={key}
              type="button"
              aria-pressed={selected === key}
              className={cn(
                itemClassName,
                'cursor-pointer rounded-sm uppercase focus-visible:shadow-frame-ring-strong focus-visible:outline-none'
              )}
              onClick={() => onSelectChange?.(selected === key ? null : key)}
            >
              {content}
            </button>
          )
        })}
    </div>
  )
}

function LegendIndicator({
  variant,
  dataKey,
  colorsCount
}: {
  variant: ChartLegendVariant
  dataKey: string
  colorsCount: number
}) {
  const fillStyle = getLegendFillStyle(dataKey, colorsCount)

  switch (variant) {
    case 'square':
      return <span className="h-2 w-2 shrink-0" style={fillStyle} />

    case 'circle':
      return (
        <span className="h-2 w-2 shrink-0 rounded-full" style={fillStyle} />
      )

    case 'circle-outline':
      return (
        <span
          className="relative h-2.5 w-2.5 shrink-0 rounded-full"
          style={fillStyle}
        >
          <span className="absolute inset-[1.5px] rounded-full bg-card" />
        </span>
      )

    case 'vertical-bar':
      return (
        <span className="h-3 w-1 shrink-0 rounded-[2px]" style={fillStyle} />
      )

    case 'horizontal-bar':
      return (
        <span className="h-1 w-3 shrink-0 rounded-[2px]" style={fillStyle} />
      )

    case 'rounded-square-outline':
      return (
        <span
          className="relative h-2.5 w-2.5 shrink-0 rounded-[3px]"
          style={fillStyle}
        >
          <span className="absolute inset-[1.5px] rounded-[2px] bg-card" />
        </span>
      )

    case 'rounded-square':
    default:
      return (
        <span className="h-2 w-2 shrink-0 rounded-[2px]" style={fillStyle} />
      )
  }
}

function getLegendFillStyle(
  dataKey: string,
  colorsCount: number
): React.CSSProperties {
  if (colorsCount <= 1) {
    return { backgroundColor: `var(--color-${dataKey}-0)` }
  }

  const stops = Array.from({ length: colorsCount }, (_, i) => {
    const offset = (i / (colorsCount - 1)) * 100
    return `var(--color-${dataKey}-${i}) ${offset}%`
  }).join(', ')

  return { background: `linear-gradient(to right, ${stops})` }
}

const ChartLegend = RechartsPrimitive.Legend

export { ChartLegend, ChartLegendContent, type ChartLegendVariant }
