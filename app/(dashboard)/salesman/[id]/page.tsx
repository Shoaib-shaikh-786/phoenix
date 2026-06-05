"use client"
import { notFound } from "next/navigation"
import { CalendarDays, MapPin, BarChart3 } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DetailPageShell,
  DetailSection,
} from "@/components/detail-page"

import { formatCurrency, salesmen, visits } from "../../demo-data"

type SalesmanDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function SalesmanDetailPage({
  params,
}: SalesmanDetailPageProps) {
  const { id } = await params
  const salesman = salesmen.find((item) => item.id === id)

  if (!salesman) {
    notFound()
  }

  const performance = Math.round((salesman.achieved / salesman.target) * 100)
  const assignedVisits = visits.filter(
    (visit) => visit.salesman === salesman.name,
  )

  return (
    <DetailPageShell
      title={salesman.name}
      subtitle={salesman.territory}
      status={salesman.status}
      backHref="/salesman"
      backLabel="Salesman"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
        
        {/* Basic Information — Full Width */}
        <DetailSection
          title="Basic Information"
          icon={<MapPin className="size-5 text-muted-foreground" />}
          className="lg:col-span-6"
          rows={[
            {
              columns: 4,
              fields: [
                { label: "Territory",      value: salesman.territory },
                { label: "Phone",          value: salesman.phone },
                { label: "Active Dealers", value: String(salesman.activeDealers) },
                { label: "Status",         value: salesman.status, strong: true },
              ],
            },
          ]}
        />

        {/* Performance — Full Width */}
        <DetailSection
          title="Performance"
          icon={<BarChart3 className="size-5 text-muted-foreground" />}
          className="lg:col-span-6"
          rows={[
            {
              columns: 4,
              fields: [
                { label: "Target",    value: formatCurrency(salesman.target) },
                { label: "Achieved",  value: formatCurrency(salesman.achieved) },
                { label: "Progress",  value: `${performance}%`, strong: true },
                { 
                  label: "Remaining", 
                  value: formatCurrency(Math.max(0, salesman.target - salesman.achieved)) 
                },
              ],
            },
          ]}
        />

        {/* Scheduled Visits — 4 Columns */}
        <DetailSection
          title="Scheduled Visits"
          icon={<CalendarDays className="size-5 text-muted-foreground" />}
          className="lg:col-span-4"
          rows={[
            {
              columns: 1,
              fields: [
                {
                  label: "",
                  value: (
                    <div className="overflow-hidden rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Dealer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Order Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {assignedVisits.length > 0 ? (
                            assignedVisits.map((visit) => (
                              <TableRow key={visit.id}>
                                <TableCell>{visit.dealer}</TableCell>
                                <TableCell>{visit.status}</TableCell>
                                <TableCell className="text-right font-medium">
                                  {formatCurrency(visit.orderValue)}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                className="h-24 text-center text-muted-foreground"
                              >
                                No visits assigned.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  ),
                },
              ],
            },
          ]}
        />

        {/* Contact / Sidebar Info — 2 Columns */}
        <DetailSection 
          title="Quick Stats" 
          className="lg:col-span-2"
          rows={[
            {
              columns: 1,
              fields: [
                { label: "Primary Phone", value: salesman.phone },
                { label: "Home Base",     value: salesman.territory },
                { label: "Total Managed", value: `${salesman.activeDealers} Dealers`, strong: true },
              ],
            },
          ]}
        />
      </div>
    </DetailPageShell>
  )
}