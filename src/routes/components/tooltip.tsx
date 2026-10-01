import { createFileRoute } from '@tanstack/react-router'

import { TooltipPreview } from './-docs/previews/tooltip-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/tooltip')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="tooltip" Preview={TooltipPreview} />
}
