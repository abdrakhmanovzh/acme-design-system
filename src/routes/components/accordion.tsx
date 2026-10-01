import { createFileRoute } from '@tanstack/react-router'

import { AccordionPreview } from './-docs/previews/accordion-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/accordion')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="accordion" Preview={AccordionPreview} />
}
