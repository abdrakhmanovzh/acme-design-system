import { createFileRoute } from '@tanstack/react-router'

import { BadgePreview } from './-docs/previews/badge-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/badge')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="badge" Preview={BadgePreview} />
}
