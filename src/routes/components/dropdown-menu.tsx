import { createFileRoute } from '@tanstack/react-router'

import { DropdownMenuPreview } from './-docs/previews/dropdown-menu-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/dropdown-menu')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <ComponentsPage activeId="dropdown-menu" Preview={DropdownMenuPreview} />
  )
}
