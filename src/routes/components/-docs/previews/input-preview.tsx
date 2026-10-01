import { IconKey, IconSearch, IconX } from '@tabler/icons-react'

import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from '#/components/ui/input'
import type { ComponentProps } from 'react'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

type InputSize = NonNullable<ComponentProps<typeof Input>['size']>

function InputSpecimenRow({ children, ...props }: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{children}</FillPreview>
    </SpecimenRow>
  )
}

const sizeSpecimens: Array<{ label: string; token: InputSize }> = [
  { label: 'Small', token: 'sm' },
  { label: 'Default', token: 'default' },
  { label: 'Large', token: 'lg' }
]

export function InputPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Input"
        description="Single-line fields on card surfaces. No hover tint — focus ring only."
      >
        <SpecimenList>
          <InputSpecimenRow label="Default">
            <Input
              name="preview-default"
              placeholder="Customer support copilot"
            />
          </InputSpecimenRow>
          <InputSpecimenRow label="Disabled" token="disabled">
            <Input
              name="preview-disabled"
              disabled
              placeholder="Customer support copilot"
            />
          </InputSpecimenRow>
          <InputSpecimenRow label="Invalid" token="aria-invalid">
            <Input
              name="preview-invalid"
              aria-invalid
              defaultValue="support-copilot"
              placeholder="support-copilot"
            />
          </InputSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Scale"
        description="Heights align with button sm, default, and lg."
      >
        <SpecimenList>
          {sizeSpecimens.map((item) => (
            <InputSpecimenRow
              key={item.token}
              label={item.label}
              token={`size="${item.token}"`}
            >
              <Input
                size={item.token}
                placeholder="Search by name or identifier"
              />
            </InputSpecimenRow>
          ))}
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Input group"
        description="Shared border and focus ring across InputGroupInput, addons, and group buttons."
      >
        <SpecimenList>
          <InputSpecimenRow label="Text prefix">
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>agents/</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                name="preview-slug"
                placeholder="support-copilot"
              />
            </InputGroup>
          </InputSpecimenRow>

          <InputSpecimenRow label="Icon prefix">
            <InputGroup>
              <InputGroupAddon>
                <IconSearch className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                name="preview-search"
                placeholder="Search transcript"
              />
            </InputGroup>
          </InputSpecimenRow>

          <InputSpecimenRow label="Password" token='type="password"'>
            <InputGroup>
              <InputGroupAddon>
                <IconKey
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                />
              </InputGroupAddon>
              <InputGroupInput
                name="preview-secret"
                type="password"
                defaultValue="whsec_8a8d2b0e7f1c…"
              />
            </InputGroup>
          </InputSpecimenRow>

          <InputSpecimenRow label="End action">
            <InputGroup>
              <InputGroupInput
                name="preview-clearable"
                defaultValue="support-copilot"
              />
              <InputGroupButton type="button" aria-label="Clear">
                <IconX data-slot="icon" aria-hidden="true" />
              </InputGroupButton>
            </InputGroup>
          </InputSpecimenRow>

          <InputSpecimenRow label="Textarea">
            <InputGroup size="lg">
              <InputGroupAddon align="block-start">
                <InputGroupText>Notes</InputGroupText>
              </InputGroupAddon>
              <InputGroupTextarea
                name="preview-notes"
                placeholder="Add routing notes for this agent"
              />
            </InputGroup>
          </InputSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Types"
        description="Native type attribute on Input and InputGroupInput."
      >
        <SpecimenList>
          <InputSpecimenRow label="URL" token='type="url"'>
            <Input
              type="url"
              name="preview-url"
              defaultValue="https://hooks.northwind.io/agents/support-copilot"
            />
          </InputSpecimenRow>
          <InputSpecimenRow label="Email" token='type="email"'>
            <Input
              type="email"
              name="preview-email"
              placeholder="alerts@northwind.io"
            />
          </InputSpecimenRow>
          <InputSpecimenRow label="Number" token='type="number"'>
            <Input
              type="number"
              name="preview-number"
              defaultValue="30"
              min={0}
              max={120}
            />
          </InputSpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
