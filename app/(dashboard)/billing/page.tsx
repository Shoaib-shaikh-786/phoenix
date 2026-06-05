import { FilePlus2, History, IndianRupee } from "lucide-react"

import { MetricGrid } from "../_components/metric-grid"
import { ModuleGrid } from "../_components/module-grid"
import { PageHeader } from "../_components/page-header"
import { bills, formatCurrency } from "../demo-data"

const modules = [
  {
    title: "Generate bill",
    description: "Prepare invoices from confirmed orders and dealer account data.",
    href: "/billing/generate",
    actionLabel: "Generate",
    icon: FilePlus2,
  },
  {
    title: "History",
    description: "Search billed orders, due dates, payment status, and totals.",
    href: "/billing/history",
    actionLabel: "View history",
    icon: History,
  },
]

export default function BillingPage() {
  const total = bills.reduce((sum, bill) => sum + bill.amount, 0)
  const overdue = bills.filter((bill) => bill.status === "Overdue")

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Create bills, review payment status, and monitor receivables."
      />
      <MetricGrid
        metrics={[
          {
            label: "Bills",
            value: String(bills.length),
            helper: "Invoices available in billing history",
            icon: History,
          },
          {
            label: "Billed value",
            value: formatCurrency(total),
            helper: "Total value across current billing records",
            icon: IndianRupee,
          },
          {
            label: "Overdue",
            value: String(overdue.length),
            helper: "Bills requiring collection follow-up",
            icon: FilePlus2,
          },
        ]}
      />
      <ModuleGrid modules={modules} />
    </div>
  )
}
