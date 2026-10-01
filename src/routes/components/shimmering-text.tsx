import { createFileRoute } from '@tanstack/react-router'

import { ShimmeringTextPreview } from './-docs/previews/shimmering-text-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/shimmering-text')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <ComponentsPage
      activeId="shimmering-text"
      Preview={ShimmeringTextPreview}
    />
  )
}
