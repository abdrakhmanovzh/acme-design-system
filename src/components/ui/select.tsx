import { Select as SelectPrimitive } from '@base-ui/react/select'
import { IconCheck, IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import * as React from 'react'

import { cn } from '#/lib/cn'

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn(className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn('truncate', className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: 'sm' | 'default' | 'lg'
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        'flex w-full min-w-0 items-center justify-between gap-2 rounded-md border bg-card px-3 text-sm text-foreground transition-[color,background-color,border-color,box-shadow] hover:bg-muted/70 focus-visible:border-ring focus-visible:shadow-frame-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/40 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:shadow-frame-destructive data-invalid:border-destructive/40 data-invalid:focus-visible:border-destructive data-invalid:focus-visible:shadow-frame-destructive data-placeholder:text-muted-foreground data-popup-open:border-ring data-popup-open:shadow-frame-ring *:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:truncate [&_svg]:pointer-events-none [&_svg]:shrink-0',
        size === 'sm' && 'h-7.5',
        size === 'default' && 'h-9',
        size === 'lg' && 'h-10',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="flex shrink-0 text-muted-foreground">
        <IconChevronDown aria-hidden="true" className="size-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            'relative isolate z-50 max-h-72 min-w-(--anchor-width) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md transition-opacity duration-120 ease-out outline-none data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0 supports-backdrop-filter:bg-popover/70 supports-backdrop-filter:backdrop-blur-2xl supports-backdrop-filter:backdrop-saturate-180',
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        'px-2 py-1.5 text-xs font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="min-w-0 truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 flex size-4 items-center justify-center text-primary">
        <IconCheck aria-hidden="true" className="size-4 stroke-3" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('pointer-events-none my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        'sticky top-0 z-10 flex w-full items-center justify-center bg-popover py-1 text-muted-foreground',
        className
      )}
      {...props}
    >
      <IconChevronUp aria-hidden="true" className="size-4" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        'sticky bottom-0 z-10 flex w-full items-center justify-center bg-popover py-1 text-muted-foreground',
        className
      )}
      {...props}
    >
      <IconChevronDown aria-hidden="true" className="size-4" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
