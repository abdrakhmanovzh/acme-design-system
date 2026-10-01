import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useState } from 'react'

export function CommandSnippet({
  commands,
  label = 'Terminal'
}: {
  commands: string | string[]
  label?: string
}) {
  const items = Array.isArray(commands) ? commands : [commands]
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (command: string, index: number) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 1800)
    } catch {}
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-muted/40">
      <div className="border-b border-border bg-background px-3 py-2 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </div>
      <ul className="divide-y divide-border-muted">
        {items.map((command, index) => (
          <li key={command} className="flex items-start gap-3 px-3 py-2.5">
            <code className="min-w-0 flex-1 font-mono text-xs leading-6 [overflow-wrap:anywhere] text-foreground">
              <span className="text-muted-foreground select-none">$ </span>
              {command}
            </code>
            <button
              type="button"
              onClick={() => handleCopy(command, index)}
              aria-label={copiedIndex === index ? 'Copied' : `Copy: ${command}`}
              className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:outline-none"
            >
              {copiedIndex === index ? (
                <IconCheck className="size-3.5 text-success-foreground" />
              ) : (
                <IconCopy className="size-3.5" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
