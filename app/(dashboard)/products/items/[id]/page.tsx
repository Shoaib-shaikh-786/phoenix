import { notFound } from "next/navigation"
import { PackagePlus, Package, IndianRupee, Boxes } from "lucide-react"

import {
  DetailPageShell,
  DetailSection,
} from "@/components/detail-page"

import { getProductItem } from "@/types/product"

type ProductDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params

  const item = getProductItem(id)

  if (!item) {
    notFound()
  }

  return (
    <DetailPageShell
      title={item.name}
      subtitle={`${item.sku} · ${item.category}`}
      backHref="/products/items"
      backLabel="Products"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">

        <DetailSection
          title="Product Information"
          icon={<Package className="size-5 text-muted-foreground" />}
          className="lg:col-span-4"
          rows={[
            {
              columns: 4,
              fields: [
                {
                  label: "Product Name",
                  value: item.name,
                  strong: true,
                },
                {
                  label: "SKU",
                  value: item.sku,
                },
                {
                  label: "Category",
                  value: item.category,
                },
              ],
            },
          ]}
        />

        <DetailSection
          title="Inventory"
          icon={<Boxes className="size-5 text-muted-foreground" />}
          className="lg:col-span-2"
          rows={[
            {
              columns: 2,
              fields: [
                {
                  label: "Pack Size",
                  value: item.quantity,
                },
                {
                  label: "Units",
                  value: item.unit
                }
              ],
            },
          ]}
        />

        <DetailSection
          title="Pricing"
          icon={<IndianRupee className="size-5 text-muted-foreground" />}
          className="lg:col-span-3"
          rows={[
            {
              columns: 2,
              fields: [
                {
                  label: "Wholesale Price",
                  value: `₹${item.price}`,
                  strong: true,
                },
                {
                  label: "Stock Available",
                  value: item.quantity
                },
              ],
            },
          ]}
        />

        <DetailSection
          title="Description"
          className="lg:col-span-3"
          rows={[
            {
              columns: 1,
              fields: [
                {
                  label: "Description",
                  value:
                    "This product is a catalog item available for wholesale ordering. Use the Add to Order button to include it in a new order batch.",
                },
              ],
            },
          ]}
        />
      </div>
    </DetailPageShell>
  )
}