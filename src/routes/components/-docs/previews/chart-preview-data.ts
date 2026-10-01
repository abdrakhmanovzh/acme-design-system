import {
  chartSeriesColors,
  type ChartConfig
} from '#/components/ui/charts/chart'
import type { SankeyData } from 'recharts'

export const monthlyData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 }
] as const

export const seriesChartConfig = {
  desktop: {
    label: 'Desktop',
    colors: chartSeriesColors(1)
  },
  mobile: {
    label: 'Mobile',
    colors: chartSeriesColors(2)
  }
} satisfies ChartConfig

export const pieData = [
  { channel: 'Email', sessions: 420 },
  { channel: 'Chat', sessions: 310 },
  { channel: 'Voice', sessions: 180 },
  { channel: 'API', sessions: 95 }
]

export const pieChartConfig = {
  Email: { label: 'Email', colors: chartSeriesColors(1) },
  Chat: { label: 'Chat', colors: chartSeriesColors(2) },
  Voice: { label: 'Voice', colors: chartSeriesColors(3) },
  API: { label: 'API', colors: chartSeriesColors(4) }
} satisfies ChartConfig

export const radarData = [
  { metric: 'Latency', agents: 88, baseline: 72 },
  { metric: 'Accuracy', agents: 94, baseline: 81 },
  { metric: 'Coverage', agents: 76, baseline: 68 },
  { metric: 'Uptime', agents: 99, baseline: 95 },
  { metric: 'Cost', agents: 62, baseline: 70 }
]

export const radarChartConfig = {
  agents: { label: 'Agents', colors: chartSeriesColors(1) },
  baseline: { label: 'Baseline', colors: chartSeriesColors(2) }
} satisfies ChartConfig

export const radialData = [
  { browser: 'Chrome', visitors: 275 },
  { browser: 'Safari', visitors: 200 },
  { browser: 'Firefox', visitors: 120 },
  { browser: 'Edge', visitors: 90 },
  { browser: 'Other', visitors: 55 }
]

export const radialChartConfig = {
  Chrome: { label: 'Chrome', colors: chartSeriesColors(1) },
  Safari: { label: 'Safari', colors: chartSeriesColors(2) },
  Firefox: { label: 'Firefox', colors: chartSeriesColors(3) },
  Edge: { label: 'Edge', colors: chartSeriesColors(4) },
  Other: { label: 'Other', colors: chartSeriesColors('neutral') }
} satisfies ChartConfig

export const sankeyData: SankeyData = {
  nodes: [
    { name: 'Inbound' },
    { name: 'Triage' },
    { name: 'Resolved' },
    { name: 'Escalated' }
  ],
  links: [
    { source: 0, target: 1, value: 240 },
    { source: 1, target: 2, value: 180 },
    { source: 1, target: 3, value: 60 }
  ]
}

export const sankeyChartConfig = {
  Inbound: { label: 'Inbound', colors: chartSeriesColors(1) },
  Triage: { label: 'Triage', colors: chartSeriesColors(2) },
  Resolved: { label: 'Resolved', colors: chartSeriesColors(3) },
  Escalated: { label: 'Escalated', colors: chartSeriesColors(4) }
} satisfies ChartConfig
