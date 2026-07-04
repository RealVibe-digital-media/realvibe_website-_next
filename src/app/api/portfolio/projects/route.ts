import { NextResponse } from 'next/server';
import dbConnect from '@/lib/portfolio/db';
import Project from '@/models/Project';
import Client from '@/models/Client';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const clientId = searchParams.get('clientId');
        const clientSlug = searchParams.get('clientSlug');
        const subProjectId = searchParams.get('subProjectId');

        let filter: any = {};

        if (subProjectId) {
            filter.subProjectId = subProjectId;
        } else if (clientId) {
            filter.clientId = clientId;
        } else if (clientSlug) {
            // Look up client by slug first
            const client = await Client.findOne({ slug: clientSlug }).lean();
            if (!client) {
                return NextResponse.json([]);
            }
            filter.clientId = (client as any)._id;
        }

        const projects = await Project.find(filter).sort({ priority: 1, createdAt: -1 }).lean();
        const formattedProjects = projects.map((p: any) => ({
            ...p,
            id: p._id.toString(),
            clientId: p.clientId?.toString() || '',
            subProjectId: p.subProjectId?.toString() || '',
            _id: undefined
        }));
        return NextResponse.json(formattedProjects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const { id, title, category, priority } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const project = await Project.findByIdAndUpdate(
            id,
            { title, category, priority },
            { new: true }
        );

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...project.toObject(),
            id: project._id.toString(),
            _id: undefined
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const project: any = await Project.create(body);
        return NextResponse.json({
            ...project.toObject(),
            id: project._id.toString(),
            _id: undefined
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const ids = searchParams.get('ids'); // For bulk delete

        if (ids) {
            const idArray = JSON.parse(ids);
            await Project.deleteMany({ _id: { $in: idArray } });
            return NextResponse.json({ success: true });
        }

        if (id) {
            await Project.findByIdAndDelete(id);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'ID required' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}

// Always run at request time (never executed during `next build`).
export const dynamic = 'force-dynamic';
