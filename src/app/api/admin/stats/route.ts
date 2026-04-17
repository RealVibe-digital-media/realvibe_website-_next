import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createTablesIfNotExist } from '@/lib/schema';

export async function GET() {
    try {
        await createTablesIfNotExist();

        const [testimonialsCount] = await query('SELECT COUNT(*) as count FROM testimonials') as any;
        const [teamCount] = await query('SELECT COUNT(*) as count FROM team_members') as any;
        const [blogCount] = await query('SELECT COUNT(*) as count FROM blogs') as any;
        const [leadsCount] = await query('SELECT COUNT(*) as count FROM service_leads') as any;

        return NextResponse.json({
            testimonials: testimonialsCount?.count || 0,
            team: teamCount?.count || 0,
            blogs: blogCount?.count || 0,
            leads: leadsCount?.count || 0
        });
    } catch (error: any) {
        console.error('Stats API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
