import {
  IconBookmark,
  IconDownload,
  IconShare3,
  IconTrash
} from '@tabler/icons-react'

import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'
import type { ComponentProps, ReactNode } from 'react'

import { Chapter, SpecimenList, SpecimenRow } from './preview-primitives'

type Variant = NonNullable<ComponentProps<typeof Button>['variant']>
type Size = NonNullable<ComponentProps<typeof Button>['size']>

const variantSpecimens: Array<{
  label: string
  token: Variant
  preview: ReactNode
}> = [
  {
    label: 'Primary',
    token: 'primary',
    preview: <Button variant="primary">Register agent</Button>
  },
  {
    label: 'Outline',
    token: 'outline',
    preview: <Button variant="outline">Edit</Button>
  },
  {
    label: 'Ghost',
    token: 'ghost',
    preview: <Button variant="ghost">Cancel</Button>
  },
  {
    label: 'Destructive',
    token: 'destructive',
    preview: (
      <Button variant="destructive">
        <IconTrash data-slot="icon" aria-hidden="true" />
        Delete agent
      </Button>
    )
  }
]

const sizeSpecimens: Array<{
  label: string
  token: Size
  iconSize: Size
}> = [
  { label: 'Small', token: 'sm', iconSize: 'iconSm' },
  { label: 'Default', token: 'default', iconSize: 'icon' },
  { label: 'Large', token: 'lg', iconSize: 'iconLg' }
]

export function ButtonPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Variants"
        description="Four emphasis levels from primary CTAs to destructive removal. Outline is the default when variant is omitted."
      >
        <SpecimenList>
          {variantSpecimens.map((item) => (
            <SpecimenRow
              key={item.token}
              label={item.label}
              token={`variant="${item.token}"`}
            >
              {item.preview}
            </SpecimenRow>
          ))}
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Scale"
        description="Three text heights and matching icon-only squares. Product UI stays on default unless density demands sm."
      >
        <SpecimenList>
          {sizeSpecimens.map((item) => (
            <SpecimenRow
              key={item.token}
              label={item.label}
              token={`size="${item.token}"`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <Button size={item.token} variant="outline">
                  Transfer
                </Button>
                <Button
                  size={item.iconSize}
                  variant="ghost"
                  aria-label={`${item.label} action`}
                >
                  <IconDownload data-slot="icon" aria-hidden="true" />
                </Button>
              </div>
            </SpecimenRow>
          ))}
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Placement"
        description="Common pairings from agent registration, settings, and transcript toolbars."
      >
        <SpecimenList>
          <SpecimenRow label="Form footer">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="ghost">Save draft</Button>
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary">Register agent</Button>
            </div>
          </SpecimenRow>
          <SpecimenRow label="Icon toolbar">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Bookmark">
                <IconBookmark data-slot="icon" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Share">
                <IconShare3 data-slot="icon" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Download">
                <IconDownload data-slot="icon" aria-hidden="true" />
              </Button>
            </div>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Interaction"
        description="No built-in loading prop — compose Spinner as a child. Press uses active scale on the control."
      >
        <SpecimenList>
          <SpecimenRow label="Disabled" token="disabled">
            <Button disabled>Save general</Button>
          </SpecimenRow>
          <SpecimenRow label="Loading">
            <Button>
              <Spinner aria-hidden="true" />
              Saving…
            </Button>
          </SpecimenRow>
          <SpecimenRow label="Icon loading" token='size="icon"'>
            <Button size="icon" aria-label="Saving">
              <Spinner aria-hidden="true" />
            </Button>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
