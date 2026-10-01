import { createFileRoute } from '@tanstack/react-router'

import { getRegistryIndex } from '#/registry/items'

export const Route = createFileRoute('/registry.json')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { origin } = new URL(request.url)

        return Response.json(getRegistryIndex(origin), {
          headers: {
            'Cache-Control': 'public, max-age=300'
          }
        })
      }
    }
  }
})
