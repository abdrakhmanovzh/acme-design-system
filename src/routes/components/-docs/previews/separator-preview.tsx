import { IconBookmark, IconDownload, IconShare3 } from '@tabler/icons-react'

import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'

import { Chapter, SpecimenList, SpecimenRow } from './preview-primitives'

export function SeparatorPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Separator"
        description="1px hairline dividers. Horizontal for section breaks; vertical for inline tool groups."
      >
        <SpecimenList>
          <SpecimenRow label="Horizontal">
            <div className="w-full space-y-4 rounded-xl border bg-card px-4 py-4">
              <p className="text-sm font-medium tracking-tight">
                General settings
              </p>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Model and routing options below the divider.
              </p>
            </div>
          </SpecimenRow>

          <SpecimenRow label="Vertical" token='orientation="vertical"'>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="Bookmark">
                <IconBookmark data-slot="icon" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Share">
                <IconShare3 data-slot="icon" aria-hidden="true" />
              </Button>
              <Separator orientation="vertical" className="h-5" />
              <Button variant="ghost" size="icon" aria-label="Download">
                <IconDownload data-slot="icon" aria-hidden="true" />
              </Button>
            </div>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
