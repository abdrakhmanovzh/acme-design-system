import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { IconPlus } from '@tabler/icons-react'
import * as React from 'react'

import { cn } from '#/lib/cn'

function Accordion({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>) {
  return (
    <BaseAccordion.Root
      data-slot="accordion"
      keepMounted
      className={cn('flex flex-col gap-1 text-card-foreground', className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAccordion.Item>) {
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={cn(
        'relative rounded-xl transition-[background-color,box-shadow,margin] duration-200 ease-out data-open:my-1 data-open:bg-card data-open:shadow-[inset_0_0_0_1px_var(--border)]',
        className
      )}
      {...props}
    />
  )
}

function AccordionHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAccordion.Header>) {
  return (
    <BaseAccordion.Header
      data-slot="accordion-header"
      className={cn('m-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger>) {
  return (
    <BaseAccordion.Trigger
      data-slot="accordion-trigger"
      className={cn(
        'group flex w-full items-start justify-between gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium tracking-tight transition-[background-color,box-shadow] hover:bg-muted focus-visible:shadow-frame-ring-strong focus-visible:outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:hover:bg-transparent data-panel-open:hover:bg-transparent',
        className
      )}
      {...props}
    >
      <span className="min-w-0">{children}</span>
      <IconPlus
        data-slot="accordion-icon"
        className="mt-0.5 size-4 shrink-0 transform-gpu text-muted-foreground transition-[rotate,color] duration-200 ease-out-quint group-data-panel-open:rotate-135 group-data-panel-open:text-foreground/70"
        aria-hidden="true"
      />
    </BaseAccordion.Trigger>
  )
}

function AccordionPanel({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAccordion.Panel>) {
  return (
    <BaseAccordion.Panel
      data-slot="accordion-panel"
      className={cn(
        'h-(--accordion-panel-height) overflow-hidden text-sm leading-6 text-muted-foreground transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 data-ending-style:**:data-[slot=accordion-inner]:opacity-0 data-starting-style:**:data-[slot=accordion-inner]:-translate-y-1 data-starting-style:**:data-[slot=accordion-inner]:opacity-0',
        className
      )}
      {...props}
    >
      <div
        data-slot="accordion-inner"
        className="translate-y-0 px-4 pt-0 pb-4 opacity-100 transition-[opacity,transform] duration-200 ease-out"
      >
        {children}
      </div>
    </BaseAccordion.Panel>
  )
}

export {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger
}
