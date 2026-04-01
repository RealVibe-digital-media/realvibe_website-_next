"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CultureImage = {
    id: number;
    image_url: string;
    title: string;
    created_at: string;
};

export default function CultureAdminPage() {
    const [images, setImages] = useState<CultureImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form State
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/admin/culture");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setImages(data);
        } catch (err: any) {
            setError(err.message || "Error connecting to database.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = () => {
        setImageUrl("");
        setTitle("");
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = { image_url: imageUrl, title };

        try {
            const res = await fetch("/api/admin/culture", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save");

            await fetchImages();
            setIsModalOpen(false);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (deleteId: number) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            const res = await fetch(`/api/admin/culture/${deleteId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            await fetchImages();
        } catch (err: any) {
            alert("Error deleting: " + err.message);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Work Culture Gallery</h1>
                    <p className="text-gray-400 mt-2">Manage photos displayed in the Work Culture section.</p>
                </div>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20"
                >
                    <Plus size={18} />
                    Add Image
                </button>
            </div>

            {error ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                    <p className="font-semibold mb-1">Database Error</p>
                    <p className="text-sm opacity-80">{error}</p>
                </div>
            ) : loading ? (
                <div className="flex items-center justify-center p-20">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                </div>
            ) : images.length === 0 ? (
                <div className="text-center p-20 border border-white/5 rounded-2xl bg-white/[0.02]">
                    <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-white mb-2">No Images Found</h3>
                    <p className="text-gray-400 text-sm">You haven't added any culture photos yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img) => (
                        <motion.div key={img.id} layout className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden relative group">

                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleDelete(img.id)} className="p-2 text-white hover:text-red-400 bg-black/60 hover:bg-red-500/80 backdrop-blur-md rounded-lg transition-colors border border-white/20">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="aspect-[4/3] w-full bg-gray-900 border-b border-white/10 relative">
                                <img src={img.image_url} alt={img.title || "Culture Image"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-white text-sm">{img.title || "Untitled Image"}</h3>
                                <p className="text-xs text-gray-500 mt-1">Added {new Date(img.created_at).toLocaleDateString()}</p>
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
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 z-[101] shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-6">Add Culture Photo</h2>

                            <form onSubmit={handleSave} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                                    <input type="url" required value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-sans" placeholder="https://example.com/photo.jpg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Title / Caption (Optional)</label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-sans" placeholder="Office party..." />
                                </div>

                                {imageUrl && (
                                    <div className="mt-4 rounded-xl overflow-hidden border border-white/10 p-1 bg-white/[0.02]">
                                        <img src={imageUrl} alt="Preview" className="w-full h-auto max-h-40 object-cover rounded-lg" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={saving || !imageUrl} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors disabled:opacity-50">
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Upload Image"}
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
