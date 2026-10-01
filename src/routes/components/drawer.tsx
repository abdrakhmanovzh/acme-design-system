import { createFileRoute } from '@tanstack/react-router'

import { DrawerPreview } from './-docs/previews/drawer-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/drawer')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="drawer" Preview={DrawerPreview} />
}
