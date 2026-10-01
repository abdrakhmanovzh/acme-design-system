import { createFileRoute } from '@tanstack/react-router'

import { PageContainer } from './-components/page-container'
import { CommandSnippet } from './-components/command-snippet'

export const Route = createFileRoute('/integrate')({
  head: () => ({ meta: [{ title: 'Get started | Acme Registry' }] }),
  component: IntegratePage
})

const registryUrl = 'https://acme-design-system-psi.vercel.app/r/{name}.json'

type Step = {
  body: string
  commands?: string | string[]
  code?: string
  codeLabel?: string
  title: string
}

const prerequisites = [
  'React 19+ and Tailwind CSS v4',
  'A shadcn/ui project with `components.json` configured',
  'Path aliases: `@/components/ui/*` and `@/lib/utils`'
]

const steps: Step[] = [
  {
    title: 'Install the foundation',
    body: 'Start with `base`. It pulls in Geist fonts, OKLCH theme tokens, base CSS, and the `cn` utility. Nothing else is written to your project.',
    commands: `pnpm dlx shadcn@latest add https://acme-design-system-psi.vercel.app/r/base.json`
  },
  {
    title: 'Register the namespace',
    body: 'Optional but recommended. After this, install items by short name instead of full URLs.',
    commands: `pnpm dlx shadcn@latest registry add @acme=${registryUrl}`
  },
  {
    title: 'Add primitives',
    body: 'Install one component at a time, or use a bundle when you want a larger starter set.',
    commands: [
      'pnpm dlx shadcn@latest add @acme/button',
      'pnpm dlx shadcn@latest add @acme/dialog',
      'pnpm dlx shadcn@latest add @acme/essentials'
    ]
  },
  {
    title: 'Wire dark mode',
    body: 'The theme provider is not part of the registry. Use class-based dark mode so tokens match `@custom-variant dark`.',
    codeLabel: 'app/layout or root shell',
    code: `import { ThemeProvider } from 'next-themes'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`
  },
  {
    title: 'Use semantic tokens',
    body: 'Prefer design-system utilities over raw CSS variables in product code.',
    codeLabel: 'Examples',
    code: `className="bg-background text-foreground border-border-muted"
className="rounded-md shadow-frame-primary"
className="text-display text-page text-section text-lead"`
  }
]

const bundles = [
  {
    name: 'essentials',
    description: 'Base actions, inputs, badges, cards, loading'
  },
  {
    name: 'forms',
    description: 'Inputs, selection controls, calendar, date picker'
  },
  {
    name: 'overlays',
    description: 'Dialog, sheet, drawer, menus, popover, tooltip'
  },
  { name: 'data', description: 'Tables, tabs, navigation, status, charts' },
  { name: 'media', description: 'Audio player, spinner, shimmering text' },
  { name: 'all', description: 'Base plus every primitive' }
]

const optInItems = [
  {
    name: 'design',
    description: 'DESIGN.md with principles, tokens, and usage guidance'
  },
  {
    name: 'project-config',
    description: 'AGENTS.md, oxlint, oxfmt, and .gitignore defaults'
  },
  { name: 'logo', description: 'Acme logo component using the primary token' },
  { name: 'favicons', description: 'Light and dark SVG favicons' }
]

function IntegratePage() {
  return (
    <main
      id="main-content"
      className="min-h-dvh divide-y divide-border-muted bg-background text-foreground"
    >
      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Get started
          </div>
          <h1 className="mt-5 max-w-4xl text-display">
            Add Acme UI to{' '}
            <span className="text-muted-foreground">your app.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
            Install primitives with the shadcn CLI, wire dark mode yourself, and
            use the shared token language across dashboards, forms, and
            marketing surfaces.
          </p>
        </PageContainer>
      </section>

      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Prerequisites
          </div>
          <h2 className="mt-5 text-section">Before you install.</h2>
          <ul className="mt-8 grid max-w-3xl gap-3 text-sm leading-6 text-muted-foreground">
            {prerequisites.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                />
                {item}
              </li>
            ))}
          </ul>
        </PageContainer>
      </section>

      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Setup
          </div>
          <h2 className="mt-5 text-section">Five steps.</h2>
          <div className="mt-10 divide-y divide-border-muted">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-6 py-10 first:pt-0 lg:grid-cols-12 lg:gap-x-20"
              >
                <div className="lg:col-span-5">
                  <div className="font-mono text-xs text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-2 text-base font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {step.body}
                  </p>
                </div>
                <div className="lg:col-span-7">
                  {step.commands ? (
                    <CommandSnippet commands={step.commands} />
                  ) : null}
                  {step.code ? (
                    <div className="overflow-hidden rounded-xl border border-border bg-muted/40">
                      <div className="border-b border-border bg-background px-3 py-2 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
                        {step.codeLabel}
                      </div>
                      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-foreground">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Bundles
          </div>
          <h2 className="mt-5 text-section">Install groups by role.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {bundles.map((bundle) => (
              <div
                key={bundle.name}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="font-mono text-xs text-primary">
                  @acme/{bundle.name}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {bundle.description}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Opt-in
          </div>
          <h2 className="mt-5 text-section">Extras, only when you ask.</h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Project files and brand assets are standalone items. Neither{' '}
            <code className="font-mono text-xs text-foreground">base</code> nor{' '}
            <code className="font-mono text-xs text-foreground">all</code>{' '}
            installs them.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {optInItems.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="font-mono text-xs text-primary">
                  @acme/{item.name}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>
    </main>
  )
}
