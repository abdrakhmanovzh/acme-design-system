import {
  Area,
  AreaChart,
  Grid as AreaGrid,
  Legend as AreaLegend,
  Tooltip as AreaTooltip,
  XAxis as AreaXAxis,
  YAxis as AreaYAxis
} from '#/components/ui/charts/area-chart'
import {
  Bar,
  BarChart,
  Grid as BarGrid,
  Legend as BarLegend,
  Tooltip as BarTooltip,
  XAxis as BarXAxis,
  YAxis as BarYAxis
} from '#/components/ui/charts/bar-chart'
import {
  ActiveDot,
  Dot,
  Grid as LineGrid,
  Line,
  LineChart,
  Tooltip as LineTooltip,
  XAxis as LineXAxis,
  YAxis as LineYAxis
} from '#/components/ui/charts/line-chart'
import {
  Background as PieBackground,
  Legend as PieLegend,
  Pie,
  PieChart,
  Tooltip as PieTooltip
} from '#/components/ui/charts/pie-chart'
import {
  ActiveDot as RadarActiveDot,
  Dot as RadarDot,
  Legend as RadarLegend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip as RadarTooltip
} from '#/components/ui/charts/radar-chart'
import {
  Legend as RadialLegend,
  RadialBar,
  RadialChart,
  Tooltip as RadialTooltip
} from '#/components/ui/charts/radial-chart'
import {
  Link,
  Node,
  NodeLabel,
  SankeyChart,
  Tooltip as SankeyTooltip
} from '#/components/ui/charts/sankey-chart'
import { cn } from '#/lib/cn'
import type { ReactNode } from 'react'

import {
  monthlyData,
  pieChartConfig,
  pieData,
  radarChartConfig,
  radarData,
  radialChartConfig,
  radialData,
  sankeyChartConfig,
  sankeyData,
  seriesChartConfig
} from './chart-preview-data'
import { Chapter, SpecimenList, StackedSpecimenRow } from './preview-primitives'

const chartFrameClassName =
  'h-64 w-full min-w-0 rounded-lg border border-border-muted bg-card p-3 sm:p-4'

const radarFrameClassName =
  'mx-auto flex h-64 w-full max-w-xs min-w-0 items-center justify-center rounded-lg border border-border-muted bg-card p-3 sm:p-4'

const pieFrameClassName =
  'mx-auto aspect-square h-64 w-full max-w-xs min-w-0 rounded-lg border border-border-muted bg-card p-3 sm:p-4'

function ChartFrame({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn(chartFrameClassName, className)}>{children}</div>
}

function MonthAxisShell({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <AreaGrid />
      <AreaXAxis
        dataKey="month"
        tickFormatter={(value) => String(value).slice(0, 3)}
      />
      <AreaYAxis width={36} />
      <AreaTooltip />
    </>
  )
}

const areaVariants = [
  'gradient',
  'gradient-reverse',
  'solid',
  'dotted',
  'lines',
  'hatched'
] as const

const lineStrokeVariants = ['solid', 'dashed'] as const

const barVariants = [
  'default',
  'hatched',
  'duotone',
  'duotone-reverse',
  'gradient',
  'stripped'
] as const

const sankeyLinkVariants = ['gradient', 'solid', 'source', 'target'] as const

/** Many specimens on one page — skip entry animations for scroll/render perf. */
const previewMotionProps = { animationType: 'none' as const }
const previewRechartsMotionProps = { isAnimationActive: false as const }

export function ChartsPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Area chart"
        description="Composable area series with fill patterns, stroke styles, stacking, and optional zoom brush."
      >
        <SpecimenList>
          {areaVariants.map((variant) => (
            <StackedSpecimenRow
              key={variant}
              label={variant}
              token={`variant="${variant}"`}
            >
              <ChartFrame>
                <AreaChart
                  {...previewMotionProps}
                  className="h-full"
                  config={seriesChartConfig}
                  data={[...monthlyData]}
                >
                  <MonthAxisShell>
                    <Area
                      dataKey="desktop"
                      variant={variant}
                      strokeVariant="solid"
                    />
                  </MonthAxisShell>
                </AreaChart>
              </ChartFrame>
            </StackedSpecimenRow>
          ))}
          <StackedSpecimenRow label="Stacked" token='stackType="stacked"'>
            <ChartFrame>
              <AreaChart
                {...previewMotionProps}
                className="h-full"
                config={seriesChartConfig}
                data={[...monthlyData]}
                stackType="stacked"
              >
                <MonthAxisShell>
                  <Area dataKey="desktop" />
                  <Area dataKey="mobile" />
                  <AreaLegend isClickable />
                </MonthAxisShell>
              </AreaChart>
            </ChartFrame>
          </StackedSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Line chart"
        description="Line series with reveal masks, dot markers, glow, and buffer segments on the latest point."
      >
        <SpecimenList>
          {lineStrokeVariants.map((strokeVariant) => (
            <StackedSpecimenRow
              key={strokeVariant}
              label={strokeVariant}
              token={`strokeVariant="${strokeVariant}"`}
            >
              <ChartFrame>
                <LineChart
                  {...previewMotionProps}
                  className="h-full"
                  config={seriesChartConfig}
                  data={[...monthlyData]}
                >
                  <LineGrid />
                  <LineXAxis
                    dataKey="month"
                    tickFormatter={(value) => String(value).slice(0, 3)}
                  />
                  <LineYAxis width={36} />
                  <LineTooltip />
                  <Line dataKey="desktop" strokeVariant={strokeVariant}>
                    <Dot variant="border" />
                    <ActiveDot variant="colored-border" />
                  </Line>
                </LineChart>
              </ChartFrame>
            </StackedSpecimenRow>
          ))}
          <StackedSpecimenRow label="Glowing" token="glowing">
            <ChartFrame>
              <LineChart
                {...previewMotionProps}
                className="h-full"
                config={seriesChartConfig}
                data={[...monthlyData]}
              >
                <LineGrid />
                <LineXAxis
                  dataKey="month"
                  tickFormatter={(value) => String(value).slice(0, 3)}
                />
                <LineYAxis width={36} />
                <LineTooltip />
                <Line dataKey="desktop" glowing strokeVariant="solid" />
              </LineChart>
            </ChartFrame>
          </StackedSpecimenRow>
          <StackedSpecimenRow label="Buffer line" token="enableBufferLine">
            <ChartFrame>
              <LineChart
                {...previewMotionProps}
                className="h-full"
                config={seriesChartConfig}
                data={[...monthlyData]}
              >
                <LineGrid />
                <LineXAxis
                  dataKey="month"
                  tickFormatter={(value) => String(value).slice(0, 3)}
                />
                <LineYAxis width={36} />
                <LineTooltip />
                <Line
                  dataKey="desktop"
                  enableBufferLine
                  strokeVariant="solid"
                />
              </LineChart>
            </ChartFrame>
          </StackedSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Bar chart"
        description="Bar series with pattern fills, stacking, horizontal layout, and grow-in animation order."
      >
        <SpecimenList>
          {barVariants.map((variant) => (
            <StackedSpecimenRow
              key={variant}
              label={variant}
              token={`variant="${variant}"`}
            >
              <ChartFrame>
                <BarChart
                  {...previewMotionProps}
                  className="h-full"
                  config={seriesChartConfig}
                  data={[...monthlyData]}
                  backgroundVariant="dots"
                >
                  <BarGrid />
                  <BarXAxis
                    dataKey="month"
                    tickFormatter={(value) => String(value).slice(0, 3)}
                  />
                  <BarYAxis width={36} />
                  <BarTooltip />
                  <Bar dataKey="desktop" variant={variant} />
                </BarChart>
              </ChartFrame>
            </StackedSpecimenRow>
          ))}
          <StackedSpecimenRow label="Stacked" token='stackType="stacked"'>
            <ChartFrame>
              <BarChart
                {...previewMotionProps}
                className="h-full"
                config={seriesChartConfig}
                data={[...monthlyData]}
                stackType="stacked"
              >
                <BarGrid />
                <BarXAxis
                  dataKey="month"
                  tickFormatter={(value) => String(value).slice(0, 3)}
                />
                <BarYAxis width={36} />
                <BarTooltip />
                <Bar dataKey="desktop" />
                <Bar dataKey="mobile" />
                <BarLegend isClickable />
              </BarChart>
            </ChartFrame>
          </StackedSpecimenRow>
          <StackedSpecimenRow label="Horizontal" token='layout="horizontal"'>
            <ChartFrame>
              <BarChart
                {...previewMotionProps}
                className="h-full"
                config={seriesChartConfig}
                data={[...monthlyData]}
                layout="horizontal"
              >
                <BarGrid />
                <BarXAxis type="number" width={36} />
                <BarYAxis
                  dataKey="month"
                  type="category"
                  width={52}
                  tickFormatter={(value) => String(value).slice(0, 3)}
                />
                <BarTooltip />
                <Bar dataKey="desktop" />
              </BarChart>
            </ChartFrame>
          </StackedSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Pie chart"
        description="Radial sectors with gradient fills, donut shapes, and optional background patterns."
      >
        <SpecimenList>
          <StackedSpecimenRow label="Gradient" token='variant="gradient"'>
            <div className={pieFrameClassName}>
              <PieChart
                className="h-full"
                config={pieChartConfig}
                data={pieData}
                dataKey="sessions"
                nameKey="channel"
              >
                <PieBackground variant="dots" />
                <Pie pieProps={previewRechartsMotionProps} />
                <PieTooltip />
                <PieLegend />
              </PieChart>
            </div>
          </StackedSpecimenRow>
          <StackedSpecimenRow label="Donut" token="innerRadius">
            <div className={pieFrameClassName}>
              <PieChart
                className="h-full"
                config={pieChartConfig}
                data={pieData}
                dataKey="sessions"
                nameKey="channel"
              >
                <Pie
                  innerRadius="55%"
                  paddingAngle={2}
                  cornerRadius={4}
                  pieProps={previewRechartsMotionProps}
                />
                <PieTooltip />
                <PieLegend variant="circle-outline" />
              </PieChart>
            </div>
          </StackedSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Radar chart"
        description="Polar comparison charts with filled or line-only radars and optional point markers."
      >
        <SpecimenList>
          <StackedSpecimenRow label="Filled" token='variant="filled"'>
            <div className={radarFrameClassName}>
              <RadarChart
                className="aspect-square h-full max-h-56 w-full"
                config={radarChartConfig}
                data={radarData}
                backgroundVariant="grid"
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis />
                <Radar
                  dataKey="agents"
                  variant="filled"
                  radarProps={previewRechartsMotionProps}
                />
                <Radar
                  dataKey="baseline"
                  variant="filled"
                  radarProps={previewRechartsMotionProps}
                />
                <RadarTooltip />
                <RadarLegend />
              </RadarChart>
            </div>
          </StackedSpecimenRow>
          <StackedSpecimenRow label="Lines" token='variant="lines"'>
            <div className={radarFrameClassName}>
              <RadarChart
                className="aspect-square h-full max-h-56 w-full"
                config={radarChartConfig}
                data={radarData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis />
                <Radar
                  dataKey="agents"
                  variant="lines"
                  radarProps={previewRechartsMotionProps}
                >
                  <RadarDot />
                  <RadarActiveDot variant="border" />
                </Radar>
                <Radar
                  dataKey="baseline"
                  variant="lines"
                  radarProps={previewRechartsMotionProps}
                />
                <RadarTooltip />
              </RadarChart>
            </div>
          </StackedSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Radial chart"
        description="Circular bar charts for ranked metrics — full ring or semi-circle layouts."
      >
        <SpecimenList>
          <StackedSpecimenRow label="Full" token='variant="full"'>
            <ChartFrame>
              <RadialChart
                className="h-full"
                config={radialChartConfig}
                data={radialData}
                nameKey="browser"
                variant="full"
                backgroundVariant="dots"
              >
                <RadialBar
                  dataKey="visitors"
                  isClickable
                  radialBarProps={previewRechartsMotionProps}
                />
                <RadialTooltip />
                <RadialLegend variant="vertical-bar" />
              </RadialChart>
            </ChartFrame>
          </StackedSpecimenRow>
          <StackedSpecimenRow label="Semi" token='variant="semi"'>
            <ChartFrame>
              <RadialChart
                className="h-full"
                config={radialChartConfig}
                data={radialData}
                nameKey="browser"
                variant="semi"
              >
                <RadialBar
                  dataKey="visitors"
                  radialBarProps={previewRechartsMotionProps}
                />
                <RadialTooltip />
                <RadialLegend variant="rounded-square" />
              </RadialChart>
            </ChartFrame>
          </StackedSpecimenRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Sankey chart"
        description="Flow diagrams with composable nodes, links, and per-link coloring strategies."
      >
        <SpecimenList>
          {sankeyLinkVariants.map((variant) => (
            <StackedSpecimenRow
              key={variant}
              label={variant}
              token={`variant="${variant}"`}
            >
              <ChartFrame className="h-72">
                <SankeyChart
                  className="h-full"
                  config={sankeyChartConfig}
                  data={sankeyData}
                  backgroundVariant="grid"
                >
                  <Node>
                    <NodeLabel position="outside" showValues />
                  </Node>
                  <Link variant={variant} />
                  <SankeyTooltip />
                </SankeyChart>
              </ChartFrame>
            </StackedSpecimenRow>
          ))}
        </SpecimenList>
      </Chapter>
    </div>
  )
}
