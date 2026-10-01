import { IconWorld } from '@tabler/icons-react'

import { FieldDescription, FieldTitle } from '#/components/ui/field'
import { Switch } from '#/components/ui/switch'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

function SwitchFillRow({ children, ...props }: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{children}</FillPreview>
    </SpecimenRow>
  )
}

export function SwitchPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Switch"
        description="Toggle for on/off preferences. Checked state uses the primary frame halo."
      >
        <SpecimenList>
          <SpecimenRow label="Off">
            <Switch aria-label="Web search" />
          </SpecimenRow>
          <SpecimenRow label="On">
            <Switch aria-label="Workspace files" defaultChecked />
          </SpecimenRow>
          <SpecimenRow label="Disabled" token="disabled">
            <div className="flex flex-wrap items-center gap-3">
              <Switch aria-label="Disabled off" disabled />
              <Switch aria-label="Disabled on" disabled defaultChecked />
            </div>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter title="Scale" description="Small and default switch sizes.">
        <SpecimenList>
          <SpecimenRow label="Small" token='size="sm"'>
            <div className="flex flex-wrap items-center gap-3">
              <Switch size="sm" aria-label="Small off" />
              <Switch size="sm" aria-label="Small on" defaultChecked />
            </div>
          </SpecimenRow>
          <SpecimenRow label="Default" token='size="default"'>
            <div className="flex flex-wrap items-center gap-3">
              <Switch aria-label="Default off" />
              <Switch aria-label="Default on" defaultChecked />
            </div>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Tool toggles in agent registration and inline settings rows."
      >
        <SpecimenList>
          <SwitchFillRow label="Tool row">
            <label
              htmlFor="preview-switch-tool"
              className="flex cursor-pointer items-center justify-between gap-4 rounded-md border bg-card p-4"
            >
              <div className="flex min-w-0 gap-3">
                <IconWorld
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                />
                <div className="min-w-0">
                  <div className="text-sm leading-none font-medium">
                    Web search
                  </div>
                  <div className="mt-1.5 text-xs leading-5 text-muted-foreground">
                    Let the agent fetch live results from the public web.
                  </div>
                </div>
              </div>
              <Switch
                id="preview-switch-tool"
                className="shrink-0"
                defaultChecked
              />
            </label>
          </SwitchFillRow>
          <SwitchFillRow label="Settings row">
            <div className="flex items-center justify-between gap-4 rounded-md bg-muted/40 p-3 text-foreground">
              <div className="grid min-w-0 gap-1.5">
                <FieldTitle>Retry on 5xx</FieldTitle>
                <FieldDescription>
                  Up to 5 attempts with exponential backoff.
                </FieldDescription>
              </div>
              <Switch
                aria-label="Retry on 5xx"
                className="shrink-0"
                defaultChecked
              />
            </div>
          </SwitchFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
