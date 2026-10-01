import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import * as React from 'react'

import { cn } from '#/lib/cn'

function ScrollAreaRoot({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseScrollArea.Root>) {
  return (
    <BaseScrollArea.Root
      data-slot="scroll-area"
      className={cn(
        'relative overflow-hidden transition-shadow has-[[data-slot=scroll-area-viewport]:focus-visible]:shadow-frame-ring-strong',
        className
      )}
      {...props}
    />
  )
}

function ScrollAreaViewport({
  className,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Viewport>) {
  return (
    <BaseScrollArea.Viewport
      data-slot="scroll-area-viewport"
      className={cn(
        'size-full overscroll-contain rounded-[inherit] outline-none',
        className
      )}
      {...props}
    />
  )
}

function ScrollAreaContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseScrollArea.Content>) {
  return (
    <BaseScrollArea.Content
      data-slot="scroll-area-content"
      className={className}
      {...props}
    />
  )
}

function ScrollAreaThumb({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseScrollArea.Thumb>) {
  return (
    <BaseScrollArea.Thumb
      data-slot="scroll-area-thumb"
      className={cn(
        'rounded-full bg-border transition-colors hover:bg-muted-foreground/50 active:bg-muted-foreground/60',
        'data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
        className
      )}
      {...props}
    />
  )
}

function ScrollAreaScrollbar({
  className,
  orientation = 'vertical',
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar>) {
  return (
    <BaseScrollArea.Scrollbar
      orientation={orientation}
      data-slot="scroll-area-scrollbar"
      className={cn(
        'flex touch-none p-1 opacity-0 transition-opacity duration-150 ease-out select-none data-hovering:opacity-100 data-scrolling:opacity-100',
        orientation === 'vertical' && 'inset-y-0 right-0 w-3',
        orientation === 'horizontal' && 'inset-x-0 bottom-0 h-3 flex-col',
        className
      )}
      {...props}
    >
      {children ?? <ScrollAreaThumb />}
    </BaseScrollArea.Scrollbar>
  )
}

function ScrollAreaCorner({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseScrollArea.Corner>) {
  return (
    <BaseScrollArea.Corner
      data-slot="scroll-area-corner"
      className={cn('bg-transparent', className)}
      {...props}
    />
  )
}

type FadeEdges = boolean | 'vertical' | 'horizontal' | 'both'

type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaRoot> & {
  viewportClassName?: string
  contentClassName?: string
  scrollbars?: 'vertical' | 'horizontal' | 'both'
  fadeEdges?: FadeEdges
  fadeSize?: string
}

function ScrollArea({
  className,
  viewportClassName,
  contentClassName,
  scrollbars = 'vertical',
  fadeEdges = false,
  fadeSize = '1.75rem',
  children,
  ...props
}: ScrollAreaProps) {
  const showVertical = scrollbars === 'vertical' || scrollbars === 'both'
  const showHorizontal = scrollbars === 'horizontal' || scrollbars === 'both'

  const fadeVertical =
    fadeEdges === 'vertical' ||
    fadeEdges === 'both' ||
    (fadeEdges === true && showVertical)
  const fadeHorizontal =
    fadeEdges === 'horizontal' ||
    fadeEdges === 'both' ||
    (fadeEdges === true && showHorizontal)

  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [edges, setEdges] = React.useState({
    top: false,
    bottom: false,
    left: false,
    right: false
  })
  const [hasFocus, setHasFocus] = React.useState(false)

  React.useEffect(() => {
    const el = viewportRef.current
    if (!el || (!fadeVertical && !fadeHorizontal)) return

    const update = () => {
      const {
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth,
        clientHeight,
        clientWidth
      } = el
      const next = {
        top: scrollTop > 1,
        bottom: scrollTop + clientHeight < scrollHeight - 1,
        left: scrollLeft > 1,
        right: scrollLeft + clientWidth < scrollWidth - 1
      }
      setEdges((prev) =>
        prev.top === next.top &&
        prev.bottom === next.bottom &&
        prev.left === next.left &&
        prev.right === next.right
          ? prev
          : next
      )
    }

    const onFocusIn = () => setHasFocus(true)
    const onFocusOut = () => setHasFocus(false)

    update()
    el.addEventListener('scroll', update, { passive: true })
    el.addEventListener('focusin', onFocusIn)
    el.addEventListener('focusout', onFocusOut)
    const ro = new ResizeObserver(update)
    ro.observe(el)
    const content = el.firstElementChild
    if (content) ro.observe(content)
    return () => {
      el.removeEventListener('scroll', update)
      el.removeEventListener('focusin', onFocusIn)
      el.removeEventListener('focusout', onFocusOut)
      ro.disconnect()
    }
  }, [fadeVertical, fadeHorizontal])

  const maskStyle = React.useMemo<React.CSSProperties | undefined>(() => {
    if (hasFocus || (!fadeVertical && !fadeHorizontal)) return undefined
    const layers: string[] = []
    if (fadeVertical) {
      const top = edges.top
        ? `transparent 0, rgba(0,0,0,0.35) calc(${fadeSize} * 0.5), black ${fadeSize}`
        : 'black 0'
      const bottom = edges.bottom
        ? `black calc(100% - ${fadeSize}), rgba(0,0,0,0.35) calc(100% - ${fadeSize} * 0.5), transparent 100%`
        : 'black 100%'
      layers.push(`linear-gradient(to bottom, ${top}, ${bottom})`)
    }
    if (fadeHorizontal) {
      const left = edges.left
        ? `transparent 0, rgba(0,0,0,0.35) calc(${fadeSize} * 0.5), black ${fadeSize}`
        : 'black 0'
      const right = edges.right
        ? `black calc(100% - ${fadeSize}), rgba(0,0,0,0.35) calc(100% - ${fadeSize} * 0.5), transparent 100%`
        : 'black 100%'
      layers.push(`linear-gradient(to right, ${left}, ${right})`)
    }
    if (!layers.length) return undefined
    const maskImage = layers.join(', ')
    return {
      maskImage,
      WebkitMaskImage: maskImage,
      maskComposite: 'intersect',
      WebkitMaskComposite: 'source-in'
    }
  }, [fadeVertical, fadeHorizontal, edges, fadeSize, hasFocus])

  return (
    <ScrollAreaRoot className={className} {...props}>
      <ScrollAreaViewport
        ref={viewportRef}
        className={viewportClassName}
        style={maskStyle}
      >
        <ScrollAreaContent className={contentClassName}>
          {children}
        </ScrollAreaContent>
      </ScrollAreaViewport>
      {showVertical && <ScrollAreaScrollbar orientation="vertical" />}
      {showHorizontal && <ScrollAreaScrollbar orientation="horizontal" />}
      {showVertical && showHorizontal && <ScrollAreaCorner />}
    </ScrollAreaRoot>
  )
}

export {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
}
export type { ScrollAreaProps }
