import HomeContent from '@/components/portfolio/HomeContent';
import { Metadata } from 'next';
import dbConnect from '@/lib/portfolio/db';
import Client from '@/models/Client';

export const metadata: Metadata = {
  title: 'Portfolio | Design, Video & Web',
  description: 'A curated showcase of campaigns, creatives and experiences.',
};

export const dynamic = 'force-dynamic';

async function getClients() {
  try {
    await dbConnect();
    const clients = await Client.find({}).sort({ priority: 1, name: 1 }).lean();

    return clients.map((c: any) => ({
      id: c._id.toString(),
      name: c.name,
      slug: c.slug,
      logo: c.logo,
      type: c.type || 'Developer',
    }));
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    return [];
  }
}

export default async function Home() {
  const clients = await getClients();

  return <HomeContent clients={clients} />;
}
