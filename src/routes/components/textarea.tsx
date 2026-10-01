import { createFileRoute } from '@tanstack/react-router'

import { TextareaPreview } from './-docs/previews/textarea-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/textarea')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="textarea" Preview={TextareaPreview} />
}
