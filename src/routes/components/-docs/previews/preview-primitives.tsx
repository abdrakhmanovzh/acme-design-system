import { cn } from '#/lib/cn'

import type { ReactNode } from 'react'

function TokenChip({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-tight text-muted-foreground">
      {children}
    </span>
  )
}

function Chapter({
  title,
  description,
  children,
  className
}: {
  title: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'border-b border-border-muted px-5 py-12 last:border-b-0 md:px-8 md:py-16',
        className
      )}
    >
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="max-w-prose">
          <h3 className="text-base font-medium tracking-tight">{title}</h3>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

function SpecimenList({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <ul
      className={cn(
        '@container/specimen divide-y divide-border-muted',
        className
      )}
    >
      {children}
    </ul>
  )
}

type SpecimenRowProps = {
  label: string
  token?: string
  children: ReactNode
}

function SpecimenRow({ label, token, children }: SpecimenRowProps) {
  return (
    <li className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 @sm/specimen:flex-row @sm/specimen:items-center @sm/specimen:gap-8">
      <div className="min-w-0 @sm/specimen:w-44 @sm/specimen:shrink-0">
        <p className="text-sm font-medium tracking-tight">{label}</p>
        {token ? (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <TokenChip>{token}</TokenChip>
          </div>
        ) : null}
      </div>
      <div className="flex w-full min-w-0 flex-wrap items-center gap-2 @sm/specimen:flex-1 @sm/specimen:justify-end">
        {children}
      </div>
    </li>
  )
}

function StackedSpecimenRow({
  label,
  token,
  children
}: {
  label: string
  token?: string
  children: ReactNode
}) {
  return (
    <li className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium tracking-tight">{label}</p>
        {token ? (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <TokenChip>{token}</TokenChip>
          </div>
        ) : null}
      </div>
      <div className="w-full min-w-0">{children}</div>
    </li>
  )
}

/** Shared max width for fill-layout component demos (inputs, fields, pickers, etc.). */
const fillPreviewClassName = 'w-full @sm/specimen:ms-auto @sm/specimen:max-w-md'

function FillPreview({
  className,
  children
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn(fillPreviewClassName, className)}>{children}</div>
}

export {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  StackedSpecimenRow,
  type SpecimenRowProps
}
