import { createFileRoute } from '@tanstack/react-router'

import { AlertPreview } from './-docs/previews/alert-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/alert')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="alert" Preview={AlertPreview} />
}
