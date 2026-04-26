import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const results = await query('SELECT * FROM portfolio_wall ORDER BY created_at DESC');
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image_url } = body;

    if (!image_url) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const result = await query(
      'INSERT INTO portfolio_wall (image_url) VALUES (?)',
      [image_url]
    );

    return NextResponse.json({ id: (result as any).insertId, message: 'Image added successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
