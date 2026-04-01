export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
    const cookie = serialize('admin_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(0),
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
