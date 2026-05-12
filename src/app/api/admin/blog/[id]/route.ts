import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const data = await request.json();
        const { title, slug, excerpt, content, image_url, author, meta_title, meta_description, schema_markup } = data;

        await query(
            'UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, image_url = ?, author = ?, meta_title = ?, meta_description = ?, schema_markup = ? WHERE id = ?',
            [title, slug, excerpt || null, content, image_url || null, author || 'RealVibe Team', meta_title || null, meta_description || null, schema_markup || null, id]
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        await query('DELETE FROM blogs WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
