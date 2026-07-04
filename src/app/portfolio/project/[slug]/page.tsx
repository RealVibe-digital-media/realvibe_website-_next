import ProjectPageContent from './ProjectPageContent';
import { Metadata } from 'next';
import dbConnect from '@/lib/portfolio/db';
import SubProject from '@/models/SubProject';
import Project from '@/models/Project';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        await dbConnect();
        const subProject = await SubProject.findOne({ slug }).lean();
        if (subProject) {
            return {
                title: `${(subProject as any).name} | Project`,
                description: (subProject as any).description || 'View our work.',
            };
        }
    } catch (e) { }
    return { title: 'Project | Portfolio' };
}

async function getProjectData(slug: string) {
    try {
        await dbConnect();
        const subProject = await SubProject.findOne({ slug }).populate('clientId').lean();
        if (!subProject) return null;

        const subProjectId = (subProject as any)._id;
        const assets = await Project.find({ subProjectId }).sort({ createdAt: -1 }).lean();

        const formattedAssets = assets.map((p: any) => ({
            id: p._id.toString(),
            title: p.title,
            category: p.category,
            image: p.image,
            tags: p.tags ? p.tags.join(', ') : '',
            link: p.link || '',
            clientId: p.clientId?.toString() || '',
            subProjectId: p.subProjectId?.toString() || '',
        }));

        // Group by category and get only categories with content
        const categoriesWithContent = [...new Set(formattedAssets.map(p => p.category))];

        // Fetch category priorities for sorting
        const Category = (await import('@/models/Category')).default;
        const dbCategories = await Category.find({ name: { $in: categoriesWithContent } }).lean();

        // Default priorities if not found
        const categoryPriorityMap: Record<string, number> = {
            'AI Videos': 1,
            'Video Production': 2,
            'UGC': 3,
            'Creatives': 4
        };

        dbCategories.forEach((c: any) => {
            categoryPriorityMap[c.name] = c.priority || 0;
        });

        const sortedCategories = categoriesWithContent.sort((a, b) => {
            const pA = categoryPriorityMap[a] ?? 100;
            const pB = categoryPriorityMap[b] ?? 100;
            if (pA !== pB) return pA - pB;
            return a.localeCompare(b);
        });

        return {
            subProject: {
                id: subProjectId.toString(),
                name: (subProject as any).name,
                slug: (subProject as any).slug,
                thumbnail: (subProject as any).thumbnail,
                description: (subProject as any).description,
                client: (subProject as any).clientId ? {
                    name: (subProject as any).clientId.name,
                    slug: (subProject as any).clientId.slug,
                } : null,
            },
            assets: formattedAssets,
            categories: sortedCategories,
        };
    } catch (error) {
        console.error('Failed to fetch project data:', error);
        return null;
    }
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const data = await getProjectData(slug);

    if (!data) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <a href="/portfolio" className="text-pink-500 hover:text-pink-400 transition-colors">← Back to Home</a>
                </div>
            </div>
        );
    }

    return (
        <ProjectPageContent
            subProject={data.subProject}
            initialAssets={data.assets}
            categories={data.categories}
        />
    );
}
