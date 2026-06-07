import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/axios-client';

type Ctx = { params: { id: string } };

export const GET = (req: NextRequest, { params }: Ctx) => proxyToBackend(req, `/products/${params.id}`);
export const PATCH = (req: NextRequest, { params }: Ctx) => proxyToBackend(req, `/products/${params.id}`);
export const DELETE = (req: NextRequest, { params }: Ctx) => proxyToBackend(req, `/products/${params.id}`);