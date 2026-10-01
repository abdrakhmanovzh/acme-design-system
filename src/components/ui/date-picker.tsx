import { IconCalendar } from '@tabler/icons-react'
import { format } from 'date-fns'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'

import { Button } from '#/components/ui/button'
import { Calendar } from '#/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '#/components/ui/popover'
import { cn } from '#/lib/cn'

const datePickerTriggerClassName =
  'h-9 w-full justify-start gap-2 px-3 text-left text-sm font-normal shadow-none hover:bg-muted/70 focus-visible:border-ring focus-visible:shadow-frame-ring! focus-visible:outline-none active:scale-100 aria-invalid:border-destructive/40 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:shadow-frame-destructive! data-popup-open:border-ring data-popup-open:shadow-frame-ring'

const datePickerPopoverClassName = 'w-auto overflow-hidden p-0'

type DatePickerTriggerButtonProps = React.ComponentProps<typeof Button> & {
  placeholderShown: boolean
  minWidthClassName: string
  children: React.ReactNode
}

function DatePickerTriggerButton({
  placeholderShown,
  minWidthClassName,
  className,
  children,
  ...props
}: DatePickerTriggerButtonProps) {
  return (
    <Button
      variant="outline"
      type="button"
      className={cn(
        datePickerTriggerClassName,
        minWidthClassName,
        placeholderShown && 'text-muted-foreground',
        className
      )}
      {...props}
    >
      <IconCalendar data-slot="icon" aria-hidden="true" />
      {children}
    </Button>
  )
}

type DatePickerProps = Omit<React.ComponentProps<typeof Button>, 'value'> & {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  formatString?: string
  disabledDates?: React.ComponentProps<typeof Calendar>['disabled']
  calendarProps?: Omit<
    React.ComponentProps<typeof Calendar>,
    'mode' | 'selected' | 'defaultMonth' | 'onSelect' | 'disabled'
  >
}

function DatePicker(allProps: DatePickerProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    open,
    onOpenChange,
    placeholder = 'Pick a date',
    formatString = 'PPP',
    disabledDates,
    calendarProps,
    className,
    disabled,
    ...props
  } = allProps
  const isControlled = 'value' in allProps
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(
    defaultValue
  )
  const selected = isControlled ? value : internalValue
  const isOpen = open ?? internalOpen

  function setOpen(next: boolean) {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  function selectDate(date: Date | undefined) {
    if (!isControlled) setInternalValue(date)
    onValueChange?.(date)
    setOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <DatePickerTriggerButton
            placeholderShown={!selected}
            minWidthClassName="min-w-60"
            disabled={disabled}
            className={className}
            {...props}
          >
            {selected ? format(selected, formatString) : placeholder}
          </DatePickerTriggerButton>
        }
      />
      <PopoverContent align="start" className={datePickerPopoverClassName}>
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected}
          onSelect={selectDate}
          disabled={disabledDates}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

type DateRangePickerProps = Omit<
  React.ComponentProps<typeof Button>,
  'value'
> & {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (date: DateRange | undefined) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  formatString?: string
  disabledDates?: React.ComponentProps<typeof Calendar>['disabled']
  calendarProps?: Omit<
    React.ComponentProps<typeof Calendar>,
    'mode' | 'selected' | 'defaultMonth' | 'onSelect' | 'disabled'
  >
}

function DateRangePicker(allProps: DateRangePickerProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    open,
    onOpenChange,
    placeholder = 'Pick a date range',
    formatString = 'LLL dd, y',
    disabledDates,
    calendarProps,
    className,
    disabled,
    ...props
  } = allProps
  const isControlled = 'value' in allProps
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<
    DateRange | undefined
  >(defaultValue)
  const selected = isControlled ? value : internalValue
  const isOpen = open ?? internalOpen

  function setOpen(next: boolean) {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  // With resetOnSelect the first click yields { from, to: undefined }, so a
  // complete range always means the user picked the end date.
  function selectDate(date: DateRange | undefined) {
    if (!isControlled) setInternalValue(date)
    onValueChange?.(date)

    if (date?.from && date.to) {
      setOpen(false)
    }
  }

  const label = selected?.from
    ? selected.to
      ? `${format(selected.from, formatString)} — ${format(
          selected.to,
          formatString
        )}`
      : format(selected.from, formatString)
    : placeholder

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <DatePickerTriggerButton
            placeholderShown={!selected?.from}
            minWidthClassName="min-w-72"
            disabled={disabled}
            className={className}
            {...props}
          >
            <span className="truncate">{label}</span>
          </DatePickerTriggerButton>
        }
      />
      <PopoverContent align="start" className={datePickerPopoverClassName}>
        <Calendar
          mode="range"
          resetOnSelect
          selected={selected}
          defaultMonth={selected?.from}
          onSelect={selectDate}
          disabled={disabledDates}
          numberOfMonths={2}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }
export type { DatePickerProps, DateRangePickerProps }
