import { IconDots, IconTrendingUp } from '@tabler/icons-react'

import { Button } from '#/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '#/components/ui/card'
import { Progress } from '#/components/ui/progress'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

function CardFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

export function CardPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Card"
        description="Use cards as structured content surfaces for summaries, settings, and dashboard panels."
      >
        <SpecimenList>
          <CardFillRow label="Dashboard">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Conversation volume</CardTitle>
                  <CardDescription>
                    Last 30 days across all channels.
                  </CardDescription>
                </div>
                <CardAction>
                  <Button
                    variant="ghost"
                    size="iconSm"
                    aria-label="More options"
                  >
                    <IconDots data-slot="icon" aria-hidden="true" />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-semibold tracking-tight tabular-nums">
                    12,842
                  </p>
                  <p className="mb-1 inline-flex items-center gap-1 text-xs font-medium text-success-foreground">
                    <IconTrendingUp className="size-3.5" aria-hidden="true" />
                    18.2%
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border text-xs text-muted-foreground">
                Updated 4 minutes ago
              </CardFooter>
            </Card>
          </CardFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Structure"
        description="Cards provide semantic slots with built-in spacing and action alignment."
      >
        <SpecimenList>
          <CardFillRow label="Header action">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Inbox</CardTitle>
                  <CardDescription>12 unassigned conversations</CardDescription>
                </div>
                <CardAction>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </CardAction>
              </CardHeader>
            </Card>
          </CardFillRow>

          <CardFillRow label="Content only">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium tracking-tight">
                  Compact note
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Card slots accept className overrides when a composition needs
                  tighter rhythm.
                </p>
              </CardContent>
            </Card>
          </CardFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Framed"
        description="Adds a faded outer ring for a single hero or featured surface per page. Do not nest."
      >
        <SpecimenList>
          <CardFillRow label="Featured" token="framed">
            <div className="p-1.5">
              <Card framed>
                <CardHeader>
                  <div>
                    <CardTitle>Active plan</CardTitle>
                    <CardDescription>
                      Team · 5 of 10 seats used.
                    </CardDescription>
                  </div>
                  <CardAction>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Monthly usage</span>
                    <span className="font-medium tabular-nums">78%</span>
                  </div>
                  <Progress value={78} className="mt-2" />
                </CardContent>
              </Card>
            </div>
          </CardFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
