import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Switch } from '#/components/ui/switch'
import { Textarea } from '#/components/ui/textarea'
import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

function FieldSpecimenRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

export function FieldPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Field"
        description="Vertical label–control–helper stack. Default orientation when omitted."
      >
        <SpecimenList>
          <FieldSpecimenRow label="Default">
            <Field>
              <FieldLabel htmlFor="preview-field-name">Agent name</FieldLabel>
              <Input
                id="preview-field-name"
                placeholder="Customer support copilot"
              />
            </Field>
          </FieldSpecimenRow>
          <FieldSpecimenRow label="Required" token="required">
            <Field>
              <FieldLabel htmlFor="preview-field-required" required>
                Agent name
              </FieldLabel>
              <Input
                id="preview-field-required"
                placeholder="Customer support copilot"
              />
            </Field>
          </FieldSpecimenRow>
          <FieldSpecimenRow label="Description">
            <Field>
              <FieldLabel htmlFor="preview-field-slug">Identifier</FieldLabel>
              <Input id="preview-field-slug" placeholder="support-copilot" />
              <FieldDescription>Used in API calls and URLs.</FieldDescription>
            </Field>
          </FieldSpecimenRow>
          <FieldSpecimenRow label="Error">
            <Field>
              <FieldLabel htmlFor="preview-field-error" required>
                Identifier
              </FieldLabel>
              <Input
                id="preview-field-error"
                aria-invalid
                defaultValue="support-copilot"
              />
              <FieldError
                errors={[{ message: 'Identifier is already in use.' }]}
              />
            </Field>
          </FieldSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Orientation"
        description="Horizontal and responsive pair labels with controls on wider breakpoints."
      >
        <SpecimenList>
          <FieldSpecimenRow label="Horizontal" token='orientation="horizontal"'>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="preview-field-horizontal">
                Email alerts
              </FieldLabel>
              <Switch id="preview-field-horizontal" defaultChecked />
            </Field>
          </FieldSpecimenRow>
          <FieldSpecimenRow label="Responsive" token='orientation="responsive"'>
            <Field orientation="responsive">
              <FieldLabel htmlFor="preview-field-responsive">
                Digest frequency
              </FieldLabel>
              <Input id="preview-field-responsive" defaultValue="Daily" />
            </Field>
          </FieldSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Grouping"
        description="FieldSet and FieldLegend for form sections; FieldGroup spaces multiple sections."
      >
        <SpecimenList>
          <FieldSpecimenRow label="FieldSet">
            <FieldSet>
              <FieldLegend className="mb-3">Identity</FieldLegend>
              <div className="grid gap-4 @md/specimen:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="preview-set-name">Agent name</FieldLabel>
                  <Input
                    id="preview-set-name"
                    placeholder="Customer support copilot"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="preview-set-slug">Identifier</FieldLabel>
                  <Input id="preview-set-slug" placeholder="support-copilot" />
                </Field>
              </div>
            </FieldSet>
          </FieldSpecimenRow>
          <FieldSpecimenRow label="FieldGroup">
            <FieldGroup>
              <FieldSet>
                <FieldLegend className="mb-3">Prompt</FieldLegend>
                <Field>
                  <FieldLabel htmlFor="preview-group-prompt">
                    System prompt
                  </FieldLabel>
                  <Textarea
                    id="preview-group-prompt"
                    className="min-h-20"
                    placeholder="You are a helpful assistant for the support team."
                  />
                </Field>
              </FieldSet>
              <FieldSeparator>Advanced</FieldSeparator>
              <FieldSet>
                <Field>
                  <FieldLabel htmlFor="preview-group-webhook">
                    Endpoint URL
                  </FieldLabel>
                  <Input
                    id="preview-group-webhook"
                    type="url"
                    defaultValue="https://hooks.northwind.io/agents/support-copilot"
                  />
                </Field>
              </FieldSet>
            </FieldGroup>
          </FieldSpecimenRow>
          <FieldSpecimenRow label="FieldTitle" token="settings row">
            <label
              htmlFor="preview-field-title-switch"
              className="flex cursor-pointer items-center justify-between gap-4 rounded-md border bg-card p-4"
            >
              <div className="grid min-w-0 gap-1.5">
                <FieldTitle>Run-completed webhook</FieldTitle>
                <FieldDescription>
                  Notify your endpoint when an agent run finishes.
                </FieldDescription>
              </div>
              <Switch
                id="preview-field-title-switch"
                className="shrink-0"
                defaultChecked
              />
            </label>
          </FieldSpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
