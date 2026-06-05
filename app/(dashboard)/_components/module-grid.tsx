import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Module = {
  title: string
  description: string
  href: string
  actionLabel: string
  icon: LucideIcon
}

export function ModuleGrid({ modules }: { modules: Module[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((module) => {
        const Icon = module.icon

        return (
          <Card key={module.href} className="@container/card rounded-lg">
            <CardHeader>
              <CardDescription>{module.description}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {module.title}
              </CardTitle>
              <CardAction>
                <Icon className="size-5 text-muted-foreground" />
              </CardAction>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href={module.href}>{module.actionLabel}</Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
