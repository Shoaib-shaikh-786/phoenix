import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/axios-client';

export const GET = (req: NextRequest) => proxyToBackend(req, '/products');
