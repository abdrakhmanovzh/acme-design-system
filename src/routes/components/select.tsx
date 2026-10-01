import { createFileRoute } from '@tanstack/react-router'

import { SelectPreview } from './-docs/previews/select-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/select')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="select" Preview={SelectPreview} />
}
