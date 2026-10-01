// oxlint-disable import/default -- Vite ?raw imports expose file contents as default strings.
import accordionSource from '../components/ui/accordion.tsx?raw'
import alertSource from '../components/ui/alert.tsx?raw'
import audioPlayerSource from '../components/ui/audio-player.tsx?raw'
import avatarSource from '../components/ui/avatar.tsx?raw'
import badgeSource from '../components/ui/badge.tsx?raw'
import breadcrumbSource from '../components/ui/breadcrumb.tsx?raw'
import buttonSource from '../components/ui/button.tsx?raw'
import calendarSource from '../components/ui/calendar.tsx?raw'
import cardSource from '../components/ui/card.tsx?raw'
import chartAreaSource from '../components/ui/charts/area-chart.tsx?raw'
import chartBackgroundSource from '../components/ui/charts/background.tsx?raw'
import chartBarSource from '../components/ui/charts/bar-chart.tsx?raw'
import chartBrushSource from '../components/ui/charts/brush.tsx?raw'
import chartBaseSource from '../components/ui/charts/chart.tsx?raw'
import chartDotSource from '../components/ui/charts/dot.tsx?raw'
import chartLegendSource from '../components/ui/charts/legend.tsx?raw'
import chartLineSource from '../components/ui/charts/line-chart.tsx?raw'
import chartPieSource from '../components/ui/charts/pie-chart.tsx?raw'
import chartRadarSource from '../components/ui/charts/radar-chart.tsx?raw'
import chartRadialSource from '../components/ui/charts/radial-chart.tsx?raw'
import chartSankeySource from '../components/ui/charts/sankey-chart.tsx?raw'
import chartTooltipSource from '../components/ui/charts/tooltip.tsx?raw'
import checkboxSource from '../components/ui/checkbox.tsx?raw'
import comboboxSource from '../components/ui/combobox.tsx?raw'
import commandSource from '../components/ui/command.tsx?raw'
import datePickerSource from '../components/ui/date-picker.tsx?raw'
import dialogSource from '../components/ui/dialog.tsx?raw'
import drawerSource from '../components/ui/drawer.tsx?raw'
import dropdownMenuSource from '../components/ui/dropdown-menu.tsx?raw'
import fieldSource from '../components/ui/field.tsx?raw'
import inputSource from '../components/ui/input.tsx?raw'
import nativeSelectSource from '../components/ui/native-select.tsx?raw'
import paginationSource from '../components/ui/pagination.tsx?raw'
import popoverSource from '../components/ui/popover.tsx?raw'
import progressSource from '../components/ui/progress.tsx?raw'
import radioGroupSource from '../components/ui/radio-group.tsx?raw'
import scrollAreaSource from '../components/ui/scroll-area.tsx?raw'
import selectSource from '../components/ui/select.tsx?raw'
import separatorSource from '../components/ui/separator.tsx?raw'
import sheetSource from '../components/ui/sheet.tsx?raw'
import shimmeringTextSource from '../components/ui/shimmering-text.tsx?raw'
import sliderSource from '../components/ui/slider.tsx?raw'
import spinnerSource from '../components/ui/spinner.tsx?raw'
import switchSource from '../components/ui/switch.tsx?raw'
import tableSource from '../components/ui/table.tsx?raw'
import tabsSource from '../components/ui/tabs.tsx?raw'
import textareaSource from '../components/ui/textarea.tsx?raw'
import tooltipSource from '../components/ui/tooltip.tsx?raw'
import logoSource from '../components/logo.tsx?raw'
import utilsSource from '../lib/cn.ts?raw'
import agentsSource from '../../AGENTS.md?raw'
import designSource from '../../DESIGN.md?raw'
import gitignoreSource from '../../.gitignore?raw'
import oxfmtConfigSource from '../../.oxfmtrc.json?raw'
import oxlintConfigSource from '../../.oxlintrc.json?raw'
import faviconDarkSource from '../../public/favicon-dark.svg?raw'
import faviconSource from '../../public/favicon.svg?raw'
import { cssVars } from './css-vars'

const registryItemSchema = 'https://ui.shadcn.com/schema/registry-item.json'
const registrySchema = 'https://ui.shadcn.com/schema/registry.json'

type RegistryType =
  | 'registry:base'
  | 'registry:component'
  | 'registry:file'
  | 'registry:font'
  | 'registry:item'
  | 'registry:lib'
  | 'registry:ui'

type RegistryFileType =
  | 'registry:component'
  | 'registry:file'
  | 'registry:lib'
  | 'registry:ui'

type RegistryFile = {
  path: string
  type: RegistryFileType
  content?: string
  target?: string
}

type RegistryFont = {
  family: string
  provider: string
  import: string
  variable: string
  weight: string[]
  subsets: string[]
  dependency: string
}

type RegistryItem = {
  $schema: string
  name: string
  type: RegistryType
  title: string
  description: string
  author: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
  css?: Record<string, unknown>
  cssVars?: {
    theme?: Record<string, string>
    light?: Record<string, string>
    dark?: Record<string, string>
  }
  font?: RegistryFont
  extends?: string
  config?: {
    style: string
    iconLibrary: string
    tailwind: { baseColor: string }
  }
  meta?: Record<string, unknown>
}

type RegistryItemInput = Omit<
  RegistryItem,
  '$schema' | 'author' | 'registryDependencies'
> & {
  registryDependencies?: string[]
}

const author = 'Acme'

function normalizeSource(source: string) {
  return source
    .replaceAll("'#/components/ui/", "'@/components/ui/")
    .replaceAll('"#/components/ui/', '"@/components/ui/')
    .replaceAll("'#/lib/cn'", "'@/lib/utils'")
    .replaceAll('"#/lib/cn"', '"@/lib/utils"')
}

function uiFile(name: string, content: string): RegistryFile {
  return {
    path: `components/ui/${name}.tsx`,
    type: 'registry:ui',
    content: normalizeSource(content)
  }
}

function chartFile(name: string, content: string): RegistryFile {
  return {
    path: `components/ui/charts/${name}.tsx`,
    type: 'registry:ui',
    content: normalizeSource(content)
  }
}

function item(input: RegistryItemInput): RegistryItem {
  return {
    $schema: registryItemSchema,
    author,
    ...input
  }
}

// The font items own --font-sans and --font-mono so shadcn can wire next/font or fontsource per framework.
const {
  'font-sans': _fontSans,
  'font-mono': _fontMono,
  ...themeVars
} = cssVars.theme

const baseCssVars = {
  theme: themeVars,
  light: cssVars.light,
  dark: cssVars.dark
}

const baseCss = {
  '@custom-variant dark (&:where(.dark, .dark *))': {},
  '@custom-variant aria-current-page (&[aria-current="page"])': {},
  '@layer base': {
    '*': {
      'border-color': 'var(--border)'
    },
    html: {
      'background-color': 'var(--background)',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      'overflow-y': 'scroll',
      'overscroll-behavior': 'none'
    },
    body: {
      color: 'var(--foreground)',
      'background-color': 'var(--background)',
      'font-feature-settings': '"rlig" 1, "calt" 1',
      'text-rendering': 'optimizeLegibility'
    },
    'button:not(:disabled), [role="button"]:not(:disabled)': {
      cursor: 'pointer'
    },
    '::selection': {
      color: 'var(--selection-foreground)',
      background: 'var(--selection-background)'
    },
    'html, *': {
      'scrollbar-width': 'thin',
      'scrollbar-color':
        'color-mix(in oklch, var(--border) 70%, var(--muted-foreground)) var(--border)'
    },
    '*::-webkit-scrollbar': {
      width: '12px',
      height: '12px'
    },
    '*::-webkit-scrollbar-track': {
      background: 'var(--border)'
    },
    '*::-webkit-scrollbar-thumb': {
      background:
        'color-mix(in oklch, var(--border) 70%, var(--muted-foreground))',
      border: '3px solid var(--border)',
      'background-clip': 'padding-box',
      'border-radius': '9999px'
    },
    '*::-webkit-scrollbar-thumb:hover': {
      background: 'var(--muted-foreground)',
      'background-clip': 'padding-box'
    },
    '*::-webkit-scrollbar-corner': {
      background: 'var(--border)'
    },
    'h1, h2, h3, h4, h5, h6': {
      'text-wrap': 'balance'
    },
    p: {
      'text-wrap': 'pretty'
    },
    table: {
      'font-variant-numeric': 'tabular-nums'
    }
  }
}

const chartFiles = [
  chartFile('area-chart', chartAreaSource),
  chartFile('background', chartBackgroundSource),
  chartFile('bar-chart', chartBarSource),
  chartFile('brush', chartBrushSource),
  chartFile('chart', chartBaseSource),
  chartFile('dot', chartDotSource),
  chartFile('legend', chartLegendSource),
  chartFile('line-chart', chartLineSource),
  chartFile('pie-chart', chartPieSource),
  chartFile('radar-chart', chartRadarSource),
  chartFile('radial-chart', chartRadialSource),
  chartFile('sankey-chart', chartSankeySource),
  chartFile('tooltip', chartTooltipSource)
]

const essentialsRegistryDependencies = [
  'base',
  'button',
  'input',
  'textarea',
  'field',
  'badge',
  'card',
  'separator',
  'spinner'
]

const formsRegistryDependencies = [
  'base',
  'button',
  'input',
  'textarea',
  'field',
  'checkbox',
  'switch',
  'radio-group',
  'select',
  'native-select',
  'combobox',
  'slider',
  'calendar',
  'date-picker'
]

const overlaysRegistryDependencies = [
  'base',
  'button',
  'accordion',
  'dialog',
  'command',
  'sheet',
  'drawer',
  'popover',
  'tooltip',
  'dropdown-menu',
  'scroll-area'
]

const dataRegistryDependencies = [
  'base',
  'avatar',
  'badge',
  'breadcrumb',
  'pagination',
  'progress',
  'table',
  'tabs',
  'alert',
  'charts'
]

const mediaRegistryDependencies = [
  'base',
  'button',
  'dropdown-menu',
  'spinner',
  'audio-player',
  'shimmering-text'
]

const uiItems = [
  item({
    name: 'accordion',
    type: 'registry:ui',
    title: 'Accordion',
    description: 'Progressive disclosure for grouped content.',
    dependencies: ['@base-ui/react', '@tabler/icons-react'],
    registryDependencies: ['base'],
    files: [uiFile('accordion', accordionSource)]
  }),
  item({
    name: 'alert',
    type: 'registry:ui',
    title: 'Alert',
    description: 'Inline status messages with semantic variants.',
    dependencies: ['class-variance-authority'],
    registryDependencies: ['base'],
    files: [uiFile('alert', alertSource)]
  }),
  item({
    name: 'audio-player',
    type: 'registry:ui',
    title: 'Audio Player',
    description: 'Composable playback controls for audio review flows.',
    dependencies: ['@base-ui/react', '@tabler/icons-react'],
    registryDependencies: ['button', 'dropdown-menu', 'spinner'],
    files: [uiFile('audio-player', audioPlayerSource)]
  }),
  item({
    name: 'avatar',
    type: 'registry:ui',
    title: 'Avatar',
    description: 'User and entity identity with image and fallback states.',
    dependencies: ['@base-ui/react', 'class-variance-authority'],
    registryDependencies: ['base'],
    files: [uiFile('avatar', avatarSource)]
  }),
  item({
    name: 'badge',
    type: 'registry:ui',
    title: 'Badge',
    description: 'Compact labels for statuses, counts, and metadata.',
    dependencies: ['class-variance-authority'],
    registryDependencies: ['base'],
    files: [uiFile('badge', badgeSource)]
  }),
  item({
    name: 'breadcrumb',
    type: 'registry:ui',
    title: 'Breadcrumb',
    description: 'Hierarchy navigation with truncation support.',
    dependencies: ['@tabler/icons-react'],
    registryDependencies: ['base'],
    files: [uiFile('breadcrumb', breadcrumbSource)]
  }),
  item({
    name: 'button',
    type: 'registry:ui',
    title: 'Button',
    description: 'Action primitive with variants, sizes, and icon support.',
    dependencies: ['@base-ui/react', 'class-variance-authority'],
    registryDependencies: ['base'],
    files: [uiFile('button', buttonSource)]
  }),
  item({
    name: 'calendar',
    type: 'registry:ui',
    title: 'Calendar',
    description: 'DayPicker calendar styled with the system tokens.',
    dependencies: ['@tabler/icons-react', 'react-day-picker'],
    registryDependencies: ['button'],
    files: [uiFile('calendar', calendarSource)]
  }),
  item({
    name: 'card',
    type: 'registry:ui',
    title: 'Card',
    description: 'Structured content surfaces for summaries and panels.',
    registryDependencies: ['base'],
    files: [uiFile('card', cardSource)]
  }),
  item({
    name: 'charts',
    type: 'registry:ui',
    title: 'Charts',
    description: 'Composable chart primitives built on Recharts.',
    dependencies: ['motion', 'recharts'],
    registryDependencies: ['base'],
    files: chartFiles
  }),
  item({
    name: 'checkbox',
    type: 'registry:ui',
    title: 'Checkbox',
    description: 'Binary and indeterminate selection control.',
    dependencies: ['@base-ui/react', '@tabler/icons-react'],
    registryDependencies: ['base'],
    files: [uiFile('checkbox', checkboxSource)]
  }),
  item({
    name: 'combobox',
    type: 'registry:ui',
    title: 'Combobox',
    description: 'Searchable single-select built on Base UI.',
    dependencies: ['@base-ui/react', '@tabler/icons-react'],
    registryDependencies: ['input'],
    files: [uiFile('combobox', comboboxSource)]
  }),
  item({
    name: 'command',
    type: 'registry:ui',
    title: 'Command',
    description:
      'Command palette with searchable, grouped actions in a dialog.',
    dependencies: ['@tabler/icons-react', 'cmdk'],
    registryDependencies: ['dialog'],
    files: [uiFile('command', commandSource)]
  }),
  item({
    name: 'date-picker',
    type: 'registry:ui',
    title: 'Date Picker',
    description: 'Calendar popover for choosing dates and ranges.',
    dependencies: ['@tabler/icons-react', 'date-fns', 'react-day-picker'],
    registryDependencies: ['button', 'calendar', 'popover'],
    files: [uiFile('date-picker', datePickerSource)]
  }),
  item({
    name: 'dialog',
    type: 'registry:ui',
    title: 'Dialog',
    description: 'Modal and alert dialog primitives.',
    dependencies: ['@base-ui/react', '@tabler/icons-react'],
    registryDependencies: ['button'],
    files: [uiFile('dialog', dialogSource)]
  }),
  item({
    name: 'drawer',
    type: 'registry:ui',
    title: 'Drawer',
    description: 'Drag-dismissible drawer surfaces.',
    dependencies: ['@tabler/icons-react', 'vaul'],
    registryDependencies: ['button'],
    files: [uiFile('drawer', drawerSource)]
  }),
  item({
    name: 'dropdown-menu',
    type: 'registry:ui',
    title: 'Dropdown Menu',
    description: 'Action menus, checkboxes, radio groups, and submenus.',
    dependencies: ['@base-ui/react', '@tabler/icons-react'],
    registryDependencies: ['base'],
    files: [uiFile('dropdown-menu', dropdownMenuSource)]
  }),
  item({
    name: 'field',
    type: 'registry:ui',
    title: 'Field',
    description: 'Layout primitive for labels, descriptions, and errors.',
    dependencies: ['class-variance-authority'],
    registryDependencies: ['separator'],
    files: [uiFile('field', fieldSource)]
  }),
  item({
    name: 'input',
    type: 'registry:ui',
    title: 'Input',
    description: 'Single-line text fields and input groups.',
    dependencies: ['@base-ui/react'],
    registryDependencies: ['button', 'textarea'],
    files: [uiFile('input', inputSource)]
  }),
  item({
    name: 'native-select',
    type: 'registry:ui',
    title: 'Native Select',
    description: 'Native select control with system styling.',
    dependencies: ['@tabler/icons-react'],
    registryDependencies: ['base'],
    files: [uiFile('native-select', nativeSelectSource)]
  }),
  item({
    name: 'pagination',
    type: 'registry:ui',
    title: 'Pagination',
    description: 'Page navigation with active and ellipsis states.',
    dependencies: ['@tabler/icons-react', 'class-variance-authority'],
    registryDependencies: ['base'],
    files: [uiFile('pagination', paginationSource)]
  }),
  item({
    name: 'popover',
    type: 'registry:ui',
    title: 'Popover',
    description: 'Interactive floating panels for contextual controls.',
    dependencies: ['@base-ui/react'],
    registryDependencies: ['base'],
    files: [uiFile('popover', popoverSource)]
  }),
  item({
    name: 'progress',
    type: 'registry:ui',
    title: 'Progress',
    description: 'Determinate and indeterminate progress indicators.',
    dependencies: ['@base-ui/react'],
    registryDependencies: ['base'],
    files: [uiFile('progress', progressSource)]
  }),
  item({
    name: 'radio-group',
    type: 'registry:ui',
    title: 'Radio Group',
    description: 'Mutually exclusive choices in grouped controls.',
    dependencies: ['@base-ui/react'],
    registryDependencies: ['base'],
    files: [uiFile('radio-group', radioGroupSource)]
  }),
  item({
    name: 'scroll-area',
    type: 'registry:ui',
    title: 'Scroll Area',
    description: 'Styled scrollbars and overflow regions.',
    dependencies: ['@base-ui/react'],
    registryDependencies: ['base'],
    files: [uiFile('scroll-area', scrollAreaSource)]
  }),
  item({
    name: 'select',
    type: 'registry:ui',
    title: 'Select',
    description: 'Custom single-select menu with grouped options.',
    dependencies: ['@base-ui/react', '@tabler/icons-react'],
    registryDependencies: ['base'],
    files: [uiFile('select', selectSource)]
  }),
  item({
    name: 'separator',
    type: 'registry:ui',
    title: 'Separator',
    description: 'Hairline dividers for layout and toolbars.',
    registryDependencies: ['base'],
    files: [uiFile('separator', separatorSource)]
  }),
  item({
    name: 'sheet',
    type: 'registry:ui',
    title: 'Sheet',
    description: 'Edge-attached panels for contextual detail.',
    dependencies: [
      '@base-ui/react',
      '@tabler/icons-react',
      'class-variance-authority'
    ],
    registryDependencies: ['button'],
    files: [uiFile('sheet', sheetSource)]
  }),
  item({
    name: 'shimmering-text',
    type: 'registry:ui',
    title: 'Shimmering Text',
    description: 'Animated gradient text for AI-thinking states.',
    dependencies: ['motion'],
    registryDependencies: ['base'],
    files: [uiFile('shimmering-text', shimmeringTextSource)]
  }),
  item({
    name: 'slider',
    type: 'registry:ui',
    title: 'Slider',
    description: 'Single and range value controls.',
    dependencies: ['@base-ui/react'],
    registryDependencies: ['base'],
    files: [uiFile('slider', sliderSource)]
  }),
  item({
    name: 'spinner',
    type: 'registry:ui',
    title: 'Spinner',
    description: 'Animated pending-state indicator.',
    dependencies: ['motion'],
    registryDependencies: ['base'],
    files: [uiFile('spinner', spinnerSource)]
  }),
  item({
    name: 'switch',
    type: 'registry:ui',
    title: 'Switch',
    description: 'On/off control for settings and preferences.',
    dependencies: ['@base-ui/react'],
    registryDependencies: ['base'],
    files: [uiFile('switch', switchSource)]
  }),
  item({
    name: 'table',
    type: 'registry:ui',
    title: 'Table',
    description: 'Dashboard-density tables with semantic parts.',
    registryDependencies: ['base'],
    files: [uiFile('table', tableSource)]
  }),
  item({
    name: 'tabs',
    type: 'registry:ui',
    title: 'Tabs',
    description: 'Tabbed navigation with rail and pill variants.',
    dependencies: ['@base-ui/react', 'class-variance-authority'],
    registryDependencies: ['base'],
    files: [uiFile('tabs', tabsSource)]
  }),
  item({
    name: 'textarea',
    type: 'registry:ui',
    title: 'Textarea',
    description: 'Multi-line text entry with system focus states.',
    registryDependencies: ['base'],
    files: [uiFile('textarea', textareaSource)]
  }),
  item({
    name: 'tooltip',
    type: 'registry:ui',
    title: 'Tooltip',
    description: 'Short non-interactive helpers anchored to triggers.',
    dependencies: ['@base-ui/react'],
    registryDependencies: ['base'],
    files: [uiFile('tooltip', tooltipSource)]
  })
] satisfies RegistryItem[]

const registryItems = [
  item({
    name: 'essentials',
    type: 'registry:item',
    title: 'Essentials',
    description:
      'Foundation primitives for most app screens: base, actions, text inputs, form fields, badges, cards, separators, and loading states.',
    registryDependencies: essentialsRegistryDependencies,
    meta: {
      bundle: true
    }
  }),
  item({
    name: 'forms',
    type: 'registry:item',
    title: 'Forms',
    description:
      'Form controls and selection primitives including inputs, fields, checkbox, switch, radio, select, combobox, slider, calendar, and date picker.',
    registryDependencies: formsRegistryDependencies,
    meta: {
      bundle: true
    }
  }),
  item({
    name: 'overlays',
    type: 'registry:item',
    title: 'Overlays',
    description:
      'Disclosure and floating-surface primitives including accordion, dialog, command, sheet, drawer, popover, tooltip, dropdown menu, and scroll area.',
    registryDependencies: overlaysRegistryDependencies,
    meta: {
      bundle: true
    }
  }),
  item({
    name: 'data',
    type: 'registry:item',
    title: 'Data',
    description:
      'Navigation, status, and data-display primitives including avatar, badge, breadcrumb, pagination, progress, table, tabs, alert, and charts.',
    registryDependencies: dataRegistryDependencies,
    meta: {
      bundle: true
    }
  }),
  item({
    name: 'media',
    type: 'registry:item',
    title: 'Media',
    description:
      'Audio and animated feedback primitives including audio player, spinner, shimmering text, and required controls.',
    registryDependencies: mediaRegistryDependencies,
    meta: {
      bundle: true
    }
  }),
  item({
    name: 'all',
    type: 'registry:item',
    title: 'All Primitives',
    description: 'The base foundation and every Acme UI primitive.',
    registryDependencies: ['base', ...uiItems.map((uiItem) => uiItem.name)],
    meta: {
      bundle: true
    }
  }),
  item({
    name: 'font-geist',
    type: 'registry:font',
    title: 'Geist',
    description:
      'Geist Variable sans-serif font via @fontsource-variable/geist.',
    font: {
      family: "'Geist Variable', sans-serif",
      provider: 'google',
      import: 'Geist',
      variable: '--font-sans',
      weight: ['400', '500', '600', '700'],
      subsets: ['latin'],
      dependency: '@fontsource-variable/geist'
    }
  }),
  item({
    name: 'font-geist-mono',
    type: 'registry:font',
    title: 'Geist Mono',
    description:
      'Geist Mono Variable monospace font via @fontsource-variable/geist-mono.',
    font: {
      family: "'Geist Mono Variable', monospace",
      provider: 'google',
      import: 'Geist_Mono',
      variable: '--font-mono',
      weight: ['400', '500', '600', '700'],
      subsets: ['latin'],
      dependency: '@fontsource-variable/geist-mono'
    }
  }),
  item({
    name: 'utils',
    type: 'registry:lib',
    title: 'Utilities',
    description: 'The cn helper used by every UI primitive.',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      {
        path: 'lib/utils.ts',
        type: 'registry:lib',
        content: utilsSource
      }
    ]
  }),
  item({
    name: 'design',
    type: 'registry:file',
    title: 'Design System Guide',
    description: 'Acme design principles, tokens, and usage guidance.',
    files: [
      {
        path: 'DESIGN.md',
        type: 'registry:file',
        target: '~/DESIGN.md',
        content: normalizeSource(designSource)
      }
    ]
  }),
  item({
    name: 'logo',
    type: 'registry:component',
    title: 'Logo',
    description: 'Acme logo component using the primary color token.',
    registryDependencies: ['base'],
    files: [
      {
        path: 'components/logo.tsx',
        type: 'registry:component',
        content: normalizeSource(logoSource)
      }
    ]
  }),
  item({
    name: 'favicons',
    type: 'registry:file',
    title: 'Favicons',
    description: 'Light and dark Acme SVG favicons.',
    files: [
      {
        path: 'public/favicon.svg',
        type: 'registry:file',
        target: '~/public/favicon.svg',
        content: faviconSource
      },
      {
        path: 'public/favicon-dark.svg',
        type: 'registry:file',
        target: '~/public/favicon-dark.svg',
        content: faviconDarkSource
      }
    ]
  }),
  item({
    name: 'project-config',
    type: 'registry:file',
    title: 'Project Config',
    description:
      'Agent instructions, oxlint, oxfmt, and gitignore defaults for Acme projects.',
    files: [
      {
        path: 'AGENTS.md',
        type: 'registry:file',
        target: '~/AGENTS.md',
        content: agentsSource
      },
      {
        path: '.oxlintrc.json',
        type: 'registry:file',
        target: '~/.oxlintrc.json',
        content: oxlintConfigSource
      },
      {
        path: '.oxfmtrc.json',
        type: 'registry:file',
        target: '~/.oxfmtrc.json',
        content: oxfmtConfigSource
      },
      {
        path: '.gitignore',
        type: 'registry:file',
        target: '~/.gitignore',
        content: gitignoreSource
      }
    ]
  }),
  item({
    name: 'base',
    type: 'registry:base',
    title: 'Acme UI Base',
    description:
      'Shared Tailwind v4 theme tokens, OKLCH color variables, base styles, Geist fonts, and the cn utility.',
    registryDependencies: ['font-geist', 'font-geist-mono', 'utils'],
    extends: 'none',
    config: {
      style: 'base-nova',
      iconLibrary: 'tabler',
      tailwind: { baseColor: 'neutral' }
    },
    cssVars: baseCssVars,
    css: baseCss
  }),
  ...uiItems
] satisfies RegistryItem[]

function getRegistryItems() {
  return registryItems
}

function getRegistryUiItems() {
  return uiItems
}

function getRegistryItem(name: string) {
  return registryItems.find((registryItem) => registryItem.name === name)
}

function getRegistryIndex(homepage: string) {
  return {
    $schema: registrySchema,
    name: 'acme',
    homepage,
    items: registryItems.map(({ $schema: _schema, ...registryItem }) => ({
      ...registryItem,
      files: registryItem.files?.map(({ content: _content, ...file }) => file)
    }))
  }
}

function withResolvedRegistryDependencies(
  registryItem: RegistryItem,
  origin: string
): RegistryItem {
  if (!registryItem.registryDependencies?.length) {
    return registryItem
  }

  return {
    ...registryItem,
    registryDependencies: registryItem.registryDependencies.map(
      (dependency) => `${origin}/r/${dependency}.json`
    )
  }
}

export {
  getRegistryIndex,
  getRegistryItem,
  getRegistryItems,
  getRegistryUiItems,
  withResolvedRegistryDependencies
}
export type { RegistryItem }
