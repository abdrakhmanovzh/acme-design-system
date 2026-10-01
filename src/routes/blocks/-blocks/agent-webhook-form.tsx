import { IconKey } from '@tabler/icons-react'

import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '#/components/ui/card'
import { Checkbox } from '#/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle
} from '#/components/ui/field'
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '#/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select'
import { Switch } from '#/components/ui/switch'

const EVENTS = [
  {
    id: 'event-run-completed',
    label: 'Run completed',
    description: 'Fires when an agent run finishes successfully.',
    defaultChecked: true
  },
  {
    id: 'event-run-failed',
    label: 'Run failed',
    description: 'Includes error code and retry count in the payload.',
    defaultChecked: true
  },
  {
    id: 'event-quota-warning',
    label: 'Quota warning',
    description: 'Sent when monthly token usage crosses 80%.',
    defaultChecked: false
  }
]

const FORMAT_ITEMS = [
  { value: 'json', label: 'JSON (default)' },
  { value: 'json-compact', label: 'JSON · compact' },
  { value: 'cloud-events', label: 'CloudEvents 1.0' }
]

export function AgentWebhookForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h4">Add webhook</CardTitle>
        <CardDescription>
          Deliver signed agent events to an HTTPS endpoint in your stack.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="grid gap-5">
          <FieldSet>
            <FieldLegend className="mb-3">Endpoint</FieldLegend>
            <Field>
              <FieldLabel htmlFor="webhook-label" required>
                Label
              </FieldLabel>
              <Input
                id="webhook-label"
                placeholder="Production run-completed"
              />
              <FieldDescription>
                Shown in audit logs and delivery retries.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="webhook-url" required>
                Endpoint URL
              </FieldLabel>
              <Input
                id="webhook-url"
                type="url"
                placeholder="https://hooks.northwind.io/agents/events"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="webhook-format">Payload format</FieldLabel>
              <Select items={FORMAT_ITEMS} defaultValue="json">
                <SelectTrigger id="webhook-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {FORMAT_ITEMS.map((item) => (
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
          </FieldSet>

          <FieldSet>
            <FieldLegend className="mb-3">Events</FieldLegend>
            <div className="grid gap-2">
              {EVENTS.map((event) => (
                <label
                  key={event.id}
                  htmlFor={event.id}
                  className="flex cursor-pointer items-start gap-3 rounded-md border bg-card p-4 transition-colors hover:bg-muted/40"
                >
                  <Checkbox
                    id={event.id}
                    defaultChecked={event.defaultChecked}
                    className="mt-0.5"
                  />
                  <div className="grid min-w-0 gap-1.5">
                    <FieldTitle>{event.label}</FieldTitle>
                    <FieldDescription>{event.description}</FieldDescription>
                  </div>
                </label>
              ))}
            </div>
          </FieldSet>

          <FieldSet>
            <FieldLegend className="mb-3">Security</FieldLegend>
            <Field>
              <FieldLabel htmlFor="webhook-secret" required>
                Signing secret
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <IconKey
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                </InputGroupAddon>
                <InputGroupInput
                  id="webhook-secret"
                  type="password"
                  placeholder="whsec_…"
                />
              </InputGroup>
              <FieldDescription>
                Used to verify HMAC-SHA256 signatures on each delivery.
              </FieldDescription>
            </Field>
            <label
              htmlFor="webhook-retry"
              className="flex cursor-pointer items-center justify-between gap-3 rounded-md bg-muted/40 p-3"
            >
              <div className="grid min-w-0 gap-1.5">
                <FieldTitle>Retry on 5xx</FieldTitle>
                <FieldDescription>
                  Up to 5 attempts with exponential backoff.
                </FieldDescription>
              </div>
              <Switch id="webhook-retry" defaultChecked />
            </label>
          </FieldSet>
        </form>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Save endpoint</Button>
      </CardFooter>
    </Card>
  )
}
