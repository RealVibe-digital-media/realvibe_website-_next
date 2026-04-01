import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Only protect the /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Exclude the login page from protection to avoid infinite redirects
        if (request.nextUrl.pathname === '/admin/login') {
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
    matcher: ['/admin/:path*'],
};
