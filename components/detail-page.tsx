import Link from "next/link"
import { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// DetailPageShell
// ---------------------------------------------------------------------------

export interface DetailPageShellProps {
  title: string
  subtitle?: string
  status?: string
  backHref: string
  backLabel?: string
  actions?: ReactNode
  children: ReactNode
}

export function DetailPageShell({
  title,
  subtitle,
  status,
  backHref,
  backLabel = "Back",
  actions,
  children,
}: DetailPageShellProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              {title}
            </h1>

            {status && (
              <Badge variant="outline">
                {status}
              </Badge>
            )}
          </div>

          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {actions}

          <Button asChild variant="outline">
            <Link href={backHref}>
              <ArrowLeft className="size-4" />
              {backLabel}
            </Link>
          </Button>
        </div>
      </div>

      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// DetailSection — rows / fields API
// ---------------------------------------------------------------------------

export type FieldSpan = 1 | 2 | 3 | 4

export interface DetailFieldDef {
  label: string
  value: ReactNode
  span?: FieldSpan  // columns this field occupies (default: 1)
  strong?: boolean  // larger, bolder value text
}

export interface DetailRow {
  columns?: FieldSpan  // total columns in this row (default: field count, max 4)
  fields: DetailFieldDef[]
}

export interface DetailSectionProps {
  title: string
  icon?: ReactNode
  rows: DetailRow[]
  className?: string
}

const gridCols: Record<FieldSpan, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
}

const spanClass: Record<FieldSpan, string> = {
  1: "col-span-1",
  2: "col-span-1 md:col-span-2",
  3: "col-span-1 xl:col-span-3",
  4: "col-span-1 xl:col-span-4",
}


export function DetailSection({
  title,
  icon,
  rows,
  className,
}: DetailSectionProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base font-semibold">
            {title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {rows.map((row, rowIndex) => {
          const cols = (row.columns ??
            Math.min(row.fields.length, 4)) as FieldSpan

          return (
            <div key={rowIndex}>
              {rowIndex > 0 && (
                <div className="mb-6 border-t pt-6" />
              )}

              <div className={cn("grid gap-6", gridCols[cols])}>
                {row.fields.map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className={cn(
                      "space-y-1 min-w-0",
                      field.span
                        ? spanClass[field.span]
                        : spanClass[1]
                    )}
                  >
                    {field.label && (
                      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {field.label}
                      </div>
                    )}

                    <div
                      className={cn(
                        "break-words text-sm text-foreground",
                        field.strong &&
                          "text-base font-semibold"
                      )}
                    >
                      {field.value ?? "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}