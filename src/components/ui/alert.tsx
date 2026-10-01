import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '#/lib/cn'

const alertVariants = cva(
  [
    'relative grid w-full grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-xl border p-3 text-sm',
    '[&>[data-slot=icon]]:mt-0.5 [&>[data-slot=icon]]:size-4 [&>[data-slot=icon]]:text-(--alert-icon)',
    '[&>[data-slot=alert-description]:first-child]:col-start-1 [&>[data-slot=alert-title]:first-child]:col-start-1'
  ],
  {
    variants: {
      variant: {
        default:
          'border-border bg-card text-card-foreground [--alert-frame:var(--border-muted)] [--alert-icon:var(--muted-foreground)]',
        info: 'border-info-border bg-info text-info-foreground [--alert-frame:color-mix(in_oklch,var(--info-border)_50%,transparent)] [--alert-icon:var(--info-foreground)]',
        success:
          'border-success-border bg-success text-success-foreground [--alert-frame:color-mix(in_oklch,var(--success-border)_50%,transparent)] [--alert-icon:var(--success-foreground)]',
        warning:
          'border-warning-border bg-warning text-warning-foreground [--alert-frame:color-mix(in_oklch,var(--warning-border)_50%,transparent)] [--alert-icon:var(--warning-foreground)]',
        destructive:
          'border-destructive/20 bg-destructive/10 text-destructive [--alert-frame:color-mix(in_oklch,var(--destructive)_15%,transparent)] [--alert-icon:var(--destructive)]'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface AlertProps
  extends ComponentProps<'div'>, VariantProps<typeof alertVariants> {
  framed?: boolean
}

function Alert({ className, variant, framed = false, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      data-framed={framed ? '' : undefined}
      className={cn(
        alertVariants({ variant }),
        framed && '[outline:1px_solid_var(--alert-frame)] outline-offset-4',
        className
      )}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('col-start-2 leading-5 font-medium', className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('col-start-2 text-sm leading-6', className)}
      {...props}
    />
  )
}

export { Alert, AlertDescription, AlertTitle, alertVariants }
export type { AlertProps }
