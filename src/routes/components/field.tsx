import { createFileRoute } from '@tanstack/react-router'

import { FieldPreview } from './-docs/previews/field-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/field')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="field" Preview={FieldPreview} />
}
