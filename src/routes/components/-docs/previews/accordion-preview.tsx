import { IconWebhook } from '@tabler/icons-react'

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger
} from '#/components/ui/accordion'
import { Input } from '#/components/ui/input'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

const faqItems = [
  {
    value: 'routing',
    title: 'How does conversation routing work?',
    body: 'High-confidence threads stay with the agent. Unresolved conversations escalate to the owner queue after the configured timeout.'
  },
  {
    value: 'models',
    title: 'Which models can I register?',
    body: 'OpenAI, Anthropic, Google, and custom OpenAI-compatible endpoints. Each agent binds one provider and model at registration time.'
  },
  {
    value: 'export',
    title: 'Can I export transcripts?',
    body: 'Yes. Export JSON or CSV from the conversation view, or stream audit events to your SIEM from advanced settings.'
  }
] as const

function FaqAccordion({ defaultValue }: { defaultValue?: string[] }) {
  return (
    <Accordion {...(defaultValue ? { defaultValue } : {})}>
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger>{item.title}</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <p>{item.body}</p>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function AccordionFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

export function AccordionPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Accordion"
        description="Progressive disclosure for FAQs and settings sections. Open items gain a card surface and inset ring without shifting siblings."
      >
        <SpecimenList>
          <AccordionFillRow label="FAQ">
            <FaqAccordion />
          </AccordionFillRow>

          <AccordionFillRow
            label="Default open"
            token='defaultValue={["routing"]}'
          >
            <FaqAccordion defaultValue={['routing']} />
          </AccordionFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Settings sections with an icon in the trigger and a compact field inside the panel."
      >
        <SpecimenList>
          <AccordionFillRow label="Webhooks">
            <Accordion defaultValue={['webhooks']}>
              <AccordionItem value="webhooks">
                <AccordionHeader>
                  <AccordionTrigger>
                    <span className="inline-flex items-center gap-2">
                      <IconWebhook
                        aria-hidden="true"
                        className="size-4 shrink-0 text-muted-foreground"
                      />
                      Webhooks
                    </span>
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionPanel>
                  <div className="grid gap-3">
                    <p>
                      Forward run-completed events to your endpoint. Payloads
                      are signed with HMAC-SHA256.
                    </p>
                    <Input
                      id="preview-accordion-webhook"
                      aria-label="Endpoint URL"
                      defaultValue="https://hooks.example.io/agents/support"
                    />
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </AccordionFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
