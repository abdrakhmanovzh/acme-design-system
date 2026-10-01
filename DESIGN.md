# Acme Design System

Principles, tokens, and the visual language shared by every Acme primitive. The component source in `components/ui/` is the source of truth for sizes, variants, and props; this file explains how the pieces fit and why.

Import paths below are the installed paths: `@/components/ui/*` for primitives and `@/lib/utils` for `cn`.

## Brand & Audience

**Positioning:** Acme is a demo design system and shadcn registry for a neutral, credible SaaS product. Quiet neutrals, one violet brand hue, crisp hairlines. It should look trustworthy and efficient, not flashy.

**Primary surfaces:** dashboards, data tables, charts, forms and settings, plus the marketing pages that lead into them. A small Media & Feedback set (`AudioPlayer`, `Spinner`, `ShimmeringText`) covers audio review and pending or "thinking" states. Motion is kept small and purposeful.

**Logo ink:** the `Logo` component fills with `fill-primary`, so it follows `--primary` in both themes. The SVG favicons use the same values as hex: `#160C3B` in light and `#BEBDF7` in dark.

## Principles

1. **Trust before novelty.** Use familiar SaaS patterns, clear hierarchy, and conservative defaults. The brand hue is reserved for primary actions, checked and selected states, and data.
2. **Clarity for fast scanning.** Use dense but legible defaults: 14px control text, 36px controls, 44px table rows, and tabular numerals in tables.
3. **Polished efficiency.** One focus idiom (the state frame), one glass recipe for floating surfaces, one backdrop recipe for modals. No decorative excess.
4. **Obvious primary action.** The primary `Button` is the only action that carries a halo at rest.

## Tokens

All tokens are CSS variables in `styles.css`. Light values live on `:root` and dark values on `.dark`, and `@theme` maps them to Tailwind utilities. Every color is OKLCH. The registry `base` item installs the same set (see **Registry**).

### Color

The semantic names follow shadcn: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, plus `*-foreground` partners and `chart-1`…`chart-5`.

- **Neutrals** are cool greys: hue 275 in light; hue 260 in dark, with the page background at 285. In light mode the page is off-white (`--background` 0.982) and `--card`/`--popover` are pure white. In dark mode cards and popovers (0.205) sit one step above the page (0.185).
- **Primary** is the brand. In light it is a deep indigo-violet, `oklch(0.205 0.085 285)`; in dark a soft violet, `oklch(0.82 0.08 285)`. `--primary-foreground` keeps text on primary well above AA in both themes.
- **Accent** is a mid violet: `oklch(0.55 0.17 285)` in light and `oklch(0.7 0.14 285)` in dark. Light accent with `--accent-foreground` measures about 4.9:1.
- **Ring** is a neutral grey (`--ring`). Focus is signalled by the frame shape, not by brand color.
- **Selection** uses `--selection-background`, a mix of primary into transparent (18% light, 24% dark), applied by the base layer.

**Used by primitives vs. available to consumers.** The primitives consume `background`, `foreground`, `card`, `popover`, `primary`, `muted`, `muted-foreground`, `destructive`, `border`, `border-muted`, `border-strong`, `input` (simple slider track, calendar dropdown border), `ring`, the status triplets, and the chart colors. `secondary`, `secondary-foreground`, `accent`, `accent-foreground`, and `destructive-foreground` are defined for your own UI and shadcn compatibility, but no primitive uses them. Hover and highlight surfaces use `muted`, not `secondary`.

**Border hierarchy:**

- `--border` is an element's own edge. The base layer applies it to `*`, so a bare `border` class is already correct.
- `--border-muted` is the faintest line: offset frames, the Sheet edge line, the Command input divider, and the Avatar ring.
- `--border-strong` is for emphasized edges. It is currently used only for the Tabs indicator ring.

In dark mode `--border`, `--border-muted`, and `--input` are white at 10%, 5%, and 14% alpha, so they read consistently on any dark surface.

### Status

`success`, `warning`, and `info` each ship a triplet: `--{status}` (soft background), `--{status}-foreground` (text and icon), and `--{status}-border`. `Alert` and `Badge` use them as `bg-{status} text-{status}-foreground border-{status}-border`.

**Destructive has no triplet.** It ships `--destructive` and `--destructive-foreground` only. Soft destructive surfaces are opacity blends of the one token: `bg-destructive/10 border-destructive/20 text-destructive` (Alert, Badge, the destructive Button, which goes to `/15` on hover, and the destructive menu item highlight). Light `--destructive` is `oklch(0.51 0.2 25)`, dark enough that the text stays at or above 4.5:1 on its own `/10` and `/15` fills over both `background` and `card`. Dark mode (`oklch(0.75 0.16 25)`) measures about 5.8:1 or higher.

### Chart palette

Five series colors: `chart-1` violet (285), `chart-2` blue (250), `chart-3` amber (78), `chart-4` green (155), `chart-5` orange (35). Each has a lighter dark-mode value. For chart configs, use `chartSeriesColors(1…5 | 'neutral')` and `chartSeriesColorsByIndex(i)` from `@/components/ui/charts/chart`. The index helper cycles `chart-1`…`chart-5` and then `muted-foreground`.

### Typography

The families are **Geist** (`--font-sans`) and **Geist Mono** (`--font-mono`), both variable. The registry installs them as font items.

Named sizes in `@theme`:

| Utility        | Size | Line height | Weight | Tracking | Use                 |
| -------------- | ---- | ----------- | ------ | -------- | ------------------- |
| `text-display` | 56px | 1           | 600    | -0.055em | Marketing headlines |
| `text-page`    | 40px | 1.05        | 600    | -0.04em  | Page titles         |
| `text-section` | 24px | 1.1         | 500    | -0.02em  | Section headings    |
| `text-lead`    | 18px | 1.55        | —      | —        | Lead paragraphs     |

Product UI uses Tailwind's base sizes:

- **Controls, labels, menus, and table cells** use `text-sm` (14px). Labels are `font-medium`. Buttons add `tracking-[-0.01em]`.
- **Card titles** use `text-base font-medium tracking-tight`. **Dialog, Sheet, and Drawer titles** use `text-base font-semibold tracking-tight`. Neither uses `text-section`.
- **Helper text** (`FieldDescription`), badges, tooltips, and table headers use `text-xs` (12px). Table headers are also uppercase, `tracking-wide`, and muted.
- **Mono** is for machine-ish text: the `count` and `source` badges, calendar weekday labels, the chart loading label, and playback speeds.

The base layer sets `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs, `tabular-nums` on tables, the `rlig` and `calt` font features, and antialiasing.

### Sizing & spacing

Spacing is Tailwind's 4px scale, with no custom spacing tokens. The recurring numbers:

- **Control heights:** `sm` 30px (`h-7.5`), `default` 36px (`h-9`), `lg` 40px (`h-10`). These are shared by `Button` (and its `iconSm`/`icon`/`iconLg` squares), `Input`, `InputGroup`, `SelectTrigger`, and `NativeSelect`. `ComboboxAnchor` and the `DatePicker` trigger are fixed at 36px. Tabs match through their bordered list (see Tabs below).
- **Compact chrome:** pagination links are 32px, menu, select, and combobox items have a 32px minimum height, and command items a 36px minimum.
- **Tables:** 40px header row and 44px body rows. The first and last cells have 20px padding; other cells have 16px.
- **Panels:** Card sections, Dialog, Sheet, and Drawer header and footer all use 20px padding (`p-5`). Where card sections meet, each drops to 12px padding on the shared edge. Popover uses `p-4`, and Alert uses `p-3`.
- **Forms:** inside a `Field`, the gap between label, control, and help is 8px (`gap-2`). `FieldContent` uses 6px, `FieldSet` 12px, and fields within a `FieldGroup` are 24px apart (`gap-6`).

### Radius

The radius scale comes from `--radius: 0.75rem`:

| Utility      | Value       | Used for                                                                                                                                                                              |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rounded-sm` | 8px         | Tag-shaped badges, breadcrumb links, the audio waveform                                                                                                                               |
| `rounded-md` | 10px        | Buttons, inputs, select triggers, all floating surfaces (tooltip, popover, menus, select, combobox), menu/select/combobox/command items, tab triggers and indicator, pagination links |
| `rounded-lg` | 12px (base) | Tabs list, segmented slider track, `md` progress track                                                                                                                                |
| `rounded-xl` | 16px        | Card, Dialog, AlertDialog, Alert, TableContainer, Accordion items, Command, the free edge of top and bottom Drawers                                                                   |

Pills (the default Badge shape, switches, thumbs, avatars) use `rounded-full`. The Checkbox is a fixed `rounded-[4px]`, because any step on the scale would round a 14–16px box toward a circle. There is no `--radius-2xl` token, so `rounded-xl` is the largest radius in the system.

### Motion

Two custom easings are defined in `@theme`:

- `--ease-out-quint` (`cubic-bezier(0.23, 1, 0.32, 1)`) is for refined UI motion: dialog scale and backdrop fade, the tabs indicator, the switch thumb, the accordion icon, slider thumbs and range, progress fill, and the audio progress bar.
- `--ease-drawer` (`cubic-bezier(0.32, 0.72, 0, 1)`) is used only for the Sheet slide. Drawer motion comes from vaul.

Durations in use:

- **100ms:** radio dot
- **120ms:** opacity fades on tooltip, popover, dropdown, select, and combobox
- **150ms:** switch track, slider thumb and value bubble, scrollbar fade, avatar image fade
- **200ms:** Dialog/AlertDialog popup (opacity + scale 0.98→1) and backdrop, tabs indicator, accordion panel and icon, switch thumb
- **250ms:** Sheet slide
- **300ms:** segmented slider range, progress mount, audio progress indicator
- **500ms:** progress determinate fill

**Reduced motion:** `Spinner` and `ShimmeringText` are the only looping animations, and both render static under `prefers-reduced-motion`. Slider, progress, and audio transitions use `motion-reduce:transition-none`. Area, bar, and line charts skip their reveal animation. The indeterminate `Progress` never animates.

## Frame Language

The signature treatment is a 1px hairline held a few pixels off the element's edge. There are two implementations: an **outline** for static containers and a **box-shadow** for interactive state.

### Container frame (outline)

`outline-1 outline-offset-4 outline-(--border-muted)` is used for surfaces that don't move. It costs no layout space and never clips.

- **Always on:** `DialogContent`, `AlertDialogContent`, `DrawerContent`.
- **Sheet:** draws a single 1px `bg-border-muted` line via `::after`, 5px beyond its inner-facing edge (it follows `side`). A full outline would run off-screen.
- **Opt-in:** `Card framed`. `Alert framed` uses `--alert-frame`, which tracks the variant: `--border-muted` for default, 50% of the status border for info, success, and warning, and 15% destructive for destructive.

When a modal popup itself takes keyboard focus, `focus-visible:shadow-frame-ring-strong focus-visible:outline-none` swaps the outline frame for the focus halo.

### State frame (box-shadow)

A 2px gap fill plus a 1px ring (`0 0 0 2px gap, 0 0 0 3px color`) unifies rest, focus, and checked states into one idiom. These tokens live in `@theme`, so they generate `shadow-frame-*` utilities:

```
shadow-frame-ring                // ring at 45%   soft focus for text-entry fields
shadow-frame-ring-strong         // ring at 100%  focus for buttons, toggles, nav, popups
shadow-frame-primary             // primary 45%   rest halo: primary Button, checked Checkbox/Switch
shadow-frame-primary-strong      // primary 100%  focus on those, and on a checked Radio
shadow-frame-destructive         // destructive 45%   focus on aria-invalid fields
shadow-frame-destructive-strong  // destructive 100%  focus on the destructive Button
```

The gap color is `--frame-gap`, which defaults to `--background`. Override it when the frame sits on another surface. Tabs triggers set `[--frame-gap:var(--muted)]`, and `PopoverContent` sets `[--frame-gap:var(--popover)]` so halos inside a popover (such as calendar days) blend in.

**Rest halos** (always on): the `primary` Button (`shadow-frame-primary`), and a checked or indeterminate `Checkbox` or checked `Switch`. A checked Radio has no rest halo; its border color and dot carry the state.

**Focus.** Soft and strong focus are applied deliberately to different groups:

- **Text entry: soft `shadow-frame-ring` + `border-ring`.** This covers `Input`, `Textarea`, `InputGroup` (on `focus-within`), `SelectTrigger`, `NativeSelect`, `ComboboxAnchor` (on `focus-within`), the `DatePicker` trigger, and Calendar dropdowns, day buttons, and nav buttons. A field is focused for a long time while someone types, so its halo stays quiet and the border change does part of the work. `SelectTrigger` and the `DatePicker` trigger keep the same treatment while their popup is open (`data-popup-open`).
- **Everything else: `shadow-frame-ring-strong`.** This covers `Button`, `Checkbox`, `Radio`, `Switch`, `Slider` thumbs (`data-focused`), `Tabs` trigger and panel, `Pagination` and `Breadcrumb` links, `Accordion` trigger, `ScrollArea` (on the root while its viewport has `:focus-visible`), the audio waveform and seek thumb, and the `Dialog`/`AlertDialog`/`Sheet`/`Drawer` popups. Focus on these is brief and has to be found quickly.
- **Checked and destructive controls intensify.** A primary Button and a checked Checkbox, Switch, or Radio focus with `shadow-frame-primary-strong`. The destructive Button uses `shadow-frame-destructive-strong`.
- **`aria-invalid` fields:** the border drops to `border-destructive/40` at rest. On focus it goes to full `border-destructive` with `shadow-frame-destructive` (soft, matching text-entry intensity). `SelectTrigger` and `ComboboxAnchor` also honor `data-invalid`.
- **Exception:** `InputGroupButton` focuses with `inset-ring-2 inset-ring-ring`, because the group clips its corners and an outer halo would be cut off.

**Where the frame does not apply:**

- **Items in menus, select, combobox, and command.** The keyboard cursor is a list highlight (`data-highlighted:bg-muted`, or `data-[selected=true]:bg-muted` in Command), not a focus ring.
- **Floating surface containers.** The surface itself is the indicator.

## Glass & Backdrops

**Floating surfaces** (`TooltipContent`, `PopoverContent`, `DropdownMenuContent`/`SubmenuContent`, `SelectContent`, `ComboboxContent`) share one recipe:

```
rounded-md border bg-popover shadow-md
supports-backdrop-filter:bg-popover/70 supports-backdrop-filter:backdrop-blur-2xl supports-backdrop-filter:backdrop-saturate-180
```

Tooltip uses `shadow-xs` instead of `shadow-md`. All five fade opacity over 120ms ease-out and default to `sideOffset={6}`. Without `backdrop-filter` support they fall back to an opaque `bg-popover`.

**Modal backdrops** (`Dialog`, `AlertDialog`, `Sheet`, `Drawer`):

```
fixed inset-0 z-50 bg-background/55 backdrop-blur-md backdrop-saturate-150
```

Modals dim and soften the page enough to hold attention while keeping context visible. Floating surfaces stay more opaque because their text sits directly on the glass.

The chart tooltip and chart loading label use the floating recipe too. The Tabs list uses a lighter glass: `bg-muted/65` + `backdrop-blur-xl` + `backdrop-saturate-150`.

## Translucency

Opacity steps carry consistent meaning:

- `/10` soft-fill background (primary and destructive badges, destructive alert and button, destructive menu highlight); `/15` destructive button hover
- `/20` soft-fill border
- `/30` dim or unfilled: segmented slider and progress ticks and the unplayed waveform in light (`/45` in dark, which needs more lift), slider hover preview (`bg-primary/30`), current pagination border (`border-primary/30`), table row hover (`bg-muted/30`)
- `/40` `aria-invalid` border at rest
- `/45` soft halo intensity (inside the `shadow-frame-*` `color-mix`)
- `/50` disabled
- `/55` modal backdrop; `/70` floating glass, and the hover on select-like triggers and selected table rows (`bg-muted/70`)

## Interaction States

- **Hover:** a `bg-muted` tint on `outline` and `ghost` Buttons, Checkbox, Radio, Accordion trigger, and Pagination links. Select-like triggers (`SelectTrigger`, `NativeSelect`, `DatePicker`) use `bg-muted/70`. The primary Button goes to `bg-primary/90`, and table rows to `bg-muted/30`. Text inputs (`Input`, `Textarea`, `ComboboxAnchor`) do **not** tint on hover; they aren't buttons. Tabs triggers and Breadcrumb links change text color only, and Breadcrumb links also underline.
- **Highlight (keyboard cursor in lists):** `data-highlighted:bg-muted` on DropdownMenu, Select, and Combobox items, and `data-[selected=true]:bg-muted` on Command items. Destructive menu items use `bg-destructive/10`.
- **Selected / current:**
  - Select and Combobox items show a `text-primary` check.
  - DropdownMenu checkbox and radio items show a check or a dot.
  - The current Pagination page is `aria-current-page:border-primary/30 aria-current-page:bg-muted aria-current-page:text-foreground`.
  - The active Tab is a sliding `bg-background` chip with `ring-1 ring-border-strong` and a soft shadow.
  - Selected table rows (`data-selected`) are `bg-muted/70`.
  - Calendar selected days are `bg-primary`, and range middles are `bg-muted`.
- **Press:** `active:scale-[0.98]` on Button. Simple slider thumbs use `hover:scale-110 active:scale-95`, segmented thumbs `active:scale-[0.97]`, and the audio seek thumb `active:scale-95`.
- **Disabled:** `opacity-50` and `cursor-not-allowed`, with no hover affordance. Use `disabled:` on native elements and `data-disabled:` on Base UI widgets (Base UI sets `data-disabled` on roots that aren't native form controls). Anchor-based links (Pagination) use `aria-disabled:`. Inside a disabled `Field`, labels and descriptions drop to `opacity-70`.

## Accessibility

- **Contrast:**
  - Light `muted-foreground` measures about 6.2:1 on `background` and 5.6:1 on `muted`.
  - Destructive soft-fill text stays at or above 4.5:1 (see Status).
  - Text on `primary` is well above AA in both themes.
- **Hit areas:** Checkbox, Radio, and Switch extend their target with an invisible `::after` (`-inset-x-3 -inset-y-2`), so a 16px box gets roughly a 40×32px target. The Sheet and Drawer close buttons extend 5px on every side.
- **Focus:** every interactive primitive has a visible focus state (see State frame).
- **Semantics:**
  - `Spinner` is `role="status"` with `aria-label="Loading"`.
  - `Alert` and `FieldError` are `role="alert"`.
  - `Pagination` and `Breadcrumb` are labelled `<nav>`s, and separators and icons are `aria-hidden`.
  - `PaginationEllipsis` and `BreadcrumbEllipsis` carry sr-only text.
  - `Separator` is decorative (`role="none"`) unless `decorative={false}`.
  - `CommandDialog` renders an sr-only title and description.
  - Icon-only close buttons have `aria-label`s.
  - The audio waveform and seek bar expose slider values as `"m:ss of m:ss"`.
- **Keyboard:** Base UI handles roving focus and typeahead. `AudioPlayerWaveform` supports Space (play/pause), the arrow keys (seek), and Home/End.
- **Reduced motion:** see Motion.

## Conventions

- **Imports:** one file per primitive (`import { Button } from '@/components/ui/button'`), with no barrel exports. Charts live under `@/components/ui/charts/*`. `cn` comes from `@/lib/utils`.
- **Primitives:** built on Base UI (`@base-ui/react`) and composed through the `render` prop, not `asChild`. The exceptions wrap third-party primitives: `Drawer` (vaul, so `DrawerClose asChild`), `Command` (cmdk), `Calendar` (react-day-picker), and the charts (Recharts). Icons are Tabler (`@tabler/icons-react`); icons inside controls take `data-slot="icon"` for sizing.
- **Native vs. custom:** use native HTML where it's enough (`NativeSelect`, `Textarea`) and Base UI for richer UX (`Select`, `Combobox`, `DropdownMenu`).
- **Slots:** every part sets `data-slot`, so parents can style children (for example `in-data-[slot=card-content]:` on Calendar).
- **Custom variants** (in base CSS):
  - `dark` is `&:where(.dark, .dark *)`, which gives class-based dark mode.
  - `aria-current-page` is `&[aria-current='page']`.

## Primitives Register

This is the scope and the details that are easy to miss. For full props, read the file.

### Surfaces & Disclosure

- **Card:** `Card`, `CardHeader`, `CardTitle` (`as`, default `h3`), `CardDescription`, `CardAction`, `CardContent`, `CardFooter`. It is presentational only. `framed` is opt-in.
- **Dialog / AlertDialog:** always modal. Dialog is `max-w-md` with the close button on by default. AlertDialog is `max-w-sm` with the close button off by default, which forces an explicit choice. Both have the frame on.
- **Sheet:** edge-attached modal. `side` is `top` / `right` (default) / `bottom` / `left`. Left and right are full height up to `sm:max-w-md`; top and bottom are at most 85dvh. Parts: `SheetHeader`, `SheetBody` (scrolls), `SheetFooter`.
- **Drawer:** drag-dismissible (vaul). Bottom drawers show a grab handle and round their top corners (`rounded-t-xl`). Parts mirror Sheet.
- **Popover:** interactive floating panel, `min-w-56 p-4`, with `PopoverHeader`/`Title`/`Description`.
- **Tooltip:** short and non-interactive. `TooltipProvider` delays are 500/100/400ms. The default placement is `top` with a 6px offset, and the width is capped at `max-w-64`.
- **DropdownMenu:** items, checkbox and radio items, labels, separators, shortcuts, and submenus. Pass `destructive` on an item for red text and a red highlight. The submenu chevron is static.
- **Command:** a cmdk palette. `CommandDialog` mounts it in the Dialog shell (`p-0`, close button off) with an sr-only title. The caller wires the ⌘K toggle.
- **Accordion:** disclosure only, kept mounted. An open item gains `bg-card`, an inset 1px border, and 4px of vertical margin. The plus icon rotates 135° into an ×.
- **ScrollArea:** Base UI overlay scrollbars that fade in on hover or scroll. `fadeEdges` (`true` / `vertical` / `horizontal` / `both`) masks the overflowing edges, and the mask lifts while the viewport has focus.

### Inputs & Forms

- **Button:** variants `primary` / `outline` (default) / `ghost` / `destructive`. Sizes `sm` / `default` / `lg` / `iconSm` / `icon` / `iconLg`. There is no loading prop; compose `disabled` with `Spinner`.
- **Input / InputGroup:** `InputGroup` contains `InputGroupInput`, `InputGroupTextarea`, `InputGroupAddon` (`align` inline-start/inline-end/block-start/block-end, or `side`), `InputGroupButton` (ghost `sm`), and `InputGroupText`. Clicking an addon focuses the control.
- **Textarea:** matches Input's focus and invalid styling. `min-h-24`, vertical resize.
- **Select / NativeSelect / Combobox:** these share the trigger shell. `Combobox` is a searchable client-side filter with `ComboboxEmpty` and `ComboboxClear`.
- **Checkbox:** `default` is 16px and `sm` is 14px, with a 4px radius and an enlarged hit area. Indeterminate is supported.
- **RadioGroup / RadioGroupItem:** `RadioGroup` is layout-neutral. Items are `size-4`; when checked they get a primary border and a 6px primary dot.
- **Switch:** `default` is a 32×18 track with a 14px thumb; `sm` is 28×16 with 12px. The unchecked track is `bg-ring` and the checked track `bg-primary`.
- **Slider:** variants `simple` (default) / `segmented`. Horizontal (`w-full`) or vertical (`h-40`). Pass an array `value` for a range. A value bubble shows while focused or dragging (and on hover for segmented). Segmented adds a hover delta preview.
- **Calendar / DatePicker / DateRangePicker:** react-day-picker with 32px cells. The pickers are outline Buttons styled as fields. The range picker shows two months and closes once both ends are picked.
- **Field:** layout only. `Field` (`orientation` vertical / horizontal / responsive), `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldLabel` (`required` adds a red asterisk), `FieldContent`, `FieldTitle`, `FieldDescription`, `FieldError` (`errors` array, deduplicated), `FieldSeparator`.

### Status, Nav & Data

- **Alert:** inline and non-dismissible. Variants `default` / `info` / `success` / `warning` / `destructive`. Pass the icon yourself as a child with `data-slot="icon"`. `framed` is opt-in.
- **Badge:** non-interactive. Variants `default` / `secondary` / `success` / `info` / `warning` / `destructive` / `outline` / `status` / `count` / `source`. Sizes `sm` (20px) / `default` (24px, the default) / `lg` (28px). Shape `pill` (default) or `tag` (`rounded-sm`); `count` and `source` default to `tag`. The `indicator` is `none` / `dot` / `square`: info, success, warning, and status default to `dot`, destructive to `square`, and the rest to none. `truncate` caps the width at 18ch.
- **Tabs:** `TabsList` variants `rail` (default; bordered `bg-muted` glass) and `pill` (transparent border, no inset shadow, 4px gaps). Sizes `sm` / `default` are set on `Tabs`. Triggers are `h-7` / `h-8.5` inside a 1px-bordered list, so the outer heights are 30px / 36px, matching the `sm` / `default` controls. The active indicator is a separate chip that animates over 200ms. `equal` stretches the triggers.
- **Pagination:** static, and the caller owns the page math. Anchor-based. Page links are 32px squares; Previous and Next are text links. There is one size.
- **Breadcrumb:** a single line that hides overflow and truncates items. The chevron is the default separator; pass children to override it.
- **Progress:** variants `simple` (default) / `segmented`. Sizes `sm` / `md` (default). A `null` value is indeterminate and static. Compose with `ProgressLabel` and `ProgressValue`.
- **Table:** semantic parts. `TableContainer` owns the rounded card surface and the horizontal overflow. The header and footer are tinted `bg-muted/35`. Use `data-selected` for selection you manage yourself.
- **Avatar:** sizes `xs` 24 / `sm` 32 / `md` 40 (default) / `lg` 48 / `xl` 64. Shapes `circle` (default) / `rounded` / `square`. It has a `ring-border-muted` ring. `name` derives up to two initials, and the fallback is `?`.
- **Separator:** 1px `bg-border`, horizontal or vertical, decorative by default.
- **Charts:** Recharts wrappers, one file per type:
  - **Area:** variants `gradient` (default) / `gradient-reverse` / `solid` / `dotted` / `lines` / `hatched`. `strokeVariant` is `solid` (default) / `dashed`. Stacking: `default` / `stacked` / `expanded`.
  - **Bar:** variants `default` / `hatched` / `duotone` / `duotone-reverse` / `gradient` / `stripped`. Stacking: `default` / `stacked` / `percent`. Vertical or horizontal layout.
  - **Line:** `strokeVariant` is `solid` (default) / `dashed`.
  - **Pie, Radar** (`filled` / `lines`), **Radial** (`full` / `semi`), and **Sankey** (links `gradient` / `solid` / `source` / `target`).
  - **Shared parts:** `Brush`, `ChartLegend`, `ChartBackground` patterns, and `ChartDot`.
  - Area, bar, and line reveal left-to-right by default. `isLoading` swaps in placeholder data with a "Loading" label.

### Media & Feedback

- **AudioPlayer:** `AudioPlayerProvider` and `useAudioPlayer` own the state, around these parts:
  - `AudioPlayerButton`: play/pause, with a `Spinner` overlay while buffering.
  - `AudioPlayerProgress`: a seek bar whose thumb shows on hover or focus.
  - `AudioPlayerWaveform`: played bars are `bg-primary` and unplayed bars `bg-muted-foreground/30`.
  - `AudioPlayerTime` and `AudioPlayerDuration`.
  - `AudioPlayerSpeed`: a dropdown.
  - `AudioPlayerSpeedButtonGroup`: the active speed is a `primary` Button with `aria-pressed`.
- **Spinner:** three pill bars in a 24×18 viewBox, 16px by default, `currentColor`.
- **ShimmeringText:** a gradient sweep across the text for AI "thinking" states. It starts when in view and renders plain `text-foreground` under reduced motion.

## Deferred (Intentional)

These features are deliberately left out, so they aren't reinvented or adopted by accident:

- **Button:** a built-in loading prop or pre-baked icon variants
- **Card:** an interactive or pressable variant
- **Combobox:** styled multi-value chips, freeform values, async loading
- **Pagination:** page math and truncation helpers
- **Tooltip:** interactive or rich content (use Popover)
- **Field:** error animation and async validation hooks

## Registry

The registry ships one foundation item, opt-in extras, and bundles:

- **`base`** installs the Geist and Geist Mono font items, every token as CSS variables (theme, light, dark: colors, radius, type scale, easings, `shadow-frame-*`), the base CSS (custom variants plus the base layer above), and the `cn` utility at `lib/utils.ts`. Every primitive depends on it, directly or through another primitive.
- **Opt-in:** `design` (this file), `project-config` (AGENTS.md, oxlint, oxfmt, .gitignore), `logo` (`components/logo.tsx`), and `favicons` (`public/favicon.svg`, `public/favicon-dark.svg`). Nothing else installs these.
- **Bundles:** `essentials`, `forms`, `overlays`, `data`, and `media` group related primitives. `all` is `base` plus every primitive.
