import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from './-home/home-page'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <HomePage />
}
