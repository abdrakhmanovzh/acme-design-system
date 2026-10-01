import { createFileRoute } from '@tanstack/react-router'

import { ScrollAreaPreview } from './-docs/previews/scroll-area-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/scroll-area')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="scroll-area" Preview={ScrollAreaPreview} />
}
