// ---------------------------------------------------------------------------
// Domain types — adjust fields to match your Go model
// ---------------------------------------------------------------------------
export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProductListResponse {
    data: Product[];
    total: number;
    page: number;
    pageSize: number;
}

export interface CreateProductPayload {
    name: string;
    description?: string;
    price: number;
    stock: number;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> { }