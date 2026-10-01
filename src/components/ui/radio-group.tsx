import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'

import { cn } from '#/lib/cn'

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('w-full', className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        'group/radio-group-item peer relative inline-flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-border bg-card transition-[color,background-color,border-color,box-shadow] after:absolute after:-inset-x-3 after:-inset-y-2 hover:border-ring/70 hover:bg-muted focus-visible:shadow-frame-ring-strong focus-visible:outline-none data-checked:border-primary data-checked:focus-visible:shadow-frame-primary-strong data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:hover:border-border data-disabled:hover:bg-card',
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        keepMounted
        data-slot="radio-group-indicator"
        className="size-1.5 rounded-full bg-primary transition-[opacity,transform] duration-100 ease-out data-checked:scale-100 data-checked:opacity-100 data-unchecked:scale-50 data-unchecked:opacity-0"
      >
        <span className="sr-only" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
