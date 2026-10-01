import type { ComponentType } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { NativeSelect } from '#/components/ui/native-select'

import { PageContainer } from '../../-components/page-container'

import { ComponentHeader } from './component-header'
import { ComponentPagination } from './component-pagination'
import {
  componentItems,
  componentsByCategory,
  type ComponentId
} from './components-registry'
import { ComponentsSidebar } from './components-sidebar'

type ComponentsPageProps = {
  activeId: ComponentId
  Preview: ComponentType
}

export function ComponentsPage({ activeId, Preview }: ComponentsPageProps) {
  const navigate = useNavigate()
  const activeIndex = componentItems.findIndex((item) => item.id === activeId)
  const activeComponent = componentItems[activeIndex]
  const previousItem = componentItems[activeIndex - 1]
  const nextItem = componentItems[activeIndex + 1]

  return (
    <main
      id="main-content"
      className="min-h-dvh divide-y divide-border-muted bg-background text-foreground"
    >
      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Components
          </div>
          <h1 className="mt-5 max-w-4xl text-display">
            A library of {componentItems.length} primitives,{' '}
            <span className="text-muted-foreground">
              composed for real product interfaces.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
            Base UI-backed components with consistent tokens, accessible states,
            and restrained interaction details.
          </p>
        </PageContainer>
      </section>

      <div className="sticky top-16 z-10 border-b border-border-muted bg-background py-4 md:hidden">
        <PageContainer>
          <NativeSelect
            id="component-picker"
            aria-label="Jump to component"
            value={activeComponent.id}
            onChange={(event) => {
              const next = componentItems.find(
                (item) => item.id === event.currentTarget.value
              )
              if (next) {
                void navigate({ to: next.path, resetScroll: false })
              }
            }}
          >
            {componentsByCategory.map(({ category, items }) => (
              <optgroup key={category} label={category}>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </NativeSelect>
        </PageContainer>
      </div>

      <div className="mx-auto grid w-full max-w-360 grid-cols-1 md:grid-cols-[18rem_minmax(0,1fr)] md:px-8">
        <ComponentsSidebar activeComponent={activeComponent} />

        <section className="order-1 min-w-0 md:order-2 md:border-r md:border-border-muted">
          <ComponentHeader
            activeComponent={activeComponent}
            activeIndex={activeIndex}
          />
          <Preview />
          <ComponentPagination
            previousItem={previousItem}
            nextItem={nextItem}
          />
        </section>
      </div>
    </main>
  )
}
