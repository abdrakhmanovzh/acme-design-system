import { Avatar } from '#/components/ui/avatar'

import { Chapter, SpecimenList, SpecimenRow } from './preview-primitives'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const shapes = ['circle', 'rounded', 'square'] as const

export function AvatarPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Avatar"
        description="Identity for people and agents. Pass name for initials (max two letters), or src for an image with initials as fallback."
      >
        <SpecimenList>
          <SpecimenRow label="Initials" token="name">
            <Avatar size="sm" name="Support copilot" shape="rounded" />
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Scale"
        description="Five sizes from compact table cells to profile headers."
      >
        <SpecimenList>
          {sizes.map((size) => (
            <SpecimenRow key={size} label={size} token={`size="${size}"`}>
              <Avatar size={size} name="AR" />
            </SpecimenRow>
          ))}
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Shapes"
        description="Circle for people, rounded for agents, square for integrations."
      >
        <SpecimenList>
          {shapes.map((shape) => (
            <SpecimenRow key={shape} label={shape} token={`shape="${shape}"`}>
              <Avatar size="md" name="Alex Rivera" shape={shape} />
            </SpecimenRow>
          ))}
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Overlapping stack in conversation lists and assignee pickers."
      >
        <SpecimenList>
          <SpecimenRow label="Stack">
            <div className="flex -space-x-2">
              <Avatar size="md" name="Jamie Doe" className="ring-2 ring-card" />
              <Avatar
                size="md"
                name="Aman Mira"
                className="bg-primary/10 text-primary ring-2 ring-card"
              />
              <Avatar
                size="md"
                fallback="+4"
                className="ring-2 ring-card"
                fallbackProps={{ className: 'bg-foreground text-background' }}
              />
            </div>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
