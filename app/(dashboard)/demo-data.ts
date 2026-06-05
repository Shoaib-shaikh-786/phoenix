export type MarketDay = {
  id: string
  area: string
  day: string
  route: string
  dealers: number
  salesman: string
  cutoff: string
}

export type Visit = {
  id: string
  dealer: string
  salesman: string
  market: string
  scheduledAt: string
  status: "Planned" | "Checked in" | "Completed"
  orderValue: number
}

export type Salesman = {
  id: string
  name: string
  territory: string
  phone: string
  activeDealers: number
  target: number
  achieved: number
  status: "Active" | "On leave"
}

export type Bill = {
  id: string
  dealer: string
  orderId: string
  date: string
  dueDate: string
  amount: number
  status: "Draft" | "Sent" | "Paid" | "Overdue"
}

export type StaffMember = {
  id: string
  name: string
  email: string
  role: string
  permissions: number
  lastActive: string
  status: "Active" | "Invited" | "Suspended"
}

export type PermissionRole = {
  id: string
  role: string
  scope: string
  permissions: string
  users: number
}

export const marketDays: MarketDay[] = [
  {
    id: "mkt-001",
    area: "Mumbai Central",
    day: "Monday",
    route: "West-01",
    dealers: 18,
    salesman: "Aarav Mehta",
    cutoff: "10:30 AM",
  },
  {
    id: "mkt-002",
    area: "Pune West",
    day: "Wednesday",
    route: "West-03",
    dealers: 14,
    salesman: "Neha Kapoor",
    cutoff: "11:00 AM",
  },
  {
    id: "mkt-003",
    area: "Ahmedabad East",
    day: "Friday",
    route: "GJ-02",
    dealers: 12,
    salesman: "Ravi Patel",
    cutoff: "09:45 AM",
  },
]

export const visits: Visit[] = [
  {
    id: "vst-101",
    dealer: "Metro Wholesale",
    salesman: "Aarav Mehta",
    market: "Mumbai Central",
    scheduledAt: "2026-05-30 09:30",
    status: "Checked in",
    orderValue: 42500,
  },
  {
    id: "vst-102",
    dealer: "Fresh Basket Retail",
    salesman: "Neha Kapoor",
    market: "Pune West",
    scheduledAt: "2026-05-30 11:15",
    status: "Planned",
    orderValue: 31315,
  },
  {
    id: "vst-103",
    dealer: "Daily Needs Store",
    salesman: "Ravi Patel",
    market: "Ahmedabad East",
    scheduledAt: "2026-05-29 16:00",
    status: "Completed",
    orderValue: 27330,
  },
]

export const salesmen: Salesman[] = [
  {
    id: "sls-001",
    name: "Aarav Mehta",
    territory: "Mumbai Central",
    phone: "+91 98765 21001",
    activeDealers: 18,
    target: 600000,
    achieved: 442000,
    status: "Active",
  },
  {
    id: "sls-002",
    name: "Neha Kapoor",
    territory: "Pune West",
    phone: "+91 98765 21002",
    activeDealers: 14,
    target: 450000,
    achieved: 308000,
    status: "Active",
  },
  {
    id: "sls-003",
    name: "Ravi Patel",
    territory: "Ahmedabad East",
    phone: "+91 98765 21003",
    activeDealers: 12,
    target: 380000,
    achieved: 251000,
    status: "On leave",
  },
]

export const bills: Bill[] = [
  {
    id: "bil-9001",
    dealer: "Metro Wholesale",
    orderId: "ord-1001",
    date: "2026-05-21",
    dueDate: "2026-06-05",
    amount: 42500,
    status: "Sent",
  },
  {
    id: "bil-9002",
    dealer: "Fresh Basket Retail",
    orderId: "ord-1002",
    date: "2026-05-24",
    dueDate: "2026-06-08",
    amount: 31315,
    status: "Draft",
  },
  {
    id: "bil-8994",
    dealer: "Daily Needs Store",
    orderId: "ord-0982",
    date: "2026-04-28",
    dueDate: "2026-05-12",
    amount: 58200,
    status: "Overdue",
  },
]

export const staffMembers: StaffMember[] = [
  {
    id: "stf-001",
    name: "Himanshu Admin",
    email: "admin@example.com",
    role: "Wholesaler",
    permissions: 18,
    lastActive: "2026-05-30",
    status: "Active",
  },
  {
    id: "stf-002",
    name: "Warehouse Desk",
    email: "warehouse@example.com",
    role: "Warehouse",
    permissions: 3,
    lastActive: "2026-05-29",
    status: "Active",
  },
  {
    id: "stf-003",
    name: "Sales Team",
    email: "sales@example.com",
    role: "Salesman",
    permissions: 5,
    lastActive: "2026-05-27",
    status: "Invited",
  },
]

export const permissionRoles: PermissionRole[] = [
  {
    id: "role-wholesaler",
    role: "Wholesaler",
    scope: "Full back office",
    permissions: "18 permissions",
    users: 2,
  },
  {
    id: "role-salesman",
    role: "Salesman",
    scope: "Orders and visits",
    permissions: "5 permissions",
    users: 6,
  },
  {
    id: "role-warehouse",
    role: "Warehouse",
    scope: "Dispatch queue",
    permissions: "3 permissions",
    users: 3,
  },
]

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}
