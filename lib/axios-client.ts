import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    CancelTokenSource,
} from 'axios';
import { signOut } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';


export const commonHeaders = {
    'Content-Type': 'application/json',
};


// ---------------------------------------------------------------------------
// Shared instance
// ---------------------------------------------------------------------------
export const axiosClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? '',
    headers: commonHeaders,
});

// ---------------------------------------------------------------------------
// Guards
// ---------------------------------------------------------------------------
let isLoggingOut = false;

// ---------------------------------------------------------------------------
// Response interceptor — handles 401 / 403 globally
// ---------------------------------------------------------------------------
axiosClient.interceptors.response.use(
    (res) => res,
    (error) => {
        const status: number | undefined = error.response?.status;
        const cause: string | undefined = error.response?.data?.code;

        if (
            (status === 401 || cause === 'UNAUTHORIZED') &&
            typeof window !== 'undefined'
        ) {
            if (!isLoggingOut) {
                isLoggingOut = true;
                signOut({ redirect: true, callbackUrl: '/login' })
                    .catch(() => window.location.assign('/login'))
                    .finally(() =>
                        setTimeout(() => {
                            isLoggingOut = false;
                        }, 2000)
                    );
            }
            return Promise.reject(error);
        }

        if (status === 403 || cause === 'FORBIDDEN') {
            if (typeof window !== 'undefined') {
                window.location.assign('/unauthorized');
            }
            return Promise.reject(error);
        }

        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        console.error('API error:', error.response?.data ?? error.message);
        return Promise.reject(error);
    }
);

// ---------------------------------------------------------------------------
// Request deduplication
// ---------------------------------------------------------------------------
const pendingRequests = new Map<string, Promise<any>>();

function dedupeKey(config: AxiosRequestConfig): string {
    return `${config.method?.toUpperCase()}:${config.url}:${JSON.stringify(
        config.params ?? ''
    )}:${JSON.stringify(config.data ?? '')}`;
}

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
    const key = dedupeKey(config);

    if (pendingRequests.has(key)) {
        return pendingRequests.get(key) as Promise<T>;
    }

    const promise = axiosClient
        .request<T>(config)
        .then((res: AxiosResponse<T>) => res.data)
        .finally(() => pendingRequests.delete(key));

    pendingRequests.set(key, promise);
    return promise;
}

// ---------------------------------------------------------------------------
// Convenience helpers
// ---------------------------------------------------------------------------
export const api = {
    get: <T>(url: string, params?: Record<string, string>) =>
        apiRequest<T>({ method: 'GET', url, params }),

    post: <T>(url: string, data: unknown) =>
        apiRequest<T>({ method: 'POST', url, data }),

    put: <T>(url: string, data: unknown) =>
        apiRequest<T>({ method: 'PUT', url, data }),

    patch: <T>(url: string, data: unknown) =>
        apiRequest<T>({ method: 'PATCH', url, data }),

    delete: <T>(url: string, data?: unknown) =>
        apiRequest<T>({ method: 'DELETE', url, data }),
};

// ---------------------------------------------------------------------------
// Cancel-token factory
// ---------------------------------------------------------------------------
export function makeCancelToken(): {
    token: CancelTokenSource['token'];
    cancel: CancelTokenSource['cancel'];
} {
    const source = axios.CancelToken.source();
    return { token: source.token, cancel: source.cancel };
}

// ---------------------------------------------------------------------------
// Server-side proxy helper
// route.ts just calls: proxyToBackend(req, '/products')
//                  or: proxyToBackend(req, `/products/${id}`)
// ---------------------------------------------------------------------------
const BACKEND = process.env.BACKEND_API_URL ?? 'http://localhost:8080';

function forwardHeaders(req: NextRequest): HeadersInit {
    return {
        ...commonHeaders,
        cookie: req.headers.get('cookie') ?? '',
        authorization: req.headers.get('authorization') ?? '',
    };
}

export async function proxyToBackend(
    req: NextRequest,
    path: string
): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const query = searchParams.toString();
    const targetUrl = `${BACKEND}${path}${query ? `?${query}` : ''}`;

    const isBodyless =
        req.method === 'GET' || req.method === 'DELETE' || req.method === 'HEAD';

    const body = isBodyless ? undefined : await req.text();

    const res = await fetch(targetUrl, {
        method: req.method,
        headers: forwardHeaders(req),
        body,
    });

    const contentType = res.headers.get('content-type') ?? '';
    const data = contentType.includes('application/json')
        ? await res.json()
        : await res.text();

    return NextResponse.json(data, { status: res.status });
}