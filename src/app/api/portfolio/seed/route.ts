import { NextResponse } from 'next/server';
import dbConnect from '@/lib/portfolio/db';
import Category from '@/models/Category';

export async function GET() {
    try {
        await dbConnect();

        // Default categories
        const defaultCategories = [
            { id: 'creatives', name: 'Creatives' },
            { id: 'ai-videos', name: 'AI Videos' },
            { id: 'websites', name: 'Websites' },
            { id: 'campaigns', name: 'Campaigns' },
            { id: 'branding', name: 'Branding' },
            { id: 'video-production', name: 'Video Production' }
        ];

        // Check if categories exist
        const count = await Category.countDocuments();

        if (count === 0) {
            // Seed with default categories
            await Category.insertMany(defaultCategories);
            return NextResponse.json({
                message: 'Database seeded with default categories',
                categories: defaultCategories.map(c => c.name)
            });
        }

        return NextResponse.json({
            message: 'Database already has categories',
            count
        });
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
    }
}

// Always run at request time (never executed during `next build`).
export const dynamic = 'force-dynamic';
