import { Switch as SwitchPrimitive } from '@base-ui/react/switch'

import { cn } from '#/lib/cn'

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: 'sm' | 'default'
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-ring bg-ring p-px transition-[background-color,border-color,box-shadow] duration-150 ease-out after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:shadow-frame-ring-strong focus-visible:outline-none data-checked:border-primary data-checked:bg-primary data-checked:shadow-frame-primary data-checked:focus-visible:shadow-frame-primary-strong data-disabled:cursor-not-allowed data-disabled:opacity-50',
        size === 'sm' ? 'h-4 w-7' : 'h-4.5 w-8',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full bg-background ring-0 transition-transform duration-200 ease-out-quint',
          size === 'sm'
            ? 'size-3 data-checked:translate-x-3'
            : 'size-3.5 data-checked:translate-x-3.5'
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
