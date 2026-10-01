import { Button } from '#/components/ui/button'
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '#/components/ui/dialog'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'

import { Chapter, SpecimenList, SpecimenRow } from './preview-primitives'

export function DialogPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Dialog"
        description="Focused modal tasks, small forms, and decisions that need the user's attention."
      >
        <SpecimenList>
          <SpecimenRow label="Invite flow">
            <Dialog>
              <DialogTrigger render={<Button>Invite teammate</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite teammate</DialogTitle>
                  <DialogDescription>
                    Send an invite to join this workspace. They will receive an
                    email with setup instructions.
                  </DialogDescription>
                </DialogHeader>
                <Field className="mt-5">
                  <FieldLabel htmlFor="preview-invite-email">
                    Email address
                  </FieldLabel>
                  <Input
                    id="preview-invite-email"
                    type="email"
                    placeholder="alex@example.com"
                  />
                </Field>
                <DialogFooter>
                  <DialogClose
                    render={<Button variant="ghost">Cancel</Button>}
                  />
                  <Button>Send invite</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Patterns"
        description="Dialog and AlertDialog share the same shell while keeping neutral and urgent workflows separate."
      >
        <SpecimenList>
          <SpecimenRow label="Neutral">
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline">Open dialog</Button>}
              />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit routing rule</DialogTitle>
                  <DialogDescription>
                    Update the conditions that assign new conversations to the
                    support team.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-5 grid gap-2 text-sm text-muted-foreground">
                  Dialog content is composed by the caller. Keep the primitive
                  focused on modal structure, focus management, and motion.
                </div>
                <DialogFooter>
                  <DialogClose
                    render={<Button variant="ghost">Cancel</Button>}
                  />
                  <Button>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SpecimenRow>

          <SpecimenRow label="Alert">
            <AlertDialog>
              <AlertDialogTrigger
                render={<Button variant="destructive">Delete workspace</Button>}
              />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This permanently removes conversations, knowledge sources,
                    and automation settings. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogClose
                    render={<Button variant="ghost">Cancel</Button>}
                  />
                  <AlertDialogClose
                    render={
                      <Button variant="destructive">Delete workspace</Button>
                    }
                  />
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Close button"
        description="Dialogs include a close control by default. Alert dialogs omit it so choices stay explicit."
      >
        <SpecimenList>
          <SpecimenRow label="Default">
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline">Default close</Button>}
              />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Default close button</DialogTitle>
                  <DialogDescription>
                    DialogContent renders a top-right close affordance unless it
                    is disabled by composition.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </SpecimenRow>

          <SpecimenRow label="Composed" token="showCloseButton={false}">
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline">No close button</Button>}
              />
              <DialogContent showCloseButton={false}>
                <DialogHeader>
                  <DialogTitle>Composed actions only</DialogTitle>
                  <DialogDescription>
                    Use showCloseButton=false when all exits should be
                    represented in the footer or custom content.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button>Done</Button>} />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
