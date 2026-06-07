import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/axios-client';
 
export const GET  = (req: NextRequest) => proxyToBackend(req, '/orders');
export const POST = (req: NextRequest) => proxyToBackend(req, '/orders');
 