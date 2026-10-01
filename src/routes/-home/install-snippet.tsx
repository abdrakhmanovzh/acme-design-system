import { CommandSnippet } from '../-components/command-snippet'

const installCommands = [
  'pnpm dlx shadcn@latest registry add @acme=https://acme-design-system-psi.vercel.app/r/{name}.json',
  'pnpm dlx shadcn@latest add @acme/all'
]

export function InstallSnippet() {
  return <CommandSnippet commands={installCommands} label="Install" />
}
