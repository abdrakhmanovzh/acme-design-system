import { createFileRoute } from '@tanstack/react-router'

import { ComboboxPreview } from './-docs/previews/combobox-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/combobox')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="combobox" Preview={ComboboxPreview} />
}
