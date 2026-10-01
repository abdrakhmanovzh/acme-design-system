import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/components/')({
  beforeLoad: () => {
    throw redirect({ to: '/components/button', replace: true })
  }
})
