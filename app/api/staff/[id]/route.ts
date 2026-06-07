import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/axios-client';

type Ctx = { params: { id: string } };

export const DELETE = (req: NextRequest, { params }: Ctx) =>
    proxyToBackend(req, `/staff/${params.id}`);