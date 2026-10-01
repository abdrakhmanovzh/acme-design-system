import React, { useMemo, useRef } from 'react'
import type { UseInViewOptions } from 'motion/react'
import { motion, useInView, useReducedMotion } from 'motion/react'

import { cn } from '#/lib/cn'

interface ShimmeringTextProps {
  text: string
  duration?: number
  delay?: number
  repeat?: boolean
  repeatDelay?: number
  className?: string
  startOnView?: boolean
  once?: boolean
  inViewMargin?: UseInViewOptions['margin']
  spread?: number
  color?: string
  shimmerColor?: string
}

export function ShimmeringText({
  text,
  duration = 2,
  delay = 0,
  repeat = true,
  repeatDelay = 0.5,
  className,
  startOnView = true,
  once = false,
  inViewMargin,
  spread = 2,
  color,
  shimmerColor
}: ShimmeringTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: inViewMargin })
  const prefersReducedMotion = useReducedMotion() ?? false

  const dynamicSpread = useMemo(() => {
    return Math.min(text.length * spread, 40)
  }, [text, spread])

  const shouldAnimate = !prefersReducedMotion && (!startOnView || isInView)

  if (prefersReducedMotion) {
    return (
      <span
        ref={ref}
        data-slot="shimmering-text"
        className={cn('text-foreground', className)}
      >
        {text}
      </span>
    )
  }

  return (
    <motion.span
      ref={ref}
      data-slot="shimmering-text"
      className={cn(
        'relative inline-block bg-size-[250%_100%,auto] bg-clip-text text-transparent',
        '[--base-color:color-mix(in_oklab,var(--foreground)_40%,transparent)] [--shimmer-color:var(--foreground)]',
        '[background-repeat:no-repeat,no-repeat]',
        '[--shimmer-bg:linear-gradient(90deg,transparent_calc(50%-var(--spread)),var(--shimmer-color),transparent_calc(50%+var(--spread)))]',
        className
      )}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          ...(color && { '--base-color': color }),
          ...(shimmerColor && { '--shimmer-color': shimmerColor }),
          backgroundImage: `var(--shimmer-bg), linear-gradient(var(--base-color), var(--base-color))`
        } as React.CSSProperties
      }
      initial={{
        backgroundPosition: '100% center',
        opacity: 0
      }}
      animate={
        shouldAnimate
          ? {
              backgroundPosition: '0% center',
              opacity: 1
            }
          : {}
      }
      transition={{
        backgroundPosition: {
          repeat: repeat ? Infinity : 0,
          duration,
          delay,
          repeatDelay,
          ease: 'linear'
        },
        opacity: {
          duration: 0.3,
          delay
        }
      }}
    >
      {text}
    </motion.span>
  )
}
