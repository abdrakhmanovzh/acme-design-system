import {
  type ChartConfig,
  ChartContainer,
  getColorsCount,
  LoadingIndicator
} from '#/components/ui/charts/chart'
import {
  ChartTooltip,
  ChartTooltipContent
} from '#/components/ui/charts/tooltip'
import {
  ChartBackgroundPattern,
  type BackgroundVariant
} from '#/components/ui/charts/background'
import {
  Children,
  createContext,
  isValidElement,
  use,
  useCallback,
  useId,
  useMemo,
  useState,
  type FC,
  type ReactElement,
  type ReactNode
} from 'react'
import {
  Sankey as RechartsSankey,
  Layer,
  type SankeyProps,
  type SankeyNodeProps,
  type SankeyLinkProps,
  type SankeyData,
  type SankeyNode as RechartsSankeyNode
} from 'recharts'

const DEFAULT_NODE_WIDTH = 10
const DEFAULT_NODE_PADDING = 10
const DEFAULT_LINK_CURVATURE = 0.5
const DEFAULT_ITERATIONS = 32

type LinkVariant = 'gradient' | 'solid' | 'source' | 'target'
type NodeLabelPosition = 'inside' | 'outside'

type SankeyChartContextValue = {
  data: SankeyData
  config: ChartConfig
  chartId: string
  isLoading: boolean
  selectedNode: string | null
  selectNode: (nodeName: string | null) => void
}

const SankeyChartContext = createContext<SankeyChartContextValue | null>(null)

function useSankeyChart() {
  const context = use(SankeyChartContext)

  if (!context) {
    throw new Error(
      'Sankey chart parts (<Node />, <Link />, <Tooltip />, …) must be used within <SankeyChart />'
    )
  }

  return context
}

type SankeyChartBaseProps = {
  data: SankeyData
  config: ChartConfig
  children: ReactNode
  className?: string
  sankeyProps?: Omit<SankeyProps, 'data'>
  nodeWidth?: number
  nodePadding?: number
  linkCurvature?: number
  iterations?: number
  sort?: boolean
  align?: 'left' | 'justify'
  verticalAlign?: 'justify' | 'top'
  backgroundVariant?: BackgroundVariant
  defaultSelectedNode?: string | null
  onSelectionChange?: (
    selection: { dataKey: string; value: number } | null
  ) => void
  isLoading?: boolean
}

type SankeyChartProps = SankeyChartBaseProps

export function SankeyChart({
  data,
  config,
  children,
  className,
  sankeyProps,
  nodeWidth = DEFAULT_NODE_WIDTH,
  nodePadding = DEFAULT_NODE_PADDING,
  linkCurvature = DEFAULT_LINK_CURVATURE,
  iterations = DEFAULT_ITERATIONS,
  sort = true,
  align = 'justify',
  verticalAlign = 'justify',
  backgroundVariant,
  defaultSelectedNode = null,
  onSelectionChange,
  isLoading = false
}: SankeyChartProps) {
  const chartId = useId().replace(/:/g, '')
  const [selectedNode, setSelectedNode] = useState<string | null>(
    defaultSelectedNode
  )

  const selectNode = useCallback(
    (nodeName: string | null) => {
      setSelectedNode(nodeName)

      if (!onSelectionChange) return

      if (nodeName === null) {
        onSelectionChange(null)
        return
      }

      onSelectionChange({
        dataKey: nodeName,
        value: getNodeValue(data, nodeName)
      })
    },
    [onSelectionChange, data]
  )

  const contextValue = useMemo<SankeyChartContextValue>(
    () => ({ data, config, chartId, isLoading, selectedNode, selectNode }),
    [data, config, chartId, isLoading, selectedNode, selectNode]
  )

  return (
    <SankeyChartContext value={contextValue}>
      <ChartContainer className={className} config={config}>
        <LoadingIndicator isLoading={isLoading} />
        {!isLoading && (
          <RechartsSankey
            id={chartId}
            data={data}
            nodeWidth={nodeWidth}
            nodePadding={nodePadding}
            linkCurvature={linkCurvature}
            iterations={iterations}
            sort={sort}
            align={align}
            verticalAlign={verticalAlign}
            {...resolveSankeyRenderers(children)}
            {...sankeyProps}
          >
            {backgroundVariant && (
              <ChartBackgroundPattern variant={backgroundVariant} />
            )}
            {children}
            <defs>
              <NodeColorGradients config={config} chartId={chartId} />
            </defs>
          </RechartsSankey>
        )}
        {isLoading && (
          <svg
            viewBox="0 0 500 250"
            preserveAspectRatio="xMidYMid meet"
            width="100%"
            height="100%"
            className="absolute inset-0"
          >
            <LoadingSankey />
          </svg>
        )}
      </ChartContainer>
    </SankeyChartContext>
  )
}

type NodeProps = {
  radius?: number
  isClickable?: boolean
  glow?: string[]
  children?: ReactNode
}

export const Node: FC<NodeProps> = () => null

type NodeLabelProps = {
  position?: NodeLabelPosition
  showValues?: boolean
  valueFormatter?: (value: number) => string
}

export const NodeLabel: FC<NodeLabelProps> = () => null

type LinkProps = {
  variant?: LinkVariant
  verticalPadding?: number
  glow?: number[]
}

export const Link: FC<LinkProps> = () => null

type TooltipProps = {
  defaultIndex?: number
}

export function Tooltip({ defaultIndex }: TooltipProps) {
  const { isLoading } = useSankeyChart()

  if (isLoading) return null

  return (
    <ChartTooltip
      defaultIndex={defaultIndex}
      content={<ChartTooltipContent nameKey="name" hideLabel />}
    />
  )
}

const getNodeValue = (data: SankeyData, nodeName: string): number => {
  const nodeIndex = data.nodes.findIndex((node) => node.name === nodeName)
  if (nodeIndex === -1) return 0

  const outgoing = data.links
    .filter((link) => link.source === nodeIndex)
    .reduce((sum, link) => sum + link.value, 0)
  const incoming = data.links
    .filter((link) => link.target === nodeIndex)
    .reduce((sum, link) => sum + link.value, 0)

  return outgoing > 0 ? outgoing : incoming
}

const resolveSankeyRenderers = (
  children: ReactNode
): Pick<SankeyProps, 'node' | 'link'> => {
  let nodeProps: NodeProps | null = null
  let linkProps: LinkProps | null = null

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return

    if (child.type === Node) {
      nodeProps = (child as ReactElement<NodeProps>).props
    }

    if (child.type === Link) {
      linkProps = (child as ReactElement<LinkProps>).props
    }
  })

  return {
    node: (props: SankeyNodeProps) => (
      <SankeyNode {...props} nodeConfig={nodeProps} />
    ),
    link: (props: SankeyLinkProps) => (
      <SankeyLink {...props} linkConfig={linkProps} />
    )
  }
}

const resolveNodeLabel = (children: ReactNode): NodeLabelProps | null => {
  let label: NodeLabelProps | null = null

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === NodeLabel) {
      label = (child as ReactElement<NodeLabelProps>).props
    }
  })

  return label
}

type SankeyNodeRendererProps = SankeyNodeProps & {
  nodeConfig: NodeProps | null
}

const SankeyNode = ({
  x,
  y,
  width,
  height,
  payload,
  nodeConfig
}: SankeyNodeRendererProps) => {
  const { config, chartId, data, selectedNode, selectNode } = useSankeyChart()

  const radius = nodeConfig?.radius ?? 0
  const isClickable = nodeConfig?.isClickable ?? false
  const glow = nodeConfig?.glow ?? []
  const label = resolveNodeLabel(nodeConfig?.children)

  const nodeName = payload.name
  const nodeValue = payload.value
  const nodeIcon = (payload as RechartsSankeyNode & { icon?: ReactNode }).icon

  const isHighlighted = isNodeConnected(data, selectedNode, nodeName)
  const isGlowing = glow.includes(nodeName)
  const hasConfigColor = nodeName in config
  const configLabel = config[nodeName]?.label ?? nodeName
  const dimmed = isClickable && !isHighlighted

  const valueFormatter =
    label?.valueFormatter ?? ((value: number) => value.toLocaleString())
  const showValues = label?.showValues ?? false

  const labelX = x + width / 2
  const labelY = showValues ? y + height / 2 - 8 : y + height / 2
  const valueY = y + height / 2 + 8
  const outsideLabelX = x + width + 8
  const outsideLabelY = y + height / 2

  return (
    <Layer>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill={
          hasConfigColor
            ? `url(#${chartId}-sankey-colors-${nodeName})`
            : 'currentColor'
        }
        fillOpacity={dimmed ? 0.3 : 0.9}
        filter={
          isGlowing ? `url(#${chartId}-node-glow-${nodeName})` : undefined
        }
        className="transition-opacity duration-200"
        style={isClickable ? { cursor: 'pointer' } : undefined}
        onClick={() => {
          if (!isClickable) return
          selectNode(selectedNode === nodeName ? null : nodeName)
        }}
      />
      {isGlowing && (
        <defs>
          <GlowFilter chartId={chartId} name={nodeName} type="node" />
        </defs>
      )}
      {label?.position === 'inside' && (
        <>
          <rect
            x={x + 1}
            y={y + 1}
            width={width - 2}
            height={height - 2}
            rx={Math.max(0, radius - 1)}
            ry={Math.max(0, radius - 1)}
            opacity={dimmed ? 0.3 : 1}
            className="fill-background/70 transition-opacity duration-200"
            style={{ pointerEvents: 'none' }}
          />
          {nodeIcon && (
            <foreignObject
              x={labelX - 8}
              y={labelY - 30}
              width={16}
              height={16}
              opacity={dimmed ? 0.3 : 1}
              className="transition-opacity duration-200"
              style={{ pointerEvents: 'none' }}
            >
              <div className="flex items-center justify-center text-foreground/80">
                {nodeIcon}
              </div>
            </foreignObject>
          )}
          <text
            x={labelX}
            y={nodeIcon ? labelY - 4 : labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-[10px] font-medium transition-opacity duration-200"
            opacity={dimmed ? 0.3 : 1}
            style={{ pointerEvents: 'none' }}
          >
            {configLabel}
          </text>
          {showValues && (
            <text
              x={labelX}
              y={valueY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground font-mono text-xs font-medium tabular-nums transition-opacity duration-200"
              opacity={dimmed ? 0.3 : 0.6}
              style={{ pointerEvents: 'none' }}
            >
              {valueFormatter(nodeValue)}
            </text>
          )}
        </>
      )}
      {label?.position === 'outside' && (
        <>
          <text
            x={outsideLabelX}
            y={outsideLabelY - (showValues ? 8 : 0)}
            textAnchor="start"
            dominantBaseline="middle"
            className="fill-foreground text-xs"
            style={{ pointerEvents: 'none' }}
          >
            {configLabel}
          </text>
          {showValues && (
            <text
              x={outsideLabelX}
              y={outsideLabelY + 8}
              textAnchor="start"
              dominantBaseline="middle"
              opacity={0.5}
              className="fill-muted-foreground font-mono text-xs tabular-nums"
              style={{ pointerEvents: 'none' }}
            >
              {valueFormatter(nodeValue)}
            </text>
          )}
        </>
      )}
    </Layer>
  )
}

type SankeyLinkRendererProps = SankeyLinkProps & {
  linkConfig: LinkProps | null
}

const SankeyLink = ({
  sourceX,
  targetX,
  sourceY,
  targetY,
  sourceControlX,
  targetControlX,
  linkWidth,
  index,
  payload,
  linkConfig
}: SankeyLinkRendererProps) => {
  const { config, chartId, selectedNode } = useSankeyChart()

  const variant = linkConfig?.variant ?? 'gradient'
  const verticalPadding = linkConfig?.verticalPadding ?? 0
  const glow = linkConfig?.glow ?? []

  const sourceName = payload.source.name
  const targetName = payload.target.name

  const isConnected =
    selectedNode === null ||
    selectedNode === sourceName ||
    selectedNode === targetName
  const isGlowing = glow.includes(index)

  const paddedLinkWidth = Math.max(1, linkWidth - verticalPadding)
  const halfWidth = paddedLinkWidth / 2

  const linkAreaPath = `M${sourceX},${sourceY - halfWidth}
    C${sourceControlX},${sourceY - halfWidth} ${targetControlX},${targetY - halfWidth} ${targetX},${targetY - halfWidth}
    L${targetX},${targetY + halfWidth}
    C${targetControlX},${targetY + halfWidth} ${sourceControlX},${sourceY + halfWidth} ${sourceX},${sourceY + halfWidth}
    Z`

  return (
    <Layer>
      <defs>
        {variant === 'gradient' && (
          <LinkGradient
            chartId={chartId}
            index={index}
            config={config}
            sourceName={sourceName}
            targetName={targetName}
          />
        )}
        <LinkStrokeGradient chartId={chartId} index={index} />
        {isGlowing && (
          <GlowFilter chartId={chartId} name={String(index)} type="link" />
        )}
      </defs>
      <path
        d={linkAreaPath}
        fill={getLinkFill(
          variant,
          chartId,
          index,
          config,
          sourceName,
          targetName
        )}
        fillOpacity={isConnected ? 0.4 : 0.1}
        stroke={
          selectedNode !== null && isConnected
            ? `url(#${chartId}-link-stroke-${index})`
            : 'none'
        }
        strokeWidth={1}
        strokeOpacity={0.3}
        filter={isGlowing ? `url(#${chartId}-link-glow-${index})` : undefined}
        className="transition-opacity duration-200"
      />
    </Layer>
  )
}

const isNodeConnected = (
  data: SankeyData,
  selectedNode: string | null,
  nodeName: string
): boolean => {
  if (selectedNode === null || selectedNode === nodeName) return true

  const selectedIdx = data.nodes.findIndex((node) => node.name === selectedNode)
  const nodeIdx = data.nodes.findIndex((node) => node.name === nodeName)

  return data.links.some(
    (link) =>
      (link.source === selectedIdx && link.target === nodeIdx) ||
      (link.source === nodeIdx && link.target === selectedIdx)
  )
}

const getLinkFill = (
  variant: LinkVariant,
  chartId: string,
  index: number,
  config: ChartConfig,
  sourceName: string,
  targetName: string
): string => {
  switch (variant) {
    case 'gradient':
      return `url(#${chartId}-link-gradient-${index})`
    case 'source':
      return sourceName in config
        ? `url(#${chartId}-sankey-colors-${sourceName})`
        : 'currentColor'
    case 'target':
      return targetName in config
        ? `url(#${chartId}-sankey-colors-${targetName})`
        : 'currentColor'
    case 'solid':
      return sourceName in config
        ? `url(#${chartId}-sankey-colors-${sourceName})`
        : 'currentColor'
    default:
      return 'currentColor'
  }
}

/** Vertical color gradient for every configured node, painted by name. */
const NodeColorGradients = ({
  config,
  chartId
}: {
  config: ChartConfig
  chartId: string
}) => {
  return (
    <>
      {Object.entries(config).map(([dataKey, nodeConfig]) => {
        const colorsCount = getColorsCount(nodeConfig)

        return (
          <linearGradient
            key={`${chartId}-sankey-colors-${dataKey}`}
            id={`${chartId}-sankey-colors-${dataKey}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            {colorsCount === 1 ? (
              <>
                <stop offset="0%" stopColor={`var(--color-${dataKey}-0)`} />
                <stop offset="100%" stopColor={`var(--color-${dataKey}-0)`} />
              </>
            ) : (
              Array.from({ length: colorsCount }, (_, index) => {
                const offset = `${(index / (colorsCount - 1)) * 100}%`
                return (
                  <stop
                    key={offset}
                    offset={offset}
                    stopColor={`var(--color-${dataKey}-${index}, var(--color-${dataKey}-0))`}
                  />
                )
              })
            )}
          </linearGradient>
        )
      })}
    </>
  )
}

/** Source-to-target fade gradient that fills a single gradient-variant link. */
const LinkGradient = ({
  chartId,
  index,
  config,
  sourceName,
  targetName
}: {
  chartId: string
  index: number
  config: ChartConfig
  sourceName: string
  targetName: string
}) => {
  const sourceColor =
    sourceName in config ? `var(--color-${sourceName}-0)` : 'currentColor'
  const targetColor =
    targetName in config ? `var(--color-${targetName}-0)` : 'currentColor'

  return (
    <linearGradient
      id={`${chartId}-link-gradient-${index}`}
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
    >
      <stop offset="0%" stopColor={sourceColor} stopOpacity={0.2} />
      <stop offset="50%" stopColor={sourceColor} stopOpacity={0.5} />
      <stop offset="100%" stopColor={targetColor} stopOpacity={0.2} />
    </linearGradient>
  )
}

/** Primary-colored stroke gradient highlighting a link connected to the selection. */
const LinkStrokeGradient = ({
  chartId,
  index
}: {
  chartId: string
  index: number
}) => {
  return (
    <linearGradient
      id={`${chartId}-link-stroke-${index}`}
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
    >
      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0} />
      <stop offset="15%" stopColor="var(--primary)" stopOpacity={0.8} />
      <stop offset="50%" stopColor="var(--primary)" stopOpacity={1} />
      <stop offset="85%" stopColor="var(--primary)" stopOpacity={0.8} />
      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
    </linearGradient>
  )
}

/** Soft outer-glow SVG filter applied to a glowing node or link. */
const GlowFilter = ({
  chartId,
  name,
  type
}: {
  chartId: string
  name: string
  type: 'node' | 'link'
}) => {
  return (
    <filter
      id={`${chartId}-${type}-glow-${name}`}
      x="-200%"
      y="-200%"
      width="400%"
      height="400%"
    >
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0"
        result="glow"
      />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  )
}

const LoadingSankey = () => {
  const nodes = [
    { x: 30, y: 25, width: 12, height: 65, delay: 0 },
    { x: 30, y: 110, width: 12, height: 50, delay: 0.3 },
    { x: 30, y: 180, width: 12, height: 45, delay: 0.15 },
    { x: 244, y: 20, width: 12, height: 55, delay: 0.45 },
    { x: 244, y: 95, width: 12, height: 75, delay: 0.6 },
    { x: 244, y: 190, width: 12, height: 40, delay: 0.25 },
    { x: 458, y: 35, width: 12, height: 80, delay: 0.5 },
    { x: 458, y: 135, width: 12, height: 90, delay: 0.1 }
  ]

  const links = [
    { from: 0, to: 3, width: 26, delay: 0.2 },
    { from: 0, to: 4, width: 18, delay: 0.7 },
    { from: 1, to: 4, width: 24, delay: 0.4 },
    { from: 1, to: 5, width: 12, delay: 0.9 },
    { from: 2, to: 4, width: 16, delay: 0.1 },
    { from: 2, to: 5, width: 14, delay: 0.55 },
    { from: 3, to: 6, width: 22, delay: 0.35 },
    { from: 3, to: 7, width: 18, delay: 0.8 },
    { from: 4, to: 6, width: 28, delay: 0.05 },
    { from: 4, to: 7, width: 32, delay: 0.65 },
    { from: 5, to: 7, width: 16, delay: 0.45 }
  ]

  const getLinkPath = (fromIdx: number, toIdx: number) => {
    const from = nodes[fromIdx]
    const to = nodes[toIdx]
    const startX = from.x + from.width
    const startY = from.y + from.height / 2
    const endX = to.x
    const endY = to.y + to.height / 2
    const controlX1 = startX + (endX - startX) * 0.4
    const controlX2 = startX + (endX - startX) * 0.6
    return `M${startX},${startY} C${controlX1},${startY} ${controlX2},${endY} ${endX},${endY}`
  }

  return (
    <>
      {links.map((link) => (
        <path
          key={`loading-link-${link.from}-${link.to}`}
          d={getLinkPath(link.from, link.to)}
          fill="none"
          stroke="currentColor"
          strokeWidth={link.width}
          opacity={0.08}
        />
      ))}
      {nodes.map((node) => (
        <rect
          key={`loading-node-${node.x}-${node.y}`}
          x={node.x}
          y={node.y}
          width={node.width}
          height={node.height}
          rx={2}
          fill="currentColor"
          opacity={0.2}
        />
      ))}
    </>
  )
}
