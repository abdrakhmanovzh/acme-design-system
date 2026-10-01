import { IconHeadphones, IconSparkles } from '@tabler/icons-react'
import type { ComponentProps, ReactNode } from 'react'

import { Badge } from '#/components/ui/badge'

import { Chapter, SpecimenList, SpecimenRow } from './preview-primitives'

type BadgeProps = ComponentProps<typeof Badge>
type BadgeVariant = NonNullable<BadgeProps['variant']>
type BadgeSize = NonNullable<BadgeProps['size']>

const overviewBadges: Array<{ label: string; variant?: BadgeVariant }> = [
  { label: 'Default' },
  { label: 'Active', variant: 'success' },
  { label: 'Pending', variant: 'warning' },
  { label: 'Failed', variant: 'destructive' }
]

const semanticVariants: Array<{ label: string; variant?: BadgeVariant }> = [
  { label: 'Default' },
  { label: 'Secondary', variant: 'secondary' },
  { label: 'Outline', variant: 'outline' }
]

const statusVariants: Array<{ label: string; variant: BadgeVariant }> = [
  { label: 'Active', variant: 'success' },
  { label: 'Draft', variant: 'status' },
  { label: 'Paused', variant: 'warning' },
  { label: 'Archived', variant: 'secondary' },
  { label: 'Syncing', variant: 'info' },
  { label: 'Error', variant: 'destructive' }
]

const sizes: Array<{ label: string; size: BadgeSize }> = [
  { label: 'Small', size: 'sm' },
  { label: 'Medium', size: 'default' },
  { label: 'Large', size: 'lg' }
]

function BadgeGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>
}

function BadgeSpecimenRow({
  label,
  token,
  children
}: {
  label: string
  token?: string
  children: ReactNode
}) {
  return (
    <SpecimenRow label={label} token={token}>
      <BadgeGroup>{children}</BadgeGroup>
    </SpecimenRow>
  )
}

export function BadgePreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Badge"
        description="Compact labels for statuses, counts, sources, and metadata."
      >
        <SpecimenList>
          <BadgeSpecimenRow label="Overview">
            {overviewBadges.map((item) => (
              <Badge key={item.label} variant={item.variant}>
                {item.label}
              </Badge>
            ))}
          </BadgeSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Variants"
        description="Semantic tokens and restrained status indicators. Specialized variants cover counts and source labels."
      >
        <SpecimenList>
          <BadgeSpecimenRow label="Semantic">
            {semanticVariants.map((item) => (
              <Badge key={item.label} variant={item.variant}>
                {item.label}
              </Badge>
            ))}
          </BadgeSpecimenRow>

          <BadgeSpecimenRow label="Status">
            {statusVariants.map((item) => (
              <Badge key={item.label} variant={item.variant}>
                {item.label}
              </Badge>
            ))}
          </BadgeSpecimenRow>

          <BadgeSpecimenRow label="Specialized">
            <Badge variant="status" size="sm">
              <IconHeadphones aria-hidden="true" />
              Transcribed
            </Badge>
            <Badge variant="count">12</Badge>
            <Badge variant="count">4 action items</Badge>
            <Badge variant="source">claude-sonnet-4</Badge>
            <Badge variant="source">API</Badge>
          </BadgeSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Sizes and composition"
        description="Three sizes for dense and roomy contexts. Badges accept icons, tag shape, and truncation."
      >
        <SpecimenList>
          <BadgeSpecimenRow label="Sizes">
            {sizes.map((item) => (
              <Badge key={item.size} size={item.size}>
                {item.label}
              </Badge>
            ))}
          </BadgeSpecimenRow>

          <BadgeSpecimenRow label="Composition">
            <Badge variant="default">
              <IconSparkles data-icon="inline-start" aria-hidden="true" />
              Suggested
            </Badge>
            <Badge variant="outline">Priority</Badge>
            <Badge variant="secondary" shape="tag">
              Tag
            </Badge>
          </BadgeSpecimenRow>

          <SpecimenRow label="Truncation" token="truncate">
            <Badge truncate>Very long workspace integration label</Badge>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
