import { Card, CardContent } from '#/components/ui/card'
import { cn } from '#/lib/cn'

export function Tile({
  className,
  title,
  body,
  preview,
  framed
}: {
  className?: string
  title: string
  body: string
  preview: React.ReactNode
  framed?: boolean
}) {
  return (
    <Card framed={framed} className={cn('flex flex-col', className)}>
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex h-28 items-center">{preview}</div>
        <h3 className="mt-6 text-base font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
      </CardContent>
    </Card>
  )
}
