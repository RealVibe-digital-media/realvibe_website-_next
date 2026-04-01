import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createTablesIfNotExist } from '@/lib/schema';

export async function GET() {
    try {
        await createTablesIfNotExist();

        const team = await query('SELECT * FROM team_members ORDER BY created_at ASC');
        return NextResponse.json(team);
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, role, bio, image_url, social_links } = data;

        const result = await query(
            'INSERT INTO team_members (name, role, bio, image_url, social_links) VALUES (?, ?, ?, ?, ?)',
            [name, role, bio || null, image_url || null, social_links || null]
        );

        return NextResponse.json({ success: true, id: (result as any).insertId });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
