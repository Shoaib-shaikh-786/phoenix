"use client"
import { Suspense } from "react"

import { ListFallback } from "../../_components/list-fallback"
import { permissionRoles } from "../../demo-data"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
export default function StaffPermissionsPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<ListFallback />}>
          <GenericDataTable data={permissionRoles} columns={[{
            header: "Role",
            accessorKey: "role",
          }, {
            header: "Scope",
            accessorKey: "scope",
          }]} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={true} enablePagination={true} pageSize={5} />
      </Suspense>
    </div>
  )
}
