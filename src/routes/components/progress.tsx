import { createFileRoute } from '@tanstack/react-router'

import { ProgressPreview } from './-docs/previews/progress-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/progress')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="progress" Preview={ProgressPreview} />
}
