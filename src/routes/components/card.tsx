import { createFileRoute } from '@tanstack/react-router'

import { CardPreview } from './-docs/previews/card-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/card')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="card" Preview={CardPreview} />
}
