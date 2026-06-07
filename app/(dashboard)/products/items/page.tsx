"use client"
import { Suspense, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import type { Product } from '@/api/product/types'
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useProductModal, useAddToCartModal, useAddCategoriesModal } from "@/components/products/ProductModal"
import { Plus } from "lucide-react"
import { PERMISSIONS } from "@/lib/permission"
import { listProducts } from '@/api/product/index'


export default function ItemsPage() {
  const { dialog: addtoCartDialog, openDialog: openAddToCartDialog } = useAddToCartModal();
  const { dialog: addCategoryDialog, openDialog: openAddCategoryDialog } = useAddCategoriesModal();
  const { dialog: addProductDialog, openDialog: openProductDialog } = useProductModal({ openAddCategoryDialog });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    listProducts()
      .then((res: any) => {
        if (!mounted) return;
        setProducts(res?.data ?? []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);
  console.log('products : ', products)
  console.log('error : ', error)
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
      header: "Quanity",
      accessorKey: "quantity",
    },
    {
      header: "Unit",
      accessorKey: "unit"
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Action",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => openAddToCartDialog(row.original)}>Add to Cart</Button>
          <Button variant="outline" onClick={() => openProductDialog(row.original)} permission={PERMISSIONS.PRODUCTS.ITEMS.UPDATE}>Update Item</Button>
        </div>
      ),
    },
  ];
  return (
    <div className="space-y-4">
      <Suspense fallback={<ItemsListFallback />}>
        <div className="flex item-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Items</h1>
          <Button
            onClick={() => openProductDialog()}
            permission={PERMISSIONS.PRODUCTS.ITEMS.CREATE}
          >
            <Plus />
            Add Items
          </Button>
        </div>
        <GenericDataTable data={products} columns={columns} getRowId={(row) => row.id} enableDragAndDrop={false} enableSelection={false} enablePagination={true} enableColumnVisibility={false} pageSize={10} />
      </Suspense>
      {addProductDialog}
      {addCategoryDialog}
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
