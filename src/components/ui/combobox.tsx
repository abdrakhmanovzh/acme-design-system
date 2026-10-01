import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { IconCheck, IconChevronDown, IconX } from '@tabler/icons-react'
import * as React from 'react'

import { InputGroupButton } from '#/components/ui/input'
import { cn } from '#/lib/cn'

function Combobox<Value, Multiple extends boolean | undefined = false>({
  ...props
}: BaseCombobox.Root.Props<Value, Multiple>) {
  return <BaseCombobox.Root data-slot="combobox" {...props} />
}

function ComboboxValue({ ...props }: BaseCombobox.Value.Props) {
  return <BaseCombobox.Value data-slot="combobox-value" {...props} />
}

function ComboboxAnchor({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.InputGroup>) {
  return (
    <BaseCombobox.InputGroup
      data-slot="combobox-anchor"
      className={cn(
        'flex h-9 w-full min-w-0 items-center gap-2 rounded-md border bg-card px-3 text-sm text-foreground transition-[color,background-color,border-color,box-shadow] focus-within:border-ring focus-within:shadow-frame-ring focus-within:outline-none aria-invalid:border-destructive/40 aria-invalid:focus-within:border-destructive aria-invalid:focus-within:shadow-frame-destructive data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-destructive/40 data-invalid:focus-within:border-destructive data-invalid:focus-within:shadow-frame-destructive',
        className
      )}
      {...props}
    />
  )
}

function ComboboxInput({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.Input>) {
  return (
    <BaseCombobox.Input
      data-slot="combobox-input"
      className={cn(
        'min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  )
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.Trigger>) {
  return (
    <BaseCombobox.Trigger
      data-slot="combobox-trigger"
      className={cn(
        'flex shrink-0 items-center justify-center text-muted-foreground disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
      <IconChevronDown data-slot="icon" aria-hidden="true" className="size-4" />
    </BaseCombobox.Trigger>
  )
}

function ComboboxClear({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.Clear>) {
  return (
    <BaseCombobox.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="iconSm" />}
      className={cn('data-hidden:hidden', className)}
      {...props}
    >
      <IconX data-slot="icon" aria-hidden="true" className="size-4" />
    </BaseCombobox.Clear>
  )
}

type ComboboxContentProps = React.ComponentPropsWithoutRef<
  typeof BaseCombobox.Popup
> &
  Pick<
    React.ComponentPropsWithoutRef<typeof BaseCombobox.Positioner>,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
  >

function ComboboxContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxContentProps) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <BaseCombobox.Popup
          data-slot="combobox-content"
          className={cn(
            'group/combobox-content min-w-(--anchor-width) overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md transition-opacity duration-120 ease-out outline-none data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0 supports-backdrop-filter:bg-popover/70 supports-backdrop-filter:backdrop-blur-2xl supports-backdrop-filter:backdrop-saturate-180',
            className
          )}
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

function ComboboxList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.List>) {
  return (
    <BaseCombobox.List
      data-slot="combobox-list"
      className={cn('max-h-72 overflow-y-auto p-1 data-empty:p-0', className)}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item
      data-slot="combobox-item"
      className={cn(
        'relative flex min-h-8 cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0',
        className
      )}
      {...props}
    >
      {children}
      <BaseCombobox.ItemIndicator
        data-slot="combobox-item-indicator"
        className="absolute right-2 flex size-4 items-center justify-center text-primary"
      >
        <IconCheck
          data-slot="icon"
          aria-hidden="true"
          className="size-4 stroke-3"
        />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  )
}

function ComboboxCollection({
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.Collection>) {
  return <BaseCombobox.Collection data-slot="combobox-collection" {...props} />
}

function ComboboxEmpty({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.Empty>) {
  return (
    <BaseCombobox.Empty
      data-slot="combobox-empty"
      className={cn(
        'hidden px-2 py-6 text-center text-sm text-muted-foreground group-data-empty/combobox-content:block',
        className
      )}
      {...props}
    />
  )
}

function ComboboxGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.Group>) {
  return (
    <BaseCombobox.Group
      data-slot="combobox-group"
      className={className}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.GroupLabel>) {
  return (
    <BaseCombobox.GroupLabel
      data-slot="combobox-label"
      className={cn(
        'px-2 py-1.5 text-xs font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.Separator>) {
  return (
    <BaseCombobox.Separator
      data-slot="combobox-separator"
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

export {
  Combobox,
  ComboboxAnchor,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue
}
