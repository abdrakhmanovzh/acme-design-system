import * as React from 'react'

import { cn } from '#/lib/cn'

type SeparatorProps = React.ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  role,
  ...props
}: SeparatorProps) {
  const semanticProps = decorative
    ? { role: 'none' }
    : { role: role ?? 'separator', 'aria-orientation': orientation }

  return (
    <div
      data-slot="separator"
      data-orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' && 'h-px w-full',
        orientation === 'vertical' && 'h-full w-px',
        className
      )}
      {...semanticProps}
      {...props}
    />
  )
}

export { Separator }
