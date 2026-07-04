import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/portfolio/db';
import SubProject from '@/models/SubProject';
import Client from '@/models/Client';
import Project from '@/models/Project';

export async function GET() {
    try {
        await dbConnect();

        // Ensure models are registered before population
        // (Fixes MissingSchemaError on Vercel/Serverless)
        if (!mongoose.models.Client) await import('@/models/Client');
        if (!mongoose.models.Project) await import('@/models/Project');

        // Fetch all subprojects and populate client details
        const subProjects = await SubProject.find()
            .populate('clientId')
            .sort({ priority: 1, createdAt: -1 })
            .lean();

        // Fetch all individual assets (Projects) for these subprojects
        const subProjectIds = subProjects.map((sp: any) => sp._id);
        const allAssets = await Project.find({
            subProjectId: { $in: subProjectIds }
        }).sort({ priority: 1, createdAt: -1 }).lean();

        // Group assets by subProjectId
        const assetsBySubProject: Record<string, any[]> = {};
        allAssets.forEach((asset: any) => {
            const spId = asset.subProjectId?.toString();
            if (spId) {
                if (!assetsBySubProject[spId]) assetsBySubProject[spId] = [];
                assetsBySubProject[spId].push({
                    id: asset._id.toString(),
                    title: asset.title,
                    category: asset.category,
                    thumbnail: asset.image,
                    url: asset.link || '',
                    tags: asset.tags || []
                });
            }
        });

        const formattedPortfolio = subProjects.map((sp: any) => ({
            id: sp._id.toString(),
            name: sp.name,
            slug: sp.slug,
            image: sp.thumbnail || '',
            description: sp.description || '',
            videoUrl: sp.videoUrl || '',
            assets: assetsBySubProject[sp._id.toString()] || [],
            client: sp.clientId ? {
                name: sp.clientId.name,
                slug: sp.clientId.slug,
                logo: sp.clientId.logo,
            } : null,
            links: {
                project: `/portfolio/project/${sp.slug}`,
                client: sp.clientId ? `/portfolio/client/${sp.clientId.slug}` : null,
            }
        }));


        const response = NextResponse.json(formattedPortfolio);

        // Add CORS headers
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return response;
    } catch (error) {
        console.error('Public Portfolio API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { 
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    }
}

export async function OPTIONS() {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
}

// Always run at request time (never executed during `next build`).
export const dynamic = 'force-dynamic';
