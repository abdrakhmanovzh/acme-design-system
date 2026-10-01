import { createFileRoute } from '@tanstack/react-router'

import { AudioPlayerPreview } from './-docs/previews/audio-player-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/audio-player')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="audio-player" Preview={AudioPlayerPreview} />
}
