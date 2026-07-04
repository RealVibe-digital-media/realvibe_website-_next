import { NextResponse } from 'next/server';
import dbConnect from '@/lib/portfolio/db';
import Category from '@/models/Category';

// Helper to get all categories
async function getAllCategories() {
    return await Category.find({}).sort({ priority: 1, name: 1 }).lean();
}

export async function GET() {
    try {
        await dbConnect();
        const categories = await getAllCategories();
        return NextResponse.json(categories.map((c: any) => ({
            id: c.id,
            name: c.name,
            priority: c.priority || 0
        })));
    } catch (error) {
        console.error('Categories GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        if (!body.name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        // Generate ID from name if not provided
        const id = body.id || body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        const existing = await Category.findOne({ id });
        if (existing) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
        }

        await Category.create({ name: body.name, id, priority: body.priority || 0 });

        const categories = await getAllCategories();
        return NextResponse.json(categories);
    } catch (error: any) {
        console.error('Categories POST error:', error);
        return NextResponse.json({ error: error.message || 'Failed to create category' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, name } = body;

        if (!id || !name) {
            return NextResponse.json({ error: 'ID and Name are required' }, { status: 400 });
        }

        const updated = await Category.findOneAndUpdate(
            { id },
            {
                name,
                priority: body.priority !== undefined ? body.priority : undefined
            },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        const categories = await getAllCategories();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        await Category.findOneAndDelete({ id });

        const categories = await getAllCategories();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
