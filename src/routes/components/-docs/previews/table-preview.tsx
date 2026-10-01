import { Badge } from '#/components/ui/badge'
import { Checkbox } from '#/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '#/components/ui/table'

import { Chapter, SpecimenList, StackedSpecimenRow } from './preview-primitives'

const agents = [
  {
    name: 'Sales Qualification',
    source: 'Voice',
    status: 'Active',
    model: 'gpt-4.1',
    runs: '12,408',
    latency: '420ms'
  },
  {
    name: 'Support Triage',
    source: 'Chat',
    status: 'Syncing',
    model: 'claude-3.7',
    runs: '8,912',
    latency: '390ms'
  },
  {
    name: 'Renewal Assistant',
    source: 'API',
    status: 'Queued',
    model: 'gemini-2.0',
    runs: '3,184',
    latency: '510ms'
  },
  {
    name: 'QA Reviewer',
    source: 'Audio',
    status: 'Error',
    model: 'gpt-4o',
    runs: '964',
    latency: '—'
  }
] as const

function StatusBadge({ status }: { status: string }) {
  if (status === 'Active') return <Badge variant="success" size="sm">Active</Badge>
  if (status === 'Syncing') return <Badge variant="info" size="sm">Syncing</Badge>
  if (status === 'Queued') return <Badge variant="warning" size="sm">Queued</Badge>
  return <Badge variant="destructive" size="sm">Error</Badge>
}

export function TablePreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Table"
        description="Semantic data tables for dense dashboard and registry screens."
      >
        <TableContainer className="w-full">
          <Table>
            <TableCaption>Agent activity from the last 30 days.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="text-right">Runs</TableHead>
                <TableHead className="text-right">Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.name}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>
                    <Badge variant="source" size="sm" indicator="none">
                      {agent.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={agent.status} />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {agent.model}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {agent.runs}
                  </TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground tabular-nums">
                    {agent.latency}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Chapter>

      <Chapter
        title="States and density"
        description="Rows support quiet hover states, caller-managed selection via data-selected, and compact metadata."
      >
        <SpecimenList>
          <StackedSpecimenRow label="Selection" token="data-selected">
            <TableContainer className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead aria-label="Select row">
                      <Checkbox size="sm" aria-label="Select all rows" />
                    </TableHead>
                    <TableHead>Workspace</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead className="text-right">Seats</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow data-selected>
                    <TableCell>
                      <Checkbox
                        size="sm"
                        aria-label="Select Acme"
                        defaultChecked
                      />
                    </TableCell>
                    <TableCell className="font-medium">Acme Ops</TableCell>
                    <TableCell>Enterprise</TableCell>
                    <TableCell className="text-right tabular-nums">
                      128
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Checkbox size="sm" aria-label="Select Northstar" />
                    </TableCell>
                    <TableCell className="font-medium">Northstar AI</TableCell>
                    <TableCell>Growth</TableCell>
                    <TableCell className="text-right tabular-nums">
                      42
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </StackedSpecimenRow>

          <StackedSpecimenRow label="Footer">
            <TableContainer className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">Current</TableHead>
                    <TableHead className="text-right">Previous</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Resolution rate</TableCell>
                    <TableCell className="text-right tabular-nums">
                      94.2%
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground tabular-nums">
                      91.8%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Escalations</TableCell>
                    <TableCell className="text-right tabular-nums">
                      18
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground tabular-nums">
                      24
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Net change</TableCell>
                    <TableCell className="text-right text-success-foreground tabular-nums">
                      +2.4%
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      Last 7 days
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </StackedSpecimenRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
