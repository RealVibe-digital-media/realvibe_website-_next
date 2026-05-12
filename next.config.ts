/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/drop-us-a-line',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/best-social-media-agency-in-gurgaon',
        destination: '/services/social-media',
        permanent: true,
      },
      {
        source: '/meet-real-vibe',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: 'https://real-vibe-s-portfolio.vercel.app/',
        permanent: true,
      },
      {
        source: '/our-services',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/best-video-production-agency-in-gurgaon',
        destination: '/services/video-production',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
