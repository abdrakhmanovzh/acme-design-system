import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { IconX } from '@tabler/icons-react'
import * as React from 'react'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/cn'

function Dialog({ ...props }: React.ComponentProps<typeof BaseDialog.Root>) {
  return <BaseDialog.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof BaseDialog.Trigger>) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof BaseDialog.Close>) {
  return <BaseDialog.Close data-slot="dialog-close" {...props} />
}

type DialogContentProps = React.ComponentProps<typeof BaseDialog.Popup> & {
  showCloseButton?: boolean
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-background/55 backdrop-blur-md backdrop-saturate-150 transition-opacity duration-200 ease-out-quint data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <BaseDialog.Viewport className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-6">
        <BaseDialog.Popup
          data-slot="dialog-content"
          data-with-close={showCloseButton || undefined}
          className={cn(
            'relative w-full scale-100 rounded-xl border bg-card p-5 text-card-foreground outline-1 outline-offset-4 outline-(--border-muted) transition-[opacity,scale] duration-200 ease-out-quint focus-visible:shadow-frame-ring-strong focus-visible:outline-none data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0',
            'max-w-md',
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton ? (
            <BaseDialog.Close
              data-slot="dialog-close"
              render={
                <Button
                  aria-label="Close dialog"
                  variant="ghost"
                  size="iconSm"
                  data-slot="dialog-close-button"
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                >
                  <IconX data-slot="icon" aria-hidden="true" />
                </Button>
              }
            />
          ) : null}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('grid gap-1 in-data-with-close:pr-7', className)}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      data-slot="dialog-title"
      className={cn(
        'text-base leading-6 font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description
      data-slot="dialog-description"
      className={cn('text-sm leading-6 text-muted-foreground', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  )
}

function AlertDialog({
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Root>) {
  return <BaseAlertDialog.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Trigger>) {
  return <BaseAlertDialog.Trigger data-slot="alert-dialog-trigger" {...props} />
}

function AlertDialogClose({
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Close>) {
  return <BaseAlertDialog.Close data-slot="alert-dialog-close" {...props} />
}

type AlertDialogContentProps = React.ComponentProps<
  typeof BaseAlertDialog.Popup
> & {
  showCloseButton?: boolean
}

function AlertDialogContent({
  className,
  children,
  showCloseButton = false,
  ...props
}: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className="fixed inset-0 z-50 bg-background/55 backdrop-blur-md backdrop-saturate-150 transition-opacity duration-200 ease-out-quint data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <BaseAlertDialog.Viewport className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-6">
        <BaseAlertDialog.Popup
          data-slot="alert-dialog-content"
          data-with-close={showCloseButton || undefined}
          className={cn(
            'relative w-full scale-100 rounded-xl border bg-card p-5 text-card-foreground outline-1 outline-offset-4 outline-(--border-muted) transition-[opacity,scale] duration-200 ease-out-quint focus-visible:shadow-frame-ring-strong focus-visible:outline-none data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0',
            'max-w-sm',
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton ? (
            <BaseAlertDialog.Close
              data-slot="alert-dialog-close"
              render={
                <Button
                  aria-label="Close dialog"
                  variant="ghost"
                  size="iconSm"
                  data-slot="alert-dialog-close-button"
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                >
                  <IconX data-slot="icon" aria-hidden="true" />
                </Button>
              }
            />
          ) : null}
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  )
}

const AlertDialogHeader = DialogHeader

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Title>) {
  return (
    <BaseAlertDialog.Title
      data-slot="alert-dialog-title"
      className={cn(
        'text-base leading-6 font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Description>) {
  return (
    <BaseAlertDialog.Description
      data-slot="alert-dialog-description"
      className={cn('text-sm leading-6 text-muted-foreground', className)}
      {...props}
    />
  )
}

const AlertDialogFooter = DialogFooter

export {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
}
