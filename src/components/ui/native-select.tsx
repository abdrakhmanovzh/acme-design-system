import { IconChevronDown } from '@tabler/icons-react'
import * as React from 'react'

import { cn } from '#/lib/cn'

type NativeSelectProps = Omit<
  React.ComponentPropsWithoutRef<'select'>,
  'size'
> & {
  size?: 'sm' | 'default' | 'lg'
}

function NativeSelect({
  className,
  children,
  size = 'default',
  ...props
}: NativeSelectProps) {
  return (
    <div className="relative w-full">
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          'w-full appearance-none rounded-md border bg-card px-3 pr-9 text-sm text-foreground transition-[color,background-color,border-color,box-shadow] hover:bg-muted/70 focus-visible:border-ring focus-visible:shadow-frame-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/40 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:shadow-frame-destructive',
          size === 'sm' && 'h-7.5',
          size === 'default' && 'h-9',
          size === 'lg' && 'h-10',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <IconChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
}

export { NativeSelect }
