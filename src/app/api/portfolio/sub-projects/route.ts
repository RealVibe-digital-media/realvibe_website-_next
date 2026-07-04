import { NextResponse } from 'next/server';
import dbConnect from '@/lib/portfolio/db';
import SubProject from '@/models/SubProject';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const clientId = searchParams.get('clientId');
        const slug = searchParams.get('slug');

        let query: any = {};
        if (clientId) query.clientId = clientId;
        if (slug) query.slug = slug;

        const subProjects = await SubProject.find(query).sort({ priority: 1, name: 1 }).lean();

        const formatted = subProjects.map((sp: any) => ({
            id: sp._id.toString(),
            name: sp.name,
            slug: sp.slug,
            clientId: sp.clientId.toString(),
            thumbnail: sp.thumbnail,
            description: sp.description,
            videoUrl: sp.videoUrl,
            priority: sp.priority || 0,
            createdAt: sp.createdAt,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('SubProjects GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch sub-projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        if (!body.name || !body.clientId) {
            return NextResponse.json({ error: 'Name and clientId are required' }, { status: 400 });
        }

        const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const existing = await SubProject.findOne({ slug });
        if (existing) {
            return NextResponse.json({ error: 'A project with this name already exists' }, { status: 400 });
        }

        const subProject = await SubProject.create({
            name: body.name,
            slug,
            clientId: body.clientId,
            thumbnail: body.thumbnail || '',
            description: body.description || '',
            videoUrl: body.videoUrl || '',
            priority: body.priority || 0,
        });

        return NextResponse.json({
            id: subProject._id.toString(),
            name: subProject.name,
            slug: subProject.slug,
            clientId: subProject.clientId.toString(),
            priority: subProject.priority,
        });
    } catch (error: any) {
        console.error('SubProjects POST error:', error);
        return NextResponse.json({ error: error.message || 'Failed to create sub-project' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, name, description } = body;

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (name) {
            updateData.name = name;
            updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        if (description !== undefined) updateData.description = description;
        if (body.videoUrl !== undefined) updateData.videoUrl = body.videoUrl;
        if (body.thumbnail !== undefined) updateData.thumbnail = body.thumbnail;
        if (body.priority !== undefined) updateData.priority = body.priority;

        const subProject = await SubProject.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (!subProject) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: (subProject as any)._id.toString(),
            name: (subProject as any).name,
            slug: (subProject as any).slug,
            clientId: (subProject as any).clientId.toString(),
            description: (subProject as any).description,
            videoUrl: (subProject as any).videoUrl,
            thumbnail: (subProject as any).thumbnail,
            priority: (subProject as any).priority || 0,
        });
    } catch (error) {
        console.error('SubProjects PUT error:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await SubProject.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('SubProjects DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete sub-project' }, { status: 500 });
    }
}
