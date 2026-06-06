"use client"

import { productItems } from "@/types/product"
import { Button } from "@/components/ui/button"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"
import { DetailPageShell, DetailSection } from "@/components/detail-page"
const columns = [
    {
        header: "Product",
        accessorKey: "name",
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
        accessorKey: "size",
    },
    {
        header: "Quantity",
        accessorKey: "quantity",
    },
    {
        header: "Price",
        accessorKey: "price",
    },
]

export default function CartPage() {
    const itemCount = productItems.length
    return (
        <DetailPageShell title="Cart" backHref="/cart">
            <DetailSection title="Cart" rows={[
                {
                    columns: 1,
                    fields: [
                        { label: "Cart Items", value: <GenericDataTable data={productItems} columns={columns} getRowId={(item) => item.id} enableDragAndDrop={false} enableSelection={false} enablePagination={false} enableColumnVisibility={false} pageSize={10} /> },
                    ],
                },
                {
                    columns: 1,
                    fields: [
                        {
                            label: "", value: <div>Order Summary <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Total Items</span>
                                <span>{itemCount}</span>
                            </div></div>
                        },
                    ],
                },
                {
                    columns: 1,
                    fields: [
                        {
                            label: "", value: <Button variant="default" className="w-full" onClick={() => {
                                console.log("Place Order")
                            }}>Place Order</Button>
                        },
                    ],
                }
            ]}>
            </DetailSection>
        </DetailPageShell>
    );
}
