import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '#/lib/cn'
import { Separator } from '#/components/ui/separator'

const fieldVariants = cva(
  'group/field @container/field grid gap-2 data-disabled:pointer-events-none data-disabled:opacity-50',
  {
    variants: {
      orientation: {
        vertical: '',
        horizontal:
          'grid-cols-[auto_1fr] items-center has-[>[data-slot=field-content]]:items-start',
        responsive:
          '@sm/field:grid-cols-[auto_1fr] @sm/field:items-center @sm/field:has-[>[data-slot=field-content]]:items-start'
      }
    },
    defaultVariants: {
      orientation: 'vertical'
    }
  }
)

type FieldProps = React.ComponentProps<'div'> &
  VariantProps<typeof fieldVariants>

type FieldLabelProps = React.ComponentProps<'label'> & {
  required?: boolean
}

type FieldErrorProps = React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>
}

function Field({ className, orientation = 'vertical', ...props }: FieldProps) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group grid gap-6',
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  children,
  required,
  ...props
}: FieldLabelProps) {
  return (
    <label
      data-slot="field-label"
      className={cn(
        'group/field-label peer/field-label flex w-fit items-center gap-1.5 text-sm leading-tight font-medium text-foreground select-none group-data-disabled/field:pointer-events-none group-data-disabled/field:opacity-70',
        className
      )}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
      ) : null}
    </label>
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        'text-xs leading-5 text-muted-foreground group-data-disabled/field:opacity-70',
        className
      )}
      {...props}
    />
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: FieldErrorProps) {
  let content: React.ReactNode = children

  if (!content && errors?.length) {
    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values()
    ].filter((error) => error?.message)

    if (uniqueErrors.length === 1) {
      content = uniqueErrors[0]?.message
    } else if (uniqueErrors.length > 1) {
      content = (
        <ul className="ml-4 flex list-disc flex-col gap-1">
          {uniqueErrors.map((error) => (
            <li key={error?.message}>{error?.message}</li>
          ))}
        </ul>
      )
    }
  }

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn(
        'text-sm leading-6 font-medium text-destructive',
        className
      )}
      {...props}
    >
      {content}
    </div>
  )
}

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn('grid gap-3', className)}
      {...props}
    />
  )
}

function FieldLegend({ className, ...props }: React.ComponentProps<'legend'>) {
  return (
    <legend
      data-slot="field-legend"
      className={cn('text-sm leading-tight font-medium', className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn('grid gap-1.5', className)}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-title"
      className={cn(
        'text-sm leading-none font-medium group-data-disabled/field:opacity-70',
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        'relative -my-2 flex items-center text-xs text-muted-foreground',
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children ? (
        <span
          data-slot="field-separator-content"
          className="relative mx-auto block w-fit bg-(--field-separator-chip,var(--background)) px-2"
        >
          {children}
        </span>
      ) : null}
    </div>
  )
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
}
