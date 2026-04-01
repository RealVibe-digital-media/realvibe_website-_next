import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ success: false, error: `Invalid file type: ${file.type}` }, { status: 400 });
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ success: false, error: 'File size exceeds 5MB limit' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
        const uniqueFilename = `${uniqueSuffix}-${filename}`;

        // Ensure uploads directory exists
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const filePath = join(uploadDir, uniqueFilename);
        await writeFile(filePath, buffer);

        // Return the public URL for the image
        const publicUrl = `/uploads/${uniqueFilename}`;

        return NextResponse.json({ success: true, url: publicUrl });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json({ success: false, error: error.message || 'File upload failed' }, { status: 500 });
    }
}
