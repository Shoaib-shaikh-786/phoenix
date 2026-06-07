import { api } from '@/lib/axios-client';
import type {
    Product,
    ProductListResponse,
    CreateProductPayload,
    UpdateProductPayload,
} from './types';

const BASE = '/api/product';

// ---------------------------------------------------------------------------
// READ  — available to all authenticated users
// ---------------------------------------------------------------------------

/** GET /products */
export function listProducts(params?: Record<string, string>) {
    return api.get<ProductListResponse>(BASE, params);
}

/** GET /products/:id */
export function getProductById(id: string) {
    return api.get<Product>(`${BASE}/${id}`);
}

// ---------------------------------------------------------------------------
// WRITE — wholesaler only
// ---------------------------------------------------------------------------

/** POST /products */
export function createProduct(payload: CreateProductPayload) {
    return api.post<Product>(BASE, payload);
}

/** PATCH /products/:id */
export function updateProduct(id: string, payload: UpdateProductPayload) {
    return api.patch<Product>(`${BASE}/${id}`, payload);
}

/** DELETE /products/:id */
export function deleteProduct(id: string) {
    return api.delete<{ message: string }>(`${BASE}/${id}`);
}