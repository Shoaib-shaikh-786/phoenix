// components/generic-data-table.tsx
"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  GripVerticalIcon,
  Columns3Icon,
  ChevronDownIcon,
  PlusIcon,
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
  X,
  MenuIcon,
} from "lucide-react"
import type { ViewConfig, ViewConfigRadioOption } from "@/components/list-shell/types"

export type RowAction<TData> = {
  label: string
  onClick: (row: TData) => void
  variant?: "default" | "destructive"
  disabled?: boolean
  separator?: boolean
}

export interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  getRowId: (row: TData) => string | number
  enableDragAndDrop?: boolean
  enableSelection?: boolean
  enableColumnVisibility?: boolean
  enablePagination?: boolean
  columnFilters?: ColumnFiltersState
  onColumnFiltersChange?: (columnFilters: ColumnFiltersState) => void
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  pageSize?: number
  onDataChange?: (data: TData[]) => void
  onRowClick?: (row: TData) => void
  renderExpandedRow?: (row: TData) => React.ReactNode
  toolbarActions?: React.ReactNode
  /** Per-row action menu items rendered in a hamburger dropdown on each row */
  rowActions?: (row: TData) => RowAction<TData>[]
  viewConfig?: ViewConfig[]
  tabsConfig?: {
    tabs: Array<{
      value: string
      label: string
      badge?: number
      content: React.ReactNode
    }>
    defaultTab?: string
  }
}

function DragHandle<TData>({ id }: { id: string | number }) {
  const { attributes, listeners } = useSortable({ id })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

function RowActionsMenu<TData>({
  row,
  actions,
}: {
  row: TData
  actions: RowAction<TData>[]
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 text-muted-foreground"
          onClick={(e) => e.stopPropagation()}
        >
          <MenuIcon className="h-4 w-4" />
          <span className="sr-only">Row actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {actions.map((action, index) => (
          <React.Fragment key={index}>
            {action.separator && index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem
              disabled={action.disabled}
              className={
                action.variant === "destructive"
                  ? "text-destructive focus:text-destructive"
                  : undefined
              }
              onClick={(e) => {
                e.stopPropagation()
                action.onClick(row)
              }}
            >
              {action.label}
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DraggableRow<TData>({
  row,
  rowActions,
}: {
  row: Row<TData>
  rowActions?: (row: TData) => RowAction<TData>[]
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  })

  const actions = rowActions ? rowActions(row.original) : []

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 cursor-pointer"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
      {actions.length > 0 && (
        <TableCell className="w-8 p-1">
          <RowActionsMenu row={row.original} actions={actions} />
        </TableCell>
      )}
    </TableRow>
  )
}

export function GenericDataTable<TData>({
  data: initialData,
  columns,
  getRowId,
  enableDragAndDrop = false,
  enableSelection = false,
  enableColumnVisibility = false,
  columnFilters: controlledColumnFilters,
  sorting: controlledSorting,
  onColumnFiltersChange,
  onSortingChange,
  enablePagination = true,
  pageSize = 10,
  onDataChange,
  onRowClick,
  renderExpandedRow,
  toolbarActions,
  rowActions,
  viewConfig,
  tabsConfig,
}: DataTableProps<TData>) {
  const [data, setData] = React.useState(() => initialData)
  // Keep internal data in sync when `initialData` prop changes.
  React.useEffect(() => {
    setData(initialData)
  }, [initialData])

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const [internalColumnFilters, setInternalColumnFilters] = React.useState<ColumnFiltersState>([])
  const columnFiltersState = controlledColumnFilters ?? internalColumnFilters

  const handleColumnFiltersChange = (
    updater:
      | ColumnFiltersState
      | ((old: ColumnFiltersState) => ColumnFiltersState)
  ) => {
    const nextValue =
      typeof updater === "function"
        ? updater(columnFiltersState)
        : updater

    setInternalColumnFilters(nextValue)
    onColumnFiltersChange?.(nextValue)
  }

  const [internalSorting, setInternalSorting] = React.useState<SortingState>([])
  const sortingState = controlledSorting ?? internalSorting

  const handleSortingChange = (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => {
    const nextValue =
      typeof updater === "function"
        ? updater(sortingState)
        : updater

    setInternalSorting(nextValue)
    onSortingChange?.(nextValue)
  }

  // Initialize radio group selections from the provided viewConfig prop
  const [radioSelections, setRadioSelections] = React.useState<Record<string, unknown>>(() => {
    const initialSelections: Record<string, unknown> = {}
    viewConfig?.forEach((group) => {
      initialSelections[group.columnId] = group.options[0]?.value
    })
    return initialSelections
  })

  const handleRadioChange = React.useCallback((columnId: string, value: unknown) => {
    setRadioSelections((prev) => ({ ...prev, [columnId]: value }))

    // Update filter for this column
    handleColumnFiltersChange((prev) => {
      const others = (prev ?? []).filter((f) => f.id !== columnId)
      // If value is 'all', don't add a filter (show all)
      if (value === "all") {
        return others
      }
      return [...others, { id: columnId, value }]
    })
  }, [])

  const [searchQuery, setSearchQuery] = React.useState("")
  const [committedSearchQueries, setCommittedSearchQueries] = React.useState<string[]>([])

  const effectiveSearchQuery = React.useMemo(() => {
    const terms = [...committedSearchQueries, searchQuery].filter(Boolean)
    return terms.join(" ")
  }, [committedSearchQueries, searchQuery])

  const handleCommitSearch = () => {
    const trimmed = searchQuery.trim()
    if (!trimmed) return
    setCommittedSearchQueries((prev) =>
      prev.includes(trimmed) ? prev : [...prev, trimmed]
    )
    setSearchQuery("")
  }

  const handleRemoveSearchChip = (value: string) => {
    setCommittedSearchQueries((prev) => prev.filter((item) => item !== value))
  }

  const globalFilterFn = React.useCallback(
    (row: Row<TData>, columnId: string, filterValue: string) => {
      const searchText = String(filterValue ?? "").toLowerCase()
      const tokens = searchText.split(/\s+/).filter(Boolean)
      if (!tokens.length) return true

      const rowText = row
        .getVisibleCells()
        .map((cell) => {
          const value = cell.getValue()
          return value === null || value === undefined ? "" : String(value).toLowerCase()
        })
        .join(" ")

      return tokens.every((token) => rowText.includes(token))
    },
    []
  )

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  // Add selection and drag columns if enabled
  const tableColumns = React.useMemo(() => {
    const prefixCols: ColumnDef<TData>[] = []

    if (enableSelection) {
      prefixCols.push({
        id: "select",
        header: ({ table }: any) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }: any) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      })
    }

    if (enableDragAndDrop) {
      prefixCols.push({
        id: "drag",
        header: () => null,
        cell: ({ row }: any) => <DragHandle id={row.id} />,
        enableSorting: false,
        enableHiding: false,
      })
    }

    return [...prefixCols, ...columns]
  }, [columns, enableSelection, enableDragAndDrop])

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map((item) => getRowId(item)) || [],
    [data, getRowId]
  )

  const table = useReactTable({
    data,
    columns: tableColumns as ColumnDef<TData>[],
    state: {
      sorting: sortingState,
      columnVisibility,
      rowSelection,
      columnFilters: columnFiltersState,
      pagination,
      globalFilter: effectiveSearchQuery,
    },
    globalFilterFn,
    getRowId: (row) => String(getRowId(row)),
    enableRowSelection: enableSelection,
    onRowSelectionChange: setRowSelection,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    if (!enableDragAndDrop) return

    const { active, over } = event
    if (active && over && active.id !== over.id) {
      const newData = arrayMove(
        data,
        dataIds.indexOf(active.id),
        dataIds.indexOf(over.id)
      )
      setData(newData)
      onDataChange?.(newData)
    }
  }

  const formatFilterValue = React.useCallback((value: unknown) => {
    if (Array.isArray(value)) {
      return value.join(", ")
    }
    return value === null || value === undefined ? "" : String(value)
  }, [])

  const ViewSection = () => {
    if (!viewConfig || viewConfig.length === 0) return null

    return (
      <div className="space-y-4 px-4 lg:px-6">
        {viewConfig.map((group) => (
          <div key={group.columnId} className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {group.label}
            </h4>
            <div className="flex flex-wrap gap-3">
              {group.options.map((option: ViewConfigRadioOption) => {
                const isSelected = radioSelections[group.columnId] === option.value
                return (
                  <label
                    key={String(option.value)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`radio-${group.columnId}`}
                      value={String(option.value)}
                      checked={isSelected}
                      onChange={() => handleRadioChange(group.columnId, option.value)}
                      className="h-4 w-4 cursor-pointer"
                    />
                    <span className="text-sm text-foreground">{option.label}</span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Derive whether any row has actions so we can add a matching empty header cell
  const hasRowActions = !!rowActions

  const TableContent = () => (
    <div className="overflow-hidden rounded-lg border">
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        id={sortableId}
      >
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center justify-between">
                        <span className="pr-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                              <ChevronDownIcon />
                              <span className="sr-only">Column actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            {header.column.getCanSort() && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleSortingChange([
                                      { id: header.column.id, desc: false },
                                    ])
                                  }
                                >
                                  Sort ascending
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleSortingChange([
                                      { id: header.column.id, desc: true },
                                    ])
                                  }
                                >
                                  Sort descending
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleSortingChange([])}
                                >
                                  Clear sort
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </TableHead>
                ))}
                {/* Empty header cell to align with the per-row actions column */}
                {hasRowActions && <TableHead className="w-8" >Actions</TableHead>}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {table.getRowModel().rows?.length ? (
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <DraggableRow row={row} rowActions={rowActions} />
                    {renderExpandedRow && row.getIsExpanded() && (
                      <TableRow>
                        <TableCell
                          colSpan={
                            row.getVisibleCells().length + (hasRowActions ? 1 : 0)
                          }
                        >
                          {renderExpandedRow(row.original)}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </SortableContext>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length + (hasRowActions ? 1 : 0)}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DndContext>
    </div>
  )

  const TableControls = () => (
    <div className="flex items-center justify-between px-4 lg:px-6">
      <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
        {enableSelection && (
          <>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </>
        )}
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        {enablePagination && (
          <>
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectGroup>
                    {[10, 20, 30, 40, 50].map((size) => (
                      <SelectItem key={size} value={`${size}`}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )

  if (tabsConfig) {
    return (
      <Tabs
        defaultValue={tabsConfig.defaultTab || tabsConfig.tabs[0]?.value}
        className="w-full flex-col justify-start gap-6"
      >
        <div className="flex items-center justify-between px-4 lg:px-6">
          <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
            {tabsConfig.tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
                {tab.badge !== undefined && (
                  <Badge variant="secondary" className="ml-2">
                    {tab.badge}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center gap-2">
            {enableColumnVisibility && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Columns3Icon data-icon="inline-start" />
                    Columns
                    <ChevronDownIcon data-icon="inline-end" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  {table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        typeof column.accessorFn !== "undefined" &&
                        column.getCanHide()
                    )
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {toolbarActions}
          </div>
        </div>
        {tabsConfig.tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    )
  }

  const activeFilters = table.getState().columnFilters
  const activeSorting = table.getState().sorting

  return (
    <div className="w-full flex-col justify-start gap-6">
      {viewConfig && viewConfig.length > 0 && <ViewSection />}

      <div className="flex flex-col gap-3 px-4 lg:px-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search..."
            className="min-w-0"
          />
          <Button onClick={handleCommitSearch}>Search</Button>
        </div>
        <div className="flex items-center gap-2">
          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Columns3Icon data-icon="inline-start" />
                  Columns
                  <ChevronDownIcon data-icon="inline-end" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {toolbarActions}
        </div>
      </div>

      {(activeSorting.length > 0 ||
        activeFilters.length > 0 ||
        committedSearchQueries.length > 0) && (
          <div className="px-4 lg:px-6">
            <div className="flex flex-wrap gap-2">
              {activeSorting.map((sort) => {
                const column = table.getColumn(sort.id)
                const header = column?.columnDef.header
                const label = typeof header === "string" ? header : sort.id
                return (
                  <div
                    key={`sort-${sort.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
                  >
                    <span>
                      {label} {sort.desc ? "↓" : "↑"}
                    </span>
                    <button
                      type="button"
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      onClick={() =>
                        handleSortingChange((prev) =>
                          (prev ?? []).filter((item) => item.id !== sort.id)
                        )
                      }
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove sort</span>
                    </button>
                  </div>
                )
              })}
              {activeFilters.map((filter) => {
                const column = table.getColumn(filter.id)
                const header = column?.columnDef.header
                const label = typeof header === "string" ? header : filter.id
                return (
                  <div
                    key={`filter-${filter.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
                  >
                    <span>
                      {label}: {formatFilterValue(filter.value)}
                    </span>
                    <button
                      type="button"
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      onClick={() =>
                        handleColumnFiltersChange((prev) =>
                          (prev ?? []).filter((item) => item.id !== filter.id)
                        )
                      }
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove filter</span>
                    </button>
                  </div>
                )
              })}
              {committedSearchQueries.map((query) => (
                <div
                  key={`search-${query}`}
                  className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
                >
                  <span>Search: {query}</span>
                  <button
                    type="button"
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    onClick={() => handleRemoveSearchChip(query)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove search</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <TableContent />
        <TableControls />
      </div>
    </div>
  )
}