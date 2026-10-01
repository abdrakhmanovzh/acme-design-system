import { createFileRoute } from '@tanstack/react-router'

import { ChartsPreview } from './-docs/previews/charts-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/charts')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="charts" Preview={ChartsPreview} />
}
