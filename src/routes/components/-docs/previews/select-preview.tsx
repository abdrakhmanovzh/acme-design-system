import { Field, FieldLabel } from '#/components/ui/field'
import { NativeSelect } from '#/components/ui/native-select'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select'
import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

const providerItems = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'google', label: 'Google' },
  { value: 'custom', label: 'Custom endpoint' }
]

const modelItems = [
  { value: 'gpt-4.1', label: 'GPT-4.1' },
  { value: 'claude-sonnet-4', label: 'Claude Sonnet 4' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
  { value: 'custom-model', label: 'Custom model' }
]

const groupedModelItems = [
  {
    label: 'Frontier',
    items: modelItems.slice(0, 3)
  },
  {
    label: 'Custom',
    items: [modelItems[3]!]
  }
]

const statusItems = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'paused', label: 'Paused' },
  { value: 'archived', label: 'Archived' }
]

function ProviderSelect({
  defaultValue = 'anthropic',
  disabled,
  placeholder,
  size
}: {
  defaultValue?: string
  disabled?: boolean
  placeholder?: string
  size?: 'sm' | 'default' | 'lg'
}) {
  return (
    <Select
      items={providerItems}
      disabled={disabled}
      {...(defaultValue !== undefined ? { defaultValue } : {})}
    >
      <SelectTrigger aria-label="Provider" size={size}>
        <SelectValue placeholder={placeholder ?? 'Select provider'} />
      </SelectTrigger>
      <SelectContent>
        {providerItems.map((item) => (
          <SelectItem key={item.value} value={item.value} label={item.label}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function SelectFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

export function SelectPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Select"
        description="Pass items on Select so the trigger shows labels, not raw values."
      >
        <SpecimenList>
          <SelectFillRow label="Default">
            <ProviderSelect />
          </SelectFillRow>
          <SelectFillRow label="Placeholder">
            <ProviderSelect placeholder="Select provider" />
          </SelectFillRow>
          <SelectFillRow label="Disabled" token="disabled">
            <ProviderSelect disabled />
          </SelectFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Scale"
        description="Trigger heights align with Input and Button sm, default, and lg."
      >
        <SpecimenList>
          <SelectFillRow label="Small" token='size="sm"'>
            <ProviderSelect size="sm" />
          </SelectFillRow>
          <SelectFillRow label="Default">
            <ProviderSelect />
          </SelectFillRow>
          <SelectFillRow label="Large" token='size="lg"'>
            <ProviderSelect size="lg" />
          </SelectFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Grouped options"
        description="SelectGroup, SelectLabel, and SelectSeparator for long option lists."
      >
        <SpecimenList>
          <SelectFillRow label="Grouped">
            <Select items={groupedModelItems} defaultValue="claude-sonnet-4">
              <SelectTrigger aria-label="Base model grouped">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Frontier</SelectLabel>
                  {modelItems.slice(0, 3).map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      label={item.label}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Custom</SelectLabel>
                  <SelectItem
                    value={modelItems[3]!.value}
                    label={modelItems[3]!.label}
                  >
                    {modelItems[3]!.label}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </SelectFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Native select"
        description="HTML select with the same trigger shell as custom Select — for simple forms and mobile-friendly flows."
      >
        <SpecimenList>
          <SelectFillRow label="Region">
            <NativeSelect name="preview-native-region" defaultValue="us-east-1">
              <option value="us-east-1">us-east-1 · N. Virginia</option>
              <option value="us-west-2">us-west-2 · Oregon</option>
              <option value="eu-west-1">eu-west-1 · Ireland</option>
              <option value="eu-central-1">eu-central-1 · Frankfurt</option>
              <option value="ap-southeast-1">ap-southeast-1 · Singapore</option>
            </NativeSelect>
          </SelectFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Provider and model fields from agent registration; compact filter from the registry table."
      >
        <SpecimenList>
          <SelectFillRow label="Capability">
            <div className="grid gap-4 @md/specimen:grid-cols-2">
              <Field>
                <FieldLabel>Provider</FieldLabel>
                <ProviderSelect />
              </Field>
              <Field>
                <FieldLabel>Base model</FieldLabel>
                <Select items={modelItems} defaultValue="claude-sonnet-4">
                  <SelectTrigger aria-label="Base model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {modelItems.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        label={item.label}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </SelectFillRow>
          <SpecimenRow label="Status filter">
            <Select items={statusItems} defaultValue="all">
              <SelectTrigger aria-label="Status" className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusItems.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    label={item.label}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
