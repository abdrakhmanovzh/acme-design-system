import { ShimmeringText } from '#/components/ui/shimmering-text'

import { Chapter, SpecimenList, SpecimenRow } from './preview-primitives'

const shimmerSpecimens = [
  {
    label: 'Default',
    text: 'Searching the registry…'
  },
  {
    label: 'Slow sweep',
    token: 'duration={3.5}',
    text: 'Analyzing agent capabilities…',
    duration: 3.5
  },
  {
    label: 'One shot',
    token: 'repeat={false}',
    text: 'Connection verified',
    repeat: false
  },
  {
    label: 'Compact',
    token: 'spread={1}',
    text: 'Syncing…',
    spread: 1
  }
]

export function ShimmeringTextPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Shimmering text"
        description="Animated gradient text for transient loading labels, AI-thinking states, and spotlighted inline copy. The shimmer starts on view by default."
      >
        <SpecimenList>
          {shimmerSpecimens.map((item) => (
            <SpecimenRow key={item.label} label={item.label} token={item.token}>
              <ShimmeringText
                text={item.text}
                duration={item.duration}
                repeat={item.repeat}
                spread={item.spread}
                className="text-sm font-medium"
              />
            </SpecimenRow>
          ))}
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Use a restrained font weight and semantic colors so the motion reads as activity without overpowering nearby interface chrome."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border-muted bg-card p-5">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Agent handoff</p>
              <ShimmeringText
                text="Drafting a response from recent context…"
                duration={2.4}
                repeatDelay={0.8}
                className="text-sm"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border-muted bg-card p-5">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Hero headline</p>
              <ShimmeringText
                text="AI-native registry primitives"
                duration={3}
                spread={3}
                color="color-mix(in oklab, var(--primary) 40%, transparent)"
                shimmerColor="var(--primary)"
                className="text-xl font-semibold tracking-tight"
              />
            </div>
          </div>
        </div>
      </Chapter>
    </div>
  )
}
