import { NextResponse } from 'next/server';
import cloudinary from '@/lib/portfolio/cloudinary';

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        let extractedUrl = '';

        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            let videoId = '';
            if (url.includes('youtube.com/watch?v=')) {
                videoId = url.split('v=')[1].split('&')[0];
            } else if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1].split('?')[0];
            } else if (url.includes('youtube.com/shorts/')) {
                videoId = url.split('shorts/')[1].split('?')[0];
            }

            if (videoId) {
                extractedUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            }
        }
        // Instagram
        else if (url.includes('instagram.com')) {
            const cleanUrl = url.split('?')[0].replace(/\/$/, '');
            // Try the reel code if it exists
            const code = cleanUrl.split('/reels/')[1] || cleanUrl.split('/reel/')[1] || cleanUrl.split('/p/')[1];
            if (code) {
                // Using p/ instead of reels/ is often more reliable for the media trick
                extractedUrl = `https://www.instagram.com/p/${code}/media/?size=l`;
            } else {
                extractedUrl = `${cleanUrl}/media/?size=l`;
            }
        }

        if (!extractedUrl) {
            return NextResponse.json({ error: 'Could not extract thumbnail URL from link' }, { status: 400 });
        }

        // Fetch image data directly to bypass some Cloudinary-to-IG blocks
        let imageBuffer: Buffer;
        try {
            const imageRes = await fetch(extractedUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (!imageRes.ok) {
                throw new Error(`Failed to fetch image: ${imageRes.statusText}`);
            }

            const arrayBuffer = await imageRes.arrayBuffer();
            imageBuffer = Buffer.from(arrayBuffer);
        } catch (fetchError) {
            console.error('Direct fetch failed, trying Cloudinary direct upload as fallback:', fetchError);
            // Fallback to letting Cloudinary try to fetch it directly
            const result = await cloudinary.uploader.upload(extractedUrl, {
                folder: 'portfolio_thumbnails',
            });
            return NextResponse.json({ thumbnail: result.secure_url });
        }

        // Upload buffer to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'portfolio_thumbnails',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(imageBuffer);
        });

        return NextResponse.json({ thumbnail: (result as any).secure_url });

    } catch (error: any) {
        console.error('Thumbnail extraction error:', error);
        return NextResponse.json({
            error: 'Failed to extract and upload thumbnail',
            details: error.message
        }, { status: 500 });
    }
}
