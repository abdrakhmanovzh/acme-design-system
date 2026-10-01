import {
  AudioPlayerButton,
  AudioPlayerDuration,
  AudioPlayerProgress,
  AudioPlayerProvider,
  AudioPlayerSpeed,
  AudioPlayerTime,
  AudioPlayerWaveform,
  type AudioPlayerItem
} from '#/components/ui/audio-player'
import { Badge } from '#/components/ui/badge'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

function generateChannel(count: number, seed: number) {
  const peaks: number[] = []
  for (let i = 0; i < count; i++) {
    const t = i / count
    const env = Math.sin(t * Math.PI)
    const wobble =
      Math.sin(i * 0.5 + seed) * 0.25 + Math.sin(i * 1.3 + seed * 2) * 0.15
    const noise = (Math.sin(i * 7.13 + seed * 3.7) * 0.5 + 0.5) * 0.3
    peaks.push(Math.max(0.1, Math.min(1, env * 0.7 + Math.abs(wobble) + noise)))
  }
  return peaks
}

const waveformTrack: AudioPlayerItem<{ title: string; speaker: string }> = {
  id: 'waveform-demo',
  src: '/audio/chords-01.mp3',
  data: { title: 'Qualification call', speaker: 'Founders segment' },
  peaks: {
    left: generateChannel(120, 1.7),
    right: generateChannel(120, 4.2)
  }
}

const demoTracks: Array<AudioPlayerItem<{ title: string; speaker: string }>> = [
  {
    id: 'intro',
    src: '/audio/chords-02.mp3',
    data: {
      title: 'Qualification call',
      speaker: 'Founders segment'
    }
  },
  {
    id: 'follow-up',
    src: '/audio/chords-03.mp3',
    data: {
      title: 'Follow-up summary',
      speaker: 'Operator segment'
    }
  }
]

function AudioFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

function CompactPlayer() {
  return (
    <AudioPlayerProvider initialItem={demoTracks[0]}>
      <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-medium tracking-tight">
                Qualification call
              </p>
              <Badge variant="source" size="sm">
                MP3
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Founder interview excerpt
            </p>
          </div>
          <AudioPlayerButton
            item={demoTracks[0]}
            variant="primary"
            size="iconSm"
          />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <AudioPlayerTime className="w-10 text-xs" />
          <AudioPlayerProgress aria-label="Playback progress" />
          <AudioPlayerDuration className="w-10 text-right text-xs" />
        </div>
      </div>
    </AudioPlayerProvider>
  )
}

function WaveformPlayer() {
  return (
    <AudioPlayerProvider initialItem={waveformTrack}>
      <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex items-center gap-3">
          <AudioPlayerButton variant="primary" size="iconSm" />
          <div className="min-w-0 flex-1">
            <AudioPlayerWaveform aria-label="Playback progress" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <AudioPlayerTime className="text-xs" />
          <AudioPlayerDuration className="text-xs" />
        </div>
      </div>
    </AudioPlayerProvider>
  )
}

function TranscriptPlayer() {
  return (
    <AudioPlayerProvider<{ title: string; speaker: string }>>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="border-b border-border-muted p-4">
          <div className="flex flex-col gap-3 @sm/specimen:flex-row @sm/specimen:items-center @sm/specimen:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium tracking-tight">
                Conversation clips
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Shared provider state keeps row controls and transport in sync.
              </p>
            </div>
            <AudioPlayerSpeed />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <AudioPlayerButton variant="primary" size="iconSm" />
            <AudioPlayerTime className="w-10 text-xs" />
            <AudioPlayerProgress aria-label="Active clip progress" />
            <AudioPlayerDuration className="w-10 text-right text-xs" />
          </div>
        </div>
        <div className="divide-y divide-border-muted">
          {demoTracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/60"
            >
              <AudioPlayerButton item={track} size="iconSm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium tracking-tight">
                  {track.data?.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {track.data?.speaker}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AudioPlayerProvider>
  )
}

export function AudioPlayerPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Audio player"
        description="Composable playback primitives for transcript clips and call recordings. The provider owns audio state; controls can be arranged to fit compact rows or full transport bars."
      >
        <SpecimenList>
          <AudioFillRow label="Compact card">
            <CompactPlayer />
          </AudioFillRow>
          <AudioFillRow label="Waveform" token="AudioPlayerWaveform">
            <WaveformPlayer />
          </AudioFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Rows can each pass an item while the header transport controls the active clip. This matches conversation and transcription surfaces without inventing a separate player shell."
      >
        <SpecimenList>
          <AudioFillRow label="Transcript clips">
            <TranscriptPlayer />
          </AudioFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
