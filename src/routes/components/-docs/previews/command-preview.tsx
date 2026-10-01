import {
  IconLayoutDashboard,
  IconMessageCircle,
  IconPlus,
  IconRobot,
  IconSettings,
  IconUserPlus,
  IconWebhook
} from '@tabler/icons-react'
import * as React from 'react'

import { Button } from '#/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '#/components/ui/command'

import {
  Chapter,
  SpecimenList,
  SpecimenRow,
  StackedSpecimenRow
} from './preview-primitives'

function CommandMenuItems() {
  return (
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Actions">
        <CommandItem>
          <IconPlus data-slot="icon" aria-hidden="true" />
          Register new agent
          <CommandShortcut>⌘N</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <IconUserPlus data-slot="icon" aria-hidden="true" />
          Invite teammate
        </CommandItem>
        <CommandItem>
          <IconWebhook data-slot="icon" aria-hidden="true" />
          Add webhook
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Navigation">
        <CommandItem>
          <IconLayoutDashboard data-slot="icon" aria-hidden="true" />
          Dashboard
          <CommandShortcut>⌘1</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <IconRobot data-slot="icon" aria-hidden="true" />
          Agents
          <CommandShortcut>⌘2</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <IconMessageCircle data-slot="icon" aria-hidden="true" />
          Conversations
          <CommandShortcut>⌘3</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <IconSettings data-slot="icon" aria-hidden="true" />
          Settings
        </CommandItem>
      </CommandGroup>
    </CommandList>
  )
}

function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command menu
        <CommandShortcut className="pl-0">⌘K</CommandShortcut>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search actions and pages…" />
        <CommandMenuItems />
      </CommandDialog>
    </>
  )
}

export function CommandPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Command"
        description="A searchable palette of grouped actions. cmdk handles filtering and keyboard navigation; the surface reuses the Dialog shell."
      >
        <SpecimenList>
          <StackedSpecimenRow label="Embedded palette">
            <div className="overflow-hidden rounded-xl border bg-popover">
              <Command>
                <CommandInput placeholder="Search actions and pages…" />
                <CommandMenuItems />
              </Command>
            </div>
          </StackedSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In a dialog"
        description="CommandDialog mounts the palette in a modal. Wire ⌘K to toggle it from anywhere in the app."
      >
        <SpecimenList>
          <SpecimenRow label="Trigger" token="⌘K">
            <CommandDialogDemo />
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
