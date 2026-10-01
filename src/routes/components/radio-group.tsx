import { createFileRoute } from '@tanstack/react-router'

import { RadioGroupPreview } from './-docs/previews/radio-group-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/radio-group')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="radio-group" Preview={RadioGroupPreview} />
}
