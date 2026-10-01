import { Link } from '@tanstack/react-router'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { useEffect, useId, useRef, useState } from 'react'

import { Logo } from '#/components/logo'
import { cn } from '#/lib/cn'
import { MobileNavigation } from './mobile-navigation'
import { Navigation } from './navigation'

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const mobileNavigationId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!mobileNavOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileNavOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileNavOpen])

  return (
    <header className="sticky top-0 z-20 border-b border-border-muted bg-background supports-backdrop-filter:bg-background/70 supports-backdrop-filter:backdrop-blur-2xl supports-backdrop-filter:backdrop-saturate-180">
      <div className="mx-auto flex h-16 w-full max-w-360 items-center gap-6 px-5 md:px-8">
        <Link
          to="/"
          aria-label="Acme home"
          onClick={() => setMobileNavOpen(false)}
          className="-ml-3 flex shrink-0 items-center gap-2 self-stretch px-3 text-base font-medium tracking-tight transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring/40"
        >
          <Logo className="size-6.5" />
          <span>Acme</span>
        </Link>

        <Navigation />

        <button
          ref={menuButtonRef}
          type="button"
          aria-controls={mobileNavigationId}
          aria-expanded={mobileNavOpen}
          aria-label={
            mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          onClick={() => setMobileNavOpen((open) => !open)}
          className={cn(
            'ml-auto flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring/40 sm:hidden',
            mobileNavOpen && 'bg-muted text-foreground'
          )}
        >
          {mobileNavOpen ? (
            <IconX aria-hidden="true" className="size-4.5" />
          ) : (
            <IconMenu2 aria-hidden="true" className="size-4.5" />
          )}
        </button>
      </div>

      {mobileNavOpen && (
        <MobileNavigation
          id={mobileNavigationId}
          onNavigate={() => setMobileNavOpen(false)}
        />
      )}
    </header>
  )
}
