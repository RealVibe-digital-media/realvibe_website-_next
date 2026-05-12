import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createTablesIfNotExist } from '@/lib/schema';

// Helper to generate slug
const generateSlug = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-')     // Replace multiple - with single -
        .replace(/^-+/, '')       // Trim - from start of text
        .replace(/-+$/, '');      // Trim - from end of text
};

export async function GET() {
    try {
        await createTablesIfNotExist();
        const blogs = await query('SELECT * FROM blogs ORDER BY created_at DESC');
        return NextResponse.json(blogs);
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { title, excerpt, content, image_url, author, meta_title, meta_description, schema_markup } = data;
        
        let slug = data.slug || generateSlug(title);
        
        // Ensure slug uniqueness (basic check)
        const existing = await query('SELECT id FROM blogs WHERE slug = ?', [slug]);
        if ((existing as any[]).length > 0) {
            slug = `${slug}-${Date.now()}`;
        }

        const result = await query(
            'INSERT INTO blogs (title, slug, excerpt, content, image_url, author, meta_title, meta_description, schema_markup) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, slug, excerpt || null, content, image_url || null, author || 'RealVibe Team', meta_title || null, meta_description || null, schema_markup || null]
        );

        return NextResponse.json({ success: true, id: (result as any).insertId });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
