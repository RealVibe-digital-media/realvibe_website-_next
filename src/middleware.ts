import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect the portfolio write APIs. Reads (GET/HEAD/OPTIONS) stay public so the
    // public showcase pages keep working; mutations require the admin login cookie.
    if (pathname.startsWith('/api/portfolio')) {
        const method = request.method.toUpperCase();
        if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
            return NextResponse.next();
        }
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.next();
    }

    // Protect the /admin panel pages (includes the moved Portfolio Studio at /admin/showcase).
    if (pathname.startsWith('/admin')) {
        // Exclude the login page from protection to avoid infinite redirects
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        const token = request.cookies.get('admin_token')?.value;

        // If no valid auth cookie is present, redirect to the login page
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/portfolio/:path*'],
};
