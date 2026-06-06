"use client"
import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { orders } from "@/types/order"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PERMISSIONS } from "@/lib/permission"
import { Plus } from "lucide-react"

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
    header: "Order Created At",
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
export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<OrdersListFallback />}>
        <div className="flex item-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Orders</h1>
          <Button
            onClick={() => { }}
            permission={PERMISSIONS.ORDERS.VIEW}
          >
            <Plus />
            Add Items
          </Button>
        </div>
        <GenericDataTable data={orders} columns={columns} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={true} enablePagination={true} enableColumnVisibility={false} pageSize={5} />
      </Suspense>
    </div>
  )
}

function OrdersListFallback() {
  return (
    <div className="space-y-4 rounded-lg border p-6">
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  )
}
