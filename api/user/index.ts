import { api } from '@/lib/axios-client';
import type {
    LoginPayload,
    LoginResponse,
    DealerJoinPayload,
    CreateSalesmanPayload,
    CreateStaffPayload,
    UpdateDealerPayload,
    GenerateInviteResponse,
    User,
} from './types';

// ---------------------------------------------------------------------------
// AUTH
// ---------------------------------------------------------------------------

/** POST /auth/login */
export const login = (payload: LoginPayload) =>
    api.post<LoginResponse>('/auth/login', payload);

/** POST /auth/logout */
export const logout = () =>
    api.post<void>('/auth/logout', {});

/** POST /auth/dealer/join — QR invite registration */
export const dealerJoin = (payload: DealerJoinPayload) =>
    api.post<User>('/auth/dealer/join', payload);

// ---------------------------------------------------------------------------
// DEALERS — wholesaler only / self
// ---------------------------------------------------------------------------

/** POST /dealers/invite — wholesaler only */
export const generateInvite = () =>
    api.post<GenerateInviteResponse>('/dealers/invite', {});

/** PATCH /dealers/:id — wholesaler OR the dealer themselves */
export const updateDealer = (id: string, payload: UpdateDealerPayload) =>
    api.patch<User>(`/dealers/${id}`, payload);

// ---------------------------------------------------------------------------
// SALESMEN — wholesaler only
// ---------------------------------------------------------------------------

/** POST /salesmen */
export const createSalesman = (payload: CreateSalesmanPayload) =>
    api.post<User>('/salesmen', payload);

/** DELETE /salesmen/:id */
export const deleteSalesman = (id: string) =>
    api.delete<void>(`/salesmen/${id}`);

// ---------------------------------------------------------------------------
// STAFF — wholesaler only
// ---------------------------------------------------------------------------

/** POST /staff */
export const createStaff = (payload: CreateStaffPayload) =>
    api.post<User>('/staff', payload);

/** DELETE /staff/:id */
export const deleteStaff = (id: string) =>
    api.delete<void>(`/staff/${id}`);