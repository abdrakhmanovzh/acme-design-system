// oxlint-disable react/no-array-index-key
import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import * as React from 'react'

import { cn } from '#/lib/cn'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

type SliderValue = number | readonly number[]
type SliderVariant = 'simple' | 'segmented'
type SliderProps = SliderPrimitive.Root.Props & {
  variant?: SliderVariant
}

const HORIZONTAL_TICK_MASK = buildTickMask('horizontal')
const VERTICAL_TICK_MASK = buildTickMask('vertical')

const HORIZONTAL_DELTA_CLIP =
  'inset(0 calc(100% - max(calc(var(--hover-pct, 0) * 1%), calc(var(--anchor-pct, 0) * 1%))) 0 min(calc(var(--hover-pct, 0) * 1%), calc(var(--anchor-pct, 0) * 1%)))'
const VERTICAL_DELTA_CLIP =
  'inset(calc(100% - max(calc(var(--hover-pct, 0) * 1%), calc(var(--anchor-pct, 0) * 1%))) 0 min(calc(var(--hover-pct, 0) * 1%), calc(var(--anchor-pct, 0) * 1%)) 0)'

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal',
  variant = 'simple',
  disabled,
  onValueChange,
  ...props
}: SliderProps) {
  const [internalValues, setInternalValues] = React.useState<number[]>(() =>
    normalizeValues(value ?? defaultValue ?? min)
  )
  const values = React.useMemo(
    () => (value !== undefined ? normalizeValues(value) : internalValues),
    [value, internalValues]
  )
  const [snappedHover, setSnappedHover] = React.useState<number | null>(null)
  const controlRef = React.useRef<HTMLDivElement>(null)
  const rectRef = React.useRef<DOMRect | null>(null)
  const hoverValueRef = React.useRef<number | null>(null)
  const isHorizontal = orientation === 'horizontal'
  const isSegmented = variant === 'segmented'
  const segmentedEnabled = isSegmented && !disabled
  const handleValueChange: SliderPrimitive.Root.Props['onValueChange'] = (
    next,
    details
  ) => {
    const newValues = normalizeValues(next)
    const node = controlRef.current
    if (node) {
      if (details?.reason === 'drag') {
        node.setAttribute('data-snap', 'true')
      } else {
        node.removeAttribute('data-snap')
      }
      for (let i = 0; i < newValues.length; i++) {
        node.style.setProperty(
          `--value-${i}-pct`,
          `${getPercent(newValues[i]!, min, max)}`
        )
      }
      if (hoverValueRef.current !== null) {
        node.style.setProperty(
          '--anchor-pct',
          `${getPercent(getClosestValue(hoverValueRef.current, newValues), min, max)}`
        )
      }
    }
    setInternalValues(newValues)
    onValueChange?.(next, details)
  }

  useIsomorphicLayoutEffect(() => {
    const node = controlRef.current
    if (!node) return
    for (let i = 0; i < values.length; i++) {
      node.style.setProperty(
        `--value-${i}-pct`,
        `${getPercent(values[i]!, min, max)}`
      )
    }
  }, [values, min, max])

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    rectRef.current = event.currentTarget.getBoundingClientRect()
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = controlRef.current
    if (!node) return
    let rect = rectRef.current
    if (!rect) {
      rect = event.currentTarget.getBoundingClientRect()
      rectRef.current = rect
    }
    const rawPercent = isHorizontal
      ? (event.clientX - rect.left) / rect.width
      : 1 - (event.clientY - rect.top) / rect.height
    const rawValue = min + clamp(rawPercent, 0, 1) * (max - min)
    const snapped = formatSliderValue(
      clamp(min + Math.round((rawValue - min) / step) * step, min, max)
    )
    hoverValueRef.current = snapped
    const anchorPct = getPercent(getClosestValue(snapped, values), min, max)

    node.style.setProperty('--hover-pct', `${getPercent(snapped, min, max)}`)
    node.style.setProperty('--anchor-pct', `${anchorPct}`)

    setSnappedHover((prev) => (prev === snapped ? prev : snapped))
  }

  const handlePointerLeave = () => {
    rectRef.current = null
    hoverValueRef.current = null
    setSnappedHover(null)
  }

  React.useEffect(() => {
    const clear = () => controlRef.current?.removeAttribute('data-snap')
    window.addEventListener('pointerup', clear)
    window.addEventListener('pointercancel', clear)
    return () => {
      window.removeEventListener('pointerup', clear)
      window.removeEventListener('pointercancel', clear)
    }
  }, [])

  const maskStyle: React.CSSProperties & { '--slider-tick-mask': string } = {
    '--slider-tick-mask': isHorizontal
      ? HORIZONTAL_TICK_MASK
      : VERTICAL_TICK_MASK
  }

  const isRange = values.length > 1
  const showPreview =
    snappedHover !== null &&
    !values.some((v) => formatSliderValue(v) === snappedHover)

  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex touch-none select-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-40',
        orientation === 'horizontal' ? 'w-full' : 'h-40',
        className
      )}
      data-slot="slider"
      data-variant={variant}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      step={step}
      orientation={orientation}
      disabled={disabled}
      thumbAlignment="center"
      onValueChange={handleValueChange}
      {...props}
    >
      <SliderPrimitive.Control
        ref={controlRef}
        className="group relative flex touch-none items-center data-[orientation=horizontal]:min-h-10 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:min-w-10 data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-center"
        onPointerEnter={segmentedEnabled ? handlePointerEnter : undefined}
        onPointerMove={segmentedEnabled ? handlePointerMove : undefined}
        onPointerLeave={segmentedEnabled ? handlePointerLeave : undefined}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            isSegmented
              ? 'relative grow overflow-hidden rounded-lg border border-border bg-muted p-2 select-none data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full'
              : 'relative grow overflow-hidden rounded-full bg-input select-none data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1'
          )}
        >
          {isSegmented ? (
            <div
              aria-hidden
              className="relative mask-(--slider-tick-mask) mask-repeat data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:mask-size-[5.25px_16px] data-[orientation=vertical]:h-full data-[orientation=vertical]:w-4 data-[orientation=vertical]:mask-size-[16px_5.25px] data-[orientation=vertical]:mask-position-[0_100%]"
              data-orientation={orientation}
              style={maskStyle}
            >
              <div className="absolute inset-0 bg-muted-foreground/30 dark:bg-muted-foreground/45" />
              {!isRange && (
                <div
                  aria-hidden
                  className="absolute inset-0 bg-primary/30 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none"
                  style={{
                    clipPath: isHorizontal
                      ? HORIZONTAL_DELTA_CLIP
                      : VERTICAL_DELTA_CLIP
                  }}
                />
              )}
              <SliderPrimitive.Indicator
                data-slot="slider-range"
                className="absolute bg-primary transition-[width,height,inset-inline-start,bottom] duration-300 ease-out-quint select-none group-data-snap:transition-none data-[orientation=horizontal]:inset-y-0 data-[orientation=vertical]:inset-x-0 motion-reduce:transition-none"
              />
            </div>
          ) : (
            <SliderPrimitive.Indicator
              data-slot="slider-range"
              className="absolute rounded-full bg-primary select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
            />
          )}
        </SliderPrimitive.Track>

        {values.map((currentValue, index) => (
          <SliderValueBubble
            key={`bubble-${index}`}
            value={formatSliderValue(currentValue)}
            orientation={orientation}
            positionVar={`--value-${index}-pct`}
            visible
            variant={variant}
          />
        ))}
        {isSegmented && (
          <SliderValueBubble
            value={snappedHover ?? 0}
            orientation={orientation}
            positionVar="--hover-pct"
            visible={showPreview}
            variant={variant}
          />
        )}

        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={`thumb-${index}`}
            index={index}
            className={cn(
              isSegmented
                ? 'block shrink-0 rounded-full bg-primary shadow-md transition-[transform,box-shadow] duration-150 ease-out-quint select-none active:scale-[0.97] data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focused:shadow-frame-ring-strong data-focused:outline-none data-[orientation=horizontal]:h-6 data-[orientation=horizontal]:w-1.5 data-[orientation=vertical]:h-1.5 data-[orientation=vertical]:w-6 motion-reduce:transition-none'
                : 'block size-4 shrink-0 rounded-full border border-primary bg-background transition-[transform,box-shadow] duration-150 ease-out-quint select-none hover:scale-110 active:scale-95 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focused:shadow-frame-ring-strong data-focused:outline-none motion-reduce:transition-none'
            )}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

function SliderValueBubble({
  value,
  orientation,
  positionVar,
  visible,
  variant
}: {
  value: number
  orientation: 'horizontal' | 'vertical'
  positionVar: string
  visible: boolean
  variant: SliderVariant
}) {
  const isHorizontal = orientation === 'horizontal'
  const isSimple = variant === 'simple'
  const style: React.CSSProperties = isHorizontal
    ? {
        left: `calc(var(${positionVar}, 0) * 1%)`,
        translate: '-50% 0'
      }
    : {
        top: `calc(100% - calc(var(${positionVar}, 0) * 1%))`,
        translate: '0 -50%'
      }

  return (
    <span
      className={cn(
        'pointer-events-none absolute z-10 scale-95 rounded-md border bg-popover px-1.5 py-0.5 text-[11px] leading-none font-medium text-popover-foreground tabular-nums opacity-0 shadow-sm transition-[opacity,scale] duration-150 ease-out-quint motion-reduce:transition-none',
        visible &&
          (isSimple
            ? 'group-focus-within:scale-100 group-focus-within:opacity-100 group-data-snap:scale-100 group-data-snap:opacity-100'
            : 'group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100'),
        isHorizontal
          ? isSimple
            ? 'bottom-[calc(50%+1rem)] origin-bottom'
            : 'bottom-[calc(50%+1.25rem)] origin-bottom'
          : 'left-full ml-2 origin-left'
      )}
      style={style}
    >
      {value}
    </span>
  )
}

function normalizeValues(value: SliderValue): number[] {
  return typeof value === 'number' ? [value] : [...value]
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getPercent(value: number, min: number, max: number) {
  if (max === min) return 100
  return clamp(((value - min) / (max - min)) * 100, 0, 100)
}

function getClosestValue(value: number, values: number[]) {
  return values.reduce((closest, current) =>
    Math.abs(current - value) < Math.abs(closest - value) ? current : closest
  )
}

function formatSliderValue(value: number) {
  return Number.isInteger(value) ? value : Number(value.toFixed(2))
}

function buildTickMask(orientation: 'horizontal' | 'vertical') {
  const svg =
    orientation === 'horizontal'
      ? "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5.25 16'><rect x='0' y='0.5' width='2' height='15' rx='1' fill='black'/></svg>"
      : "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 5.25'><rect x='0.5' y='0' width='15' height='2' rx='1' fill='black'/></svg>"

  return `url("data:image/svg+xml,${svg
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')}")`
}

export { Slider }
export type { SliderVariant }
