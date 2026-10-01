import { Button } from '#/components/ui/button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '#/components/ui/drawer'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'

import { Chapter, SpecimenList, SpecimenRow } from './preview-primitives'

const directions = ['bottom', 'top', 'left', 'right'] as const

export function DrawerPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Drawer"
        description="Bottom sheets and edge drawers with drag-to-dismiss, built on Vaul for mobile-friendly overlays."
      >
        <SpecimenList>
          <SpecimenRow label="Filter flow">
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Open filters</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filter agents</DrawerTitle>
                  <DrawerDescription>
                    Narrow the registry without leaving the table. Swipe down or
                    tap outside to dismiss.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerBody className="grid gap-4 pb-5">
                  <Field>
                    <FieldLabel htmlFor="preview-drawer-status">
                      Status
                    </FieldLabel>
                    <Input
                      id="preview-drawer-status"
                      defaultValue="Active"
                      placeholder="Any status"
                    />
                  </Field>
                  <div className="rounded-lg border bg-background p-3 text-sm leading-6 text-muted-foreground">
                    Drawers share the same card surface, backdrop, and footer
                    layout as sheets while adding a drag handle on bottom
                    sheets.
                  </div>
                </DrawerBody>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="ghost">Reset</Button>
                  </DrawerClose>
                  <Button>Apply filters</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Directions"
        description="Bottom is the default. Pass direction on Drawer to anchor from another edge."
      >
        <SpecimenList>
          {directions.map((direction) => (
            <SpecimenRow
              key={direction}
              label={direction}
              token={`direction="${direction}"`}
            >
              <Drawer direction={direction}>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open {direction}</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      {direction[0].toUpperCase() + direction.slice(1)} drawer
                    </DrawerTitle>
                    <DrawerDescription>
                      Same primitive, different anchor. Bottom sheets show the
                      drag handle.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody className="pb-5 text-sm leading-6 text-muted-foreground">
                    Compose scrollable content in DrawerBody and persistent
                    actions in DrawerFooter.
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </SpecimenRow>
          ))}
        </SpecimenList>
      </Chapter>
    </div>
  )
}
