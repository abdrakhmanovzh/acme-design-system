import { FieldDescription, FieldTitle } from '#/components/ui/field'
import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group'
import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

const verticalOptions = [
  {
    value: 'private',
    label: 'Only you can use this agent'
  },
  {
    value: 'workspace',
    label: 'Available to everyone in your workspace'
  },
  {
    value: 'organization',
    label: 'Discoverable across the entire organization'
  }
] as const

const retentionOptions = [
  { value: '30d', label: '30 days', detail: 'GDPR-tight' },
  { value: '90d', label: '90 days', detail: 'Default · recommended' },
  { value: '365d', label: '1 year', detail: 'Audit ready' }
] as const

function RadioGroupFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

export function RadioGroupPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Radio group"
        description="Layout-neutral group for mutually exclusive choices. Focus halo shifts to primary when an item is checked."
      >
        <SpecimenList>
          <RadioGroupFillRow label="Vertical">
            <RadioGroup
              defaultValue="workspace"
              aria-label="Visibility"
              className="grid gap-3"
            >
              {verticalOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <RadioGroupItem value={opt.value} className="shrink-0" />
                  <span className="text-sm font-medium">{opt.label}</span>
                </label>
              ))}
            </RadioGroup>
          </RadioGroupFillRow>
          <RadioGroupFillRow label="Disabled" token="disabled">
            <RadioGroup
              defaultValue="workspace"
              disabled
              aria-label="Visibility disabled"
              className="grid gap-3"
            >
              {verticalOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <RadioGroupItem value={opt.value} className="shrink-0" />
                  <span className="text-sm font-medium">{opt.label}</span>
                </label>
              ))}
            </RadioGroup>
          </RadioGroupFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Card-style options in agent registration and retention settings."
      >
        <SpecimenList>
          <RadioGroupFillRow label="Retention">
            <RadioGroup
              defaultValue="90d"
              aria-label="Transcript retention"
              className="grid gap-2 @md/specimen:grid-cols-3"
            >
              {retentionOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-start gap-3 rounded-md border bg-card p-3 text-foreground transition-colors hover:bg-muted/40"
                >
                  <RadioGroupItem
                    value={opt.value}
                    className="mt-0.5 shrink-0"
                  />
                  <div className="grid min-w-0 gap-1.5">
                    <FieldTitle>{opt.label}</FieldTitle>
                    <FieldDescription>{opt.detail}</FieldDescription>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </RadioGroupFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
