import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/axios-client';

export const POST = (req: NextRequest) => proxyToBackend(req, '/auth/dealer/join');