import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createTablesIfNotExist } from '@/lib/schema';

export async function GET() {
    try {
        await createTablesIfNotExist();

        const images = await query('SELECT * FROM work_culture ORDER BY created_at DESC');
        return NextResponse.json(images);
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { image_url, title } = data;

        if (!image_url) {
            return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
        }

        const result = await query(
            'INSERT INTO work_culture (image_url, title) VALUES (?, ?)',
            [image_url, title || null]
        );

        return NextResponse.json({ success: true, id: (result as any).insertId });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
