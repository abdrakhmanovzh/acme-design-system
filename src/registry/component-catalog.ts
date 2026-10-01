type ComponentCategory =
  | 'Inputs & Forms'
  | 'Surfaces & Disclosure'
  | 'Status, Nav & Data'
  | 'Media & Feedback'

type ComponentCatalogEntry = {
  id: string
  name: string
  category: ComponentCategory
  description: string
}

const componentCatalog = [
  {
    id: 'button',
    name: 'Button',
    category: 'Inputs & Forms',
    description:
      'Primary actions, secondary controls, and destructive confirmations across four variants and six sizes.'
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Inputs & Forms',
    description:
      'Single-line text fields with states, sizes, and composed input groups.'
  },
  {
    id: 'field',
    name: 'Field',
    category: 'Inputs & Forms',
    description:
      'Layout primitive for labels, descriptions, errors, and grouped form controls.'
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Inputs & Forms',
    description:
      'Multi-line text entry matching input focus, invalid, and disabled styling.'
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Inputs & Forms',
    description:
      'Binary and indeterminate selection with checked-state frame halos.'
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'Inputs & Forms',
    description:
      'Toggle control for settings-style on/off preferences and feature flags.'
  },
  {
    id: 'radio-group',
    name: 'Radio Group',
    category: 'Inputs & Forms',
    description:
      'Mutually exclusive choices in vertical lists or compact inline rows.'
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'Inputs & Forms',
    description:
      'Simple and segmented range controls for single values and intervals.'
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Inputs & Forms',
    description:
      'Custom and native single-select menus with grouped options and sizes.'
  },
  {
    id: 'date-picker',
    name: 'Date Picker',
    category: 'Inputs & Forms',
    description:
      'Calendar popovers for choosing single dates and ranges in forms.'
  },
  {
    id: 'combobox',
    name: 'Combobox',
    category: 'Inputs & Forms',
    description:
      'Searchable single-select with grouped options and empty states.'
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Surfaces & Disclosure',
    description:
      'Structured content surfaces for summaries, settings, and dashboard panels.'
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Surfaces & Disclosure',
    description:
      'Progressive disclosure for FAQs, settings sections, and nested detail.'
  },
  {
    id: 'separator',
    name: 'Separator',
    category: 'Surfaces & Disclosure',
    description: 'Hairline dividers for horizontal rules and vertical toolbars.'
  },
  {
    id: 'scroll-area',
    name: 'Scroll Area',
    category: 'Surfaces & Disclosure',
    description:
      'Overlay scrollbars with optional edge fades for overflow content.'
  },
  {
    id: 'dialog',
    name: 'Dialog',
    category: 'Surfaces & Disclosure',
    description:
      'Modal surfaces for focused tasks, small forms, and explicit decisions.'
  },
  {
    id: 'sheet',
    name: 'Sheet',
    category: 'Surfaces & Disclosure',
    description:
      'Edge-attached panels for contextual detail without leaving the page.'
  },
  {
    id: 'drawer',
    name: 'Drawer',
    category: 'Surfaces & Disclosure',
    description:
      'Drag-dismissible bottom sheets and edge drawers for mobile-friendly overlays.'
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Surfaces & Disclosure',
    description:
      'Short non-interactive helpers anchored to triggers on hover or focus.'
  },
  {
    id: 'popover',
    name: 'Popover',
    category: 'Surfaces & Disclosure',
    description:
      'Interactive floating panels for contextual controls, compact forms, and summaries.'
  },
  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Surfaces & Disclosure',
    description:
      'Action menus with items, checkboxes, radio groups, and submenus.'
  },
  {
    id: 'command',
    name: 'Command',
    category: 'Surfaces & Disclosure',
    description:
      'Command palette with searchable, grouped actions and keyboard shortcuts.'
  },
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'Status, Nav & Data',
    description:
      'User and entity identity with initials, images, sizes, and shapes.'
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'Status, Nav & Data',
    description: 'Compact labels for statuses, counts, sources, and metadata.'
  },
  {
    id: 'alert',
    name: 'Alert',
    category: 'Status, Nav & Data',
    description:
      'Inline status messages with semantic variants and optional framing.'
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Status, Nav & Data',
    description:
      'Horizontal content tabs with rail and pill variants plus animated indicators.'
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Status, Nav & Data',
    description:
      'Hierarchy navigation with truncation for deep page structures.'
  },
  {
    id: 'pagination',
    name: 'Pagination',
    category: 'Status, Nav & Data',
    description:
      'Page navigation with active-state frame language and ellipsis support.'
  },
  {
    id: 'table',
    name: 'Table',
    category: 'Status, Nav & Data',
    description:
      'Dashboard-density data tables with selection and container surfaces.'
  },
  {
    id: 'progress',
    name: 'Progress',
    category: 'Status, Nav & Data',
    description:
      'Determinate and indeterminate progress in simple and segmented variants.'
  },
  {
    id: 'charts',
    name: 'Charts',
    category: 'Status, Nav & Data',
    description:
      'Composable Recharts wrappers for area, line, bar, pie, radar, radial, and sankey visualizations.'
  },
  {
    id: 'audio-player',
    name: 'Audio Player',
    category: 'Media & Feedback',
    description:
      'Composable playback controls for transcript clips, recordings, and review flows.'
  },
  {
    id: 'shimmering-text',
    name: 'Shimmering Text',
    category: 'Media & Feedback',
    description:
      'Animated gradient text for AI-thinking states, loading copy, and spotlighted labels.'
  },
  {
    id: 'spinner',
    name: 'Spinner',
    category: 'Media & Feedback',
    description:
      'Animated pill-bars for pending states, inline status, and loading controls.'
  }
] as const satisfies ReadonlyArray<ComponentCatalogEntry>

const componentCategories: ReadonlyArray<ComponentCategory> = [
  'Inputs & Forms',
  'Surfaces & Disclosure',
  'Status, Nav & Data',
  'Media & Feedback'
]

const documentedComponentIds: ReadonlyArray<string> = componentCatalog.map(
  (entry) => entry.id
)

const registryOnlyUiItems = ['calendar', 'native-select'] as const

export {
  componentCatalog,
  componentCategories,
  documentedComponentIds,
  registryOnlyUiItems
}
export type { ComponentCatalogEntry, ComponentCategory }
