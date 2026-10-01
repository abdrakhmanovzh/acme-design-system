import { Link } from '@tanstack/react-router'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

import { cn } from '#/lib/cn'

import type { ComponentItem } from './components-registry'

type ComponentPaginationProps = {
  previousItem?: ComponentItem
  nextItem?: ComponentItem
}

export function ComponentPagination({
  previousItem,
  nextItem
}: ComponentPaginationProps) {
  return (
    <nav
      aria-label="Component pagination"
      className={cn(
        'mt-8 grid border-t border-border-muted',
        previousItem && nextItem ? 'grid-cols-2' : 'grid-cols-1'
      )}
    >
      {previousItem && (
        <Link
          to={previousItem.path}
          preload="intent"
          className="group flex flex-col gap-2 border-r border-border-muted bg-background px-5 py-8 text-left transition-[background-color,box-shadow] outline-none hover:bg-muted focus-visible:relative focus-visible:z-10 focus-visible:bg-muted focus-visible:shadow-frame-ring-strong md:px-8 md:py-10"
        >
          <span className="flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase transition-colors group-hover:text-foreground group-focus-visible:text-foreground">
            <IconChevronLeft className="size-3" aria-hidden="true" />
            Previous
          </span>
          <span className="text-base font-medium tracking-tight">
            {previousItem.name}
          </span>
        </Link>
      )}
      {nextItem && (
        <Link
          to={nextItem.path}
          preload="intent"
          className="group flex flex-col items-end gap-2 bg-background px-5 py-8 text-right transition-[background-color,box-shadow] outline-none hover:bg-muted focus-visible:relative focus-visible:z-10 focus-visible:bg-muted focus-visible:shadow-frame-ring-strong md:px-8 md:py-10"
        >
          <span className="flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase transition-colors group-hover:text-foreground group-focus-visible:text-foreground">
            Next
            <IconChevronRight className="size-3" aria-hidden="true" />
          </span>
          <span className="text-base font-medium tracking-tight">
            {nextItem.name}
          </span>
        </Link>
      )}
    </nav>
  )
}
