import { createFileRoute } from '@tanstack/react-router'
import { cssVars } from '#/registry/css-vars'

import { PageContainer } from './-components/page-container'

export const Route = createFileRoute('/colors')({
  head: () => ({ meta: [{ title: 'Colors | Acme Registry' }] }),
  component: ColorsPage
})

type Swatch = {
  description: string
  token: string
}

type PaletteSection = {
  description: string
  items: Swatch[]
  label: string
}

const lightBackground = cssVars.light.background
const darkBackground = cssVars.dark.background

const paletteSections: PaletteSection[] = [
  {
    description: 'Application canvas and default reading colors.',
    label: 'Base',
    items: [
      { description: 'Application canvas.', token: '--background' },
      { description: 'Default high-emphasis text.', token: '--foreground' }
    ]
  },
  {
    description: 'Surfaces used by cards, popovers, and quiet UI regions.',
    label: 'Surfaces',
    items: [
      { description: 'Structured content surfaces.', token: '--card' },
      { description: 'Text on card surfaces.', token: '--card-foreground' },
      {
        description: 'Floating surfaces such as menus and dialogs.',
        token: '--popover'
      },
      {
        description: 'Text on floating surfaces.',
        token: '--popover-foreground'
      },
      { description: 'Subtle fills and quiet hover states.', token: '--muted' },
      {
        description: 'Secondary and supporting copy.',
        token: '--muted-foreground'
      }
    ]
  },
  {
    description:
      'Interactive colors used by actions, selections, and emphasis.',
    label: 'Actions',
    items: [
      { description: 'Primary interactive accent.', token: '--primary' },
      {
        description: 'Text over primary actions.',
        token: '--primary-foreground'
      },
      {
        description: 'Secondary controls and soft action fills.',
        token: '--secondary'
      },
      {
        description: 'Text on secondary controls.',
        token: '--secondary-foreground'
      },
      { description: 'Accent fills for highlighted UI.', token: '--accent' },
      { description: 'Text over accent fills.', token: '--accent-foreground' }
    ]
  },
  {
    description: 'Borders, inputs, and focus affordances shared by controls.',
    label: 'Structure',
    items: [
      {
        description: 'Rules, dividers, and component edges.',
        token: '--border'
      },
      {
        description: 'Quiet hairlines between sections and list rows.',
        token: '--border-muted'
      },
      {
        description: 'Emphasized edges and frame outlines.',
        token: '--border-strong'
      },
      { description: 'Input borders and field outlines.', token: '--input' },
      { description: 'Focus affordance and active outlines.', token: '--ring' }
    ]
  },
  {
    description:
      'Success, warning, and info paired with readable foreground and border tokens.',
    label: 'Status',
    items: [
      {
        description: 'Positive states and completed work.',
        token: '--success'
      },
      {
        description: 'Text over success backgrounds.',
        token: '--success-foreground'
      },
      { description: 'Edges for success surfaces.', token: '--success-border' },
      {
        description: 'Cautionary states that need attention.',
        token: '--warning'
      },
      {
        description: 'Text over warning backgrounds.',
        token: '--warning-foreground'
      },
      { description: 'Edges for warning surfaces.', token: '--warning-border' },
      {
        description: 'Neutral information and progress states.',
        token: '--info'
      },
      {
        description: 'Text over info backgrounds.',
        token: '--info-foreground'
      },
      { description: 'Edges for info surfaces.', token: '--info-border' }
    ]
  },
  {
    description: 'Errors, removals, and destructive actions.',
    label: 'Destructive',
    items: [
      {
        description: 'Destructive fills for removal and error states.',
        token: '--destructive'
      },
      {
        description: 'Text over destructive backgrounds.',
        token: '--destructive-foreground'
      }
    ]
  },
  {
    description:
      'Categorical series colors for charts. Distinct from status tokens so data does not imply success or error.',
    label: 'Data visualization',
    items: [
      {
        description: 'Primary series — brand violet.',
        token: '--chart-1'
      },
      {
        description: 'Secondary series — cool blue.',
        token: '--chart-2'
      },
      {
        description: 'Tertiary series — gold.',
        token: '--chart-3'
      },
      {
        description: 'Quaternary series — green.',
        token: '--chart-4'
      },
      {
        description: 'Quinary series — coral.',
        token: '--chart-5'
      }
    ]
  }
]

function ColorsPage() {
  return (
    <main
      id="main-content"
      className="min-h-dvh divide-y divide-border-muted bg-background text-foreground"
    >
      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Tokens
          </div>
          <h1 className="mt-5 max-w-4xl text-display">
            Color, defined once,{' '}
            <span className="text-muted-foreground">
              in OKLCH — paired light and dark.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
            Theme-aware tokens keep surfaces, copy, actions, and status states
            aligned with the current color mode.
          </p>
        </PageContainer>
      </section>

      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Palette
          </div>
          <div className="mt-5 mb-12 flex items-end justify-between gap-6">
            <h2 className="text-section">Tokens grouped by role.</h2>
            <div className="hidden items-center gap-2.5 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase sm:flex">
              <span className="relative inline-block h-3 w-6 overflow-hidden rounded-sm ring-1 ring-border">
                <span className="absolute inset-0 grid grid-cols-2">
                  <span style={{ background: lightBackground }} />
                  <span style={{ background: darkBackground }} />
                </span>
              </span>
              <span>Light / Dark</span>
            </div>
          </div>

          <div className="divide-y divide-border-muted">
            {paletteSections.map((section) => (
              <PaletteGroup key={section.label} section={section} />
            ))}
          </div>
        </PageContainer>
      </section>
    </main>
  )
}

function PaletteGroup({ section }: { section: PaletteSection }) {
  return (
    <div className="grid gap-8 py-12 md:grid-cols-12 md:gap-12 md:py-16">
      <div className="md:col-span-4">
        <h3 className="text-base font-medium tracking-tight">
          {section.label}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {section.description}
        </p>
      </div>
      <ul className="divide-y divide-border-muted md:col-span-8">
        {section.items.map((item) => (
          <SwatchRow item={item} key={item.token} />
        ))}
      </ul>
    </div>
  )
}

function SwatchRow({ item }: { item: Swatch }) {
  const name = item.token.slice(2)
  const values = { light: cssVars.light[name], dark: cssVars.dark[name] }
  return (
    <li className="flex items-start gap-5 py-5 first:pt-0 last:pb-0 sm:items-center">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md ring-1 ring-border-muted">
        <div className="absolute inset-0 grid grid-cols-2">
          <div style={{ background: lightBackground }}>
            <div
              className="h-full w-full"
              style={{ background: values.light }}
            />
          </div>
          <div style={{ background: darkBackground }}>
            <div
              className="h-full w-full"
              style={{ background: values.dark }}
            />
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-mono text-sm tracking-tight">{item.token}</div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {item.description}
        </p>
      </div>

      <div className="hidden shrink-0 flex-col items-end gap-1 text-right font-mono text-[0.6875rem] text-muted-foreground tabular-nums sm:flex">
        <span>
          <span className="text-muted-foreground/50">L&nbsp;&nbsp;</span>
          {values.light}
        </span>
        <span>
          <span className="text-muted-foreground/50">D&nbsp;&nbsp;</span>
          {values.dark}
        </span>
      </div>
    </li>
  )
}
