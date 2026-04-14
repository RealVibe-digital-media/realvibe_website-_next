import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createTablesIfNotExist } from '@/lib/schema';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Attempt to ensure tables exist before querying
        await createTablesIfNotExist();

        const testimonials = await query('SELECT * FROM testimonials ORDER BY created_at DESC');
        return NextResponse.json(testimonials);
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { author, role, company, content, image_url } = data;

        const result = await query(
            'INSERT INTO testimonials (author, role, company, content, image_url) VALUES (?, ?, ?, ?, ?)',
            [author, role, company, content, image_url || null]
        );

        return NextResponse.json({ success: true, id: (result as any).insertId });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
