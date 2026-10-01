import * as React from 'react'

import { cn } from '#/lib/cn'

export function PageContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-360 px-5 md:px-8', className)}
      {...props}
    />
  )
}
