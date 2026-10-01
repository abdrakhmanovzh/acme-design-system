import { createFileRoute } from '@tanstack/react-router'

import { SliderPreview } from './-docs/previews/slider-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/slider')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="slider" Preview={SliderPreview} />
}
