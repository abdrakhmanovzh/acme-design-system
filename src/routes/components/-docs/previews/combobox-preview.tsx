import {
  Combobox,
  ComboboxAnchor,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger
} from '#/components/ui/combobox'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

type ProviderOption = {
  value: string
  label: string
}

const providerItems: ProviderOption[] = [
  { value: 'all', label: 'All providers' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'google', label: 'Google' },
  { value: 'custom', label: 'Custom endpoint' }
]

function ProviderCombobox({
  defaultValue = providerItems[0],
  disabled,
  className,
  clearable
}: {
  defaultValue?: ProviderOption
  disabled?: boolean
  className?: string
  clearable?: boolean
}) {
  return (
    <Combobox
      items={providerItems}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <ComboboxAnchor className={className}>
        <ComboboxInput placeholder="Provider" />
        {clearable ? <ComboboxClear aria-label="Clear provider" /> : null}
        <ComboboxTrigger aria-label="Filter by provider" />
      </ComboboxAnchor>
      <ComboboxContent>
        <ComboboxList>
          {(provider: ProviderOption) => (
            <ComboboxItem key={provider.value} value={provider}>
              {provider.label}
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No providers found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}

function ComboboxFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

export function ComboboxPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Combobox"
        description="Searchable single-select. Pass items and use object values with label for the input text."
      >
        <SpecimenList>
          <ComboboxFillRow label="Default">
            <ProviderCombobox />
          </ComboboxFillRow>
          <ComboboxFillRow label="Clearable">
            <ProviderCombobox clearable />
          </ComboboxFillRow>
          <ComboboxFillRow label="Disabled" token="disabled">
            <ProviderCombobox disabled />
          </ComboboxFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Empty state"
        description="ComboboxEmpty appears when filtering returns no matches."
      >
        <SpecimenList>
          <ComboboxFillRow label="No results">
            <Combobox items={providerItems} defaultValue={providerItems[1]}>
              <ComboboxAnchor>
                <ComboboxInput placeholder="Provider" />
                <ComboboxTrigger aria-label="Filter by provider" />
              </ComboboxAnchor>
              <ComboboxContent>
                <ComboboxList>
                  {(provider: ProviderOption) => (
                    <ComboboxItem key={provider.value} value={provider}>
                      {provider.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
                <ComboboxEmpty>No providers found.</ComboboxEmpty>
              </ComboboxContent>
            </Combobox>
          </ComboboxFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Compact provider filter in the agent registry table toolbar."
      >
        <SpecimenList>
          <SpecimenRow label="Registry filter">
            <ProviderCombobox className="w-44" />
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
