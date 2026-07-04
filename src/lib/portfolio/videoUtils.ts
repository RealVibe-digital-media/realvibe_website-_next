/**
 * Utility to handle video link extraction and thumbnail generation
 */

export function getAutoThumbnail(videoUrl: string): string | null {
    if (!videoUrl) return null;

    // Google Drive
    // Formats: 
    // https://drive.google.com/file/d/FILE_ID/view
    // https://drive.google.com/open?id=FILE_ID
    const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=))([a-zA-Z0-9_-]+)/;
    const driveMatch = videoUrl.match(driveRegex);
    if (driveMatch && driveMatch[1]) {
        return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
    }

    // YouTube
    // Formats:
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    // https://www.youtube.com/embed/VIDEO_ID
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = videoUrl.match(youtubeRegex);
    if (youtubeMatch && youtubeMatch[1]) {
        return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
    }

    return null;
}
