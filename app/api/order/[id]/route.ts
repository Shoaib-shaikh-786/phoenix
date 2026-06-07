import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/axios-client';

type Ctx = { params: { id: string } };

// GET /orders/:id
export const GET = (req: NextRequest, { params }: Ctx) =>
    proxyToBackend(req, `/orders/${params.id}`);

// POST /orders/:id/notes
export const POST = (req: NextRequest, { params }: Ctx) =>
    proxyToBackend(req, `/orders/${params.id}/notes`);

// All PATCH transitions — the path suffix comes from the request URL
// e.g. /api/order/123/accept → /orders/123/accept
export const PATCH = (req: NextRequest, { params }: Ctx) => {
    const suffix = new URL(req.url).pathname.split(`/${params.id}/`)[1] ?? '';
    return proxyToBackend(req, `/orders/${params.id}/${suffix}`);
};