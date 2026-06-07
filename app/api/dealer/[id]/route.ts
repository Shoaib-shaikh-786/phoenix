import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/axios-client';

type Ctx = { params: { id: string } };

export const PATCH = (req: NextRequest, { params }: Ctx) =>
    proxyToBackend(req, `/dealers/${params.id}`);