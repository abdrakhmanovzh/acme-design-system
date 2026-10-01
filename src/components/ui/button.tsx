import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '#/lib/cn'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-sm font-medium tracking-[-0.01em] whitespace-nowrap transition-[color,background-color,border-color,opacity,scale] focus-visible:shadow-frame-ring-strong focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-frame-primary hover:bg-primary/90 focus-visible:shadow-frame-primary-strong',
        outline: 'border bg-card text-foreground hover:bg-muted',
        ghost: 'text-foreground hover:bg-muted',
        destructive:
          'border border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/15 focus-visible:shadow-frame-destructive-strong'
      },
      size: {
        sm: 'h-7.5 px-2.5',
        default: 'h-9 px-3',
        lg: 'h-10 gap-2 px-4',
        iconSm: 'size-7.5 px-0',
        icon: 'size-9 px-0',
        iconLg: 'size-10 px-0'
      }
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default'
    }
  }
)

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

function Button({
  className,
  variant = 'outline',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
