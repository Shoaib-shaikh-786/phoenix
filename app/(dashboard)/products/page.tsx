import { Boxes, PackagePlus, Tags, Warehouse } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card"

const modules = [
  {
    title: "Items",
    description: "Search SKU-level inventory, stock, pack sizes, and wholesale prices.",
    icon: Boxes,
    href: "/products/items",
    actionLabel: "View items",
  },
  {
    title: "Categories",
    description: "Organize products into staples, pulses, oils, beverages, and more.",
    icon: Tags,
    href: "/products/items?search=staples",
    actionLabel: "Browse staples",
  },
  {
    title: "Stock",
    description: "Track stock availability and identify low-stock items before orders fail.",
    icon: Warehouse,
    href: "/products/items?search=low",
    actionLabel: "Review stock",
  },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the catalog foundation for wholesale ordering and distribution.
          </p>
        </div>
        <Button asChild>
          <Link href="/products/items">
            <PackagePlus />
            Add item
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => {
          const Icon = module.icon

          return (
            <Card key={module.href} className="@container/card">
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
    </div>
  )
}