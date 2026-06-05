"use client"
import { Suspense } from "react"

import { ListFallback } from "../../_components/list-fallback"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { orders } from "../../orders/orders-data";

const exports = [ {
  id: "exp-orders",
  name: "Orders export",
  format: "XLSX",
  owner: "Operations",
  rows: orders.length,
  updated: "2026-05-30",
},
];

export default function ExportPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<ListFallback />}>
        <GenericDataTable data={exports} columns={[{
          header: "Export",
          accessorKey: "name",
        }, {
          header: "Format",
          accessorKey: "format",
        }]} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={true} enablePagination={true} pageSize={5} />
      </Suspense>
    </div>
  )
}
