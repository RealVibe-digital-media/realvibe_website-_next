import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const data = await request.json();
        const { title, slug, excerpt, content, image_url, author } = data;

        await query(
            'UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, image_url = ?, author = ? WHERE id = ?',
            [title, slug, excerpt || null, content, image_url || null, author || 'RealVibe Team', id]
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
        const id = params.id;
        await query('DELETE FROM blogs WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
