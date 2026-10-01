import { IconCode, IconFiles, IconWorld } from '@tabler/icons-react'
import { useState } from 'react'

import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '#/components/ui/card'
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
import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select'
import { Slider } from '#/components/ui/slider'
import { Switch } from '#/components/ui/switch'
import { Textarea } from '#/components/ui/textarea'

const TOOLS = [
  {
    id: 'web-search',
    label: 'Web search',
    description: 'Let the agent fetch live results from the public web.',
    icon: IconWorld,
    defaultChecked: true
  },
  {
    id: 'code-execution',
    label: 'Code execution',
    description: 'Run sandboxed Python and shell to compute answers.',
    icon: IconCode,
    defaultChecked: false
  },
  {
    id: 'workspace-files',
    label: 'Workspace files',
    description: 'Read project files referenced in the conversation.',
    icon: IconFiles,
    defaultChecked: true
  }
]

const PROVIDER_ITEMS = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'google', label: 'Google' },
  { value: 'custom', label: 'Custom endpoint' }
]

const MODEL_ITEMS = [
  { value: 'gpt-4.1', label: 'GPT-4.1' },
  { value: 'claude-sonnet-4', label: 'Claude Sonnet 4' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
  { value: 'custom-model', label: 'Custom model' }
]

const VISIBILITY_OPTIONS = [
  {
    value: 'private',
    label: 'Private',
    description: 'Only you can use this agent.'
  },
  {
    value: 'workspace',
    label: 'Workspace',
    description: 'Available to everyone in your workspace.'
  },
  {
    value: 'organization',
    label: 'Organization',
    description: 'Discoverable across the entire organization.'
  }
]

export function AgentRegistrationForm() {
  const [temperature, setTemperature] = useState(0.7)

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h4">Register agent</CardTitle>
        <CardDescription>
          Add a new AI agent to your workspace registry.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="grid gap-5">
          <FieldSet>
            <FieldLegend className="mb-3">Identity</FieldLegend>
            <div className="grid items-start gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="agent-name" required>
                  Agent name
                </FieldLabel>
                <Input id="agent-name" placeholder="Customer support copilot" />
              </Field>
              <Field>
                <FieldLabel htmlFor="agent-slug" required>
                  Identifier
                </FieldLabel>
                <InputGroup>
                  <InputGroupAddon>agents/</InputGroupAddon>
                  <InputGroupInput
                    id="agent-slug"
                    placeholder="support-copilot"
                  />
                </InputGroup>
                <FieldDescription>Used in API calls and URLs.</FieldDescription>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="agent-description">Description</FieldLabel>
              <Textarea
                id="agent-description"
                placeholder="Summarize what this agent does and when teams should use it."
                className="min-h-20"
              />
              <FieldDescription>
                Shown on the registry index and in audit logs.
              </FieldDescription>
            </Field>
          </FieldSet>

          <FieldSet>
            <FieldLegend className="mb-3">Prompt</FieldLegend>
            <Field>
              <FieldLabel htmlFor="agent-system">System prompt</FieldLabel>
              <Textarea
                id="agent-system"
                placeholder={`You are a helpful assistant for the support team.\n\nAlways cite sources from the knowledge base when answering.`}
                className="min-h-32"
              />
              <FieldDescription>
                Sets the agent's tone, role, and constraints. Markdown
                supported.
              </FieldDescription>
            </Field>
          </FieldSet>

          <FieldSet>
            <FieldLegend className="mb-3">Capability</FieldLegend>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="agent-provider">Provider</FieldLabel>
                <Select items={PROVIDER_ITEMS} defaultValue="anthropic">
                  <SelectTrigger id="agent-provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVIDER_ITEMS.map((item) => (
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
              <Field>
                <FieldLabel htmlFor="agent-model">Base model</FieldLabel>
                <Select items={MODEL_ITEMS} defaultValue="claude-sonnet-4">
                  <SelectTrigger id="agent-model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {MODEL_ITEMS.map((item) => (
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
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Temperature</FieldLabel>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {temperature.toFixed(1)}
                </span>
              </div>
              <Slider
                value={temperature}
                onValueChange={(value) =>
                  setTemperature(
                    typeof value === 'number' ? value : (value[0] ?? 0.7)
                  )
                }
                min={0}
                max={1}
                step={0.1}
              />
              <FieldDescription>
                Lower values are more deterministic; higher values are more
                creative.
              </FieldDescription>
            </Field>
          </FieldSet>

          <FieldSet>
            <FieldLegend className="mb-3">Tools</FieldLegend>
            <div className="grid gap-2">
              {TOOLS.map((tool) => (
                <label
                  key={tool.id}
                  htmlFor={tool.id}
                  className="flex cursor-pointer items-start justify-between gap-4 rounded-md border bg-card p-4 transition-colors hover:bg-muted/40"
                >
                  <div className="flex gap-3">
                    <tool.icon
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    />
                    <div className="grid min-w-0 gap-1.5">
                      <FieldTitle>{tool.label}</FieldTitle>
                      <FieldDescription>{tool.description}</FieldDescription>
                    </div>
                  </div>
                  <Switch id={tool.id} defaultChecked={tool.defaultChecked} />
                </label>
              ))}
            </div>
          </FieldSet>

          <FieldSet>
            <FieldLegend className="mb-3">Access</FieldLegend>
            <RadioGroup
              defaultValue="workspace"
              className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
            >
              {VISIBILITY_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-start gap-3 rounded-md border bg-card p-4 transition-colors hover:bg-muted/40"
                >
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <div className="grid min-w-0 gap-1.5">
                    <FieldTitle>{opt.label}</FieldTitle>
                    <FieldDescription>{opt.description}</FieldDescription>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </FieldSet>
        </form>
      </CardContent>

      <CardFooter className="justify-between">
        <Button variant="ghost">Save draft</Button>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Register agent</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
