import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;

        const sql = `DELETE FROM service_leads WHERE id = ?`;
        await query(sql, [id]);

        return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
    } catch (error: any) {
        console.error('Failed to delete lead:', error);
        return NextResponse.json(
            { error: 'Failed to delete lead', details: error.message },
            { status: 500 }
        );
    }
}
