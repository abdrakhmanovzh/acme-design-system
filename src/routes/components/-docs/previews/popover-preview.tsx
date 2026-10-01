import { IconCalendar, IconInfoCircle, IconSettings } from '@tabler/icons-react'

import { Button } from '#/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from '#/components/ui/popover'
import { Separator } from '#/components/ui/separator'
import { Switch } from '#/components/ui/switch'

import { Chapter, SpecimenList, SpecimenRow } from './preview-primitives'

export function PopoverPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Popover"
        description="Interactive floating panels for compact forms, summaries, and contextual controls anchored to a trigger."
      >
        <SpecimenList>
          <SpecimenRow label="Prompt variable">
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="ghost" size="sm">
                    <IconInfoCircle data-slot="icon" aria-hidden="true" />
                    System prompt
                  </Button>
                }
              />
              <PopoverContent align="end" className="w-80">
                <PopoverHeader>
                  <PopoverTitle>System prompt</PopoverTitle>
                  <PopoverDescription>
                    Keep instructions explicit and avoid conflicting tool rules.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </SpecimenRow>

          <SpecimenRow label="Compact form" token='side="bottom"'>
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="outline" size="sm">
                    <IconCalendar data-slot="icon" aria-hidden="true" />
                    Schedule
                  </Button>
                }
              />
              <PopoverContent side="bottom" align="end">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="popover-window">Run window</FieldLabel>
                    <Input
                      id="popover-window"
                      defaultValue="Weekdays, 09:00–17:00"
                    />
                  </Field>
                </FieldGroup>
              </PopoverContent>
            </Popover>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Settings panel with switches — align end so the panel opens toward the content column."
      >
        <SpecimenList>
          <SpecimenRow label="Settings panel">
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="outline">
                    <IconSettings data-slot="icon" aria-hidden="true" />
                    Configure
                  </Button>
                }
              />
              <PopoverContent align="end">
                <PopoverHeader>
                  <PopoverTitle>Agent settings</PopoverTitle>
                  <PopoverDescription>
                    Tune runtime behavior for this assistant.
                  </PopoverDescription>
                </PopoverHeader>
                <Separator className="my-4" />
                <FieldGroup>
                  <Field
                    orientation="horizontal"
                    className="grid-cols-[1fr_auto]"
                  >
                    <FieldLabel htmlFor="popover-memory">
                      Memory sync
                    </FieldLabel>
                    <Switch id="popover-memory" defaultChecked />
                  </Field>
                  <Field
                    orientation="horizontal"
                    className="grid-cols-[1fr_auto]"
                  >
                    <FieldLabel htmlFor="popover-streaming">
                      Stream responses
                    </FieldLabel>
                    <Switch id="popover-streaming" defaultChecked />
                  </Field>
                </FieldGroup>
              </PopoverContent>
            </Popover>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
