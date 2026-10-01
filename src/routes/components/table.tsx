import { createFileRoute } from '@tanstack/react-router'

import { TablePreview } from './-docs/previews/table-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/table')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="table" Preview={TablePreview} />
}
