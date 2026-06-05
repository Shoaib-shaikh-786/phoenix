"use client"
import { Suspense } from "react"

import { ListFallback } from "../_components/list-fallback"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { staffMembers } from "../demo-data"

export default function StaffPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<ListFallback />}>
        <GenericDataTable data={staffMembers} columns={[{
          header: "Staff",
          accessorKey: "name",
        }, {
          header: "Role",
          accessorKey: "role",
        }]} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={true} enablePagination={true} pageSize={5} />
      </Suspense>
    </div>
  )
}
