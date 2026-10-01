import { createFileRoute } from '@tanstack/react-router'

import { DialogPreview } from './-docs/previews/dialog-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/dialog')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="dialog" Preview={DialogPreview} />
}
