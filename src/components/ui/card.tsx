import * as React from 'react'

import { cn } from '#/lib/cn'

type CardProps = React.ComponentProps<'div'> & {
  framed?: boolean
}

function Card({ className, framed = false, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-framed={framed ? '' : undefined}
      className={cn(
        'rounded-xl border bg-card text-card-foreground',
        framed && 'outline outline-1 outline-offset-4 outline-(--border-muted)',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 p-5',
        '[&>:not([data-slot=card-action])]:col-start-1',
        '[&>[data-slot=card-action]]:col-start-2 [&>[data-slot=card-action]]:row-span-full [&>[data-slot=card-action]]:row-start-1',
        'has-[+[data-slot=card-content]]:pb-3 has-[+[data-slot=card-footer]]:pb-3',
        className
      )}
      {...props}
    />
  )
}

type CardTitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'

type CardTitleProps = React.ComponentProps<'h3'> & {
  as?: CardTitleTag
}

function CardTitle({ className, as: Tag = 'h3', ...props }: CardTitleProps) {
  return (
    <Tag
      data-slot="card-title"
      className={cn('text-base font-medium tracking-tight', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        'text-sm leading-5 text-muted-foreground [[data-slot=card-title]+&]:mt-1',
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('flex shrink-0 items-center gap-2', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        'p-5',
        'has-[+[data-slot=card-footer]]:pb-3 [[data-slot=card-header]+&]:pt-3',
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center gap-3 p-5',
        '[[data-slot=card-content]+&]:pt-3 [[data-slot=card-header]+&]:pt-3',
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
}
