import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react'
import * as React from 'react'
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale
} from 'react-day-picker'

import { Button, buttonVariants } from '#/components/ui/button'
import { cn } from '#/lib/cn'

const defaultClassNames = getDefaultClassNames()

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const mergedFormatters = React.useMemo(
    () => ({
      formatMonthDropdown: (date: Date) =>
        date.toLocaleString(locale?.code, { month: 'short' }),
      ...formatters
    }),
    [locale?.code, formatters]
  )

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={mergedFormatters}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-4 md:flex-row',
          defaultClassNames.months
        ),
        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-(--cell-size) p-0 select-none focus-visible:shadow-frame-ring! aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-(--cell-size) p-0 select-none focus-visible:shadow-frame-ring! aria-disabled:opacity-50',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative overflow-hidden rounded-(--cell-radius) border border-input bg-card has-focus:border-ring has-focus:shadow-frame-ring',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          'absolute inset-0 cursor-pointer opacity-0',
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          'font-medium tracking-[-0.01em] select-none',
          captionLayout === 'label'
            ? 'text-sm'
            : 'flex h-(--cell-size) items-center gap-1 rounded-(--cell-radius) px-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground',
          defaultClassNames.caption_label
        ),
        month_grid: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 rounded-(--cell-radius) font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase select-none',
          defaultClassNames.weekday
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn(
          'w-(--cell-size) select-none',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'text-xs text-muted-foreground select-none',
          defaultClassNames.week_number
        ),
        day: cn(
          'group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)',
          props.showWeekNumber
            ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)'
            : '[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)',
          defaultClassNames.day
        ),
        range_start: cn(
          'relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted',
          defaultClassNames.range_start
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn(
          'relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted',
          defaultClassNames.range_end
        ),
        today: defaultClassNames.today,
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside
        ),
        disabled: cn('text-muted-foreground', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={className}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <IconChevronLeft
                aria-hidden="true"
                className={cn('size-4', className)}
                {...props}
              />
            )
          }

          if (orientation === 'right') {
            return (
              <IconChevronRight
                aria-hidden="true"
                className={cn('size-4', className)}
                {...props}
              />
            )
          }

          return (
            <IconChevronDown
              aria-hidden="true"
              className={cn('size-4', className)}
              {...props}
            />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-today={modifiers.today}
      className={cn(
        'relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 rounded-(--cell-radius) border-0 leading-none font-normal transition-none!',
        'after:absolute after:bottom-1 after:left-1/2 after:size-1.5 after:-translate-x-1/2 after:rounded-full after:bg-current after:opacity-0 after:content-[""]',
        'group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-20 group-data-[focused=true]/day:outline-none group-data-[focused=true]/day:not-data-[selected-single=true]:not-data-[range-start=true]:not-data-[range-end=true]:not-data-[range-middle=true]:shadow-frame-ring',
        'focus-visible:relative focus-visible:z-20 focus-visible:shadow-frame-ring! focus-visible:outline-none',
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground',
        'data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground',
        'data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground',
        'data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground',
        'data-[today=true]:after:opacity-70',
        '[&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
