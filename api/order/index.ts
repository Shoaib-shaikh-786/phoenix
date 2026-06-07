import { api } from '@/lib/axios-client';
import type {
    Order,
    OrderListResponse,
    CreateOrderPayload,
    AddNotePayload,
} from './types';

const BASE = '/orders';

// ---------------------------------------------------------------------------
// READ — all roles
// ---------------------------------------------------------------------------

/** GET /orders */
export const listOrders = (params?: Record<string, string>) =>
    api.get<OrderListResponse>(BASE, params);

/** GET /orders/:id */
export const getOrderById = (id: string) =>
    api.get<Order>(`${BASE}/${id}`);

// ---------------------------------------------------------------------------
// CREATE — dealer and salesman
// ---------------------------------------------------------------------------

/** POST /orders */
export const createOrder = (payload: CreateOrderPayload) =>
    api.post<Order>(BASE, payload);

// ---------------------------------------------------------------------------
// NOTES — dealer only
// ---------------------------------------------------------------------------

/** POST /orders/:id/notes */
export const addOrderNote = (id: string, payload: AddNotePayload) =>
    api.post<Order>(`${BASE}/${id}/notes`, payload);

// ---------------------------------------------------------------------------
// STATUS TRANSITIONS
// ---------------------------------------------------------------------------

/** PATCH /orders/:id/accept  — wholesaler */
export const acceptOrder = (id: string) =>
    api.patch<Order>(`${BASE}/${id}/accept`, {});

/** PATCH /orders/:id/reject  — wholesaler */
export const rejectOrder = (id: string) =>
    api.patch<Order>(`${BASE}/${id}/reject`, {});

/** PATCH /orders/:id/complete  — wholesaler */
export const completeOrder = (id: string) =>
    api.patch<Order>(`${BASE}/${id}/complete`, {});

/** PATCH /orders/:id/process  — staff */
export const processOrder = (id: string) =>
    api.patch<Order>(`${BASE}/${id}/process`, {});

/** PATCH /orders/:id/ship  — staff */
export const shipOrder = (id: string) =>
    api.patch<Order>(`${BASE}/${id}/ship`, {});

/** PATCH /orders/:id/cancel  — dealer */
export const cancelOrder = (id: string) =>
    api.patch<Order>(`${BASE}/${id}/cancel`, {});