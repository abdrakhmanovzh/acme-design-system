import {
  IconChevronLeft,
  IconChevronRight,
  IconDots
} from '@tabler/icons-react'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '#/lib/cn'

const paginationLinkVariants = cva(
  [
    'inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium whitespace-nowrap outline-none',
    'transition-[color,background-color,border-color,box-shadow] hover:bg-muted hover:text-foreground',
    'focus-visible:shadow-frame-ring-strong',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50 [&:not([href])]:cursor-default'
  ],
  {
    variants: {
      variant: {
        page: 'size-8 border border-transparent text-muted-foreground aria-current-page:border-primary/30 aria-current-page:bg-muted aria-current-page:text-foreground',
        nav: 'h-8 px-2.5 text-muted-foreground'
      }
    },
    defaultVariants: {
      variant: 'page'
    }
  }
)

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="Pagination"
      data-slot="pagination"
      className={cn('flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="pagination-item"
      className={cn('flex items-center', className)}
      {...props}
    />
  )
}

interface PaginationLinkProps
  extends
    React.ComponentProps<'a'>,
    VariantProps<typeof paginationLinkVariants> {
  isActive?: boolean
}

function PaginationLink({
  className,
  isActive,
  variant = 'page',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      className={cn(paginationLinkVariants({ variant }), className)}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: Omit<PaginationLinkProps, 'children' | 'variant'>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      data-slot="pagination-previous"
      variant="nav"
      className={cn('pl-2', className)}
      {...props}
    >
      <IconChevronLeft aria-hidden="true" className="size-4" />
      Previous
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: Omit<PaginationLinkProps, 'children' | 'variant'>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      data-slot="pagination-next"
      variant="nav"
      className={cn('pr-2', className)}
      {...props}
    >
      Next
      <IconChevronRight aria-hidden="true" className="size-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        'flex size-8 items-center justify-center text-muted-foreground',
        className
      )}
      {...props}
    >
      <IconDots aria-hidden="true" className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationLinkVariants
}
export type { PaginationLinkProps }
