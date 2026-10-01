import type { ComponentProps } from 'react'

import { Card, CardContent } from '#/components/ui/card'
import { Tabs, TabsList, TabsPanel, TabsTrigger } from '#/components/ui/tabs'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

const agentTabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'prompt', label: 'Prompt' },
  { value: 'tools', label: 'Tools' },
  { value: 'runs', label: 'Runs' },
  { value: 'settings', label: 'Settings' }
] as const

const agentPanelCopy: Record<(typeof agentTabs)[number]['value'], string> = {
  overview: 'Overview metrics, owners, and activity render here.',
  prompt: 'Prompt editor for this agent.',
  tools: 'Tool inventory.',
  runs: 'Run history with filters.',
  settings: 'Access, retention, and integrations.'
}

const settingsTabs = [
  {
    value: 'general',
    label: 'General',
    panel: 'Workspace name, timezone, and defaults.'
  },
  {
    value: 'security',
    label: 'Security',
    panel: 'SSO, API keys, and audit settings.'
  },
  {
    value: 'billing',
    label: 'Billing',
    panel: 'Plan, seats, and usage limits.'
  }
] as const

const registryTabs = [
  { value: 'all', label: 'All', panel: 'Full agent registry table.' },
  {
    value: 'active',
    label: 'Active',
    panel: 'Agents currently receiving traffic.'
  },
  {
    value: 'archived',
    label: 'Archived',
    panel: 'Read-only historical agents.'
  }
] as const

const runTabs = [
  {
    value: 'metrics',
    label: 'Metrics',
    panel: 'Resolution rate and token usage.'
  },
  { value: 'logs', label: 'Logs', panel: 'Structured run output.' },
  { value: 'config', label: 'Config', panel: 'Model and routing overrides.' }
] as const

function TabsFillRow(props: SpecimenRowProps) {
  return (
    <SpecimenRow {...props}>
      <FillPreview>{props.children}</FillPreview>
    </SpecimenRow>
  )
}

function TabPanelPlaceholder({ children }: { children: string }) {
  return (
    <Card>
      <CardContent className="py-10 text-center text-sm text-muted-foreground">
        {children}
      </CardContent>
    </Card>
  )
}

function SimpleTabs({
  defaultValue,
  tabs,
  tabsProps,
  listProps,
  panelClassName = 'min-h-20'
}: {
  defaultValue: string
  tabs: ReadonlyArray<{ value: string; label: string; panel: string }>
  tabsProps?: ComponentProps<typeof Tabs>
  listProps?: ComponentProps<typeof TabsList>
  panelClassName?: string
}) {
  return (
    <Tabs defaultValue={defaultValue} {...tabsProps}>
      <TabsList className="w-max" {...listProps}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsPanel key={tab.value} value={tab.value} className={panelClassName}>
          <p className="text-sm text-muted-foreground">{tab.panel}</p>
        </TabsPanel>
      ))}
    </Tabs>
  )
}

export function TabsPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Tabs"
        description="Horizontal content tabs with an animated indicator. Rail is the default list variant; pill removes the inset track for looser spacing."
      >
        <SpecimenList>
          <TabsFillRow label="Agent detail">
            <Tabs defaultValue="overview">
              <div className="overflow-x-auto overflow-y-visible py-1.5 pb-1">
                <TabsList className="w-max">
                  {agentTabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {agentTabs.map((tab) => (
                <TabsPanel
                  key={tab.value}
                  value={tab.value}
                  className="min-h-32"
                >
                  <TabPanelPlaceholder>
                    {agentPanelCopy[tab.value]}
                  </TabPanelPlaceholder>
                </TabsPanel>
              ))}
            </Tabs>
          </TabsFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Variants"
        description="Pill list style, equal-width triggers, and compact sm triggers."
      >
        <SpecimenList>
          <TabsFillRow label="Pill" token='variant="pill"'>
            <SimpleTabs
              defaultValue="general"
              tabs={settingsTabs}
              listProps={{ variant: 'pill' }}
              panelClassName="min-h-24"
            />
          </TabsFillRow>

          <TabsFillRow label="Equal width" token="equal">
            <SimpleTabs
              defaultValue="all"
              tabs={registryTabs}
              listProps={{ equal: true, className: 'w-full' }}
            />
          </TabsFillRow>

          <TabsFillRow label="Small" token='size="sm"'>
            <SimpleTabs
              defaultValue="metrics"
              tabs={runTabs}
              tabsProps={{ size: 'sm' }}
            />
          </TabsFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
