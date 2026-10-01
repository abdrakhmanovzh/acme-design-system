import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'

import { Chapter, SpecimenList, SpecimenRow } from './preview-primitives'

export function SpinnerPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Sizes"
        description="The default spinner is 16px in layout, with the SVG artboard preserving the pill-bar proportions. Scale with size utilities when needed."
      >
        <SpecimenList>
          <SpecimenRow label="Small" token='className="size-3"'>
            <Spinner className="size-3" />
          </SpecimenRow>
          <SpecimenRow label="Default" token="default">
            <Spinner />
          </SpecimenRow>
          <SpecimenRow label="Large" token='className="size-6"'>
            <Spinner className="size-6" />
          </SpecimenRow>
          <SpecimenRow label="Very big" token='className="size-16"'>
            <Spinner className="size-16" />
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Color"
        description="Spinner uses currentColor, so it inherits foreground, semantic, or parent text color without extra props."
      >
        <SpecimenList>
          <SpecimenRow label="Muted">
            <Spinner className="text-muted-foreground" />
          </SpecimenRow>
          <SpecimenRow label="Primary">
            <Spinner className="text-primary" />
          </SpecimenRow>
          <SpecimenRow label="Destructive">
            <Spinner className="text-destructive" />
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Composition"
        description="Use it inline for loading copy, or compose it inside disabled controls to indicate pending actions."
      >
        <SpecimenList>
          <SpecimenRow label="Inline status">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner aria-hidden="true" />
              Syncing transcript…
            </div>
          </SpecimenRow>
          <SpecimenRow label="Button loading">
            <Button disabled>
              <Spinner aria-hidden="true" />
              Saving…
            </Button>
          </SpecimenRow>
          <SpecimenRow label="Icon button" token='size="icon"'>
            <Button size="icon" disabled aria-label="Saving">
              <Spinner aria-hidden="true" />
            </Button>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
