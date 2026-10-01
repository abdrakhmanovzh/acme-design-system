import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '#/lib/cn'

const badgeVariants = cva(
  [
    'inline-flex w-fit shrink-0 items-center justify-center overflow-hidden border font-medium whitespace-nowrap',
    'has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0'
  ],
  {
    variants: {
      variant: {
        default:
          'border-primary/20 bg-primary/10 text-primary [--badge-indicator:var(--primary)]',
        secondary:
          'border-foreground/20 bg-foreground/10 text-foreground [--badge-indicator:var(--foreground)]',
        success:
          'border-success-border bg-success text-success-foreground [--badge-indicator:var(--success-foreground)]',
        info: 'border-info-border bg-info text-info-foreground [--badge-indicator:var(--info-foreground)]',
        warning:
          'border-warning-border bg-warning text-warning-foreground [--badge-indicator:var(--warning-foreground)]',
        destructive:
          'border-destructive/20 bg-destructive/10 text-destructive [--badge-indicator:var(--destructive)]',
        outline:
          'border-border text-foreground [--badge-indicator:var(--foreground)]',
        status:
          'border-foreground/20 bg-muted/40 text-foreground [--badge-indicator:var(--muted-foreground)]',
        count:
          'min-w-5 border-border bg-background font-mono text-foreground tabular-nums [--badge-indicator:var(--muted-foreground)]',
        source:
          'border-primary/20 bg-primary/10 font-mono tracking-wide text-primary uppercase [--badge-indicator:var(--primary)]'
      },
      size: {
        sm: 'h-5 gap-1 px-2 text-xs [&_svg]:size-3',
        default: 'h-6 gap-1 px-2.5 text-xs [&_svg]:size-3.5',
        lg: 'h-7 gap-1.5 px-3 text-sm [&_svg]:size-4'
      },
      shape: {
        pill: 'rounded-full',
        tag: 'rounded-sm'
      },
      truncate: {
        true: 'max-w-[18ch] text-ellipsis',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'pill',
      truncate: false
    }
  }
)

type BadgeIndicator = 'none' | 'dot' | 'square'
type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>

const variantDefaultIndicator: Partial<Record<BadgeVariant, BadgeIndicator>> = {
  info: 'dot',
  success: 'dot',
  warning: 'dot',
  destructive: 'square',
  status: 'dot'
}

interface BadgeProps
  extends ComponentProps<'span'>, VariantProps<typeof badgeVariants> {
  indicator?: BadgeIndicator
}

function Badge({
  className,
  variant = 'default',
  size,
  shape,
  truncate,
  indicator,
  children,
  ...props
}: BadgeProps) {
  const resolvedVariant = variant ?? 'default'
  const effectiveIndicator =
    indicator ?? variantDefaultIndicator[resolvedVariant] ?? 'none'
  const resolvedShape =
    shape ??
    (resolvedVariant === 'count' || resolvedVariant === 'source'
      ? 'tag'
      : 'pill')

  return (
    <span
      data-slot="badge"
      className={cn(
        badgeVariants({
          variant: resolvedVariant,
          size,
          shape: resolvedShape,
          truncate
        }),
        className
      )}
      {...props}
    >
      {effectiveIndicator === 'dot' && (
        <span
          aria-hidden="true"
          className="inline-block size-1.5 min-w-1.5 flex-none self-center rounded-full bg-(--badge-indicator)"
        />
      )}
      {effectiveIndicator === 'square' && (
        <span
          aria-hidden="true"
          className="inline-block size-1.5 min-w-1.5 flex-none self-center rounded-[2px] bg-(--badge-indicator)"
        />
      )}
      {truncate ? (
        <span className="min-w-0 overflow-hidden text-ellipsis">
          {children as ReactNode}
        </span>
      ) : (
        children
      )}
    </span>
  )
}

export { Badge, badgeVariants }
export type { BadgeProps }
