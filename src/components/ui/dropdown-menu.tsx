import { Menu as BaseMenu } from '@base-ui/react/menu'
import { IconCheck, IconChevronRight } from '@tabler/icons-react'
import * as React from 'react'

import { cn } from '#/lib/cn'

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof BaseMenu.Root>) {
  return <BaseMenu.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof BaseMenu.Trigger>) {
  return <BaseMenu.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof BaseMenu.Group>) {
  return <BaseMenu.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioGroup>) {
  return (
    <BaseMenu.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
  )
}

function DropdownMenuSubmenu({
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuRoot>) {
  return <BaseMenu.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

type DropdownMenuPopupShellProps = React.ComponentProps<typeof BaseMenu.Popup> &
  Pick<
    React.ComponentProps<typeof BaseMenu.Positioner>,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'collisionBoundary'
  > & {
    slot: 'dropdown-menu-content' | 'dropdown-menu-sub-content'
  }

function DropdownMenuPopupShell({
  side,
  align,
  sideOffset,
  alignOffset,
  collisionBoundary,
  slot,
  className,
  ...props
}: DropdownMenuPopupShellProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionBoundary={collisionBoundary}
        className="isolate z-50"
      >
        <BaseMenu.Popup
          data-slot={slot}
          className={cn(
            'rounded-md border bg-popover p-1 text-popover-foreground shadow-md transition-opacity duration-120 ease-out outline-none data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0 supports-backdrop-filter:bg-popover/70 supports-backdrop-filter:backdrop-blur-2xl supports-backdrop-filter:backdrop-saturate-180',
            slot === 'dropdown-menu-content' ? 'min-w-48' : 'min-w-44',
            className
          )}
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

type DropdownMenuContentProps = Omit<DropdownMenuPopupShellProps, 'slot'>

function DropdownMenuContent({
  side = 'bottom',
  align = 'end',
  sideOffset = 6,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPopupShell
      slot="dropdown-menu-content"
      side={side}
      align={align}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuSubmenuContent({
  side = 'right',
  align = 'start',
  sideOffset = 6,
  alignOffset = -4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPopupShell
      slot="dropdown-menu-sub-content"
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      {...props}
    />
  )
}

type DropdownMenuItemProps = React.ComponentProps<typeof BaseMenu.Item> & {
  destructive?: boolean
}

function DropdownMenuItem({
  className,
  destructive,
  ...props
}: DropdownMenuItemProps) {
  return (
    <BaseMenu.Item
      data-slot="dropdown-menu-item"
      className={cn(
        'relative flex min-h-8 cursor-default items-center gap-2 rounded-md px-2 text-sm transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted data-highlighted:text-foreground **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0',
        destructive &&
          'text-destructive data-highlighted:bg-destructive/10 data-highlighted:text-destructive',
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        'relative flex min-h-8 cursor-default items-center gap-2 rounded-md px-2 text-sm transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted data-highlighted:text-foreground **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0',
        'pl-8',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <BaseMenu.CheckboxItemIndicator data-slot="dropdown-menu-checkbox-item-indicator">
          <IconCheck data-slot="icon" aria-hidden="true" />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioItem>) {
  return (
    <BaseMenu.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        'relative flex min-h-8 cursor-default items-center gap-2 rounded-md px-2 text-sm transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted data-highlighted:text-foreground **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0',
        'pl-8',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <BaseMenu.RadioItemIndicator data-slot="dropdown-menu-radio-item-indicator">
          <span className="block size-1.5 rounded-full bg-current" />
        </BaseMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseMenu.RadioItem>
  )
}

function DropdownMenuSubmenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      className={cn(
        'relative flex min-h-8 cursor-default items-center gap-2 rounded-md px-2 text-sm transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted data-highlighted:text-foreground **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0',
        className
      )}
      {...props}
    >
      {children}
      <IconChevronRight
        data-slot="icon"
        aria-hidden="true"
        className="ml-auto text-muted-foreground"
      />
    </BaseMenu.SubmenuTrigger>
  )
}

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.GroupLabel>) {
  return (
    <BaseMenu.GroupLabel
      data-slot="dropdown-menu-label"
      className={cn(
        'px-2 py-1.5 text-xs font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Separator>) {
  return (
    <BaseMenu.Separator
      data-slot="dropdown-menu-separator"
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'ml-auto pl-6 text-xs text-muted-foreground tabular-nums',
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSubmenu,
  DropdownMenuSubmenuContent,
  DropdownMenuSubmenuTrigger,
  DropdownMenuTrigger
}
