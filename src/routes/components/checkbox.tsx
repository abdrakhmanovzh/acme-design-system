import { createFileRoute } from '@tanstack/react-router'

import { CheckboxPreview } from './-docs/previews/checkbox-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/checkbox')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="checkbox" Preview={CheckboxPreview} />
}
