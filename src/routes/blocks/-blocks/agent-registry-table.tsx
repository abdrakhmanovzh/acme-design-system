import {
  IconArchive,
  IconCopy,
  IconDots,
  IconExternalLink,
  IconPlus,
  IconSearch,
  IconTrash
} from '@tabler/icons-react'
import type * as React from 'react'

import { Avatar } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '#/components/ui/card'
import { Checkbox } from '#/components/ui/checkbox'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger
} from '#/components/ui/combobox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '#/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '#/components/ui/pagination'
import { Progress } from '#/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '#/components/ui/tooltip'

const PROVIDERS = [
  { value: 'all', label: 'All providers' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'google', label: 'Google' },
  { value: 'custom', label: 'Custom endpoint' }
]

const STATUS_FILTER_ITEMS = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'paused', label: 'Paused' },
  { value: 'archived', label: 'Archived' }
]

type Status = 'active' | 'draft' | 'paused' | 'archived'

const STATUS_LABEL: Record<
  Status,
  { label: string; variant: 'success' | 'status' | 'warning' | 'secondary' }
> = {
  active: { label: 'Active', variant: 'success' },
  draft: { label: 'Draft', variant: 'status' },
  paused: { label: 'Paused', variant: 'warning' },
  archived: { label: 'Archived', variant: 'secondary' }
}

type Agent = {
  id: string
  name: string
  slug: string
  owner: string
  provider: string
  model: string
  status: Status
  quotaPercent: number
  quotaText: string
  lastUsed: string
  selected?: boolean
}

const AGENTS: Agent[] = [
  {
    id: 'a1',
    name: 'Support copilot',
    slug: 'agents/support-copilot',
    owner: 'Alex Rivera',
    provider: 'Anthropic',
    model: 'claude-sonnet-4',
    status: 'active',
    quotaPercent: 62,
    quotaText: '312k / 500k',
    lastUsed: '2m ago',
    selected: true
  },
  {
    id: 'a2',
    name: 'Renewal forecaster',
    slug: 'agents/renewal-forecaster',
    owner: 'Priya Shah',
    provider: 'Anthropic',
    model: 'claude-sonnet-4',
    status: 'active',
    quotaPercent: 41,
    quotaText: '205k / 500k',
    lastUsed: '14m ago'
  },
  {
    id: 'a3',
    name: 'Sales call summarizer',
    slug: 'agents/sales-call-summarizer',
    owner: 'Jordan Chen',
    provider: 'OpenAI',
    model: 'gpt-4.1',
    status: 'active',
    quotaPercent: 88,
    quotaText: '440k / 500k',
    lastUsed: '1h ago'
  },
  {
    id: 'a4',
    name: 'Claims triage',
    slug: 'agents/claims-triage',
    owner: 'Marcus Klein',
    provider: 'Anthropic',
    model: 'claude-sonnet-4',
    status: 'draft',
    quotaPercent: 0,
    quotaText: '0 / 500k',
    lastUsed: 'Never',
    selected: true
  },
  {
    id: 'a5',
    name: 'Onboarding answers',
    slug: 'agents/onboarding-answers',
    owner: 'Sofia Garcia',
    provider: 'Anthropic',
    model: 'claude-haiku-4-5',
    status: 'active',
    quotaPercent: 27,
    quotaText: '135k / 500k',
    lastUsed: '3h ago'
  },
  {
    id: 'a6',
    name: 'Billing dispute classifier',
    slug: 'agents/billing-dispute',
    owner: 'Maya Chen',
    provider: 'OpenAI',
    model: 'gpt-4.1',
    status: 'paused',
    quotaPercent: 0,
    quotaText: '0 / 500k',
    lastUsed: '2d ago'
  },
  {
    id: 'a7',
    name: 'Internal docs Q&A',
    slug: 'agents/internal-docs',
    owner: 'Oliver Hughes',
    provider: 'Google',
    model: 'gemini-2.5-pro',
    status: 'active',
    quotaPercent: 54,
    quotaText: '270k / 500k',
    lastUsed: '6h ago'
  },
  {
    id: 'a8',
    name: 'Legacy ticket router',
    slug: 'agents/legacy-router',
    owner: 'Amina Yusuf',
    provider: 'Custom',
    model: 'mistral-medium',
    status: 'archived',
    quotaPercent: 0,
    quotaText: '—',
    lastUsed: '21d ago'
  }
]

const selectedCount = AGENTS.filter((a) => a.selected).length

const preventNav = (e: React.MouseEvent) => e.preventDefault()

export function AgentRegistryTable() {
  return (
    <TooltipProvider>
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="min-w-0">
            <CardTitle as="h4">Agents</CardTitle>
            <CardDescription>
              {AGENTS.length} agents across 4 providers.
            </CardDescription>
          </div>
          <CardAction>
            <Button variant="outline">Import</Button>
            <Button>
              <IconPlus data-slot="icon" aria-hidden="true" />
              New agent
            </Button>
          </CardAction>
        </CardHeader>

        <div className="flex flex-wrap items-center gap-2 border-t bg-muted/30 px-5 py-3">
          <InputGroup className="w-72">
            <InputGroupAddon>
              <IconSearch className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search by name or identifier" />
          </InputGroup>

          <div className="w-44">
            <Combobox
              items={PROVIDERS}
              defaultValue={PROVIDERS[0]}
              itemToStringValue={(p) => p.label}
            >
              <ComboboxAnchor>
                <ComboboxInput placeholder="Provider" />
                <ComboboxTrigger aria-label="Filter by provider" />
              </ComboboxAnchor>
              <ComboboxContent>
                <ComboboxList>
                  {(p: (typeof PROVIDERS)[number]) => (
                    <ComboboxItem key={p.value} value={p}>
                      {p.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <Select items={STATUS_FILTER_ITEMS} defaultValue="all">
            <SelectTrigger aria-label="Status" className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTER_ITEMS.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  label={item.label}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCount > 0 ? (
            <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
              <span>{selectedCount} selected</span>
              <Button variant="ghost" size="sm">
                Archive
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          ) : null}
        </div>

        <CardContent className="overflow-x-auto p-0">
          <table className="w-full border-collapse text-sm">
            <thead className="border-b bg-muted/30 text-xs tracking-tight text-muted-foreground uppercase">
              <tr>
                <th className="w-10 px-5 py-2.5 text-left">
                  <Checkbox
                    aria-label="Select all"
                    indeterminate={
                      selectedCount > 0 && selectedCount < AGENTS.length
                    }
                    checked={selectedCount === AGENTS.length}
                  />
                </th>
                <th className="px-3 py-2.5 text-left font-medium">Agent</th>
                <th className="hidden px-3 py-2.5 text-left font-medium md:table-cell">
                  Owner
                </th>
                <th className="hidden px-3 py-2.5 text-left font-medium lg:table-cell">
                  Model
                </th>
                <th className="px-3 py-2.5 text-left font-medium">Status</th>
                <th className="hidden px-3 py-2.5 text-left font-medium lg:table-cell">
                  Quota
                </th>
                <th className="hidden px-3 py-2.5 text-left font-medium md:table-cell">
                  Last used
                </th>
                <th className="w-10 px-3 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {AGENTS.map((agent) => {
                const status = STATUS_LABEL[agent.status]
                return (
                  <tr
                    key={agent.id}
                    data-selected={agent.selected || undefined}
                    className="group transition-colors hover:bg-muted/40 data-selected:bg-primary/5"
                  >
                    <td className="px-5 py-3">
                      <Checkbox
                        aria-label={`Select ${agent.name}`}
                        defaultChecked={agent.selected}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar size="sm" name={agent.name} shape="rounded" />
                        <div className="min-w-0">
                          <div className="truncate font-medium">
                            {agent.name}
                          </div>
                          <div className="truncate font-mono text-xs text-muted-foreground">
                            {agent.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-3 py-3 text-muted-foreground md:table-cell">
                      {agent.owner}
                    </td>
                    <td className="hidden px-3 py-3 lg:table-cell">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs">{agent.model}</span>
                        <span className="text-xs text-muted-foreground">
                          {agent.provider}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Badge variant={status.variant} size="sm">
                        {status.label}
                      </Badge>
                    </td>
                    <td className="hidden px-3 py-3 lg:table-cell">
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <div className="flex w-32 items-center gap-2">
                              <Progress
                                value={agent.quotaPercent}
                                size="sm"
                                className="flex-1"
                                indicatorClassName={
                                  agent.quotaPercent >= 85
                                    ? 'bg-info-foreground'
                                    : undefined
                                }
                              />
                              <span className="w-9 text-right font-mono text-xs text-muted-foreground tabular-nums">
                                {agent.quotaPercent}%
                              </span>
                            </div>
                          }
                        />
                        <TooltipContent>
                          {agent.quotaText} tokens
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="hidden px-3 py-3 text-muted-foreground md:table-cell">
                      {agent.lastUsed}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Actions for ${agent.name}`}
                              className="opacity-0 transition-opacity group-hover:opacity-100 group-data-selected:opacity-100 data-popup-open:opacity-100"
                            >
                              <IconDots data-slot="icon" />
                            </Button>
                          }
                        />
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <IconExternalLink data-slot="icon" />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconCopy data-slot="icon" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconArchive data-slot="icon" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem destructive>
                            <IconTrash data-slot="icon" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 px-5 py-3 text-sm text-muted-foreground">
          <span>
            Showing <span className="font-medium text-foreground">1–8</span> of{' '}
            <span className="font-medium text-foreground">42</span> agents
          </span>
          <Pagination className="w-auto justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled
                  onClick={preventNav}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive onClick={preventNav}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={preventNav}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={preventNav}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={preventNav}>
                  6
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" onClick={preventNav} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </TooltipProvider>
  )
}
