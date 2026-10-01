import { Popover as BasePopover } from '@base-ui/react/popover'
import * as React from 'react'

import { cn } from '#/lib/cn'

const Popover = BasePopover.Root
const PopoverTrigger = BasePopover.Trigger
const PopoverClose = BasePopover.Close

type PopoverContentProps = React.ComponentProps<typeof BasePopover.Popup> &
  Pick<
    React.ComponentProps<typeof BasePopover.Positioner>,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'collisionBoundary'
  >

function PopoverContent({
  className,
  side = 'bottom',
  align = 'center',
  sideOffset = 6,
  alignOffset,
  collisionBoundary,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionBoundary={collisionBoundary}
        className="isolate z-50"
      >
        <BasePopover.Popup
          data-slot="popover-content"
          className={cn(
            'min-w-56 rounded-md border bg-popover p-4 text-popover-foreground shadow-md transition-opacity duration-120 ease-out outline-none [--frame-gap:var(--popover)] data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0 supports-backdrop-filter:bg-popover/70 supports-backdrop-filter:backdrop-blur-2xl supports-backdrop-filter:backdrop-saturate-180',
            className
          )}
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="popover-header"
      className={cn('flex flex-col gap-1 text-sm', className)}
      {...props}
    />
  )
}

function PopoverTitle({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Title>) {
  return (
    <BasePopover.Title
      data-slot="popover-title"
      className={cn('font-medium', className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Description>) {
  return (
    <BasePopover.Description
      data-slot="popover-description"
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
}
