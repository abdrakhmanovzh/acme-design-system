import { FieldDescription, FieldTitle } from '#/components/ui/field'
import { Checkbox } from '#/components/ui/checkbox'
import type { ComponentProps } from 'react'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

type CheckboxSize = NonNullable<ComponentProps<typeof Checkbox>['size']>

const sizeSpecimens: Array<{ label: string; token: CheckboxSize }> = [
  { label: 'Small', token: 'sm' },
  { label: 'Default', token: 'default' }
]

function CheckboxFillRow({ children, ...props }: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{children}</FillPreview>
    </SpecimenRow>
  )
}

export function CheckboxPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Checkbox"
        description="Binary selection with primary frame halo when checked or indeterminate."
      >
        <SpecimenList>
          <SpecimenRow label="Unchecked">
            <Checkbox aria-label="Enable web search" />
          </SpecimenRow>
          <SpecimenRow label="Checked">
            <Checkbox aria-label="Enable workspace files" defaultChecked />
          </SpecimenRow>
          <SpecimenRow label="Disabled" token="disabled">
            <div className="flex flex-wrap items-center gap-3">
              <Checkbox aria-label="Disabled unchecked" disabled />
              <Checkbox aria-label="Disabled checked" disabled defaultChecked />
            </div>
          </SpecimenRow>
          <SpecimenRow label="Indeterminate" token="indeterminate">
            <Checkbox aria-label="Select all" indeterminate />
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Scale"
        description="Small for dense tables; default for forms and settings cards."
      >
        <SpecimenList>
          {sizeSpecimens.map((item) => (
            <SpecimenRow
              key={item.token}
              label={item.label}
              token={`size="${item.token}"`}
            >
              <Checkbox
                size={item.token}
                aria-label={`${item.label} checkbox`}
                defaultChecked
              />
            </SpecimenRow>
          ))}
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Composed with labels in settings notifications and registry table selection."
      >
        <SpecimenList>
          <CheckboxFillRow label="Notification row">
            <label
              htmlFor="preview-checkbox-notify"
              className="flex cursor-pointer items-start gap-3 rounded-md border bg-card p-4"
            >
              <Checkbox
                id="preview-checkbox-notify"
                className="mt-0.5 shrink-0"
                defaultChecked
              />
              <div className="grid min-w-0 gap-1.5">
                <FieldTitle>Run-completed webhook</FieldTitle>
                <FieldDescription>
                  Notify your endpoint when an agent run finishes.
                </FieldDescription>
              </div>
            </label>
          </CheckboxFillRow>
          <SpecimenRow label="Select all">
            <Checkbox aria-label="Select all" indeterminate />
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
