import { createFileRoute } from '@tanstack/react-router'

import { SheetPreview } from './-docs/previews/sheet-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/sheet')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="sheet" Preview={SheetPreview} />
}
