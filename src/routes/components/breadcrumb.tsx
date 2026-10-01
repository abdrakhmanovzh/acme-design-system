import { createFileRoute } from '@tanstack/react-router'

import { BreadcrumbPreview } from './-docs/previews/breadcrumb-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/breadcrumb')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="breadcrumb" Preview={BreadcrumbPreview} />
}
