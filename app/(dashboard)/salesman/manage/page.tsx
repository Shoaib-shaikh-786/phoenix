"use client"
import { Suspense } from "react"

import { ListFallback } from "../../_components/list-fallback"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { salesmen } from "../../demo-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const columns = [
  {
    header: "Salesman",
    accessorKey: "name",
    cell: ({ row }: any) => <Badge variant="outline"><Link href={`/salesman/${row.original.id}`}>{row.original.name}</Link></Badge>,
  },
  {
    header: "Territory",
    accessorKey: "territory",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Active Dealers",
    accessorKey: "activeDealers",
  },
  {
    header: "Target",
    accessorKey: "target",
  },
  {
    header: "Achieved",
    accessorKey: "achieved",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }: any) => <Button variant="outline"><Link href={`/salesman/${row.original.id}`}>View</Link></Button>,
  },
];
export default function ManageSalesmenPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<ListFallback />}>
        <GenericDataTable data={salesmen} columns={columns} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={true} enablePagination={true} pageSize={5} />
      </Suspense>
    </div>
  )
}
