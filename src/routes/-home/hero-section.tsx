import { PageContainer } from '../-components/page-container'
import { buttonVariants } from '#/components/ui/button'
import { cn } from '#/lib/cn'
import { IconArrowUpRight } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { InstallSnippet } from './install-snippet'

export function HeroSection() {
  return (
    <section className="py-20 sm:py-24">
      <PageContainer className="grid items-center gap-y-10 lg:grid-cols-12 lg:gap-x-20">
        <div className="lg:col-span-7">
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Design system
          </div>
          <h1 className="mt-5 text-display">
            A small set of parts,{' '}
            <span className="text-muted-foreground">
              shared across our products.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
            Components, tokens, and patterns — versioned together so the apps we
            ship feel like one app.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              to="/integrate"
              className={cn(buttonVariants({ variant: 'primary' }))}
            >
              Get started
              <IconArrowUpRight aria-hidden="true" />
            </Link>
            <Link
              to="/components"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse components
              <IconArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <InstallSnippet />
        </div>
      </PageContainer>
    </section>
  )
}
