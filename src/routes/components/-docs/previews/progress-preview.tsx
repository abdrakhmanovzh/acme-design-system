import type { ComponentProps } from 'react'

import {
  Progress,
  ProgressLabel,
  ProgressValue
} from '#/components/ui/progress'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

type ProgressProps = ComponentProps<typeof Progress>

const progressSpecimens: Array<{
  label: string
  token?: string
  progressProps: ProgressProps
  labelText: string
  showValue?: boolean
}> = [
  {
    label: 'Simple',
    progressProps: { value: 62, 'aria-label': 'Monthly usage' },
    labelText: 'Monthly usage'
  },
  {
    label: 'Segmented',
    token: 'variant="segmented"',
    progressProps: {
      variant: 'segmented',
      value: 48,
      'aria-label': 'Indexing progress'
    },
    labelText: 'Indexing knowledge'
  },
  {
    label: 'Small',
    token: 'size="sm"',
    progressProps: { value: 71, size: 'sm', 'aria-label': 'Token quota' },
    labelText: 'Token quota'
  },
  {
    label: 'Indeterminate',
    progressProps: { value: null, 'aria-label': 'Syncing agents' },
    labelText: 'Syncing agents',
    showValue: false
  }
]

function ProgressFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

export function ProgressPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Progress"
        description="Determinate fill with a 500ms ramp. Default variant is simple; segmented uses a tick mask. Omit value for a static indeterminate track."
      >
        <SpecimenList>
          {progressSpecimens.map((item) => (
            <ProgressFillRow
              key={item.label}
              label={item.label}
              token={item.token}
            >
              <Progress {...item.progressProps}>
                <ProgressLabel>{item.labelText}</ProgressLabel>
                {item.showValue !== false ? <ProgressValue /> : null}
              </Progress>
            </ProgressFillRow>
          ))}
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Elevated quota uses indicatorClassName with bg-info-foreground — saturated enough for the muted track, distinct from primary. Dashboard cards keep the default fill."
      >
        <SpecimenList>
          <ProgressFillRow
            label="Quota cell"
            token='indicatorClassName="bg-info-foreground"'
          >
            <div className="flex items-center gap-3">
              <Progress
                value={88}
                size="sm"
                className="min-w-0 flex-1"
                aria-label="Token quota"
                indicatorClassName="bg-info-foreground"
              />
              <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                88%
              </span>
            </div>
          </ProgressFillRow>

          <ProgressFillRow label="Active plan">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Monthly usage</span>
                <span className="font-medium tabular-nums">78%</span>
              </div>
              <Progress value={78} aria-label="Monthly usage" />
            </div>
          </ProgressFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
