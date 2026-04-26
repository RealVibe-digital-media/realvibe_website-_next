import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const results = await query('SELECT * FROM portfolio WHERE id = ?', [params.id]);
    if ((results as any[]).length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(results[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, slug, client_name, client_logo, description, challenge, solution, results, content, image_url, metrics } = body;

    await query(
      `UPDATE portfolio SET 
        title = ?, slug = ?, client_name = ?, client_logo = ?, 
        description = ?, challenge = ?, solution = ?, 
        results = ?, content = ?, image_url = ?, metrics = ?
       WHERE id = ?`,
      [title, slug, client_name, client_logo, description, challenge, solution, results, content, image_url, metrics, params.id]
    );

    return NextResponse.json({ message: 'Case study updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await query('DELETE FROM portfolio WHERE id = ?', [params.id]);
    return NextResponse.json({ message: 'Case study deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
