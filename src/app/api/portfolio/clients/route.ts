import { NextResponse } from 'next/server';
import dbConnect from '@/lib/portfolio/db';
import Client from '@/models/Client';
import SubProject from '@/models/SubProject';

export async function GET() {
    try {
        await dbConnect();
        const clients = await Client.find({}).sort({ priority: 1, name: 1 }).lean();
        const formatted = clients.map((c: any) => ({
            id: c._id.toString(),
            name: c.name,
            slug: c.slug,
            logo: c.logo,
            type: c.type || 'Developer',
            priority: c.priority || 0,
            createdAt: c.createdAt,
        }));
        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Clients GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        if (!body.name) {
            return NextResponse.json({ error: 'Client name is required' }, { status: 400 });
        }

        // Auto-generate slug from name
        const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Check if slug already exists
        const existing = await Client.findOne({ slug });
        if (existing) {
            return NextResponse.json({ error: 'A client with this name already exists' }, { status: 400 });
        }

        const client = await Client.create({
            name: body.name,
            slug,
            logo: body.logo || '',
            type: body.type || 'Developer',
            priority: body.priority || 0,
        });

        // Create initial project if projectName is provided
        if (body.initialProjectName) {
            const projectSlug = body.initialProjectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            // Check if project slug exists
            const existingProject = await SubProject.findOne({ slug: projectSlug });
            if (!existingProject) {
                await SubProject.create({
                    name: body.initialProjectName,
                    slug: projectSlug,
                    clientId: client._id,
                    thumbnail: body.initialProjectThumbnail || '',
                    description: body.initialProjectDescription || '',
                });
            }
        }

        return NextResponse.json({
            id: client._id.toString(),
            name: client.name,
            slug: client.slug,
            logo: client.logo,
            type: client.type,
            priority: client.priority,
        });
    } catch (error) {
        console.error('Clients POST error:', error);
        return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, name, logo, type } = body;

        if (!id) {
            return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
        }

        const updateData: any = {};
        if (name) {
            updateData.name = name;
            updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        if (logo !== undefined) updateData.logo = logo;
        if (type) updateData.type = type;
        if (body.priority !== undefined) updateData.priority = body.priority;

        const client = await Client.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (!client) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: (client as any)._id.toString(),
            name: (client as any).name,
            slug: (client as any).slug,
            logo: (client as any).logo,
            type: (client as any).type,
            priority: (client as any).priority || 0,
        });
    } catch (error) {
        console.error('Clients PUT error:', error);
        return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
        }

        await Client.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Clients DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
    }
}

// Always run at request time (never executed during `next build`).
export const dynamic = 'force-dynamic';
