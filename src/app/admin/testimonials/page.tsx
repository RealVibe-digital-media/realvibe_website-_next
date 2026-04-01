"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Loader2, MessageSquareQuote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
    id: number;
    author: string;
    role: string;
    company: string;
    content: string;
    image_url: string;
    created_at: string;
};

export default function TestimonialsAdminPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form State
    const [id, setId] = useState<number | null>(null);
    const [author, setAuthor] = useState("");
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch("/api/admin/testimonials");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setTestimonials(data);
        } catch (err: any) {
            setError(err.message || "Error connecting to database. Please check your config.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (t?: Testimonial) => {
        if (t) {
            setId(t.id);
            setAuthor(t.author);
            setRole(t.role);
            setCompany(t.company);
            setContent(t.content);
            setImageUrl(t.image_url || "");
        } else {
            setId(null);
            setAuthor("");
            setRole("");
            setCompany("");
            setContent("");
            setImageUrl("");
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = { author, role, company, content, image_url: imageUrl };

        try {
            const method = id ? "PUT" : "POST";
            const url = id ? `/api/admin/testimonials/${id}` : "/api/admin/testimonials";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save");

            await fetchTestimonials();
            setIsModalOpen(false);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (deleteId: number) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/admin/testimonials/${deleteId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            await fetchTestimonials();
        } catch (err: any) {
            alert("Error deleting: " + err.message);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
                    <p className="text-gray-400 mt-2">Manage client reviews displayed on the website.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20"
                >
                    <Plus size={18} />
                    Add New
                </button>
            </div>

            {error ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                    <p className="font-semibold mb-1">Database Connection Error</p>
                    <p className="text-sm opacity-80">{error}</p>
                    <p className="text-sm opacity-80 mt-2">Make sure you have whitelisted your IP in Hostinger Remote MySQL settings.</p>
                </div>
            ) : loading ? (
                <div className="flex items-center justify-center p-20">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                </div>
            ) : testimonials.length === 0 ? (
                <div className="text-center p-20 border border-white/5 rounded-2xl bg-white/[0.02]">
                    <MessageSquareQuote className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-white mb-2">No Testimonials Found</h3>
                    <p className="text-gray-400 text-sm">You haven't added any client testimonials yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t) => (
                        <motion.div key={t.id} layout className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    {t.image_url ? (
                                        <img src={t.image_url} alt={t.author} className="w-12 h-12 rounded-full object-cover bg-gray-800" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold border border-purple-500/30">
                                            {t.author.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-bold text-white text-lg leading-tight">{t.author}</h3>
                                        <p className="text-sm text-purple-400 font-medium">{t.role} @ {t.company}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleOpenModal(t)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed italic">"{t.content}"</p>
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
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 z-[101] shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-6">{id ? "Edit" : "Add"} Testimonial</h2>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Author Name</label>
                                    <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-sans" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Role/Job Title</label>
                                        <input type="text" required value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-sans" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                                        <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-sans" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Quote Content</label>
                                    <textarea required rows={4} value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-sans resize-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Profile Image URL (Optional)</label>
                                    <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-sans" placeholder="https://example.com/avatar.jpg" />
                                </div>

                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors disabled:opacity-50">
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Document"}
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
