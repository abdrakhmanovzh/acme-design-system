import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '#/lib/cn'

const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden select-none',
    'align-middle font-medium ring-1 ring-border-muted',
    '[&_img]:size-full [&_img]:object-cover'
  ],
  {
    variants: {
      size: {
        xs: 'size-6 text-[0.625rem]',
        sm: 'size-8 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-12 text-base',
        xl: 'size-16 text-xl'
      },
      shape: {
        circle: 'rounded-full',
        rounded: 'rounded-md',
        square: 'rounded-none'
      }
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle'
    }
  }
)

type AvatarRootProps = React.ComponentPropsWithoutRef<typeof BaseAvatar.Root> &
  VariantProps<typeof avatarVariants>

function AvatarRoot({ className, size, shape, ...props }: AvatarRootProps) {
  return (
    <BaseAvatar.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape }), className)}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  alt = '',
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAvatar.Image>) {
  return (
    <BaseAvatar.Image
      data-slot="avatar-image"
      alt={alt}
      className={cn(
        'size-full object-cover opacity-100 transition-opacity duration-150 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0',
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAvatar.Fallback>) {
  return (
    <BaseAvatar.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center bg-muted text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

type AvatarProps = Omit<AvatarRootProps, 'children'> & {
  src?: string
  alt?: string
  name?: string
  fallback?: React.ReactNode
  imageProps?: Omit<
    React.ComponentPropsWithoutRef<typeof AvatarImage>,
    'src' | 'alt'
  >
  fallbackProps?: React.ComponentPropsWithoutRef<typeof AvatarFallback>
}

function getInitials(name?: string) {
  if (!name) return undefined

  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return undefined

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function Avatar({
  src,
  alt,
  name,
  fallback,
  imageProps,
  fallbackProps,
  ...props
}: AvatarProps) {
  const fallbackContent = fallback ?? getInitials(name) ?? '?'

  return (
    <AvatarRoot {...props}>
      {src ? (
        <AvatarImage src={src} alt={alt ?? name ?? ''} {...imageProps} />
      ) : null}
      <AvatarFallback {...fallbackProps}>{fallbackContent}</AvatarFallback>
    </AvatarRoot>
  )
}

export { Avatar, AvatarFallback, AvatarImage, AvatarRoot, avatarVariants }
export type { AvatarProps }
