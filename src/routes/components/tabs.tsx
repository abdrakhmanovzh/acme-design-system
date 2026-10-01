import { createFileRoute } from '@tanstack/react-router'

import { TabsPreview } from './-docs/previews/tabs-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/tabs')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="tabs" Preview={TabsPreview} />
}
