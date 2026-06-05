import type { LucideIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

type PageHeaderProps = {
  title: string
  description: string
  action?: {
    label: string
    icon?: LucideIcon
    href?: string
  }
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  const Icon = action?.icon

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {action ? (
        <Button asChild={Boolean(action.href)}>
          {action.href ? (
            <Link href={action.href}>
              {Icon ? <Icon /> : null}
              {action.label}
            </Link>
          ) : (
            <span>
              {Icon ? <Icon /> : null}
              {action.label}
            </span>
          )}
        </Button>
      ) : null}
    </div>
  )
}
