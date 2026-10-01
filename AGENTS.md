## Core Rules

- Prefer inline, simple, direct code over indirection
- Readability and directness > flexibility and extensibility
- Prefer best long-term solutions
- Prefer elegant code

## Hard Prohibitions

Do NOT do the following unless the user explicitly asks:

- Add fallback logic, shims, or legacy support
- Preserve old APIs, behaviors, or interfaces
- Add or maintain backward compatibility
- Never introduce hacks
- Write AI slop code
- Any sort of hacks or solutions for the time
- Run dev server
- Run pnpm add and pnpm build in sandbox

If unsure, default to **NOT doing these**.

## No Overengineering

Do NOT introduce unless clearly required:

- generic utilities with one caller
- “future-proofing” or extensibility hooks

Duplication is acceptable if it avoids premature abstraction.

## Git Rules

- Don't capitalize git commit messages
- Use push, pull, rebase commands only outside of sandbox with permission

## Adding Components

When adding a registry primitive, follow the checklist in `README.md` under **Adding a component**.

Minimum required files:

- `src/components/ui/{name}.tsx`
- registry item in `src/registry/items.ts`
- docs entry in `src/registry/component-catalog.ts` unless the item is registry-only
- route + preview files when the component is documented on `/components`

Run `pnpm test` and `pnpm lint` locally before committing. There is no CI runner yet.
