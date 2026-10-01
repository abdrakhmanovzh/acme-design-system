import {
  IconArchive,
  IconCopy,
  IconDots,
  IconExternalLink,
  IconTrash
} from '@tabler/icons-react'

import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubmenu,
  DropdownMenuSubmenuContent,
  DropdownMenuSubmenuTrigger,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu'

import { Chapter, SpecimenList, SpecimenRow } from './preview-primitives'

export function DropdownMenuPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Dropdown menu"
        description="Action menus for row controls and bulk operations. Default placement bottom-end; destructive items use red text and a tinted highlight."
      >
        <SpecimenList>
          <SpecimenRow label="Row actions">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="iconSm"
                    aria-label="Row actions"
                  >
                    <IconDots data-slot="icon" aria-hidden="true" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <IconExternalLink data-slot="icon" aria-hidden="true" />
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconCopy data-slot="icon" aria-hidden="true" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconArchive data-slot="icon" aria-hidden="true" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive>
                  <IconTrash data-slot="icon" aria-hidden="true" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Table toolbar controls — menus align end so panels open toward the content column."
      >
        <SpecimenList>
          <SpecimenRow label="Columns">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline">Columns</Button>}
              />
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Show columns</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem defaultChecked>
                    Name
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem defaultChecked>
                    Status
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Quota</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Last used</DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SpecimenRow>

          <SpecimenRow label="Submenu">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline">Export</Button>}
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <IconCopy data-slot="icon" aria-hidden="true" />
                  Copy link
                </DropdownMenuItem>
                <DropdownMenuSubmenu>
                  <DropdownMenuSubmenuTrigger>
                    Download transcript
                  </DropdownMenuSubmenuTrigger>
                  <DropdownMenuSubmenuContent>
                    <DropdownMenuItem>JSON</DropdownMenuItem>
                    <DropdownMenuItem>CSV</DropdownMenuItem>
                  </DropdownMenuSubmenuContent>
                </DropdownMenuSubmenu>
              </DropdownMenuContent>
            </DropdownMenu>
          </SpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
