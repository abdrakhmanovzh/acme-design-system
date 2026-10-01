import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

import { cn } from '#/lib/cn'

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const toggleTheme = useCallback(() => {
    if (!mounted) return

    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [mounted, resolvedTheme, setTheme])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    function onKeyDown(event: KeyboardEvent) {
      const target = event.target
      const isEditable =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.matches('input, textarea, select, [role="textbox"]'))

      if (isEditable) return

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'j') {
        event.preventDefault()
        toggleTheme()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mounted, toggleTheme])

  return (
    <button
      type="button"
      aria-keyshortcuts="Meta+J Control+J"
      onClick={toggleTheme}
      className={cn(
        'relative flex items-center gap-1.5 px-3 text-sm tracking-tight text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring/40',
        className
      )}
    >
      <IconSun
        aria-hidden="true"
        className="size-3.5 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90"
      />
      <IconMoon
        aria-hidden="true"
        className="absolute size-3.5 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0"
      />
      <span className="sr-only">{'Theme: '}</span>
      <span className="dark:hidden">Light</span>
      <span className="hidden dark:inline">Dark</span>
    </button>
  )
}
