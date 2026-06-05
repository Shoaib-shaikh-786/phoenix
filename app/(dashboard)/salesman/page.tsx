"use client"
import { CalendarCheck, MapPinned, UserCog } from "lucide-react"

import { MetricGrid } from "../_components/metric-grid"
import { ModuleGrid } from "../_components/module-grid"
import { PageHeader } from "../_components/page-header"
import { salesmen, visits } from "../demo-data"

const modules = [
  {
    title: "Today's market",
    description: "Follow the active market route and dealer visit sequence.",
    href: "/salesman/today",
    actionLabel: "Open route",
    icon: MapPinned,
  },
  {
    title: "Visit log",
    description: "Review field visits, statuses, and order value captured.",
    href: "/salesman/visits",
    actionLabel: "View visits",
    icon: CalendarCheck,
  },
  {
    title: "All salesmen",
    description: "Manage territories, targets, and team access.",
    href: "/salesman/manage",
    actionLabel: "Manage team",
    icon: UserCog,
  },
]

export default function SalesmanPage() {
  const activeSalesmen = salesmen.filter((salesman) => salesman.status === "Active")
  const completedVisits = visits.filter((visit) => visit.status === "Completed")

  return (
    <div className="space-y-6">
      <PageHeader
        title="Salesman"
        description="Coordinate field sales routes, dealer visits, and performance targets."
      />
      <MetricGrid
        metrics={[
          {
            label: "Active salesmen",
            value: String(activeSalesmen.length),
            helper: "Team members currently available",
            icon: UserCog,
          },
          {
            label: "Visits today",
            value: String(visits.length),
            helper: "Planned and completed dealer visits",
            icon: CalendarCheck,
          },
          {
            label: "Completed",
            value: String(completedVisits.length),
            helper: "Visits already closed in the log",
            icon: MapPinned,
          },
        ]}
      />
      <ModuleGrid modules={modules} />
    </div>
  )
}
