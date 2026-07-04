import ClientPageContent from './ClientPageContent';
import { Metadata } from 'next';
import dbConnect from '@/lib/portfolio/db';
import Client from '@/models/Client';
import SubProject from '@/models/SubProject';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        await dbConnect();
        const client = await Client.findOne({ slug }).lean();
        if (client) {
            return {
                title: `${(client as any).name} | Portfolio`,
                description: `View our work for ${(client as any).name}`,
            };
        }
    } catch (e) { }
    return { title: 'Client | Portfolio' };
}

async function getClientData(slug: string) {
    try {
        await dbConnect();
        const client = await Client.findOne({ slug }).lean();
        if (!client) return null;

        const clientId = (client as any)._id;
        const subProjects = await SubProject.find({ clientId }).sort({ priority: 1, name: 1 }).lean();

        const formattedSubProjects = subProjects.map((sp: any) => ({
            id: sp._id.toString(),
            name: sp.name,
            slug: sp.slug,
            thumbnail: sp.thumbnail,
            description: sp.description,
            clientId: sp.clientId.toString(),
        }));

        return {
            client: {
                id: clientId.toString(),
                name: (client as any).name,
                slug: (client as any).slug,
                logo: (client as any).logo,
            },
            subProjects: formattedSubProjects,
        };
    } catch (error) {
        console.error('Failed to fetch client data:', error);
        return null;
    }
}

export default async function ClientPage({ params }: PageProps) {
    const { slug } = await params;
    const data = await getClientData(slug);

    if (!data) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Client Not Found</h1>
                    <a href="/portfolio" className="text-pink-500 hover:text-pink-400 transition-colors">← Back to Home</a>
                </div>
            </div>
        );
    }

    return (
        <ClientPageContent
            client={data.client}
            subProjects={data.subProjects}
        />
    );
}
