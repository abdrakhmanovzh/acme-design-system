import {
  IconAlertTriangle,
  IconArchive,
  IconCopy,
  IconDots,
  IconHistory,
  IconInfoCircle,
  IconPlayerPlayFilled,
  IconRobotFace,
  IconSparkles,
  IconTrash
} from '@tabler/icons-react'
import type * as React from 'react'

import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'
import { Avatar } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '#/components/ui/breadcrumb'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '#/components/ui/card'
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '#/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu'
import { Progress } from '#/components/ui/progress'
import { Spinner } from '#/components/ui/spinner'
import { Tabs, TabsList, TabsPanel, TabsTrigger } from '#/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '#/components/ui/tooltip'

const RUNS: {
  id: string
  query: string
  elapsed: string
  status: 'success' | 'running' | 'failed' | 'queued'
}[] = [
  {
    id: 'run_8fH2',
    query: 'Refund window for international Pro plan',
    elapsed: '0.9s',
    status: 'success'
  },
  {
    id: 'run_8fH1',
    query: 'How do I rotate an API key without downtime?',
    elapsed: '—',
    status: 'running'
  },
  {
    id: 'run_8fH0',
    query: 'Customer asked about SOC2 evidence package',
    elapsed: '1.4s',
    status: 'success'
  },
  {
    id: 'run_8fGz',
    query: 'Escalation path for billing disputes over $5k',
    elapsed: '0.8s',
    status: 'success'
  },
  {
    id: 'run_8fGy',
    query: 'Bulk export with team-level permissions',
    elapsed: '2.1s',
    status: 'failed'
  },
  {
    id: 'run_8fGx',
    query: 'Status of EU data residency rollout',
    elapsed: '—',
    status: 'queued'
  }
]

const STATUS_STYLES = {
  success: {
    label: 'Success',
    variant: 'success' as const,
    dot: 'bg-success-foreground'
  },
  running: {
    label: 'Running',
    variant: 'info' as const,
    dot: 'bg-info-foreground'
  },
  failed: {
    label: 'Failed',
    variant: 'destructive' as const,
    dot: 'bg-destructive'
  },
  queued: {
    label: 'Queued',
    variant: 'status' as const,
    dot: 'bg-muted-foreground'
  }
}

const OWNERS = [
  { name: 'Alex Rivera', role: 'Account exec', primary: true },
  { name: 'Priya Shah', role: 'Customer success', primary: false },
  { name: 'Jordan Chen', role: 'Eng on-call', primary: false }
]

const preventNav = (e: React.MouseEvent) => e.preventDefault()

export function AgentDetail() {
  return (
    <TooltipProvider>
      <div className="min-w-0 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={preventNav}>
                Registry
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={preventNav}>
                Agents
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Support copilot</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
              <IconRobotFace className="size-6" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-xl font-semibold tracking-tight">
                  Support copilot
                </h4>
                <Badge variant="success">Active</Badge>
                <Badge variant="source">claude-sonnet-4</Badge>
              </div>
              <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                agents/support-copilot · v4.2 · Updated 2 days ago
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline">Edit</Button>
            <Button>
              <IconPlayerPlayFilled data-slot="icon" aria-hidden="true" />
              Run
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="More actions"
                  >
                    <IconDots data-slot="icon" />
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <IconCopy data-slot="icon" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconHistory data-slot="icon" />
                  Version history
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconArchive data-slot="icon" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger
                    render={
                      <DropdownMenuItem destructive closeOnClick={false}>
                        <IconTrash data-slot="icon" />
                        Delete agent
                      </DropdownMenuItem>
                    }
                  />
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this agent?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Support copilot will be removed from the registry. Live
                        traffic will start returning 410 within five minutes.
                        This can't be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogClose
                        render={<Button variant="ghost">Cancel</Button>}
                      />
                      <AlertDialogClose
                        render={
                          <Button variant="destructive">Delete agent</Button>
                        }
                      />
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Alert variant="warning">
          <IconAlertTriangle data-slot="icon" aria-hidden="true" />
          <AlertTitle>
            Claude Sonnet 4 reaches end-of-life on Aug 12, 2026.
          </AlertTitle>
          <AlertDescription>
            Migrate this agent to Claude Sonnet 4.5 before then to avoid
            interruption.{' '}
            <a
              href="#"
              onClick={preventNav}
              className="font-medium underline underline-offset-4 hover:opacity-80"
            >
              View migration guide
            </a>
            .
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="overview">
          <div className="overflow-x-auto overflow-y-visible py-1.5 pb-1">
            <TabsList className="w-max">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="runs">Runs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </div>

          <TabsPanel value="overview" className="min-h-160 space-y-4">
            <div className="grid min-w-0 gap-4 sm:grid-cols-3">
              <MetricCard
                label="Success rate"
                value="98.4%"
                trend="+0.6 vs last week"
                trendTone="positive"
                tooltip="Share of runs that completed without escalation in the last 7 days."
                progress={98.4}
                progressClass="bg-success-foreground"
              />
              <MetricCard
                label="Calls · 7d"
                value="14,208"
                trend="+12% vs prior week"
                trendTone="positive"
                tooltip="Total inferences served, including retries."
              />
              <MetricCard
                label="Monthly token budget"
                value="62%"
                trend="312k / 500k tokens"
                trendTone="neutral"
                tooltip="Share of this month's token budget consumed."
                progress={62}
              />
            </div>

            <div className="grid min-w-0 gap-4 lg:grid-cols-3">
              <Card className="min-w-0 lg:col-span-2">
                <CardHeader>
                  <CardTitle as="h5">Recent runs</CardTitle>
                  <CardDescription>
                    Live activity from the last few minutes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y border-t">
                    {RUNS.map((run) => {
                      const status = STATUS_STYLES[run.status]
                      return (
                        <li
                          key={run.id}
                          className="flex min-w-0 items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40 sm:px-5"
                        >
                          <div className="grid size-7 shrink-0 place-items-center text-muted-foreground">
                            {run.status === 'running' ? (
                              <Spinner className="size-4 text-info-foreground" />
                            ) : (
                              <span
                                className={`size-2 rounded-full ${status.dot}`}
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm">{run.query}</div>
                            <div className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                              {run.id} · {run.elapsed}
                            </div>
                          </div>
                          <Badge
                            variant={status.variant}
                            size="sm"
                            className="shrink-0"
                          >
                            {status.label}
                          </Badge>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>

              <Card className="min-w-0">
                <CardHeader>
                  <CardTitle as="h5">Owners</CardTitle>
                  <CardDescription>Notified on incidents.</CardDescription>
                </CardHeader>
                <CardContent className="min-w-0 space-y-3">
                  {OWNERS.map((owner) => (
                    <Tooltip key={owner.name}>
                      <TooltipTrigger
                        render={
                          <div className="flex w-full min-w-0 items-center gap-3 rounded-md p-1 transition-colors hover:bg-muted/40">
                            <Avatar size="sm" name={owner.name} />
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-medium">
                                {owner.name}
                              </div>
                              <div className="truncate text-xs text-muted-foreground">
                                {owner.role}
                              </div>
                            </div>
                            {owner.primary ? (
                              <Badge
                                variant="outline"
                                size="sm"
                                className="shrink-0"
                              >
                                Primary
                              </Badge>
                            ) : null}
                          </div>
                        }
                      />
                      <TooltipContent>
                        {owner.primary
                          ? 'Paged first on incidents'
                          : 'Paged after primary'}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  <Button variant="outline" className="w-full">
                    Manage owners
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsPanel>

          <TabsPanel value="prompt" className="min-h-160">
            <Card>
              <CardContent className="py-12 text-center text-sm text-muted-foreground">
                <IconSparkles
                  className="mx-auto size-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="mt-3">Prompt editor renders here.</p>
              </CardContent>
            </Card>
          </TabsPanel>
          <TabsPanel value="tools" className="min-h-160">
            <Card>
              <CardContent className="py-12 text-center text-sm text-muted-foreground">
                Tool inventory for this agent.
              </CardContent>
            </Card>
          </TabsPanel>
          <TabsPanel value="runs" className="min-h-160">
            <Card>
              <CardContent className="py-12 text-center text-sm text-muted-foreground">
                Full run history with filters.
              </CardContent>
            </Card>
          </TabsPanel>
          <TabsPanel value="settings" className="min-h-160">
            <Card>
              <CardContent className="py-12 text-center text-sm text-muted-foreground">
                Access, retention, and integration settings.
              </CardContent>
            </Card>
          </TabsPanel>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}

function MetricCard({
  label,
  value,
  trend,
  trendTone,
  tooltip,
  progress,
  progressClass
}: {
  label: string
  value: string
  trend: string
  trendTone: 'positive' | 'negative' | 'neutral'
  tooltip: string
  progress?: number
  progressClass?: string
}) {
  const trendColor =
    trendTone === 'positive'
      ? 'text-success-foreground'
      : trendTone === 'negative'
        ? 'text-destructive'
        : 'text-muted-foreground'

  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium tracking-tight text-muted-foreground uppercase">
            {label}
          </span>
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  aria-label={`What is ${label}?`}
                  className="text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  <IconInfoCircle className="size-3.5" />
                </button>
              }
            />
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        </div>
        <div className="text-2xl font-semibold tabular-nums">{value}</div>
        {progress !== undefined ? (
          <Progress
            value={progress}
            size="sm"
            indicatorClassName={progressClass}
          />
        ) : null}
        <div className={`text-xs ${trendColor}`}>{trend}</div>
      </CardContent>
    </Card>
  )
}
