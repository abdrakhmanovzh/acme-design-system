import { Textarea } from '#/components/ui/textarea'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

const systemPromptPlaceholder = `You are a helpful assistant for the support team.

Always cite sources from the knowledge base when answering.`

function TextareaSpecimenRow({ children, ...props }: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{children}</FillPreview>
    </SpecimenRow>
  )
}

export function TextareaPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Textarea"
        description="Multi-line entry with the same focus and invalid treatment as Input. Default min height is min-h-24."
      >
        <SpecimenList>
          <TextareaSpecimenRow label="Default">
            <Textarea
              name="preview-textarea-default"
              placeholder="Summarize what this agent does and when teams should use it."
            />
          </TextareaSpecimenRow>
          <TextareaSpecimenRow label="Disabled" token="disabled">
            <Textarea
              name="preview-textarea-disabled"
              disabled
              placeholder="Summarize what this agent does and when teams should use it."
            />
          </TextareaSpecimenRow>
          <TextareaSpecimenRow label="Invalid" token="aria-invalid">
            <Textarea
              name="preview-textarea-invalid"
              aria-invalid
              defaultValue="You are a helpful assistant for the support team."
            />
          </TextareaSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Height"
        description="Taller min-heights via className. System prompts use mono at 13px. resize-y allows vertical drag."
      >
        <SpecimenList>
          <TextareaSpecimenRow label="Compact">
            <Textarea
              name="preview-textarea-compact"
              className="min-h-20"
              placeholder="Summarize what this agent does and when teams should use it."
            />
          </TextareaSpecimenRow>
          <TextareaSpecimenRow label="Default">
            <Textarea
              name="preview-textarea-height-default"
              placeholder="Summarize what this agent does and when teams should use it."
            />
          </TextareaSpecimenRow>
          <TextareaSpecimenRow label="System prompt">
            <Textarea
              name="preview-textarea-system"
              className="min-h-32 font-mono text-[13px] leading-6"
              placeholder={systemPromptPlaceholder}
            />
          </TextareaSpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
