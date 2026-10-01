import { useId } from 'react'

import { DatePicker, DateRangePicker } from '#/components/ui/date-picker'
import { Field, FieldLabel } from '#/components/ui/field'
import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

// Fixed local dates keep server and client renders identical.
const launchDate = new Date(2026, 2, 12)
const billingPeriod = { from: new Date(2026, 2, 1), to: new Date(2026, 2, 15) }

function DatePickerFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

export function DatePickerPreview() {
  const deadlineLabelId = useId()

  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Date picker"
        description="Calendar popovers for selecting a single date or a range. Built from Button, Popover, and Calendar so states follow the same overlay language."
      >
        <SpecimenList>
          <DatePickerFillRow label="Single date">
            <DatePicker defaultValue={launchDate} />
          </DatePickerFillRow>

          <DatePickerFillRow label="Placeholder">
            <DatePicker placeholder="Select launch date" />
          </DatePickerFillRow>

          <DatePickerFillRow label="Range">
            <DateRangePicker defaultValue={billingPeriod} />
          </DatePickerFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Use with Field for labels and form layout. Disabled dates pass through to Calendar."
      >
        <SpecimenList>
          <DatePickerFillRow label="Form field">
            <Field>
              <FieldLabel id={deadlineLabelId}>Review deadline</FieldLabel>
              <DatePicker
                placeholder="Pick a weekday"
                aria-describedby={deadlineLabelId}
                disabledDates={{ dayOfWeek: [0, 6] }}
              />
            </Field>
          </DatePickerFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
