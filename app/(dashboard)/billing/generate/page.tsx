"use client"
import { Suspense } from "react"
import { ListFallback } from "../../_components/list-fallback"
import { PageHeader } from "../../_components/page-header"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { bills } from "../../demo-data"

export default function GenerateBillPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Generate bill"
        description="Start from draft and recent bills while preparing the next invoice batch."
      />
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
