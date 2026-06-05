"use client"
import { Suspense } from "react"

import { ListFallback } from "../../_components/list-fallback"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { orders } from "../orders-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"


const columns = [
  {
    header: "Order",
    accessorKey: "id",
    cell: ({ row }: any) => <Badge variant="outline"><Link href={`/orders/${row.original.id}`}>{row.original.id}</Link></Badge>,
  },
  {
    header: "Customer",
    accessorKey: "customer",
  },
  {
    header: "Delivery",
    accessorKey: "deliveryDate",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }: any) => <Button variant="outline"><Link href={`/orders/${row.original.id}`}>View</Link></Button>,
  },
];
export default function DispatchPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<ListFallback />}>
        <GenericDataTable data={orders.filter((order) => order.status !== "Delivered")} columns={columns} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={true} enablePagination={true} pageSize={5} />
      </Suspense>
    </div>
  )
}
