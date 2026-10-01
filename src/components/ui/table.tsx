import * as React from 'react'

import { cn } from '#/lib/cn'

function TableContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        'w-full overflow-x-auto rounded-xl border border-border bg-card text-card-foreground',
        className
      )}
      {...props}
    />
  )
}

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <table
      data-slot="table"
      className={cn('w-full caption-bottom border-collapse text-sm', className)}
      {...props}
    />
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('border-b border-border bg-muted/35', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'border-t border-border bg-muted/35 font-medium [&_tr:last-child]:border-0',
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'border-b border-border transition-colors hover:bg-muted/30',
        'data-selected:bg-muted/70 data-selected:hover:bg-muted/70',
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'h-10 px-4 text-left align-middle text-xs font-medium tracking-wide text-muted-foreground uppercase',
        'first:pl-5 last:pr-5 has-[[role=checkbox]]:w-10 has-[[role=checkbox]]:px-3',
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'h-11 px-4 align-middle text-foreground',
        'first:pl-5 last:pr-5 has-[[role=checkbox]]:w-10 has-[[role=checkbox]]:px-3',
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        'border-t border-border px-5 pt-3 pb-4 text-sm text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
}
