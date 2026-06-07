export interface LoginPayload {
    phone: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user_type: string;
    user_id: string
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'wholesaler' | 'dealer' | 'salesman' | 'staff';
    createdAt: string;
    updatedAt: string;
}

export interface DealerJoinPayload {
    name: string;
    email: string;
    password: string;
    inviteToken: string; // from QR
}

export interface CreateSalesmanPayload {
    name: string;
    email: string;
    password: string;
}

export interface CreateStaffPayload {
    name: string;
    email: string;
    password: string;
}

export interface UpdateDealerPayload {
    name?: string;
    email?: string;
    password?: string;
}

export interface GenerateInviteResponse {
    inviteToken: string;
    qrUrl: string;
    expiresAt: string;
}