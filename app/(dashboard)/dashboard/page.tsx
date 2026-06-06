"use client"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { PageHeader } from "../_components/page-header"
import { orders } from "@/types/order"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { marketDays } from "../demo-data"
import { Button } from "@/components/ui/button"
import { ViewConfig } from "@/components/list-shell/types"
const ordersColumns = [
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
]
const viewConfig: ViewConfig[] = [
  {
    columnId: 'status',
    label: 'Order Status',
    options: [
      { value: 'all', label: 'All' },
      { value: 'confirmed', label: 'Confirmed' },
      { value: 'packed', label: '	Packed' },
      { value: 'draft', label: 'Draft' },
    ],
  },
  {
    columnId: 'paymentStatus',
    label: 'Payment Status',
    options: [
      { value: 'all', label: 'All' },
      { value: 'paid', label: 'Paid' },
      { value: 'pending', label: 'Pending' },
      { value: 'overdue', label: 'Overdue' },
    ],
  }
];


const todayMarketColumns = [
  {
    header: "Salesman",
    accessorKey: "salesman",
    cell: ({ row }: any) => <Badge variant="outline"><Link href={`/salesman/${row.original.id}`}>{row.original.salesman}</Link></Badge>,
  },
  {
    header: "Area",
    accessorKey: "area",
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
]
export default function DashboardPage() {

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="A working snapshot of orders, catalog coverage, dealers, and receivables."
      />
      <div className="flex flex-col gap-4 bg-card rounded-lg border">
        <div className="flex items-center justify-between space-y-2 p-4 ">
          <h2 className="text-lg font-semibold">Orders</h2>
          <Button variant="outline" asChild>
            <Link href="/orders">View All</Link>
          </Button>
        </div>
        <GenericDataTable
          data={orders}
          columns={ordersColumns}
          getRowId={(row) => row.id}
          enableDragAndDrop={false}
          enableSelection={false}
          enablePagination={false}
          enableColumnVisibility={false}
          pageSize={5}
          viewConfig={viewConfig}
          rowActions={(row) => [
            {
              label: 'View',
              onClick: () => console.log('View', row),
            },
          ]}
        />
      </div>
      <div className="flex flex-col gap-4 bg-card rounded-lg border">
        <div className="flex items-center justify-between space-y-2 p-4">
          <h2 className="text-lg font-semibold">Today Market</h2>
          <Button variant="outline" asChild>
            <Link href="/dealers/market-days">View All</Link>
          </Button>
        </div>
        <GenericDataTable data={marketDays} columns={todayMarketColumns} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={false} enablePagination={false} enableColumnVisibility={false} pageSize={5} />
      </div>
    </div>
  )
}
