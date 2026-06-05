export type DealerStatus = "Active" | "On Hold" | "Inactive"

export type DealerOrder = {
  id: string
  status: "Draft" | "Confirmed" | "Packed" | "Delivered"
  createdAt: string
  deliveryDate: string
  total: number
}

export type Dealer = {
  id: string
  name: string
  code: string
  status: DealerStatus
  region: string
  city: string
  state: string
  contactName: string
  phone: string
  email: string
  creditLimit: number
  outstanding: number
  createdAt: string
  updatedAt: string
  owner: {
    name: string
    email: string
  }
  orders: DealerOrder[]
}

export const dealers: Dealer[] = [
  {
    id: "dlr-001",
    name: "Metro Wholesale",
    code: "MW-MUM-01",
    status: "Active",
    region: "West",
    city: "Mumbai",
    state: "Maharashtra",
    contactName: "Rohan Shah",
    phone: "+91 98765 10001",
    email: "orders@metrowholesale.example",
    creditLimit: 450000,
    outstanding: 125000,
    createdAt: "2026-01-12T09:30:00.000Z",
    updatedAt: "2026-05-21T13:30:00.000Z",
    owner: {
      name: "Eddie Lake",
      email: "eddie@example.com",
    },
    orders: [
      {
        id: "ord-1001",
        status: "Confirmed",
        createdAt: "2026-05-20T10:15:00.000Z",
        deliveryDate: "2026-05-31",
        total: 42500,
      },
      {
        id: "ord-0992",
        status: "Delivered",
        createdAt: "2026-05-02T08:20:00.000Z",
        deliveryDate: "2026-05-08",
        total: 68400,
      },
    ],
  },
  {
    id: "dlr-002",
    name: "Fresh Basket Retail",
    code: "FBR-PUN-02",
    status: "Active",
    region: "West",
    city: "Pune",
    state: "Maharashtra",
    contactName: "Ananya Mehta",
    phone: "+91 98765 10002",
    email: "purchase@freshbasket.example",
    creditLimit: 300000,
    outstanding: 86000,
    createdAt: "2026-02-04T11:10:00.000Z",
    updatedAt: "2026-05-24T16:05:00.000Z",
    owner: {
      name: "Jamik Tashpulatov",
      email: "jamik@example.com",
    },
    orders: [
      {
        id: "ord-1002",
        status: "Packed",
        createdAt: "2026-05-22T08:40:00.000Z",
        deliveryDate: "2026-06-01",
        total: 31315,
      },
      {
        id: "ord-0988",
        status: "Delivered",
        createdAt: "2026-04-25T14:00:00.000Z",
        deliveryDate: "2026-05-01",
        total: 54800,
      },
    ],
  },
  {
    id: "dlr-003",
    name: "Daily Needs Store",
    code: "DNS-AHD-03",
    status: "On Hold",
    region: "West",
    city: "Ahmedabad",
    state: "Gujarat",
    contactName: "Kunal Patel",
    phone: "+91 98765 10003",
    email: "billing@dailyneeds.example",
    creditLimit: 200000,
    outstanding: 192000,
    createdAt: "2026-03-18T12:45:00.000Z",
    updatedAt: "2026-05-26T09:10:00.000Z",
    owner: {
      name: "Eddie Lake",
      email: "eddie@example.com",
    },
    orders: [
      {
        id: "ord-1003",
        status: "Draft",
        createdAt: "2026-05-25T12:25:00.000Z",
        deliveryDate: "2026-06-03",
        total: 27330,
      },
    ],
  },
  {
    id: "dlr-004",
    name: "Northline Distributors",
    code: "NLD-DEL-04",
    status: "Inactive",
    region: "North",
    city: "Delhi",
    state: "Delhi",
    contactName: "Priya Arora",
    phone: "+91 98765 10004",
    email: "ops@northline.example",
    creditLimit: 350000,
    outstanding: 0,
    createdAt: "2025-12-02T10:00:00.000Z",
    updatedAt: "2026-04-18T15:35:00.000Z",
    owner: {
      name: "Jamik Tashpulatov",
      email: "jamik@example.com",
    },
    orders: [],
  },
]

export function getDealerOrderTotal(dealer: Dealer) {
  return dealer.orders.reduce((total, order) => total + order.total, 0)
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
