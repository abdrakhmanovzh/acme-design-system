import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle
} from '@tabler/icons-react'
import type { ComponentProps } from 'react'

import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

type AlertVariant = NonNullable<ComponentProps<typeof Alert>['variant']>

const variantSpecimens: Array<{
  label: string
  variant: AlertVariant
  icon: typeof IconInfoCircle
  title: string
  description: string
}> = [
  {
    label: 'Default',
    variant: 'default',
    icon: IconInfoCircle,
    title: 'Draft saved',
    description: 'Changes sync when you return to the registry.'
  },
  {
    label: 'Info',
    variant: 'info',
    icon: IconInfoCircle,
    title: 'Indexing knowledge sources',
    description: 'Embeddings will be ready in about two minutes.'
  },
  {
    label: 'Success',
    variant: 'success',
    icon: IconCircleCheck,
    title: 'Agent published',
    description: 'Support copilot is live for the Northwind workspace.'
  },
  {
    label: 'Warning',
    variant: 'warning',
    icon: IconAlertTriangle,
    title: 'Model reaches end-of-life soon',
    description: 'Migrate to Claude Sonnet 4.5 before Aug 12, 2026.'
  },
  {
    label: 'Destructive',
    variant: 'destructive',
    icon: IconAlertCircle,
    title: 'Registration failed',
    description: 'The custom endpoint returned 401. Check the API key.'
  }
]

function AlertFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

function VariantAlert({
  variant,
  icon: Icon,
  title,
  description
}: (typeof variantSpecimens)[number]) {
  return (
    <Alert variant={variant}>
      <Icon data-slot="icon" aria-hidden="true" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

export function AlertPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Alert"
        description='Inline, non-dismissible status messages. Caller supplies the icon via data-slot="icon". Use framed for a variant-colored outline.'
      >
        <SpecimenList>
          <AlertFillRow label="With action">
            <Alert variant="warning">
              <IconAlertTriangle data-slot="icon" aria-hidden="true" />
              <AlertTitle>
                Claude Sonnet 4 reaches end-of-life on Aug 12, 2026.
              </AlertTitle>
              <AlertDescription>
                Migrate this agent to Claude Sonnet 4.5 before then to avoid
                interruption.{' '}
                <a
                  href="#"
                  className="font-medium underline underline-offset-4 hover:opacity-80"
                >
                  View migration guide
                </a>
                .
              </AlertDescription>
            </Alert>
          </AlertFillRow>

          <AlertFillRow label="Framed" token="framed">
            <Alert variant="info" framed>
              <IconInfoCircle data-slot="icon" aria-hidden="true" />
              <AlertTitle>Workspace invite sent</AlertTitle>
              <AlertDescription>
                Jamie Doe has 7 days to accept before the link expires.
              </AlertDescription>
            </Alert>
          </AlertFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Variants"
        description="Semantic surfaces for info, success, warning, and destructive outcomes."
      >
        <SpecimenList>
          {variantSpecimens.map((item) => (
            <AlertFillRow
              key={item.variant}
              label={item.label}
              token={`variant="${item.variant}"`}
            >
              <VariantAlert {...item} />
            </AlertFillRow>
          ))}
        </SpecimenList>
      </Chapter>
    </div>
  )
}
