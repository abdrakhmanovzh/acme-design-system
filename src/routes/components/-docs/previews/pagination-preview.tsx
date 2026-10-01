import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '#/components/ui/pagination'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

function PaginationFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

export function PaginationPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Pagination"
        description="Static page navigation — callers own page math. Active pages use the primary frame halo; Previous and Next use the nav variant."
      >
        <SpecimenList>
          <PaginationFillRow label="Centered">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    5
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">6</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </PaginationFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Registry table footer with result counts and end-aligned page controls."
      >
        <SpecimenList>
          <PaginationFillRow label="Registry footer">
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-xl border bg-card px-5 py-3 text-sm text-muted-foreground">
              <span>
                Showing <span className="font-medium text-foreground">1–8</span>{' '}
                of <span className="font-medium text-foreground">42</span>{' '}
                agents
              </span>
              <Pagination className="w-auto justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" aria-disabled />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">6</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </PaginationFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
