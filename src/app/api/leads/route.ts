import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, company, service, message, sourcePage } = body;

        if (!name || !email || !phone || !service) {
            return NextResponse.json(
                { error: 'Name, email, phone, and service are required' },
                { status: 400 }
            );
        }

        const sql = `
            INSERT INTO service_leads (name, email, phone, company, service, source_page, message)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        await query(sql, [
            name,
            email,
            phone,
            company || null,
            service,
            sourcePage || null,
            message || null
        ]);

        return NextResponse.json({ success: true, message: 'Lead submitted successfully' });
    } catch (error: any) {
        console.error('Failed to submit lead:', error);
        return NextResponse.json(
            { error: 'Failed to submit lead', details: error.message },
            { status: 500 }
        );
    }
}
