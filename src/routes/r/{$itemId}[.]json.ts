import { createFileRoute } from '@tanstack/react-router'

import {
  getRegistryIndex,
  getRegistryItem,
  withResolvedRegistryDependencies
} from '#/registry/items'

export const Route = createFileRoute('/r/{$itemId}.json')({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const { origin } = new URL(request.url)

        if (params.itemId === 'registry') {
          return Response.json(getRegistryIndex(origin), {
            headers: {
              'Cache-Control': 'public, max-age=300'
            }
          })
        }

        const registryItem = getRegistryItem(params.itemId)

        if (!registryItem) {
          return Response.json(
            {
              error: 'Registry item not found',
              item: params.itemId
            },
            { status: 404 }
          )
        }

        return Response.json(
          withResolvedRegistryDependencies(registryItem, origin),
          {
            headers: {
              'Cache-Control': 'public, max-age=300'
            }
          }
        )
      }
    }
  }
})
