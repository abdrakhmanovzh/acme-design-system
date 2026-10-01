import { createFileRoute } from '@tanstack/react-router'

import { SpinnerPreview } from './-docs/previews/spinner-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/spinner')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="spinner" Preview={SpinnerPreview} />
}
