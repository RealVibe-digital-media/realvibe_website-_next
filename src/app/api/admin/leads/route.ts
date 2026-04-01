import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const sql = `
            SELECT id, name, email, phone, company, service, source_page, message, created_at
            FROM service_leads
            ORDER BY created_at DESC
        `;

        const leads = await query(sql);

        return NextResponse.json({ success: true, leads });
    } catch (error: any) {
        console.error('Failed to fetch leads:', error);
        return NextResponse.json(
            { error: 'Failed to fetch leads', details: error.message },
            { status: 500 }
        );
    }
}
