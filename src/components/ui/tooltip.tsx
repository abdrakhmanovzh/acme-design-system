import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import * as React from 'react'

import { cn } from '#/lib/cn'

function TooltipProvider({
  delay = 500,
  closeDelay = 100,
  timeout = 400,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Provider>) {
  return (
    <BaseTooltip.Provider
      data-slot="tooltip-provider"
      delay={delay}
      closeDelay={closeDelay}
      timeout={timeout}
      {...props}
    />
  )
}

function Tooltip({ ...props }: React.ComponentProps<typeof BaseTooltip.Root>) {
  return <BaseTooltip.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof BaseTooltip.Trigger>) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" {...props} />
}

type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof BaseTooltip.Popup
> &
  Pick<
    React.ComponentPropsWithoutRef<typeof BaseTooltip.Positioner>,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'collisionBoundary'
  >

function TooltipContent({
  className,
  side = 'top',
  align = 'center',
  sideOffset = 6,
  alignOffset,
  collisionBoundary,
  ...props
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionBoundary={collisionBoundary}
        className="isolate z-50"
      >
        <BaseTooltip.Popup
          data-slot="tooltip-content"
          className={cn(
            'max-w-64 rounded-md border bg-popover px-2 py-1 text-xs leading-5 text-popover-foreground shadow-xs transition-opacity duration-120 ease-out data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0 supports-backdrop-filter:bg-popover/70 supports-backdrop-filter:backdrop-blur-2xl supports-backdrop-filter:backdrop-saturate-180',
            className
          )}
          {...props}
        />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
