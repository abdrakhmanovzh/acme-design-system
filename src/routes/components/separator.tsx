import { createFileRoute } from '@tanstack/react-router'

import { SeparatorPreview } from './-docs/previews/separator-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/separator')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="separator" Preview={SeparatorPreview} />
}
