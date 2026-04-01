import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

// The hardcoded secure password requirement (Admin@2026)
const ADMIN_EMAIL = process.env.DB_USER?.replace('u650869678_', '') + '@realvibe.in'; // fallback to amul@realvibe.in
const ADMIN_PASSWORD = 'amuldev2026';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_only_for_dev';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate credentials
        if (email === 'amul.sharma@realvibe.in' && password === ADMIN_PASSWORD) {

            // Generate standard JWT token valid for 24 hours
            const token = sign({ email, role: 'admin' }, JWT_SECRET, {
                expiresIn: '24h',
            });

            // Serialize an HTTP-only cookie
            const cookie = serialize('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: {
                    'Set-Cookie': cookie,
                    'Content-Type': 'application/json',
                },
            });
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
