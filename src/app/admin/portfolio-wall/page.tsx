"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type WallImage = {
    id: number;
    image_url: string;
    created_at: string;
};

export default function PortfolioWallAdminPage() {
    const [images, setImages] = useState<WallImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<{current: number, total: number} | null>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/admin/portfolio-wall");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setImages(data);
        } catch (err: any) {
            setError(err.message || "Error connecting to database.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setSaving(true);
        setUploadProgress({ current: 0, total: files.length });

        try {
            for (let i = 0; i < files.length; i++) {
                setUploadProgress({ current: i + 1, total: files.length });
                const file = files[i];

                // 1. Upload to Cloudinary
                const formData = new FormData();
                formData.append('file', file);
                
                const uploadRes = await fetch('/api/admin/upload', {
                    method: 'POST',
                    body: formData
                });
                
                if (!uploadRes.ok) throw new Error(`Failed to upload ${file.name}`);
                const uploadData = await uploadRes.json();
                const cloudinaryUrl = uploadData.url;

                // 2. Save to database
                const saveRes = await fetch("/api/admin/portfolio-wall", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image_url: cloudinaryUrl }),
                });

                if (!saveRes.ok) throw new Error(`Failed to save ${file.name} to database`);
            }

            await fetchImages();
            setIsModalOpen(false);
        } catch (err: any) {
            alert("Error: " + err.message);
        } finally {
            setSaving(false);
            setUploadProgress(null);
            // Clear input
            e.target.value = '';
        }
    };

    const handleDelete = async (deleteId: number) => {
        if (!confirm("Are you sure you want to remove this image from the wall?")) return;

        try {
            const res = await fetch(`/api/admin/portfolio-wall/${deleteId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            await fetchImages();
        } catch (err: any) {
            alert("Error deleting: " + err.message);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Success Wall</h1>
                        <p className="text-gray-400 mt-1">Manage dynamic images for the "Wall of Fame" grid.</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20"
                >
                    <Plus size={18} />
                    Upload Images
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
                    <p className="text-gray-400 text-sm">Upload images to show in the scrolling portfolio wall.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((img) => (
                        <motion.div key={img.id} layout className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 relative group overflow-hidden">
                            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 mb-2">
                                <img src={img.image_url} alt="Wall item" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[10px] text-gray-500">{new Date(img.created_at).toLocaleDateString()}</span>
                                <button onClick={() => handleDelete(img.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <Trash2 size={14} />
                                </button>
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
                            onClick={() => !saving && setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 z-[101] shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-6">Upload Wall Images</h2>
                            
                            <div className="space-y-6">
                                <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-purple-500/50 transition-colors relative group">
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept="image/*"
                                        disabled={saving}
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                    />
                                    <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4 group-hover:text-purple-400 transition-colors" />
                                    <p className="text-sm text-gray-400">Click or drag images here to upload</p>
                                    <p className="text-[10px] text-gray-500 mt-2">Multiple vertical images recommended</p>
                                </div>

                                {uploadProgress && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                                            <span>Uploading...</span>
                                            <span>{uploadProgress.current} / {uploadProgress.total}</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                    <button 
                                        type="button" 
                                        disabled={saving}
                                        onClick={() => setIsModalOpen(false)} 
                                        className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
