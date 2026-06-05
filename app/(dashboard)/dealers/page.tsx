"use client"
import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"

import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { dealers } from "./dealers-data"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"


const columns = [
  {
    header: "Contact Name",
    accessorKey: "contactName",
    cell: ({ row }: any) => (
      <Badge variant="outline">
        <Link href={`/dealers/${row.original.id}`}>{row.original.contactName}</Link>
      </Badge>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Region",
    accessorKey: "region",
  },
  {
    header: "City",
    accessorKey: "city",
  },
  {
    header: "State",
    accessorKey: "state",
  },
];
export default function DealersPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<DealersListFallback />}>
        <GenericDataTable getRowId={(row) => row.id} data={dealers} columns={columns} enableDragAndDrop={false} enableSelection={false} enablePagination={true} pageSize={5} />
      </Suspense>
    </div>
  )
}

function DealersListFallback() {
  return (
    <div className="space-y-4 rounded-lg border p-6">
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  )
}
