import { Link } from '@tanstack/react-router'

import { cn } from '#/lib/cn'

import { componentsByCategory, type ComponentItem } from './components-registry'
import { formatIndex } from './format-index'

type ComponentsSidebarProps = {
  activeComponent: ComponentItem
}

export function ComponentsSidebar({ activeComponent }: ComponentsSidebarProps) {
  return (
    <aside className="hidden border-r border-border-muted md:order-1 md:block">
      <nav
        aria-label="Components"
        className="px-5 py-6 pb-16 md:sticky md:top-16 md:max-h-[calc(100dvh-4rem)] md:overflow-y-auto md:py-8 md:pr-4 md:pb-24 md:pl-0"
      >
        {componentsByCategory.map(({ category, items }) => (
          <section key={category} className="mb-10 last:mb-0">
            <div className="mb-5">
              <h2 className="text-base font-medium tracking-tight">
                {category}
              </h2>
            </div>

            <ul className="space-y-1">
              {items.map((item) => {
                const isActive = item.id === activeComponent.id

                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      preload="intent"
                      resetScroll={false}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'group relative flex items-baseline gap-3 rounded-md px-2 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring',
                        isActive
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'w-6 shrink-0 font-mono text-xs tabular-nums transition-colors',
                          isActive
                            ? 'text-foreground'
                            : 'text-muted-foreground group-hover:text-foreground'
                        )}
                      >
                        {formatIndex(item.index + 1)}
                      </span>
                      <span className="flex-1 truncate text-sm tracking-tight">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  )
}
