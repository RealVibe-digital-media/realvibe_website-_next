"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Loader2, Link as LinkIcon, FileText, Image as ImageIcon, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    author: string;
    created_at: string;
};

export default function BlogAdminPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form State
    const [id, setId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [author, setAuthor] = useState("RealVibe Team");

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch("/api/admin/blog");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setBlogs(data);
        } catch (err: any) {
            setError(err.message || "Error connecting to database.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (blog?: BlogPost) => {
        if (blog) {
            setId(blog.id);
            setTitle(blog.title);
            setSlug(blog.slug);
            setExcerpt(blog.excerpt || "");
            setContent(blog.content);
            setImageUrl(blog.image_url || "");
            setAuthor(blog.author || "RealVibe Team");
        } else {
            setId(null);
            setTitle("");
            setSlug("");
            setExcerpt("");
            setContent("");
            setImageUrl("");
            setAuthor("RealVibe Team");
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = { title, slug, excerpt, content, image_url: imageUrl, author };

        try {
            const method = id ? "PUT" : "POST";
            const url = id ? `/api/admin/blog/${id}` : "/api/admin/blog";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save");

            await fetchBlogs();
            setIsModalOpen(false);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (deleteId: number) => {
        if (!confirm("Are you sure you want to delete this blog post?")) return;

        try {
            const res = await fetch(`/api/admin/blog/${deleteId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            await fetchBlogs();
        } catch (err: any) {
            alert("Error deleting: " + err.message);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
                    <p className="text-gray-400 mt-2">Create and manage your agency's stories and insights.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-pink-500 hover:from-orange-500 hover:to-pink-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/20"
                >
                    <Plus size={18} />
                    New Article
                </button>
            </div>

            {error ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                    <p className="text-sm opacity-80">{error}</p>
                </div>
            ) : loading ? (
                <div className="flex items-center justify-center p-20">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center p-20 border border-white/5 rounded-2xl bg-white/[0.02]">
                    <h3 className="text-lg font-medium text-white mb-2">No Articles Found</h3>
                    <p className="text-gray-400 text-sm">Start by creating your first blog post.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogs.map((blog) => (
                        <motion.div key={blog.id} layout className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative group flex flex-col">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button onClick={() => handleOpenModal(blog)} className="p-2 text-gray-400 hover:text-white bg-black/50 hover:bg-white/10 backdrop-blur-md rounded-lg transition-colors border border-white/10">
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={() => handleDelete(blog.id)} className="p-2 text-gray-400 hover:text-red-400 bg-black/50 hover:bg-red-500/10 backdrop-blur-md rounded-lg transition-colors border border-white/10">
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <div className="flex gap-6">
                                {blog.image_url ? (
                                    <img src={blog.image_url} alt={blog.title} className="w-24 h-24 rounded-xl object-cover bg-gray-800" />
                                ) : (
                                    <div className="w-24 h-24 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-300">
                                        <FileText size={32} />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-white text-lg leading-tight mb-1 truncate">{blog.title}</h3>
                                    <p className="text-sm text-orange-400 font-medium mb-2">/{blog.slug}</p>
                                    <p className="text-gray-400 text-xs line-clamp-2">{blog.excerpt}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal Editor */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 z-[101] shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <h2 className="text-2xl font-bold mb-6">{id ? "Edit" : "Create"} Article</h2>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2"><FileText size={14} /> Title</label>
                                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 font-sans" placeholder="Amazing Blog Title" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2"><LinkIcon size={14} /> Slug (Optional)</label>
                                        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 text-sm font-sans" placeholder="amazing-blog-title" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2"><User size={14} /> Author</label>
                                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 text-sm font-sans" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2"><ImageIcon size={14} /> Featured Image URL</label>
                                    <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 font-sans" placeholder="https://example.com/featured.jpg" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Excerpt (Short Summary)</label>
                                    <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 font-sans resize-none" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Content (Markdown/HTML supported)</label>
                                    <textarea rows={8} required value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 font-sans resize-y min-h-[200px]" />
                                </div>

                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl transition-colors disabled:opacity-50">
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (id ? "Update Article" : "Publish Article")}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
