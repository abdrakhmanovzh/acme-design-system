import { Link, useLocation } from '@tanstack/react-router'

import { cn } from '#/lib/cn'
import { isActivePath, navItems } from '../../-lib/navigation'
import { ThemeToggle } from './theme-toggle'

export function Navigation() {
  const location = useLocation()

  return (
    <nav
      aria-label="Primary navigation"
      className="ml-auto hidden items-stretch gap-1 self-stretch sm:flex"
    >
      {navItems.map((item) => {
        const isActive = isActivePath(location.pathname, item.to)

        return (
          <Link
            key={item.to}
            to={item.to}
            preload="intent"
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative flex items-center px-3 text-sm tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring/40',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {item.label}
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute right-3 -bottom-px left-3 h-px bg-primary"
              />
            )}
          </Link>
        )
      })}
      <ThemeToggle className="self-stretch" />
    </nav>
  )
}
