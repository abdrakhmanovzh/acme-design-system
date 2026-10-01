# Acme Registry

A shadcn-compatible registry for Acme UI primitives.

This registry publishes installable primitive components only. Product blocks and app-level providers are intentionally excluded so each consuming app can choose its own application shell, routing, and theme provider.

## Install

Install the foundation item first:

```bash
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/base.json
```

Then install primitives as needed:

```bash
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/button.json
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/dialog.json
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/date-picker.json
```

Or register the deployed registry as a namespace in a consuming project:

```bash
pnpm dlx shadcn@latest registry add @acme=https://acme-registry.vercel.app/r/{name}.json
pnpm dlx shadcn@latest add @acme/button
```

Convenience bundles are available when you do not want to install primitives one by one:

```bash
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/essentials.json
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/forms.json
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/overlays.json
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/data.json
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/media.json
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/all.json
```

After adding the namespace, bundles can also be installed by name:

```bash
pnpm dlx shadcn@latest add @acme/essentials
pnpm dlx shadcn@latest add @acme/all
```

## Registry Routes

- `/registry.json` exposes the registry index.
- `/r/registry.json` exposes the same registry index for namespace discovery.
- `/r/base.json` exposes the design-system foundation.
- `/r/[item].json` exposes each installable primitive.

The item endpoints resolve local registry dependencies to absolute URLs based on the request origin, so direct URL installs work after deployment.

## Foundation

The `base` item installs the shared design-system foundation:

- Geist and Geist Mono via the `font-geist` and `font-geist-mono` font items. shadcn wires them with `next/font` in Next.js apps and `@fontsource-variable/*` elsewhere.
- Tailwind v4 theme tokens.
- OKLCH light and dark CSS variables.
- Base layer CSS used by the primitives (borders, selection, scrollbars, text wrapping, tabular numbers).
- The `cn` utility via the `utils` registry item.

`base` only touches your CSS, fonts, and `lib/utils`. It does not write project files such as `AGENTS.md`, `DESIGN.md`, `.gitignore`, lint or format configs, logos, or favicons.

The theme provider is not part of the registry. Consuming apps should wire dark-mode state and providers themselves.

## Opt-in Items

Project-level files are separate items so they never overwrite a consumer's files by accident:

- `design`: writes `DESIGN.md` with Acme design principles, tokens, and usage guidance.
- `project-config`: writes `AGENTS.md`, `.oxlintrc.json`, `.oxfmtrc.json`, and `.gitignore`.
- `logo`: adds the `Logo` component to your components directory. It uses the `primary` color token.
- `favicons`: writes `public/favicon.svg` and `public/favicon-dark.svg`.

```bash
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/design.json
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/project-config.json
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/logo.json
pnpm dlx shadcn@latest add https://acme-registry.vercel.app/r/favicons.json
```

File targets are written from the project root, also in `src/` projects.

## Primitive Items

Each primitive declares only the package dependencies and registry dependencies it needs. For example:

- `button` depends on `base`, `@base-ui/react`, and `class-variance-authority`.
- `date-picker` depends on `button`, `calendar`, `popover`, `date-fns`, and `react-day-picker`.
- `charts` installs the chart primitive folder and depends on `motion` and `recharts`.

Bundle items install groups through `registryDependencies` and do not carry their own files:

- `essentials`: base, button, input, textarea, field, badge, card, separator, spinner.
- `forms`: form and selection controls.
- `overlays`: disclosure and floating surfaces.
- `data`: navigation, status, tables, progress, and charts.
- `media`: audio player and animated feedback primitives.
- `all`: `base` plus every `registry:ui` primitive. It does not include `design`, `project-config`, `logo`, or `favicons`.

Local imports are normalized in registry payloads:

- `#/components/ui/*` becomes `@/components/ui/*`.
- `#/lib/cn` becomes `@/lib/utils`.

The app source remains unchanged.

## Development Notes

Project commands use `pnpm`.

```bash
pnpm install
pnpm test
pnpm lint
```

There is no CI runner for this repo yet. Run `pnpm test` and `pnpm lint` locally before committing changes.

### Adding a component

Use this checklist when adding or documenting a primitive. `pnpm test` enforces most of the sync rules in `src/registry/registry.test.ts`.

1. **Implement the primitive** in `src/components/ui/{name}.tsx`.
   - Use `#/components/ui/*` and `#/lib/cn` imports inside this repo.
   - Registry payloads rewrite those to `@/components/ui/*` and `@/lib/utils` on install.

2. **Register it for shadcn installs** in `src/registry/items.ts`.
   - Add a `?raw` import for the source file.
   - Add a `registry:ui` item with `name`, `title`, `description`, npm `dependencies`, `registryDependencies`, and `files`.
   - Add it to `uiItems` and to any bundle lists that should include it (`essentials`, `forms`, `overlays`, `data`, `media`). `all` includes every `uiItems` entry automatically.
   - If the component is only a dependency for another primitive and should not get its own docs page, add its `name` to `registryOnlyUiItems` in `src/registry/component-catalog.ts`. Current examples: `calendar`, `native-select`.

3. **Document it on the registry site** when it should appear in `/components`.
   - Add an entry to `src/registry/component-catalog.ts` with `id`, `name`, `category`, and a docs `description`.
   - `name` must match the registry item `title`. Tests fail if they drift apart.
   - Add a route wrapper at `src/routes/components/{id}.tsx`.
   - Add a preview at `src/routes/components/-docs/previews/{id}-preview.tsx`.

4. **Verify locally**.

```bash
pnpm test
pnpm lint
```

Optional: run the dev server and check `/components/{id}` visually.

For consumer setup, see https://acme-registry.vercel.app/integrate

### Source-of-truth map

| Concern                   | File                                                   |
| ------------------------- | ------------------------------------------------------ |
| Component source          | `src/components/ui/*`                                  |
| Design tokens             | `src/styles.css`, parsed by `src/registry/css-vars.ts` |
| shadcn registry payloads  | `src/registry/items.ts`                                |
| Documented component list | `src/registry/component-catalog.ts`                    |
| Docs route metadata       | `src/routes/components/-docs/components-registry.tsx`  |
| Invariant checks          | `src/registry/registry.test.ts`                        |

Per local agent instructions, do not run the dev server or production build unless explicitly requested.
