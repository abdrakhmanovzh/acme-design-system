import {
  IconBookmark,
  IconDownload,
  IconHeadphones,
  IconPlayerPlayFilled,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconSearch,
  IconShare3
} from '@tabler/icons-react'

import { Avatar } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '#/components/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '#/components/ui/input'
import { ScrollArea } from '#/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select'
import { Separator } from '#/components/ui/separator'

const WAVEFORM = [
  18, 26, 34, 22, 40, 52, 44, 30, 24, 36, 48, 60, 54, 42, 30, 22, 28, 38, 50,
  64, 70, 58, 44, 32, 24, 20, 28, 36, 46, 56, 66, 72, 62, 48, 36, 26, 20, 24,
  32, 44, 58, 68, 74, 64, 50, 38, 28, 22, 18, 26, 38, 52, 62, 70, 60, 46, 34,
  24, 20, 28, 40, 54, 66, 58, 44, 30, 22, 18, 24, 34, 46, 58, 68, 60, 46, 32,
  22, 20, 26, 36
]
const WAVEFORM_BARS = WAVEFORM.map((height, position) => ({
  height,
  id: `waveform-${position}-${height}`
}))

const PLAYBACK_SPEED_ITEMS = [
  { value: '0.75', label: '0.75×' },
  { value: '1', label: '1.0×' },
  { value: '1.25', label: '1.25×' },
  { value: '1.5', label: '1.5×' },
  { value: '2', label: '2.0×' }
]

const PLAYED_RATIO = 0.32

const SPEAKERS = {
  alex: {
    name: 'Alex Rivera',
    role: 'Account exec',
    badgeVariant: 'default' as const,
    initials: 'AR'
  },
  priya: {
    name: 'Priya Shah',
    role: 'Customer success',
    badgeVariant: 'info' as const,
    initials: 'PS'
  },
  marcus: {
    name: 'Marcus Klein',
    role: 'Customer · Northwind',
    badgeVariant: 'outline' as const,
    initials: 'MK'
  }
}

type SpeakerId = keyof typeof SPEAKERS

const SPEAKER_FILTER_ITEMS = [
  { value: 'all', label: 'All speakers' },
  ...(
    Object.entries(SPEAKERS) as [SpeakerId, (typeof SPEAKERS)[SpeakerId]][]
  ).map(([value, speaker]) => ({
    value,
    label: speaker.name
  }))
]

const TURNS: {
  id: string
  speaker: SpeakerId
  timestamp: string
  text: string
  active?: boolean
  highlights?: { phrase: string; tone: 'risk' | 'win' }[]
}[] = [
  {
    id: 't1',
    speaker: 'alex',
    timestamp: '00:00',
    text: "Thanks for making time today, Marcus. Priya's on with us so we can walk through usage since the March rollout and look at what Q3 should focus on."
  },
  {
    id: 't2',
    speaker: 'marcus',
    timestamp: '00:18',
    text: 'Appreciate it. Quick heads up — our ops director is in the back half of the call, so if we can land the renewal terms by the 35-minute mark that would help.'
  },
  {
    id: 't3',
    speaker: 'priya',
    timestamp: '00:41',
    text: "Got it. I'll pull the renewal worksheet up now. Before that — weekly active seats are up to 184 from 112 at kickoff, which puts you 9% over the stretch target."
  },
  {
    id: 't4',
    speaker: 'marcus',
    timestamp: '01:09',
    text: "That tracks with what the warehouse team is reporting. The bit that's still rough is the export to NetSuite — we're getting partial rows about twice a week.",
    highlights: [{ phrase: 'partial rows about twice a week', tone: 'risk' }]
  },
  {
    id: 't5',
    speaker: 'alex',
    timestamp: '01:38',
    text: "Noted — I'll get that in front of integrations today. Is it always the same shipment type, or random?",
    active: true
  },
  {
    id: 't6',
    speaker: 'marcus',
    timestamp: '02:02',
    text: 'Mostly LTL freight. Our ops lead has a sample export we can share after the call.'
  },
  {
    id: 't7',
    speaker: 'priya',
    timestamp: '02:24',
    text: "Perfect, we'll attach that to the ticket. Switching to wins — your dispatch team adopted the new routing copilot the week it shipped, and median handle time is down 22%.",
    highlights: [{ phrase: 'median handle time is down 22%', tone: 'win' }]
  },
  {
    id: 't8',
    speaker: 'marcus',
    timestamp: '02:58',
    text: "Yeah, that one's been the headline internally. Leadership has been asking whether the same copilot pattern can extend to our claims workflow."
  },
  {
    id: 't9',
    speaker: 'alex',
    timestamp: '03:20',
    text: "It can — claims is on the Q3 roadmap, and we'd love Northwind as a design partner. I'll send a one-pager so your ops lead can react before our next sync."
  }
]

const HIGHLIGHT_TONE = {
  risk: 'bg-destructive/10 text-destructive ring-1 ring-destructive/25',
  win: 'bg-success/60 text-success-foreground ring-1 ring-success-border'
} as const

const playedBars = Math.round(WAVEFORM.length * PLAYED_RATIO)

export function ConversationTranscript() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-5">
        <div className="min-w-0">
          <CardTitle as="h4" className="truncate">
            Quarterly account review · Northwind Logistics
          </CardTitle>
          <CardDescription>
            May 14, 2026 · Recorded on Zoom · 24m 06s
          </CardDescription>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="status">
              <IconHeadphones aria-hidden="true" />
              Transcribed
            </Badge>
            <Badge variant="success">Renewal track</Badge>
            <Badge variant="outline">3 speakers</Badge>
            <Badge variant="count">4 action items</Badge>
          </div>
        </div>
        <CardAction className="hidden gap-1 sm:flex">
          <Button variant="ghost" size="icon" aria-label="Bookmark">
            <IconBookmark />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Share">
            <IconShare3 />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Download">
            <IconDownload />
          </Button>
        </CardAction>
      </CardHeader>

      <Separator />

      <div className="px-5 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Skip back 15s">
              <IconPlayerSkipBack />
            </Button>
            <Button size="icon" aria-label="Play">
              <IconPlayerPlayFilled />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Skip forward 15s">
              <IconPlayerSkipForward />
            </Button>
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              07:42
            </span>
            <div
              className="flex h-10 flex-1 items-center gap-0.5"
              aria-hidden="true"
            >
              {WAVEFORM_BARS.map((bar, i) => (
                <span
                  key={bar.id}
                  className={
                    i < playedBars
                      ? 'flex-1 rounded-full bg-primary'
                      : 'flex-1 rounded-full bg-border'
                  }
                  style={{ height: `${bar.height}%` }}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              24:06
            </span>
          </div>

          <Select items={PLAYBACK_SPEED_ITEMS} defaultValue="1">
            <SelectTrigger aria-label="Playback speed" className="w-22">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PLAYBACK_SPEED_ITEMS.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  label={item.label}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
        <InputGroup className="max-w-sm">
          <InputGroupAddon>
            <IconSearch className="size-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search transcript" />
        </InputGroup>
        <Select items={SPEAKER_FILTER_ITEMS} defaultValue="all">
          <SelectTrigger aria-label="Filter by speaker" className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SPEAKER_FILTER_ITEMS.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                label={item.label}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <CardContent className="p-0">
        <ScrollArea className="h-112">
          <ol className="divide-y">
            {TURNS.map((turn) => {
              const speaker = SPEAKERS[turn.speaker]
              return (
                <li
                  key={turn.id}
                  data-active={turn.active || undefined}
                  className="group relative flex gap-4 px-5 py-4 transition-colors hover:bg-muted/40 data-active:bg-muted/60"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 bg-primary opacity-0 group-data-active:opacity-100"
                  />
                  <Avatar size="sm" name={speaker.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold tracking-tight">
                        {speaker.name}
                      </span>
                      <Badge variant={speaker.badgeVariant} size="sm">
                        {speaker.role}
                      </Badge>
                      <button
                        type="button"
                        className="font-mono text-xs text-muted-foreground tabular-nums transition-colors hover:text-foreground"
                      >
                        {turn.timestamp}
                      </button>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-foreground/90">
                      {turn.highlights
                        ? renderWithHighlights(turn.text, turn.highlights)
                        : turn.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function renderWithHighlights(
  text: string,
  highlights: { phrase: string; tone: 'risk' | 'win' }[]
) {
  const nodes: React.ReactNode[] = []
  let cursor = 0
  let remaining = text

  while (remaining.length > 0) {
    let earliest = -1
    let match: { phrase: string; tone: 'risk' | 'win' } | null = null
    for (const h of highlights) {
      const idx = remaining.indexOf(h.phrase)
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx
        match = h
      }
    }
    if (earliest === -1 || !match) {
      nodes.push(remaining)
      break
    }
    if (earliest > 0) nodes.push(remaining.slice(0, earliest))
    nodes.push(
      <mark
        key={cursor++}
        className={`rounded-sm px-1 py-px ${HIGHLIGHT_TONE[match.tone]}`}
      >
        {match.phrase}
      </mark>
    )
    remaining = remaining.slice(earliest + match.phrase.length)
  }

  return nodes
}
