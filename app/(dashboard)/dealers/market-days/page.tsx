"use client"
import { Suspense } from "react"

import { ListFallback } from "../../_components/list-fallback"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { marketDays } from "../../demo-data"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const columns = [
  {
    header: "Area",
    accessorKey: "area",
    cell: ({ row }: any) => <Badge variant="outline"><Link href={`/dealers/market-days/${row.original.id}`}>{row.original.area}</Link></Badge>,
  },
  {
    header: "Day",
    accessorKey: "day",
  },
  {
    header: "Route",
    accessorKey: "route",
  },
  {
    header: "Dealers",
    accessorKey: "dealers",
  },
  {
    header: "Salesman",
    accessorKey: "salesman",
  },
  {
    header: "Cutoff",
    accessorKey: "cutoff",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }: any) => <Button variant="outline"><Link href={`/dealers/market-days/${row.original.id}`}>View</Link></Button>,
  },
];
export default function MarketDaysPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<ListFallback />}>
            <GenericDataTable data={marketDays} columns={columns} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={true} enablePagination={true} pageSize={5} />
      </Suspense>
    </div>
  )
}
