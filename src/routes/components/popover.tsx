import { createFileRoute } from '@tanstack/react-router'

import { PopoverPreview } from './-docs/previews/popover-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/popover')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="popover" Preview={PopoverPreview} />
}
