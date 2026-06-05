"use client"
import { Suspense } from "react"

import { ListFallback } from "../../_components/list-fallback"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { visits } from "../../demo-data"

export default function VisitLogPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<ListFallback />}>
        <GenericDataTable data={visits} columns={[{
          header: "Dealer",
          accessorKey: "dealer",
        }, {
          header: "Salesman",
          accessorKey: "salesman",
        }]} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={true} enablePagination={true} pageSize={5} />
      </Suspense>
    </div>
  )
}
