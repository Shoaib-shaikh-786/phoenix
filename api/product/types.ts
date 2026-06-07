// ---------------------------------------------------------------------------
// Domain types — adjust fields to match your Go model
// ---------------------------------------------------------------------------
export interface Product {
    id: string;
    name: string;
    description?: string;
    price?: number;
    category?: string
    quantity?: number;
    created_at: string;
    updated_at: string;
    images: {
        id:string
        url:string
        type:string
        created_at:string
        updated_at:string
    }
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