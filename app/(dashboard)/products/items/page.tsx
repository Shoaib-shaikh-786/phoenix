"use client"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { productItems } from "./items-data"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAddProductModal, useAddToCartModal } from "@/components/products/ProductModal"
import { Plus } from "lucide-react"


export default function ItemsPage() {
  const { dialog: addtoCartDialog, openDialog : openAddToCartDialog} = useAddToCartModal();
  const {dialog: addProductDialog , openDialog: openAddProductDialog } = useAddProductModal()
  const columns = [
    {
      header: "Item",
      accessorKey: "name",
      cell: ({ row }: any) => <Badge variant="outline"><Link href={`/products/items/${row.original.id}`}>{row.original.name}</Link></Badge>,
    },
    {
      header: "SKU",
      accessorKey: "sku",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Pack Size",
      accessorKey: "packSize",
    },
    {
      header: "Stock",
      accessorKey: "stock",
    },
    {
      header: "Wholesale Price",
      accessorKey: "wholesalePrice",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Action",
      cell: ({ row }: any) => <Button variant="outline" onClick={() => openAddToCartDialog(row.original)}>Add to Cart</Button>,
    },
  ];
  return (
    <div className="space-y-4">
      <Suspense fallback={<ItemsListFallback />}>
        <div className="flex item-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Items</h1>
          <Button
          onClick={()=>openAddProductDialog()}
          >
            <Plus />
            Add Items
          </Button>
        </div>
        <GenericDataTable data={productItems} columns={columns} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={false} enablePagination={true} enableColumnVisibility={false} pageSize={10} />
      </Suspense>
      {addProductDialog}
      {addtoCartDialog}
    </div>
  )
}

function ItemsListFallback() {
  return (
    <div className="space-y-4 rounded-lg border p-6">
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  )
}
