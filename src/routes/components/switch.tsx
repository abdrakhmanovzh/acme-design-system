import { createFileRoute } from '@tanstack/react-router'

import { SwitchPreview } from './-docs/previews/switch-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/switch')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="switch" Preview={SwitchPreview} />
}
