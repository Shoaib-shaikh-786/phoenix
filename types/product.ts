export type ProductItem = {
  id: string
  name: string
  sku: string
  category: string
  quantity: number
  unit: string
  price: number
  description: string
}

export const productItems: ProductItem[] = [
  {
    id: "itm-001",
    name: "Basmati Rice Premium",
    sku: "RICE-BAS-25",
    category: "Staples",
    quantity: 25,
    unit: "kg",
    price: 2180,
    description: "Okay",
  },
  {
    id: "itm-002",
    name: "Sunflower Cooking Oil",
    sku: "OIL-SUN-15",
    category: "Edible Oil",
    quantity: 15,
    unit: "L",
    price: 1675,
    description: "Okay",
  },
  {
    id: "itm-003",
    name: "Refined Sugar",
    sku: "SUG-REF-50",
    category: "Staples",
    quantity: 50,
    unit: "kg",
    price: 2040,
    description: "Okay",
  },
  {
    id: "itm-004",
    name: "Whole Wheat Flour",
    sku: "FLOUR-WW-10",
    category: "Flour",
    quantity: 10,
    unit: "kg",
    price: 410,
    description: "Okay",
  },
  {
    id: "itm-005",
    name: "Black Tea Dust",
    sku: "TEA-BLK-01",
    category: "Beverages",
    quantity: 1,
    unit: "kg",
    price: 285,
    description: "Okay",
  },
  {
    id: "itm-006",
    name: "Toor Dal",
    sku: "DAL-TOOR-30",
    category: "Pulses",
    quantity: 30,
    unit: "kg",
    price: 3325,
    description: "Okay",
  },
  {
    id: "itm-007",
    name: "Laundry Detergent Powder",
    sku: "DET-PWD-05",
    category: "Household",
    quantity: 5,
    unit: "kg",
    price: 515,
    description: "Okay",
  },
  {
    id: "itm-008",
    name: "Moong Dal",
    sku: "DAL-MNG-25",
    category: "Pulses",
    quantity: 25,
    unit: "kg",
    price: 2875,
    description: "Okay",
  },
  {
    id: "itm-009",
    name: "Chana Dal",
    sku: "DAL-CHN-30",
    category: "Pulses",
    quantity: 30,
    unit: "kg",
    price: 2690,
    description: "Okay",
  },
  {
    id: "itm-010",
    name: "Mustard Oil",
    sku: "OIL-MUS-15",
    category: "Edible Oil",
    quantity: 15,
    unit: "L",
    price: 1895,
    description: "Okay",
  },
  {
    id: "itm-011",
    name: "Groundnut Oil",
    sku: "OIL-GND-15",
    category: "Edible Oil",
    quantity: 15,
    unit: "L",
    price: 2150,
    description: "Okay",
  },
  {
    id: "itm-012",
    name: "Maida Flour",
    sku: "FLOUR-MAI-25",
    category: "Flour",
    quantity: 25,
    unit: "kg",
    price: 870,
    description: "Okay",
  },
  {
    id: "itm-013",
    name: "Poha Medium",
    sku: "POHA-MED-20",
    category: "Staples",
    quantity: 20,
    unit: "kg",
    price: 1125,
    description: "Okay",
  },
  {
    id: "itm-014",
    name: "Iodized Salt",
    sku: "SALT-IOD-50",
    category: "Staples",
    quantity: 50,
    unit: "kg",
    price: 420,
    description: "Okay",
  },
  {
    id: "itm-015",
    name: "Turmeric Powder",
    sku: "SPC-TUR-05",
    category: "Spices",
    quantity: 5,
    unit: "kg",
    price: 690,
    description: "Okay",
  },
  {
    id: "itm-016",
    name: "Red Chilli Powder",
    sku: "SPC-CHI-05",
    category: "Spices",
    quantity: 5,
    unit: "kg",
    price: 910,
    description: "Okay",
  },
  {
    id: "itm-017",
    name: "Coriander Powder",
    sku: "SPC-COR-05",
    category: "Spices",
    quantity: 5,
    unit: "kg",
    price: 640,
    description: "Okay",
  },
  {
    id: "itm-018",
    name: "Dishwash Liquid",
    sku: "HH-DWL-05",
    category: "Household",
    quantity: 5,
    unit: "L",
    price: 345,
    description: "Okay",
  },
  {
    id: "itm-019",
    name: "Bath Soap Multipack",
    sku: "SOAP-BTH-12",
    category: "Personal Care",
    quantity: 12,
    unit: "pcs",
    price: 265,
    description: "Okay",
  },
  {
    id: "itm-020",
    name: "Instant Coffee Powder",
    sku: "COF-INS-01",
    category: "Beverages",
    quantity: 1,
    unit: "kg",
    price: 745,
    description: "Okay",
  },
]

export function getProductItem(id: string) {
  return productItems.find((item) => item.id === id)
}

export async function fetchProductItems(query: {
  search: string
  page: number
  pageSize: number
}, signal?: AbortSignal) {
  await new Promise((resolve) => setTimeout(resolve, 250))

  if (signal?.aborted) {
    return { items: [], total: 0 }
  }

  const search = query.search.toLowerCase()
  const filteredItems = productItems.filter((item) => {
    return [item.name, item.sku, item.category, item.quantity, item.unit]
      .join(" ")
      .toLowerCase()
      .includes(search)
  })

  const start = (query.page - 1) * query.pageSize
  const end = start + query.pageSize

  return {
    items: filteredItems.slice(start, end),
    total: filteredItems.length,
  }
}
