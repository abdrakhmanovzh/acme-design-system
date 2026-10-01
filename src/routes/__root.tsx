import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import { ThemeProvider } from '#/components/theme-provider'
import { Header } from './-components/site-header/header'
import { componentItems } from './components/-docs/components-registry'

export const Route = createRootRoute({
  // Component pages get their catalog name as title from the leaf match.
  // Other pages override the title in their own head; home uses the default.
  head: ({ matches }) => {
    const component = componentItems.find(
      (item) => item.path === matches.at(-1)?.pathname
    )

    return {
      meta: [
        {
          charSet: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content:
            'Acme Registry: Base UI components, OKLCH design tokens, and product blocks you can install with the shadcn CLI.'
        },
        {
          title: component
            ? `${component.name} | Acme Registry`
            : 'Acme Registry'
        }
      ],
      links: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon-dark.svg',
          media: '(prefers-color-scheme: dark)'
        },
        {
          rel: 'manifest',
          href: '/manifest.json'
        },
        {
          rel: 'stylesheet',
          href: appCss
        }
      ]
    }
  },
  shellComponent: RootDocument
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* HeadContent dedupes meta by name, so both theme colors live here. */}
        <meta
          name="theme-color"
          content="#f9f9fa"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#121214"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-frame-ring-strong focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right'
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />
            }
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
