import { createFileRoute } from '@tanstack/react-router'

import { DatePickerPreview } from './-docs/previews/date-picker-preview'
import { ComponentsPage } from './-docs/components-page'

export const Route = createFileRoute('/components/date-picker')({
  component: RouteComponent
})

function RouteComponent() {
  return <ComponentsPage activeId="date-picker" Preview={DatePickerPreview} />
}
