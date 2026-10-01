import { Link, useLocation } from '@tanstack/react-router'

import { cn } from '#/lib/cn'
import { isActivePath, navItems } from '../../-lib/navigation'
import { ThemeToggle } from './theme-toggle'

type MobileNavigationProps = {
  id: string
  onNavigate: () => void
}

export function MobileNavigation({ id, onNavigate }: MobileNavigationProps) {
  const location = useLocation()

  return (
    <div id={id} className="border-t border-border/60 px-5 py-2 sm:hidden">
      <nav
        aria-label="Mobile navigation"
        className="mx-auto flex max-w-[1440px] flex-col gap-1"
      >
        {navItems.map((item) => {
          const isActive = isActivePath(location.pathname, item.to)

          return (
            <Link
              key={item.to}
              to={item.to}
              preload="intent"
              aria-current={isActive ? 'page' : undefined}
              onClick={onNavigate}
              className={cn(
                'flex h-9 items-center rounded-md px-3 text-sm tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring/40',
                isActive
                  ? 'bg-muted text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          )
        })}
        <ThemeToggle className="h-9 rounded-md hover:bg-muted" />
      </nav>
    </div>
  )
}
