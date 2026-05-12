import { Metadata } from "next";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import BlogDetailClient from "./BlogDetailClient";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  meta_title: string;
  meta_description: string;
  schema_markup: string;
  created_at: string;
}

// Fetch blog by slug
async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const blogs = await query("SELECT * FROM blogs WHERE slug = ?", [slug]);
    return blogs.length > 0 ? (blogs[0] as Blog) : null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.excerpt || `Read ${blog.title} by ${blog.author}.`,
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt || `Read ${blog.title} by ${blog.author}.`,
      images: blog.image_url ? [{ url: blog.image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt || `Read ${blog.title} by ${blog.author}.`,
      images: blog.image_url ? [blog.image_url] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <main className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
          <h1 className="text-4xl font-black mb-6 uppercase tracking-tighter">Article Not Found</h1>
          <Link href="/blog" className="px-6 py-3 bg-white/10 rounded-full text-sm font-bold uppercase tracking-widest border border-white/10 hover:bg-white/20 transition-all">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Inject JSON-LD Schema Markup if available */}
      {blog.schema_markup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: blog.schema_markup }}
        />
      )}
      
      <Navbar />
      
      {/* Pass data to Client Component for animations and interactivity */}
      <BlogDetailClient blog={blog} />
      
      <Footer />
    </main>
  );
}
