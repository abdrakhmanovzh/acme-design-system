import { componentItems, type ComponentItem } from './components-registry'
import { formatIndex } from './format-index'

type ComponentHeaderProps = {
  activeComponent: ComponentItem
  activeIndex: number
}

export function ComponentHeader({
  activeComponent,
  activeIndex
}: ComponentHeaderProps) {
  const total = componentItems.length

  return (
    <header className="border-b border-border-muted bg-background/95 px-5 pt-6 pb-6 backdrop-blur-xl backdrop-saturate-150 supports-backdrop-filter:bg-background/80 md:sticky md:top-16 md:z-10 md:px-8 md:pt-8 md:pb-8">
      <div className="flex items-center justify-between gap-6 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
        <span>{activeComponent.category}</span>
        <span className="tabular-nums">
          {formatIndex(activeIndex + 1)} / {formatIndex(total)}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h2 className="text-section">{activeComponent.name}</h2>
          {activeComponent.description ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {activeComponent.description}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  )
}
