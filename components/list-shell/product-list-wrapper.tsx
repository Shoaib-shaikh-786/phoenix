"use client"

import { PackageSearch } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductItem } from "@/app/(dashboard)/products/items/items-data"

export function ProductCardContent<TItem>({
  items,
  isLoading,
  getItemKey,
  emptyTitle,
  emptyDescription,
}: {
  items: TItem[]
  isLoading: boolean
  getItemKey: (item: TItem) => React.Key
  emptyTitle: string
  emptyDescription: string
}) {
  if (isLoading) {
    return (
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="rounded-lg">
            <CardHeader>
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-9 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <PackageSearch className="mb-3 size-9 text-muted-foreground" />
        <h3 className="text-base font-semibold">{emptyTitle}</h3>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          {emptyDescription}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div key={getItemKey(item)}><ProductCard item={item as ProductItem} /></div>
      ))}
    </div>
  )
}


export function ProductCard({ item }: { item: ProductItem }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{item.name}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {item.wholesalePrice}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {item.status}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {item.packSize}
          </div>
          <div className="text-muted-foreground">
            {item.stock}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{item.category}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {item.sku}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {item.status}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {item.packSize}
          </div>
          <div className="text-muted-foreground">
            {item.stock}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{item.category}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {item.wholesalePrice}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {item.status}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {item.packSize}
          </div>
          <div className="text-muted-foreground">
            {item.stock}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{item.category}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {item.wholesalePrice}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {item.status}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {item.packSize}
          </div>
          <div className="text-muted-foreground">
            {item.stock}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}