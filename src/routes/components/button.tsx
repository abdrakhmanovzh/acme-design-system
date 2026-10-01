import { createFileRoute } from '@tanstack/react-router'

import { ButtonPreview } from './-docs/previews/button-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/button')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="button" Preview={ButtonPreview} />
}
