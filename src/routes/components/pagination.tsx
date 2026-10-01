import { createFileRoute } from '@tanstack/react-router'

import { PaginationPreview } from './-docs/previews/pagination-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/pagination')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="pagination" Preview={PaginationPreview} />
}
