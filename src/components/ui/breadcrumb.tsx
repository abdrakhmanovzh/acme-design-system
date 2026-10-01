import { IconChevronRight, IconDots } from '@tabler/icons-react'
import * as React from 'react'

import { cn } from '#/lib/cn'

function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="breadcrumb"
      className={cn('w-full', className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'flex min-w-0 items-center gap-1.5 overflow-hidden text-sm whitespace-nowrap text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('flex min-w-0 items-center gap-1.5', className)}
      {...props}
    />
  )
}

function BreadcrumbLink({ className, ...props }: React.ComponentProps<'a'>) {
  return (
    <a
      data-slot="breadcrumb-link"
      className={cn(
        'truncate rounded-sm transition-[color,box-shadow] outline-none hover:text-foreground hover:underline hover:underline-offset-4 focus-visible:shadow-frame-ring-strong [&:not([href])]:cursor-default [&:not([href])]:hover:no-underline',
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-current="page"
      data-slot="breadcrumb-page"
      className={cn('truncate font-medium text-foreground', className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      aria-hidden="true"
      data-slot="breadcrumb-separator"
      className={cn(
        'flex shrink-0 items-center text-muted-foreground',
        className
      )}
      {...props}
    >
      {children ?? <IconChevronRight aria-hidden="true" className="size-3.5" />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      className={cn(
        'flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground',
        className
      )}
      {...props}
    >
      <IconDots aria-hidden="true" className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
}
