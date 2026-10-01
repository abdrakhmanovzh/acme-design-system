import { cn } from '#/lib/cn'

export function TokenPreview() {
  const swatches = [
    'bg-primary',
    'bg-success-border',
    'bg-warning-border',
    'bg-destructive',
    'bg-info-border',
    'bg-muted',
    'bg-foreground'
  ]
  return (
    <div className="flex w-full gap-1.5">
      {swatches.map((c) => (
        <span
          key={c}
          className={cn('h-12 flex-1 rounded-md border border-border/60', c)}
        />
      ))}
    </div>
  )
}

export function TypePreview() {
  return (
    <div className="flex w-full flex-col">
      <span className="text-3xl leading-none font-semibold tracking-tight">
        Aa Bb Cc
      </span>
      <span className="mt-2 font-mono text-xs tracking-tight text-muted-foreground">
        const x = (a, b) =&gt; a + b
      </span>
    </div>
  )
}

export function ThemePreview() {
  return (
    <div className="relative h-14 w-full">
      <div className="absolute top-0 left-0 h-10 w-[58%] rounded-md border border-[oklch(0.88_0.006_285)] bg-[oklch(0.995_0.002_285)] p-2 text-[oklch(0.2_0.012_285)]">
        <div className="h-1.5 w-10 rounded-full bg-current" />
        <div className="mt-2 h-1 w-16 rounded-full bg-[oklch(0.52_0.008_285/0.35)]" />
      </div>
      <div className="absolute right-0 bottom-0 h-10 w-[58%] rounded-md border border-[oklch(0.32_0.008_285)] bg-[oklch(0.14_0.004_285)] p-2 text-[oklch(0.96_0.003_285)]">
        <div className="h-1.5 w-10 rounded-full bg-current" />
        <div className="mt-2 h-1 w-16 rounded-full bg-[oklch(0.7_0.008_285/0.45)]" />
      </div>
    </div>
  )
}

export function PrimitivePreview() {
  return (
    <div className="flex w-full flex-wrap items-center gap-1.5 font-mono text-xs tracking-tight text-muted-foreground">
      <span className="rounded-md border border-border bg-card px-2 py-1">
        Dialog
      </span>
      <span className="rounded-md border border-border bg-card px-2 py-1">
        Menu
      </span>
      <span className="rounded-md border border-border bg-card px-2 py-1">
        Combobox
      </span>
    </div>
  )
}
