"use client"
import { Suspense } from "react"

import { ListFallback } from "../../_components/list-fallback"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { visits } from "../../demo-data"

export default function TodayMarketPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<ListFallback />}>
        <GenericDataTable data={visits.filter((visit) => visit.scheduledAt.startsWith("2026-05-30"))} columns={[{
          header: "Dealer",
          accessorKey: "dealer",
        }, {
          header: "Salesman",
          accessorKey: "salesman",
        }, {
          header: "Scheduled",
          accessorKey: "scheduledAt",
        }, {
          header: "Status",
          accessorKey: "status",
        }]} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={true} enablePagination={true} pageSize={5} />
      </Suspense>
    </div>
  )
}
