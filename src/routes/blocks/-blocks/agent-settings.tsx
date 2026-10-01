import {
  IconAlertOctagon,
  IconKey,
  IconShieldLock,
  IconTrash,
  IconWebhook
} from '@tabler/icons-react'

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger
} from '#/components/ui/accordion'
import { Badge } from '#/components/ui/badge'
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
  FieldTitle
} from '#/components/ui/field'
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '#/components/ui/input'
import { NativeSelect } from '#/components/ui/native-select'
import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group'
import { Separator } from '#/components/ui/separator'
import { Switch } from '#/components/ui/switch'
import { Textarea } from '#/components/ui/textarea'

const NOTIFICATIONS = [
  {
    id: 'notify-failure',
    label: 'Notify owners on run failures',
    description: 'Email primary owner when a run exits with a 5xx.',
    defaultChecked: true
  },
  {
    id: 'notify-quota',
    label: 'Warn at 80% of monthly token quota',
    description: 'Sends a digest to owners; does not throttle traffic.',
    defaultChecked: true
  },
  {
    id: 'notify-slack',
    label: 'Slack DM the on-call engineer on incidents',
    description: 'Uses the #ai-incidents channel routing rule.',
    defaultChecked: false
  },
  {
    id: 'notify-weekly',
    label: 'Weekly usage digest',
    description: 'Sent every Monday at 09:00 in the agent timezone.',
    defaultChecked: false
  }
]

export function AgentSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-xl font-semibold tracking-tight">Settings</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure how the Support copilot agent runs in production.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle as="h5">General</CardTitle>
          <CardDescription>
            Identity and deployment region. Changing region will trigger a
            redeploy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Field>
            <FieldLabel htmlFor="settings-name" required>
              Display name
            </FieldLabel>
            <Input id="settings-name" defaultValue="Support copilot" />
          </Field>
          <Field>
            <FieldLabel htmlFor="settings-description">Description</FieldLabel>
            <Textarea
              id="settings-description"
              defaultValue="Customer support copilot for tier-1 questions. Routes anything involving billing, compliance, or refunds to a human."
              className="min-h-20"
            />
            <FieldDescription>
              Shown on the registry index and in audit logs.
            </FieldDescription>
          </Field>

          <div className="grid gap-5 md:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="settings-region">Region</FieldLabel>
              <NativeSelect id="settings-region" defaultValue="us-east-1">
                <option value="us-east-1">us-east-1 · N. Virginia</option>
                <option value="us-west-2">us-west-2 · Oregon</option>
                <option value="eu-west-1">eu-west-1 · Ireland</option>
                <option value="eu-central-1">eu-central-1 · Frankfurt</option>
                <option value="ap-southeast-1">
                  ap-southeast-1 · Singapore
                </option>
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="settings-tz">Timezone</FieldLabel>
              <NativeSelect id="settings-tz" defaultValue="America/New_York">
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
                <option value="America/Los_Angeles">America/Los_Angeles</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Europe/Berlin">Europe/Berlin</option>
                <option value="Asia/Singapore">Asia/Singapore</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="settings-lang">
                Default reply language
              </FieldLabel>
              <NativeSelect id="settings-lang" defaultValue="en">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="auto">Auto-detect</option>
              </NativeSelect>
            </Field>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="ghost">Cancel</Button>
          <Button>Save general</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle as="h5">Notifications</CardTitle>
          <CardDescription>
            Channels for delivery alerts and quota digests.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {NOTIFICATIONS.map((n) => (
            <label
              key={n.id}
              htmlFor={n.id}
              className="flex cursor-pointer items-start gap-3 rounded-md border bg-card p-4 transition-colors hover:bg-muted/40"
            >
              <Checkbox
                id={n.id}
                defaultChecked={n.defaultChecked}
                className="mt-0.5"
              />
              <div className="grid min-w-0 gap-1.5">
                <FieldTitle>{n.label}</FieldTitle>
                <FieldDescription>{n.description}</FieldDescription>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle as="h5">Advanced</CardTitle>
          <CardDescription>
            Less-used integrations. Defaults are safe for most teams.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Accordion defaultValue={['webhooks']}>
            <AccordionItem value="webhooks">
              <AccordionHeader>
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <IconWebhook
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                    Webhooks
                    <Badge variant="status" size="sm">
                      2 endpoints
                    </Badge>
                  </span>
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionPanel>
                <div className="space-y-4">
                  <p>
                    Forward run-completed events to your services. Payloads are
                    signed with HMAC-SHA256.
                  </p>
                  <Field>
                    <FieldLabel htmlFor="settings-webhook-url">
                      Endpoint URL
                    </FieldLabel>
                    <Input
                      id="settings-webhook-url"
                      defaultValue="https://hooks.northwind.io/agents/support-copilot"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="settings-webhook-secret">
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
                        id="settings-webhook-secret"
                        type="password"
                        defaultValue="whsec_8a8d2b0e7f1c…"
                      />
                    </InputGroup>
                    <FieldDescription>
                      Last rotated 14 days ago.
                    </FieldDescription>
                  </Field>
                  <div className="flex items-center justify-between gap-3 rounded-md bg-muted/40 p-3 text-foreground">
                    <div className="grid gap-1.5">
                      <FieldTitle>Retry on 5xx</FieldTitle>
                      <FieldDescription>
                        Up to 5 attempts with exponential backoff.
                      </FieldDescription>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem value="retention">
              <AccordionHeader>
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <IconShieldLock
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                    Conversation retention
                  </span>
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionPanel>
                <div className="space-y-4">
                  <p>
                    How long conversation transcripts are retained before
                    automatic deletion.
                  </p>
                  <RadioGroup
                    defaultValue="90d"
                    className="grid gap-2 sm:grid-cols-3"
                  >
                    {[
                      { value: '30d', label: '30 days', detail: 'GDPR-tight' },
                      {
                        value: '90d',
                        label: '90 days',
                        detail: 'Default · recommended'
                      },
                      { value: '365d', label: '1 year', detail: 'Audit ready' }
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className="flex cursor-pointer items-start gap-3 rounded-md border bg-card p-3 text-foreground transition-colors hover:bg-muted/40"
                      >
                        <RadioGroupItem value={opt.value} className="mt-0.5" />
                        <div className="grid gap-1.5">
                          <FieldTitle>{opt.label}</FieldTitle>
                          <FieldDescription>{opt.detail}</FieldDescription>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem value="audit">
              <AccordionHeader>
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <IconAlertOctagon
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                    Audit log streaming
                  </span>
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionPanel>
                <div className="space-y-4">
                  <p>
                    Stream every prompt, completion, and tool call to your SIEM
                    in real time.
                  </p>
                  <Field>
                    <FieldLabel htmlFor="audit-sink">Sink</FieldLabel>
                    <NativeSelect id="audit-sink" defaultValue="none">
                      <option value="none">Disabled</option>
                      <option value="s3">Amazon S3</option>
                      <option value="datadog">Datadog</option>
                      <option value="splunk">Splunk HEC</option>
                    </NativeSelect>
                  </Field>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle as="h5" className="text-destructive">
            Danger zone
          </CardTitle>
          <CardDescription>
            Irreversible operations. Both actions notify workspace owners.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-3 py-2">
            <div className="grid min-w-0 gap-1.5">
              <FieldTitle>Transfer ownership</FieldTitle>
              <FieldDescription>
                Move this agent to a different workspace.
              </FieldDescription>
            </div>
            <Button variant="outline">Transfer</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center justify-between gap-3 py-2">
            <div className="grid min-w-0 gap-1.5">
              <FieldTitle>Delete agent</FieldTitle>
              <FieldDescription>
                Permanently remove this agent and all of its history.
              </FieldDescription>
            </div>
            <Button variant="destructive">
              <IconTrash data-slot="icon" aria-hidden="true" />
              Delete agent
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
