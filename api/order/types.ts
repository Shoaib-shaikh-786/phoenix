export interface Order {
    id: string;
    status: 'pending' | 'accepted' | 'rejected' | 'processing' | 'shipped' | 'completed' | 'cancelled';
    notes?: OrderNote[];
    createdAt: string;
    updatedAt: string;
}

export interface OrderNote {
    id: string;
    content: string;
    createdAt: string;
}

export interface OrderListResponse {
    data: Order[];
    total: number;
    page: number;
    pageSize: number;
}

export interface CreateOrderPayload {
    items: { productId: string; quantity: number }[];
}

export interface AddNotePayload {
    content: string;
}