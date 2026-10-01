import { cn } from '#/lib/cn'

type Props = {
  className?: string
}

export function Logo({ className }: Props) {
  return (
    <svg
      className={cn('size-8 shrink-0', className)}
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        className="fill-primary"
        fillRule="evenodd"
        d="M16 2 30 29H2L16 2Zm0 11.5L22.2 25H9.8L16 13.5Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
