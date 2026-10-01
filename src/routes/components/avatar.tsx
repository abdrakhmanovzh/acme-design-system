import { createFileRoute } from '@tanstack/react-router'

import { AvatarPreview } from './-docs/previews/avatar-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/avatar')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="avatar" Preview={AvatarPreview} />
}
