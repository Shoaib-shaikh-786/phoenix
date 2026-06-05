import { notFound } from "next/navigation"
import { CalendarDays, Clock4, MapPin, Users } from "lucide-react"

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
import {
  formatCurrency,
  marketDays,
  salesmen,
  visits,
  Salesman,
  Visit,
} from "../../../demo-data"

type MarketDayDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function MarketDayDetailPage({
  params,
}: MarketDayDetailPageProps) {
  const { id } = await params
  const market = marketDays.find((item) => item.id === id)

  if (!market) {
    notFound()
  }

  const marketVisits: Visit[] = visits.filter(
    (visit: Visit) => visit.market === market.area,
  )
  const salesman: Salesman | undefined = salesmen.find(
    (item: Salesman) => item.name === market.salesman,
  )
  const totalOrderValue = marketVisits.reduce(
    (sum: number, visit: Visit) => sum + visit.orderValue,
    0,
  )
  const progress = salesman
    ? `${Math.round((salesman.achieved / salesman.target) * 100)}%`
    : "—"

  return (
    <DetailPageShell
      title={market.route}
      subtitle={`${market.area} · ${market.day}`}
      backHref="/dealers/market-days"
      backLabel="Market days"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">

        {/* Route details — full width */}
        <DetailSection
          title="Route details"
          icon={<MapPin className="size-5 text-muted-foreground" />}
          className="lg:col-span-6"
          rows={[
            {
              columns: 4,
              fields: [
                { label: "Area",   value: market.area },
                { label: "Day",    value: market.day },
                { label: "Route",  value: market.route },
                { label: "Cutoff", value: market.cutoff },
              ],
            },
          ]}
        />

        {/* Salesman — left half */}
        <DetailSection
          title="Salesman"
          icon={<Users className="size-5 text-muted-foreground" />}
          className="lg:col-span-3"
          rows={[
            {
              columns: 1,
              fields: [
                { label: "Name",           value: market.salesman },
                { label: "Territory",      value: salesman?.territory ?? "—" },
                { label: "Phone",          value: salesman?.phone ?? "—" },
                { label: "Active dealers", value: salesman ? String(salesman.activeDealers) : "—" },
              ],
            },
          ]}
        />

        {/* Market summary — right half */}
        <DetailSection
          title="Market summary"
          icon={<Clock4 className="size-5 text-muted-foreground" />}
          className="lg:col-span-3"
          rows={[
            {
              columns: 1,
              fields: [
                { label: "Dealers",           value: String(market.dealers) },
                { label: "Visits",            value: String(marketVisits.length) },
                { label: "Order value",       value: formatCurrency(totalOrderValue) },
                { label: "Salesman progress", value: progress, strong: true },
              ],
            },
          ]}
        />

        {/* Scheduled visits table — 4 cols */}
        <DetailSection
          title="Scheduled visits"
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
                            <TableHead className="text-right">Order value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {marketVisits.length > 0 ? (
                            marketVisits.map((visit) => (
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
                                No visits scheduled for this market day.
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

        {/* Salesman note — 2 cols */}
        <DetailSection
          title="Salesman note"
          className="lg:col-span-2"
          rows={[
            {
              columns: 1,
              fields: [
                {
                  label: "Next review",
                  value: market.day === "Friday" ? "Weekly review" : "Daily check-in",
                },
                {
                  label: "Focus",
                  value: "Maintain route coverage and confirm cutoffs",
                },
              ],
            },
          ]}
        />

      </div>
    </DetailPageShell>
  )
}