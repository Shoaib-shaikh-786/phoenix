"use client"
import { Suspense } from "react"

import { ListFallback } from "../../_components/list-fallback"
import { orders } from "@/types/order"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"


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
    header: "Status",
    accessorKey: "status",
  },
  {
    header: 'Order Date',
    accessorKey: "createdAt",
  },
  {
    header: "Payment Status",
    accessorKey: "paymentStatus",
  },
  {
    header: "Delivery",
    accessorKey: "deliveryDate",
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }: any) => <Button variant="outline"><Link href={`/orders/${row.original.id}`}>View</Link></Button>,
  },
];
export default function TodayOrdersPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<ListFallback />}>  
        <GenericDataTable data={orders.filter((order) => order.createdAt.startsWith("2026-05-20T10:15:00.000Z"))} columns={columns} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={true} enablePagination={true} pageSize={5} />
      </Suspense>
    </div>
  )
}
