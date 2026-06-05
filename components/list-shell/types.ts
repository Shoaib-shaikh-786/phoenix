import * as React from "react"
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table"

export type ListQuery = {
  search: string
  page: number
  pageSize: number
}

export type ListResponse<TItem> = {
  items: TItem[]
  total: number
}

export type ListFetchFn<TItem> = (
  query: ListQuery,
  signal?: AbortSignal
) => Promise<ListResponse<TItem>>

export type ListShellConfig = {
  title: string
  description?: string
  searchPlaceholder?: string
  searchParamName?: string
  pageParamName?: string
  pageSize?: number
  emptyTitle?: string
  emptyDescription?: string
}

export type ListShellRenderers<TItem> = {
  renderItem: (item: TItem) => React.ReactNode
  getItemKey: (item: TItem) => React.Key
  renderHeader?: () => React.ReactNode
  renderActions?: () => React.ReactNode
}

export type ViewConfigRadioOption = {
  value: unknown
  label: string
}

export type ViewConfig = {
  columnId: string
  label: string
  options: ViewConfigRadioOption[]
}
