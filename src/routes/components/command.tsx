import { createFileRoute } from '@tanstack/react-router'

import { CommandPreview } from './-docs/previews/command-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/command')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="command" Preview={CommandPreview} />
}
