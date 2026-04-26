import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const results = await query('SELECT * FROM portfolio ORDER BY created_at DESC');
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, client_name, client_logo, description, challenge, solution, results, content, image_url, metrics } = body;

    const result = await query(
      `INSERT INTO portfolio (title, slug, client_name, client_logo, description, challenge, solution, results, content, image_url, metrics) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, client_name, client_logo, description, challenge, solution, results, content, image_url, metrics]
    );

    return NextResponse.json({ id: (result as any).insertId, message: 'Case study created successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
