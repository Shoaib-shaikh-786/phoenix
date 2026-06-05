export type ProductItem = {
  id: string
  name: string
  sku: string
  category: string
  packSize: string
  stock: number
  wholesalePrice: number
  status: "In stock" | "Low stock" | "Out of stock"
}

export const productItems: ProductItem[] = [
  {
    id: "itm-001",
    name: "Basmati Rice Premium",
    sku: "RICE-BAS-25",
    category: "Staples",
    packSize: "25 kg sack",
    stock: 142,
    wholesalePrice: 2180,
    status: "In stock",
  },
  {
    id: "itm-002",
    name: "Sunflower Cooking Oil",
    sku: "OIL-SUN-15",
    category: "Edible Oil",
    packSize: "15 L tin",
    stock: 28,
    wholesalePrice: 1675,
    status: "Low stock",
  },
  {
    id: "itm-003",
    name: "Refined Sugar",
    sku: "SUG-REF-50",
    category: "Staples",
    packSize: "50 kg bag",
    stock: 95,
    wholesalePrice: 2040,
    status: "In stock",
  },
  {
    id: "itm-004",
    name: "Whole Wheat Flour",
    sku: "FLOUR-WW-10",
    category: "Flour",
    packSize: "10 kg bag",
    stock: 0,
    wholesalePrice: 410,
    status: "Out of stock",
  },
  {
    id: "itm-005",
    name: "Black Tea Dust",
    sku: "TEA-BLK-01",
    category: "Beverages",
    packSize: "1 kg pouch",
    stock: 64,
    wholesalePrice: 285,
    status: "In stock",
  },
  {
    id: "itm-006",
    name: "Toor Dal",
    sku: "DAL-TOOR-30",
    category: "Pulses",
    packSize: "30 kg bag",
    stock: 19,
    wholesalePrice: 3325,
    status: "Low stock",
  },
  {
    id: "itm-007",
    name: "Laundry Detergent Powder",
    sku: "DET-PWD-05",
    category: "Household",
    packSize: "5 kg pack",
    stock: 76,
    wholesalePrice: 515,
    status: "In stock",
  },
  {
    id: "itm-008",
    name: "Moong Dal",
    sku: "DAL-MNG-25",
    category: "Pulses",
    packSize: "25 kg bag",
    stock: 54,
    wholesalePrice: 2875,
    status: "In stock",
  },
  {
    id: "itm-009",
    name: "Chana Dal",
    sku: "DAL-CHN-30",
    category: "Pulses",
    packSize: "30 kg bag",
    stock: 13,
    wholesalePrice: 2690,
    status: "Low stock",
  },
  {
    id: "itm-010",
    name: "Mustard Oil",
    sku: "OIL-MUS-15",
    category: "Edible Oil",
    packSize: "15 L tin",
    stock: 42,
    wholesalePrice: 1895,
    status: "In stock",
  },
  {
    id: "itm-011",
    name: "Groundnut Oil",
    sku: "OIL-GND-15",
    category: "Edible Oil",
    packSize: "15 L tin",
    stock: 7,
    wholesalePrice: 2150,
    status: "Low stock",
  },
  {
    id: "itm-012",
    name: "Maida Flour",
    sku: "FLOUR-MAI-25",
    category: "Flour",
    packSize: "25 kg bag",
    stock: 88,
    wholesalePrice: 870,
    status: "In stock",
  },
  {
    id: "itm-013",
    name: "Poha Medium",
    sku: "POHA-MED-20",
    category: "Staples",
    packSize: "20 kg sack",
    stock: 34,
    wholesalePrice: 1125,
    status: "In stock",
  },
  {
    id: "itm-014",
    name: "Iodized Salt",
    sku: "SALT-IOD-50",
    category: "Staples",
    packSize: "50 kg bag",
    stock: 126,
    wholesalePrice: 420,
    status: "In stock",
  },
  {
    id: "itm-015",
    name: "Turmeric Powder",
    sku: "SPC-TUR-05",
    category: "Spices",
    packSize: "5 kg pack",
    stock: 22,
    wholesalePrice: 690,
    status: "Low stock",
  },
  {
    id: "itm-016",
    name: "Red Chilli Powder",
    sku: "SPC-CHI-05",
    category: "Spices",
    packSize: "5 kg pack",
    stock: 39,
    wholesalePrice: 910,
    status: "In stock",
  },
  {
    id: "itm-017",
    name: "Coriander Powder",
    sku: "SPC-COR-05",
    category: "Spices",
    packSize: "5 kg pack",
    stock: 17,
    wholesalePrice: 640,
    status: "Low stock",
  },
  {
    id: "itm-018",
    name: "Dishwash Liquid",
    sku: "HH-DWL-05",
    category: "Household",
    packSize: "5 L can",
    stock: 58,
    wholesalePrice: 345,
    status: "In stock",
  },
  {
    id: "itm-019",
    name: "Bath Soap Multipack",
    sku: "SOAP-BTH-12",
    category: "Personal Care",
    packSize: "12 pcs pack",
    stock: 0,
    wholesalePrice: 265,
    status: "Out of stock",
  },
  {
    id: "itm-020",
    name: "Instant Coffee Powder",
    sku: "COF-INS-01",
    category: "Beverages",
    packSize: "1 kg jar",
    stock: 31,
    wholesalePrice: 745,
    status: "In stock",
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
    return [item.name, item.sku, item.category, item.packSize]
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
