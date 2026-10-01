import { Button } from '#/components/ui/button'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '#/components/ui/sheet'

import { Chapter, SpecimenList, SpecimenRow } from './preview-primitives'

const sides = ['left', 'right', 'top', 'bottom'] as const

export function SheetPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Sheet"
        description="Edge-attached panels for secondary workflows and contextual detail without leaving the page."
      >
        <SpecimenList>
          <SpecimenRow label="Settings flow">
            <Sheet>
              <SheetTrigger render={<Button>Open settings</Button>} />
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Agent settings</SheetTitle>
                  <SheetDescription>
                    Tune routing and escalation behavior without leaving the
                    registry table.
                  </SheetDescription>
                </SheetHeader>
                <SheetBody className="grid gap-4 pb-5">
                  <Field>
                    <FieldLabel htmlFor="preview-sheet-name">
                      Agent name
                    </FieldLabel>
                    <Input
                      id="preview-sheet-name"
                      defaultValue="Support triage"
                    />
                  </Field>
                  <div className="rounded-lg border bg-background p-3 text-sm leading-6 text-muted-foreground">
                    Sheets keep supporting tasks close to their source while
                    preserving modal focus management and escape behavior.
                  </div>
                </SheetBody>
                <SheetFooter>
                  <SheetClose
                    render={<Button variant="ghost">Cancel</Button>}
                  />
                  <Button>Save changes</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Sides"
        description="Right is the default. Other sides anchor the panel to a different edge with matching slide motion."
      >
        <SpecimenList>
          {sides.map((side) => (
            <SpecimenRow key={side} label={side} token={`side="${side}"`}>
              <Sheet>
                <SheetTrigger
                  render={<Button variant="outline">Open {side}</Button>}
                />
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>
                      {side[0].toUpperCase() + side.slice(1)} sheet
                    </SheetTitle>
                    <SheetDescription>
                      The same primitive supports every edge with side-specific
                      motion.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetBody className="pb-5 text-sm leading-6 text-muted-foreground">
                    Compose the content you need inside SheetBody, then place
                    persistent actions in SheetFooter.
                  </SheetBody>
                </SheetContent>
              </Sheet>
            </SpecimenRow>
          ))}
        </SpecimenList>
      </Chapter>
    </div>
  )
}
