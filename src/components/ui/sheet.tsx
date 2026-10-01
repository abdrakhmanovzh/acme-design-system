import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { IconX } from '@tabler/icons-react'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/cn'

const sheetVariants = cva(
  'fixed z-50 flex flex-col border-border bg-card text-card-foreground transition-transform duration-250 ease-drawer after:absolute after:bg-border-muted after:[content:""] focus-visible:shadow-frame-ring-strong focus-visible:outline-none data-ending-style:translate-x-0 data-ending-style:translate-y-0 data-starting-style:translate-x-0 data-starting-style:translate-y-0',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 max-h-[85dvh] border-b after:inset-x-0 after:-bottom-[5px] after:h-px data-ending-style:-translate-y-full data-starting-style:-translate-y-full',
        right:
          'inset-y-0 right-0 h-dvh w-full border-l after:inset-y-0 after:-left-[5px] after:w-px data-ending-style:translate-x-full data-starting-style:translate-x-full sm:max-w-md',
        bottom:
          'inset-x-0 bottom-0 max-h-[85dvh] border-t after:inset-x-0 after:-top-[5px] after:h-px data-ending-style:translate-y-full data-starting-style:translate-y-full',
        left: 'inset-y-0 left-0 h-dvh w-full border-r after:inset-y-0 after:-right-[5px] after:w-px data-ending-style:-translate-x-full data-starting-style:-translate-x-full sm:max-w-md'
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
)

type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof BaseDialog.Popup
> &
  VariantProps<typeof sheetVariants> & {
    showCloseButton?: boolean
  }

function Sheet({ ...props }: React.ComponentProps<typeof BaseDialog.Root>) {
  return <BaseDialog.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof BaseDialog.Trigger>) {
  return <BaseDialog.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof BaseDialog.Close>) {
  return <BaseDialog.Close data-slot="sheet-close" {...props} />
}

function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-background/55 backdrop-blur-md backdrop-saturate-150 transition-opacity duration-200 ease-out-quint data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <BaseDialog.Popup
        data-slot="sheet-content"
        data-side={side}
        data-with-close={showCloseButton || undefined}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <BaseDialog.Close
            data-slot="sheet-close"
            render={
              <Button
                aria-label="Close sheet"
                variant="ghost"
                size="iconSm"
                className="absolute top-3 right-3 text-muted-foreground before:absolute before:-inset-1.25 hover:text-foreground"
              >
                <IconX data-slot="icon" aria-hidden="true" />
              </Button>
            }
          />
        ) : null}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('grid gap-1 p-5 in-data-with-close:pr-12', className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      data-slot="sheet-title"
      className={cn(
        'text-base leading-6 font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description
      data-slot="sheet-description"
      className={cn('text-sm leading-6 text-muted-foreground', className)}
      {...props}
    />
  )
}

function SheetBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-body"
      className={cn('flex-1 overflow-y-auto px-5', className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        'mt-auto flex flex-col-reverse gap-2 border-t p-5 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
}
