import { createFileRoute } from '@tanstack/react-router'

import { PageContainer } from './-components/page-container'

export const Route = createFileRoute('/typography')({
  head: () => ({ meta: [{ title: 'Typography | Acme Registry' }] }),
  component: TypographyPage
})

type Specimen = {
  className: string
  preview: string
  token: string
  specs: string
}

type Family = {
  className: string
  label: string
  name: string
  preview: string
  sample: string
  token: string
}

type Weight = {
  className: string
  label: string
  value: number
}

type NumeralRow = {
  label: string
  proportional: string
  tabular: string
}

const proseSample = 'A small set of parts, shared across our products.'

const scale: Specimen[] = [
  {
    className: 'text-display',
    preview: 'Shared parts.',
    token: 'text-display',
    specs: '56px · 600 · -0.055em'
  },
  {
    className: 'text-page',
    preview: 'One ramp.',
    token: 'text-page',
    specs: '40px · 600 · -0.04em'
  },
  {
    className: 'text-section',
    preview: 'Tokens grouped by role.',
    token: 'text-section',
    specs: '24px · 500 · -0.02em'
  },
  {
    className: 'text-lead text-muted-foreground',
    preview: proseSample,
    token: 'text-lead',
    specs: '18px · 400 · 1.55'
  },
  {
    className: 'text-base',
    preview: proseSample,
    token: 'text-base',
    specs: '16px · 400 · 1.5'
  },
  {
    className: 'text-sm text-muted-foreground',
    preview: proseSample,
    token: 'text-sm',
    specs: '14px · 400 · 1.43'
  }
]

const families: Family[] = [
  {
    className: 'font-sans',
    label: 'Sans',
    name: 'Geist Variable',
    preview: 'Aa',
    sample: 'The quick brown fox jumps over the lazy dog. 0123456789',
    token: '--font-sans'
  },
  {
    className: 'font-mono',
    label: 'Mono',
    name: 'Geist Mono Variable',
    preview: 'Aa',
    sample: 'const radius = "0.75rem" // 0123456789',
    token: '--font-mono'
  }
]

const weights: Weight[] = [
  { className: 'font-light', label: 'Light', value: 300 },
  { className: 'font-medium', label: 'Medium', value: 500 },
  { className: 'font-bold', label: 'Bold', value: 700 }
]

const numeralRows: NumeralRow[] = [
  { label: 'Revenue', proportional: '$1,204.50', tabular: '$1,204.50' },
  { label: 'Refunds', proportional: '$232.40', tabular: '$232.40' },
  { label: 'Payouts', proportional: '$23,108.00', tabular: '$23,108.00' },
  { label: 'Pending', proportional: '$77.99', tabular: '$77.99' }
]

function TypographyPage() {
  return (
    <main
      id="main-content"
      className="min-h-dvh divide-y divide-border-muted bg-background text-foreground"
    >
      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Typography
          </div>
          <h1 className="mt-5 max-w-4xl text-display">
            One ramp, two families,{' '}
            <span className="text-muted-foreground">
              applied with restraint.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
            A small set of type tokens covers everything from marketing displays
            to dense interface text.
          </p>
        </PageContainer>
      </section>

      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Scale
          </div>
          <h2 className="mt-5 mb-12 text-section">Six tokens, one ramp.</h2>

          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <h3 className="text-base font-medium tracking-tight">
                Type ramp
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Display and page anchor marketing surfaces. Section, lead, base,
                and sm carry interface copy and supporting prose.
              </p>
            </div>
            <ul className="divide-y divide-border-muted md:col-span-8">
              {scale.map((item) => (
                <RampRow item={item} key={item.token} />
              ))}
            </ul>
          </div>
        </PageContainer>
      </section>

      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Family
          </div>
          <h2 className="mt-5 mb-12 text-section">Two faces, full range.</h2>

          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <h3 className="text-base font-medium tracking-tight">Geist</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A single typeface in two grades — sans for interface and prose,
                mono for code and tabular metadata. Variable axes cover the full
                weight range.
              </p>
            </div>
            <div className="divide-y divide-border-muted md:col-span-8">
              {families.map((family) => (
                <FamilyBlock family={family} key={family.token} />
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-20 sm:py-24">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Numerals
          </div>
          <h2 className="mt-5 mb-12 text-section">Figures that line up.</h2>

          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <h3 className="text-base font-medium tracking-tight">
                Tabular vs proportional
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Apply{' '}
                <span className="font-mono text-xs text-foreground">
                  tabular-nums
                </span>{' '}
                to columns of figures so digits land on a fixed grid. Use
                proportional for prose, where natural rhythm reads better.
              </p>
            </div>
            <NumeralsCompare />
          </div>
        </PageContainer>
      </section>
    </main>
  )
}

function RampRow({ item }: { item: Specimen }) {
  return (
    <li className="py-10 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-xs">
        <span className="text-foreground">{item.token}</span>
        <span className="text-muted-foreground">{item.specs}</span>
      </div>
      <div className="mt-6 min-w-0">
        <div className={item.className}>{item.preview}</div>
      </div>
    </li>
  )
}

function FamilyBlock({ family }: { family: Family }) {
  return (
    <div className="py-12 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
        <span>{family.label}</span>
        <span>{family.token}</span>
      </div>
      <div
        className={`mt-6 text-[7rem] leading-none tracking-tight text-foreground ${family.className}`}
      >
        {family.preview}
      </div>
      <div className={`mt-4 text-sm text-foreground ${family.className}`}>
        {family.name}
      </div>
      <p
        className={`mt-8 text-base leading-7 text-muted-foreground ${family.className}`}
      >
        {family.sample}
      </p>
      <div className={`mt-12 grid grid-cols-3 gap-8 ${family.className}`}>
        {weights.map((w) => (
          <div key={w.value}>
            <div
              className={`text-[3.25rem] leading-none tracking-tight text-foreground ${w.className}`}
            >
              Aa
            </div>
            <div className="mt-4 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase tabular-nums">
              {w.value} · {w.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NumeralsCompare() {
  return (
    <div className="md:col-span-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-3 gap-y-7 sm:gap-x-10">
        <div />
        <div className="text-right font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
          Tabular
        </div>
        <div className="text-right font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
          Proportional
        </div>
        {numeralRows.flatMap((row) => [
          <div
            key={`${row.label}-label`}
            className="text-sm text-muted-foreground"
          >
            {row.label}
          </div>,
          <div
            key={`${row.label}-tabular`}
            className="text-right text-lg leading-none tracking-tight text-foreground tabular-nums sm:text-2xl lg:text-3xl"
          >
            {row.tabular}
          </div>,
          <div
            key={`${row.label}-proportional`}
            className="text-right text-lg leading-none tracking-tight text-foreground sm:text-2xl lg:text-3xl"
          >
            {row.proportional}
          </div>
        ])}
      </div>
      <p className="mt-10 max-w-md text-xs leading-5 text-muted-foreground">
        Decimal points line up in the tabular column. In proportional they
        drift, because each digit takes its natural width.
      </p>
    </div>
  )
}
