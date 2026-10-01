import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '#/lib/cn'

type TabsContextValue = {
  size: NonNullable<VariantProps<typeof tabsTriggerVariants>['size']>
}

const TabsContext = React.createContext<TabsContextValue>({
  size: 'default'
})

const tabsListVariants = cva(
  'group/tabs-list relative flex items-center rounded-lg border bg-muted p-0 shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)] supports-backdrop-filter:bg-muted/65 supports-backdrop-filter:backdrop-blur-xl supports-backdrop-filter:backdrop-saturate-150',
  {
    variants: {
      variant: {
        rail: 'gap-0',
        pill: 'gap-1 border-transparent shadow-none'
      },
      equal: {
        true: 'w-full [&_[data-slot=tabs-trigger]]:flex-1',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'rail',
      equal: false
    }
  }
)

const tabsTriggerVariants = cva(
  [
    'relative z-10 inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent font-medium whitespace-nowrap outline-none',
    'text-muted-foreground transition-[color,box-shadow] hover:text-foreground data-active:text-foreground',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
    'focus-visible:z-20 focus-visible:text-foreground focus-visible:shadow-frame-ring-strong focus-visible:outline-none focus-visible:[--frame-gap:var(--muted)]',
    '[&_svg]:size-4 [&_svg]:shrink-0'
  ],
  {
    variants: {
      size: {
        sm: 'h-7 px-2.5 text-sm',
        default: 'h-8.5 px-3 text-sm'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

interface TabsProps
  extends
    React.ComponentPropsWithoutRef<typeof BaseTabs.Root>,
    Pick<VariantProps<typeof tabsTriggerVariants>, 'size'> {}

function Tabs({ className, size = 'default', ...props }: TabsProps) {
  const context = React.useMemo(() => ({ size: size ?? 'default' }), [size])

  return (
    <TabsContext.Provider value={context}>
      <BaseTabs.Root
        data-slot="tabs"
        className={cn('w-full', className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

interface TabsListProps
  extends
    React.ComponentPropsWithoutRef<typeof BaseTabs.List>,
    VariantProps<typeof tabsListVariants> {}

function TabsList({
  className,
  variant = 'rail',
  equal = false,
  children,
  ...props
}: TabsListProps) {
  return (
    <BaseTabs.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant, equal }), className)}
      {...props}
    >
      {children}
      <BaseTabs.Indicator
        data-slot="tabs-indicator"
        className={cn(
          'pointer-events-none absolute top-0 left-0 h-[calc(var(--active-tab-height)+0.25rem)] w-(--active-tab-width) transform-[translate3d(var(--active-tab-left),calc(var(--active-tab-top)-0.125rem),0)] rounded-md bg-background opacity-100 shadow-[0_1px_2px_rgba(0,0,0,0.08)] ring-1 ring-border-strong will-change-transform dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)]',
          'transition-[transform,width,height] duration-200 ease-out-quint data-instant:transition-none'
        )}
      />
    </BaseTabs.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>) {
  const { size } = React.useContext(TabsContext)

  return (
    <BaseTabs.Tab
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ size }), className)}
      {...props}
    />
  )
}

function TabsPanel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel
      data-slot="tabs-panel"
      className={cn(
        'mt-4 rounded-md transition-shadow outline-none focus-visible:shadow-frame-ring-strong',
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsPanel, TabsTrigger }
export { tabsListVariants, tabsTriggerVariants }
export type { TabsListProps, TabsProps }
