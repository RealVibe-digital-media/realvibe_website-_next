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

        // Handle both single object and array of objects for bulk upload
        const dataArray = Array.isArray(data) ? data : [data];

        if (dataArray.length === 0) {
            return NextResponse.json({ error: "No data provided" }, { status: 400 });
        }

        const results = [];
        for (const item of dataArray) {
            const { image_url, title } = item;

            if (!image_url) continue;

            const result = await query(
                'INSERT INTO work_culture (image_url, title) VALUES (?, ?)',
                [image_url, title || null]
            );
            results.push((result as any).insertId);
        }

        return NextResponse.json({ success: true, count: results.length, ids: results });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
