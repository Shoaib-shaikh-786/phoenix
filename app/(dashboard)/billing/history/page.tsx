"use client"
import { Suspense } from "react"

import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { bills } from "../../demo-data"
import { ListFallback } from "../../_components/list-fallback"

export default function BillingHistoryPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<ListFallback />}>
        <GenericDataTable data={bills} columns={[{
          header: "Bill",
          accessorKey: "id",
        }, {
          header: "Dealer",
          accessorKey: "dealer",
        }]} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={true} enablePagination={true} pageSize={5} />
      </Suspense>
    </div>
  )
}
