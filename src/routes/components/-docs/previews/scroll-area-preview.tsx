import { ScrollArea } from '#/components/ui/scroll-area'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

const transcriptLines = [
  {
    speaker: 'Alex Rivera',
    time: '07:42',
    text: 'We need the copilot to escalate billing disputes after two failed tool calls.'
  },
  {
    speaker: 'Support copilot',
    time: '07:43',
    text: 'I can route those threads to the owner queue and attach the last invoice ID.'
  },
  {
    speaker: 'Alex Rivera',
    time: '07:44',
    text: 'Perfect. Also keep transcripts for 90 days — legal asked for that window.'
  },
  {
    speaker: 'Support copilot',
    time: '07:45',
    text: 'Retention is set to 90 days on this workspace. I will confirm after save.'
  },
  {
    speaker: 'Alex Rivera',
    time: '07:46',
    text: 'One more thing: mute webhook retries on 4xx responses.'
  },
  {
    speaker: 'Support copilot',
    time: '07:47',
    text: 'Webhook policy updated — 5xx retries only, up to five attempts with backoff.'
  },
  {
    speaker: 'Alex Rivera',
    time: '07:48',
    text: 'Thanks. Export this thread when we are done.'
  },
  {
    speaker: 'Support copilot',
    time: '07:49',
    text: 'Export is available from the transcript header once the session closes.'
  }
] as const

function TranscriptList() {
  return (
    <ol className="divide-y divide-border-muted">
      {transcriptLines.map((line) => (
        <li key={line.time} className="px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">
              {line.speaker}
            </span>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {line.time}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-foreground/90">
            {line.text}
          </p>
        </li>
      ))}
    </ol>
  )
}

function ScrollAreaFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

export function ScrollAreaPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Scroll area"
        description="Overlay scrollbars on overflow regions. Set a fixed height on the root; scrollbars appear on hover and while scrolling."
      >
        <SpecimenList>
          <ScrollAreaFillRow label="Transcript">
            <ScrollArea className="h-56 w-full rounded-xl border">
              <TranscriptList />
            </ScrollArea>
          </ScrollAreaFillRow>

          <ScrollAreaFillRow label="Fade edges" token="fadeEdges">
            <ScrollArea className="h-56 w-full rounded-xl border" fadeEdges>
              <TranscriptList />
            </ScrollArea>
          </ScrollAreaFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
