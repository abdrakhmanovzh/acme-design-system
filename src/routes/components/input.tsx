import { createFileRoute } from '@tanstack/react-router'

import { InputPreview } from './-docs/previews/input-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/input')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="input" Preview={InputPreview} />
}
