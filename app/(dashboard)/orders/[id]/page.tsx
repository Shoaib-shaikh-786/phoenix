"use client"
import { notFound } from "next/navigation"
import { CalendarDays, PackageCheck, ReceiptText } from "lucide-react"

import {
  DetailPageShell,
  DetailSection,
} from "@/components/detail-page"
import {
  formatCurrency,
  formatDate,
  getOrderTotal,
  orders,
} from "@/types/order"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type OrderDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

const columns = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }: any) => <Badge variant="outline"><Link href={`/products/items/${row.original.id}`}>{row.original.name}</Link></Badge>,
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Unit Price",
    accessorKey: "unitPrice",
  },
  {
    header: "Total Price",
    accessorKey: "totalPrice",
    cell: ({ row }: any) => formatCurrency(row.original.quantity * row.original.unitPrice),
  },
]

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params
  const order = orders.find((item) => item.id === id)

  if (!order) {
    notFound()
  }

  const total = getOrderTotal(order)

  return (
    <DetailPageShell
      title={order.id.toUpperCase()}
      subtitle={`${order.customer} · ${order.location}`}
      status={order.status}
      backHref="/orders"
      backLabel="Orders"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">

        {/* Basic Information — Full Width */}
        <DetailSection
          title="Basic Information"
          icon={<ReceiptText className="size-5 text-muted-foreground" />}
          className="lg:col-span-6"
          rows={[
            {
              columns: 4,
              fields: [
                { label: "Customer", value: order.customer },
                { label: "Location", value: order.location },
                { label: "Payment", value: order.paymentStatus },
                { label: "Total", value: formatCurrency(total), strong: true },
              ],
            },
          ]}
        />

        {/* Timeline — Full Width */}
        <DetailSection
          title="Timeline"
          icon={<CalendarDays className="size-5 text-muted-foreground" />}
          className="lg:col-span-6"
          rows={[
            {
              columns: 3,
              fields: [
                { label: "Created", value: formatDate(order.createdAt) },
                { label: "Last updated", value: formatDate(order.updatedAt) },
                { label: "Delivery", value: formatDate(order.deliveryDate) },
              ],
            },
          ]}
        />

        {/* Order Items Table — 4 Columns */}
        <DetailSection
          title="Order Items"
          icon={<PackageCheck className="size-5 text-muted-foreground" />}
          className="lg:col-span-4"
          rows={[
            {
              columns: 1,
              fields: [
                {
                  label: "",
                  value: (
                    <div className="overflow-hidden rounded-lg border">
                      <GenericDataTable data={order.items} columns={columns} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={false} enablePagination={false} pageSize={5} />
                    </div>
                  ),
                },
              ],
            },
          ]}
        />

        {/* Created By — 2 Columns */}
        <DetailSection
          title="Created By"
          className="lg:col-span-2"
          rows={[
            {
              columns: 1,
              fields: [
                { label: "Email", value: order.owner.email },
                { label: "Name", value: order.owner.name, strong: true },
              ],
            },
          ]}
        />
      </div>
    </DetailPageShell>
  )
}