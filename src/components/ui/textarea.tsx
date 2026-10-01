import * as React from 'react'

import { cn } from '#/lib/cn'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'min-h-24 w-full min-w-0 resize-y rounded-md border bg-card px-3 py-2 text-sm leading-6 text-foreground transition-[color,background-color,border-color] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-frame-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/40 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:shadow-frame-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
