import { IconDots, IconInfoCircle } from '@tabler/icons-react'

import { Button } from '#/components/ui/button'
import { Progress } from '#/components/ui/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '#/components/ui/tooltip'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

function TooltipFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview className="flex justify-end">{props.children}</FillPreview>
    </SpecimenRow>
  )
}

export function TooltipPreview() {
  return (
    <TooltipProvider>
      <div className="flex w-full flex-col">
        <Chapter
          title="Tooltip"
          description="Short, non-interactive helper text. Wrap the page or section in TooltipProvider — default delay 500ms, placement top."
        >
          <SpecimenList>
            <SpecimenRow label="Icon button">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="iconSm"
                      aria-label="Row actions"
                    >
                      <IconDots data-slot="icon" aria-hidden="true" />
                    </Button>
                  }
                />
                <TooltipContent>More actions</TooltipContent>
              </Tooltip>
            </SpecimenRow>

            <SpecimenRow label="Placement" token='side="bottom"'>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="outline" size="sm">
                      Near page edge
                    </Button>
                  }
                />
                <TooltipContent side="bottom">
                  Flip side when the default top placement would clip.
                </TooltipContent>
              </Tooltip>
            </SpecimenRow>
          </SpecimenList>
        </Chapter>

        <Chapter
          title="In context"
          description="Metric labels and compact quota cells where space is tight."
        >
          <SpecimenList>
            <TooltipFillRow label="Metric hint">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium tracking-tight text-muted-foreground uppercase">
                  Resolution rate
                </span>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        aria-label="What is resolution rate?"
                        className="text-muted-foreground/70 transition-colors hover:text-foreground"
                      >
                        <IconInfoCircle
                          className="size-3.5"
                          aria-hidden="true"
                        />
                      </button>
                    }
                  />
                  <TooltipContent>
                    Share of conversations resolved without human takeover.
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipFillRow>

            <TooltipFillRow label="Quota bar">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      className="flex w-32 items-center gap-2 rounded-sm text-left focus-visible:shadow-frame-ring focus-visible:outline-none"
                      aria-label="Quota usage: 71 percent of monthly conversations used"
                    >
                      <Progress value={71} size="sm" className="flex-1" />
                      <span className="w-9 text-right font-mono text-xs text-muted-foreground tabular-nums">
                        71%
                      </span>
                    </button>
                  }
                />
                <TooltipContent>
                  71% of the monthly conversation quota has been used.
                </TooltipContent>
              </Tooltip>
            </TooltipFillRow>
          </SpecimenList>
        </Chapter>
      </div>
    </TooltipProvider>
  )
}
