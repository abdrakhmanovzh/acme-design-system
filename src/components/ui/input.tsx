import { Input as InputPrimitive } from '@base-ui/react/input'
import * as React from 'react'

import { Button } from '#/components/ui/button'
import { Textarea } from '#/components/ui/textarea'
import { cn } from '#/lib/cn'

type InputSize = 'sm' | 'default' | 'lg'

type InputProps = Omit<React.ComponentProps<typeof InputPrimitive>, 'size'> & {
  size?: InputSize
}

function Input({ className, type, size = 'default', ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'w-full min-w-0 rounded-md border bg-card px-3 text-sm text-foreground transition-[color,background-color,border-color] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-frame-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/40 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:shadow-frame-destructive',
        size === 'sm' && 'h-7.5',
        size === 'default' && 'h-9',
        size === 'lg' && 'h-10',
        className
      )}
      {...props}
    />
  )
}

type InputGroupProps = React.ComponentPropsWithoutRef<'div'> & {
  size?: InputSize
}

function InputGroup({
  className,
  size = 'default',
  ...props
}: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        'flex w-full min-w-0 items-center overflow-hidden rounded-md border bg-card text-sm text-foreground transition-[color,background-color,border-color] focus-within:border-ring focus-within:shadow-frame-ring focus-within:outline-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-aria-invalid:border-destructive/40 has-aria-invalid:focus-within:border-destructive has-aria-invalid:focus-within:shadow-frame-destructive has-data-[align=block-end]:flex-col has-data-[align=block-end]:items-stretch has-data-[align=block-start]:flex-col has-data-[align=block-start]:items-stretch has-[textarea]:h-auto!',
        size === 'sm' && 'h-7.5',
        size === 'default' && 'h-9',
        size === 'lg' && 'h-10',
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({ className, size: _size, ...props }: InputProps) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        'h-full min-w-0 flex-1 border-0 bg-transparent px-3 shadow-none focus-visible:border-transparent focus-visible:shadow-none aria-invalid:focus-visible:shadow-none',
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'textarea'>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        'min-h-24 w-full flex-1 resize-none border-0 bg-transparent shadow-none focus-visible:border-transparent focus-visible:shadow-none aria-invalid:focus-visible:shadow-none',
        className
      )}
      {...props}
    />
  )
}

type InputGroupAddonProps = React.ComponentPropsWithoutRef<'div'> & {
  align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end'
  side?: 'start' | 'end'
}

function InputGroupAddon({
  className,
  align,
  side,
  onClick,
  ...props
}: InputGroupAddonProps) {
  const resolvedAlign =
    align ?? (side === 'end' ? 'inline-end' : 'inline-start')

  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={resolvedAlign}
      className={cn(
        'flex h-full shrink-0 cursor-text items-center gap-1.5 text-sm text-muted-foreground select-none **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0',
        resolvedAlign === 'inline-start' && 'order-first pr-0 pl-3',
        resolvedAlign === 'inline-end' &&
          'order-last ml-auto shrink-0 pr-0 pl-0',
        resolvedAlign === 'block-start' &&
          'order-first h-auto w-full justify-start border-b px-3 py-2',
        resolvedAlign === 'block-end' &&
          'order-last h-auto w-full justify-start border-t px-3 py-2',
        className
      )}
      onClick={(event) => {
        onClick?.(event)

        if (event.defaultPrevented) return
        if ((event.target as HTMLElement).closest('button')) return

        event.currentTarget.parentElement
          ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
            'input, textarea'
          )
          ?.focus()
      }}
      {...props}
    />
  )
}

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'sm',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'type'> & {
  type?: 'button' | 'submit' | 'reset'
}) {
  return (
    <Button
      type={type}
      data-slot="input-group-button"
      variant={variant}
      size={size}
      className={cn(
        // The group clips its corners, so draw the focus ring inside the button.
        'h-full rounded-none px-2 text-muted-foreground focus-visible:shadow-none focus-visible:inset-ring-2 focus-visible:inset-ring-ring',
        className
      )}
      {...props}
    />
  )
}

function InputGroupText({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        'flex items-center text-sm text-muted-foreground [&_svg]:pointer-events-none',
        className
      )}
      {...props}
    />
  )
}

export {
  Input,
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText
}
