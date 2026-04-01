import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createTablesIfNotExist } from '@/lib/schema';

export async function GET() {
    try {
        await createTablesIfNotExist();

        const clients = await query('SELECT * FROM clients ORDER BY created_at DESC');
        return NextResponse.json(clients);
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, logo_url } = data;

        if (!logo_url) {
            return NextResponse.json({ error: "Logo URL is required" }, { status: 400 });
        }

        const result = await query(
            'INSERT INTO clients (name, logo_url) VALUES (?, ?)',
            [name || null, logo_url]
        );

        return NextResponse.json({ success: true, id: (result as any).insertId });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
