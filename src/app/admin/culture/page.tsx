"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Loader2, Image as ImageIcon, X, UploadCloud, CheckCircle2 } from "lucide-react";
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
    const [uploading, setUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;
        setUploading(true);

        try {
            const uploadedUrls: { image_url: string; title: string }[] = [];

            // 1. Upload each file to Cloudinary
            for (const file of selectedFiles) {
                const formData = new FormData();
                formData.append('file', file);

                const uploadRes = await fetch('/api/admin/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadRes.ok) throw new Error(`Failed to upload ${file.name}`);
                const uploadData = await uploadRes.json();
                uploadedUrls.push({ image_url: uploadData.url, title: file.name.split('.')[0] });
            }

            // 2. Save all URLs to DB via bulk API
            const saveRes = await fetch("/api/admin/culture", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(uploadedUrls),
            });

            if (!saveRes.ok) throw new Error("Failed to save to database");

            await fetchImages();
            setIsModalOpen(false);
            setSelectedFiles([]);
        } catch (err: any) {
            alert("Upload Error: " + err.message);
        } finally {
            setUploading(false);
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
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20"
                >
                    <Plus size={18} />
                    Add Culture Photos
                </button>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !uploading && setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 z-[101] shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Upload Photos</h2>
                                {!uploading && (
                                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors">
                                        <X size={20} />
                                    </button>
                                )}
                            </div>

                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-purple-500/50 hover:bg-purple-500/5 transition-all cursor-pointer group"
                            >
                                <input 
                                    type="file" 
                                    multiple 
                                    ref={fileInputRef} 
                                    onChange={handleFileSelect} 
                                    className="hidden" 
                                    accept="image/*"
                                />
                                <UploadCloud className="w-12 h-12 text-gray-500 mx-auto mb-4 group-hover:text-purple-500 transition-colors" />
                                <p className="text-white font-medium">Click to browse or drag photos here</p>
                                <p className="text-gray-500 text-sm mt-1">Select multiple photos at once</p>
                            </div>

                            {selectedFiles.length > 0 && (
                                <div className="mt-6 max-h-60 overflow-y-auto space-y-2 p-2">
                                    {selectedFiles.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <ImageIcon className="text-purple-500" size={16} />
                                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                            </div>
                                            <button onClick={() => removeFile(idx)} className="p-1 hover:text-red-400">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={uploading}
                                    className="px-6 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading || selectedFiles.length === 0}
                                    className="flex items-center gap-2 px-8 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Uploading {selectedFiles.length} Photos...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={18} />
                                            Upload All
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {images.map((img) => (
                        <motion.div key={img.id} layout className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden relative group">
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleDelete(img.id)} className="p-2 text-white hover:text-red-400 bg-black/60 hover:bg-red-500/80 backdrop-blur-md rounded-lg transition-colors border border-white/20">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="aspect-square w-full bg-gray-900 border-b border-white/10 relative">
                                <img src={img.image_url} alt={img.title || "Culture Image"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <p className="text-xs text-white/70 truncate">{img.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
