import { IconX } from '@tabler/icons-react'
import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/cn'

const Drawer = DrawerPrimitive.Root
const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

function DrawerOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-background/55 backdrop-blur-md backdrop-saturate-150',
        className
      )}
      {...props}
    />
  )
}

type DrawerContentProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Content
> & {
  showCloseButton?: boolean
}

function DrawerContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        data-with-close={showCloseButton || undefined}
        className={cn(
          'group/drawer-content fixed z-50 flex flex-col border-border bg-card text-card-foreground outline outline-1 outline-offset-4 outline-(--border-muted) focus-visible:shadow-frame-ring-strong focus-visible:outline-none',
          'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:max-h-[85dvh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t',
          'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:max-h-[85dvh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b',
          'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:h-dvh data-[vaul-drawer-direction=left]:w-full data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-md',
          'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:h-dvh data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-md',
          className
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="mx-auto mt-3 mb-1 hidden h-1 w-10 shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block"
        />
        {children}
        {showCloseButton ? (
          <DrawerClose asChild>
            <Button
              aria-label="Close drawer"
              variant="ghost"
              size="iconSm"
              className="absolute top-3 right-3 text-muted-foreground before:absolute before:-inset-1.25 hover:text-foreground"
            >
              <IconX data-slot="icon" aria-hidden="true" />
            </Button>
          </DrawerClose>
        ) : null}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn('grid gap-1 p-5 in-data-with-close:pr-12', className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        'text-base leading-6 font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-sm leading-6 text-muted-foreground', className)}
      {...props}
    />
  )
}

function DrawerBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-body"
      className={cn('flex-1 overflow-y-auto px-5', className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        'mt-auto flex flex-col-reverse gap-2 border-t p-5 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
}
