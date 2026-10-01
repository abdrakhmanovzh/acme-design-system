import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { IconCheck, IconMinus } from '@tabler/icons-react'
import * as React from 'react'

import { cn } from '#/lib/cn'

type CheckboxSize = 'sm' | 'default'

type CheckboxProps = React.ComponentProps<typeof BaseCheckbox.Root> & {
  size?: CheckboxSize
}

function Checkbox({ className, size = 'default', ...props }: CheckboxProps) {
  const Icon = props.indeterminate ? IconMinus : IconCheck

  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-[4px] border bg-card text-primary-foreground transition-[color,background-color,border-color,box-shadow] after:absolute after:-inset-x-3 after:-inset-y-2 hover:border-ring/70 hover:bg-muted focus-visible:shadow-frame-ring-strong focus-visible:outline-none data-checked:border-primary data-checked:bg-primary data-checked:shadow-frame-primary data-checked:focus-visible:shadow-frame-primary-strong data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:hover:border-border data-disabled:hover:bg-card data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:shadow-frame-primary data-indeterminate:focus-visible:shadow-frame-primary-strong',
        size === 'sm' ? 'size-3.5' : 'size-4',
        className
      )}
      {...props}
    >
      <BaseCheckbox.Indicator
        keepMounted
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-opacity data-unchecked:opacity-0"
      >
        <Icon
          aria-hidden="true"
          className={cn('stroke-3', size === 'sm' ? 'size-2.5' : 'size-3')}
        />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )
}

export { Checkbox }
export type { CheckboxProps }
