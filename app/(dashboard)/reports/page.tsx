import { Download, FileSpreadsheet, ShoppingCart } from "lucide-react"

import { ModuleGrid } from "../_components/module-grid"
import { PageHeader } from "../_components/page-header"

const modules = [
  {
    title: "Orders report",
    description: "Analyze order totals, status mix, delivery dates, and customers.",
    href: "/reports/orders",
    actionLabel: "Open report",
    icon: ShoppingCart,
  },
  {
    title: "Export",
    description: "Prepare spreadsheet-ready operational exports for accounting.",
    href: "/reports/export",
    actionLabel: "Prepare export",
    icon: Download,
  },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Operational reporting for orders, billing, and spreadsheet exports."
      />
      <ModuleGrid modules={modules} />
    </div>
  )
}
