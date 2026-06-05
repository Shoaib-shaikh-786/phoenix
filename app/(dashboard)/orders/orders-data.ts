export type OrderStatus = "Draft" | "Confirmed" | "Packed" | "Delivered"

export type OrderItem = {
  id: string
  name: string
  sku: string
  quantity: number
  unitPrice: number
}

export type Order = {
  id: string
  customer: string
  location: string
  status: OrderStatus
  paymentStatus: "Pending" | "Paid" | "Overdue"
  createdAt: string
  updatedAt: string
  deliveryDate: string
  owner: {
    name: string
    email: string
  }
  items: OrderItem[]
}

export const orders: Order[] = [
  {
    id: "ord-1001",
    customer: "Metro Wholesale",
    location: "Mumbai Central",
    status: "Confirmed",
    paymentStatus: "Paid",
    createdAt: "2026-05-20T10:15:00.000Z",
    updatedAt: "2026-05-21T13:30:00.000Z",
    deliveryDate: "2026-05-31",
    owner: {
      name: "Eddie Lake",
      email: "eddie@example.com",
    },
    items: [
      {
        id: "itm-001",
        name: "Basmati Rice Premium",
        sku: "RICE-BAS-25",
        quantity: 12,
        unitPrice: 2180,
      },
      {
        id: "itm-003",
        name: "Refined Sugar",
        sku: "SUG-REF-50",
        quantity: 8,
        unitPrice: 2040,
      },
    ],
  },
  {
    id: "ord-1002",
    customer: "Fresh Basket Retail",
    location: "Pune West",
    status: "Packed",
    paymentStatus: "Pending",
    createdAt: "2026-05-22T08:40:00.000Z",
    updatedAt: "2026-05-24T16:05:00.000Z",
    deliveryDate: "2026-06-01",
    owner: {
      name: "Jamik Tashpulatov",
      email: "jamik@example.com",
    },
    items: [
      {
        id: "itm-002",
        name: "Sunflower Cooking Oil",
        sku: "OIL-SUN-15",
        quantity: 10,
        unitPrice: 1675,
      },
      {
        id: "itm-005",
        name: "Black Tea Dust",
        sku: "TEA-BLK-01",
        quantity: 24,
        unitPrice: 285,
      },
      {
        id: "itm-007",
        name: "Laundry Detergent Powder",
        sku: "DET-PWD-05",
        quantity: 15,
        unitPrice: 515,
      },
    ],
  },
  {
    id: "ord-1003",
    customer: "Daily Needs Store",
    location: "Ahmedabad East",
    status: "Draft",
    paymentStatus: "Overdue",
    createdAt: "2026-05-25T12:25:00.000Z",
    updatedAt: "2026-05-26T09:10:00.000Z",
    deliveryDate: "2026-06-03",
    owner: {
      name: "Eddie Lake",
      email: "eddie@example.com",
    },
    items: [
      {
        id: "itm-006",
        name: "Toor Dal",
        sku: "DAL-TOOR-30",
        quantity: 6,
        unitPrice: 3325,
      },
      {
        id: "itm-004",
        name: "Whole Wheat Flour",
        sku: "FLOUR-WW-10",
        quantity: 18,
        unitPrice: 410,
      },
    ],
  },
]

export function getOrderTotal(order: Order) {
  return order.items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0
  )
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(value))
}
