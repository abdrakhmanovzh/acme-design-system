import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '#/components/ui/breadcrumb'
import { cn } from '#/lib/cn'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

function BreadcrumbFillRow({
  className,
  ...props
}: SpecimenRowProps & {
  className?: string
}) {
  return (
    <SpecimenRow {...props}>
      <FillPreview className={cn('min-w-0', className)}>
        {props.children}
      </FillPreview>
    </SpecimenRow>
  )
}

export function BreadcrumbPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Breadcrumb"
        description="Static hierarchy navigation on one line. Links truncate; the current page uses BreadcrumbPage. Chevron is the default separator."
      >
        <SpecimenList>
          <BreadcrumbFillRow label="Agent detail">
            <Breadcrumb className="min-w-0">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Registry</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Agents</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Support copilot</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </BreadcrumbFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Collapsed middle segments and narrow containers where labels truncate."
      >
        <SpecimenList>
          <BreadcrumbFillRow label="Collapsed path">
            <Breadcrumb className="min-w-0">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Registry</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Northwind Logistics</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Q2 account review transcript</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </BreadcrumbFillRow>

          <BreadcrumbFillRow label="Truncation" className="max-w-xs">
            <Breadcrumb className="min-w-0">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Workspaces</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Integrations</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Customer support copilot — production
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </BreadcrumbFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
