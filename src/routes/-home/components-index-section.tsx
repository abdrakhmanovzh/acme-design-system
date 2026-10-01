import { PageContainer } from '../-components/page-container'
import { Avatar } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Progress } from '#/components/ui/progress'
import { Slider } from '#/components/ui/slider'
import { Switch } from '#/components/ui/switch'
import {
  IconArrowRight,
  IconArrowUpRight,
  IconSparkles
} from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import {
  componentCategories,
  componentItems
} from '../components/-docs/components-registry'

const groupedComponents = componentCategories.map((category) => ({
  category,
  items: componentItems.filter((it) => it.category === category)
}))

const componentStartIndexes = groupedComponents.reduce<Array<number>>(
  (indexes, _) => {
    const previousIndex = indexes.at(-1) ?? 0
    const previousGroup = groupedComponents[indexes.length - 1]
    indexes.push(previousIndex + (previousGroup?.items.length ?? 0))
    return indexes
  },
  []
)

const featuredIds = [
  'button',
  'switch',
  'slider',
  'badge',
  'progress',
  'avatar'
] as const

const previewById: Record<(typeof featuredIds)[number], ReactNode> = {
  button: <ButtonMini />,
  switch: <SwitchMini />,
  slider: <SliderMini />,
  badge: <BadgeMini />,
  progress: <ProgressMini />,
  avatar: <AvatarMini />
}

const featured = featuredIds.map((id) => {
  const item = componentItems.find((it) => it.id === id)!
  return {
    id,
    path: item.path,
    name: item.name,
    description: item.description,
    preview: previewById[id]
  }
})

export function ComponentsIndexSection() {
  return (
    <section className="py-20 sm:py-24">
      <PageContainer>
        <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
          Components
        </div>
        <div className="mt-5 mb-10 flex items-end justify-between gap-6">
          <h2 className="text-section">Browse all primitives.</h2>
          <Link
            to="/components"
            className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring/40 sm:inline-flex"
          >
            View all components
            <IconArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {featured.map((item) => (
            <Card
              key={item.id}
              framed
              className="group relative flex h-full flex-col transition-colors hover:border-foreground/20 has-[a:focus-visible]:border-foreground/20 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-ring"
            >
              {/* Inert specimen: the card's only interactive element is the title link. */}
              <div
                inert
                className="flex h-28 items-center justify-center px-6 pt-6 pb-6"
              >
                {item.preview}
              </div>
              <div className="flex items-start justify-between gap-4 border-t border-border-muted px-6 pt-5 pb-6">
                <div className="min-w-0">
                  <h3 className="text-base font-medium tracking-tight">
                    <Link
                      to={item.path}
                      preload="intent"
                      className="outline-none after:absolute after:inset-0 after:rounded-xl"
                    >
                      {item.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <IconArrowUpRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-has-[a:focus-visible]:opacity-100"
                />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 border-t border-border-muted">
          <div className="grid divide-y divide-border-muted md:grid-cols-4 md:divide-x md:divide-y-0">
            {groupedComponents.map((group, gi) => (
              <div
                key={group.category}
                className="px-0 py-8 md:px-6 md:py-10 md:first:pl-0 md:last:pr-0"
              >
                <h3 className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
                  {group.category}
                </h3>
                <ul className="mt-5 space-y-0.5">
                  {group.items.map((item, ii) => (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        preload="intent"
                        className="group -mx-2 flex items-center gap-3 rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring/40"
                      >
                        <span className="w-5 shrink-0 font-mono text-[0.6875rem] text-muted-foreground/60 tabular-nums">
                          {String(componentStartIndexes[gi] + ii + 1).padStart(
                            2,
                            '0'
                          )}
                        </span>
                        <span className="flex-1 truncate text-sm tracking-tight">
                          {item.name}
                        </span>
                        <IconArrowUpRight
                          aria-hidden="true"
                          className="size-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}

function ButtonMini() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="primary">
        Continue
        <IconArrowRight data-slot="icon" aria-hidden="true" />
      </Button>
      <Button size="sm" variant="outline">
        <IconSparkles data-slot="icon" aria-hidden="true" />
        Generate
      </Button>
    </div>
  )
}

function SwitchMini() {
  return (
    <div className="flex items-center gap-5">
      <Switch aria-label="Off" />
      <Switch defaultChecked aria-label="On" />
    </div>
  )
}

function SliderMini() {
  return (
    <div className="w-full max-w-56">
      <Slider defaultValue={42} aria-label="Demo" />
    </div>
  )
}

function BadgeMini() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge size="sm" variant="success">
        Active
      </Badge>
      <Badge size="sm" variant="warning">
        Queued
      </Badge>
      <Badge size="sm" variant="destructive">
        Failed
      </Badge>
      <Badge size="sm" variant="outline">
        Draft
      </Badge>
    </div>
  )
}

function ProgressMini() {
  return (
    <div className="w-full max-w-56">
      <Progress value={62} size="sm" aria-label="Demo" />
    </div>
  )
}

function AvatarMini() {
  return (
    <div className="flex -space-x-2">
      <Avatar size="md" name="Jamie Doe" className="ring-2 ring-card" />
      <Avatar
        size="md"
        name="Aman Mira"
        className="bg-primary/10 text-primary ring-2 ring-card"
      />
      <Avatar
        size="md"
        fallback="+4"
        className="ring-2 ring-card"
        fallbackProps={{ className: 'bg-foreground text-background' }}
      />
    </div>
  )
}
