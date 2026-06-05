"use client"
import { notFound } from "next/navigation"
import { CalendarDays, ReceiptText, ShoppingCart, UserRound } from "lucide-react"

import {
    DetailPageShell,
    DetailSection,
} from "@/components/detail-page"

import {
    dealers,
    formatCurrency,
    formatDate,
    getDealerOrderTotal,
} from "../dealers-data"
import { GenericDataTable } from "@/components/list-shell/data-list-wrapper"

type DealerDetailPageProps = {
    params: Promise<{ id: string }>
}

export default async function DealerDetailPage({ params }: DealerDetailPageProps) {
    const { id } = await params
    const dealer = dealers.find((item) => item.id === id)

    if (!dealer) notFound()

    const orderTotal = getDealerOrderTotal(dealer)
    const availableCredit = dealer.creditLimit - dealer.outstanding

    // Define columns outside the JSX
    const orderColumns = [
        {
            header: "Order ID",
            accessorKey: "header",
        },
        {
            header: "Status",
            accessorKey: "status",
        },
        {
            header: "Total Amount",
            accessorKey: "target",
        },
        {
            header: "Created At",
            accessorKey: "reviewer",
        },
    ]

    // Map orders to the required format
    const mappedOrders = dealer.orders.map((order) => ({
        id: order.id,
        header: order.id,
        type: order.status,
        status: order.status,
        target: order.total.toString(),
        limit: order.deliveryDate,
        reviewer: order.createdAt,
    }))

    return (
        <DetailPageShell
            title={dealer.name}
            subtitle={`${dealer.code} · ${dealer.city}, ${dealer.state}`}
            status={dealer.status}
            backHref="/dealers"
            backLabel="Dealers"
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">

                {/* Basic Information — full width */}
                <DetailSection
                    title="Basic Information"
                    icon={<ReceiptText className="size-5 text-muted-foreground" />}
                    className="lg:col-span-6"
                    rows={[
                        {
                            columns: 4,
                            fields: [
                                { label: "Dealer Code", value: dealer.code },
                                { label: "Region", value: dealer.region },
                                { label: "Location", value: `${dealer.city}, ${dealer.state}` },
                                { label: "Order Value", value: formatCurrency(orderTotal), strong: true },
                            ],
                        },
                    ]}
                />

                {/* Timeline — full width */}
                <DetailSection
                    title="Timeline"
                    icon={<CalendarDays className="size-5 text-muted-foreground" />}
                    className="lg:col-span-6"
                    rows={[
                        {
                            columns: 3,
                            fields: [
                                { label: "Created", value: formatDate(dealer.createdAt) },
                                { label: "Last updated", value: formatDate(dealer.updatedAt) },
                                { label: "Orders", value: `${dealer.orders.length} total` },
                            ],
                        },
                    ]}
                />

                {/* Dealer Orders table — 4 cols */}
                <DetailSection
                    title="Dealer Orders"
                    icon={<ShoppingCart className="size-5 text-muted-foreground" />}
                    className="lg:col-span-4"
                    rows={[
                        {
                            columns: 1,
                            fields: [
                                {
                                    label: "",
                                    value: (
                                        <GenericDataTable
                                            data={mappedOrders}
                                            columns={orderColumns}
                                            getRowId={(row) => row.id}
                                            enableDragAndDrop={false}
                                            enableSelection={true}
                                            enablePagination={true}
                                            pageSize={5}
                                        />
                                    ),
                                },
                            ],
                        },
                    ]}
                />

                {/* Right sidebar — 2 cols */}
                <div className="space-y-6 lg:col-span-2">

                    <DetailSection
                        title="Contact"
                        icon={<UserRound className="size-5 text-muted-foreground" />}
                        rows={[
                            {
                                columns: 1,
                                fields: [
                                    { label: "Name", value: dealer.contactName, strong: true },
                                    { label: "Phone", value: dealer.phone },
                                    { label: "Email", value: dealer.email },
                                ],
                            },
                        ]}
                    />

                    <DetailSection
                        title="Credit"
                        rows={[
                            {
                                columns: 1,
                                fields: [
                                    { label: "Credit Limit", value: formatCurrency(dealer.creditLimit) },
                                    { label: "Outstanding", value: formatCurrency(dealer.outstanding) },
                                    { label: "Available", value: formatCurrency(availableCredit), strong: true },
                                ],
                            },
                        ]}
                    />

                    <DetailSection
                        title="Created By"
                        rows={[
                            {
                                columns: 1,
                                fields: [
                                    { label: "Name", value: dealer.owner.name, strong: true },
                                    { label: "Email", value: dealer.owner.email },
                                ],
                            },
                        ]}
                    />

                </div>
            </div>
        </DetailPageShell>
    )
}