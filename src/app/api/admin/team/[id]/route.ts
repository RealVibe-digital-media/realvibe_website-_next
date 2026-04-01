import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await query('DELETE FROM team_members WHERE id = ?', [id]);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();
        const { name, role, bio, image_url, social_links } = data;

        await query(
            'UPDATE team_members SET name=?, role=?, bio=?, image_url=?, social_links=? WHERE id=?',
            [name, role, bio || null, image_url || null, social_links || null, id]
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
