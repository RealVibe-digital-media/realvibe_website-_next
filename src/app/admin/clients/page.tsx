"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ClientImage = {
    id: number;
    name: string;
    logo_url: string;
    created_at: string;
};

export default function ClientsAdminPage() {
    const [clients, setClients] = useState<ClientImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form State
    const [logoUrl, setLogoUrl] = useState("");
    const [name, setName] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await fetch("/api/admin/clients");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setClients(data);
        } catch (err: any) {
            setError(err.message || "Error connecting to database.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = () => {
        setLogoUrl("");
        setName("");
        setIsModalOpen(true);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate on client side too
        if (file.size > 5 * 1024 * 1024) {
            alert("File is too large. Maximum size is 5MB.");
            return;
        }

        setUploadingImage(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });

            // Check if response is JSON
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await res.text();
                console.error("Upload returned non-JSON:", res.status, text.substring(0, 200));
                alert("Upload failed: Server returned an unexpected response (status " + res.status + ")");
                return;
            }

            const data = await res.json();

            if (res.ok && data.url) {
                setLogoUrl(data.url);
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (err: any) {
            console.error("Upload error:", err);
            alert("Error uploading image: " + err.message);
        } finally {
            setUploadingImage(false);
            // Reset the file input so the same file can be re-selected
            e.target.value = "";
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = { logo_url: logoUrl, name };

        try {
            const res = await fetch("/api/admin/clients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save");

            await fetchClients();
            setIsModalOpen(false);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (deleteId: number) => {
        if (!confirm("Are you sure you want to delete this logo?")) return;

        try {
            const res = await fetch(`/api/admin/clients/${deleteId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            await fetchClients();
        } catch (err: any) {
            alert("Error deleting: " + err.message);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Client Logos</h1>
                    <p className="text-gray-400 mt-2">Manage the logos displayed in the Hero section's infinite scroll.</p>
                </div>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20"
                >
                    <Plus size={18} />
                    Add Logo
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
            ) : clients.length === 0 ? (
                <div className="text-center p-20 border border-white/5 rounded-2xl bg-white/[0.02]">
                    <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-white mb-2">No Logos Found</h3>
                    <p className="text-gray-400 text-sm">You haven't added any client logos yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {clients.map((client) => (
                        <motion.div key={client.id} layout className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group flex items-center justify-center h-32">

                            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleDelete(client.id)} className="p-1.5 text-white hover:text-red-400 bg-black/60 hover:bg-red-500/80 backdrop-blur-md rounded-lg transition-colors border border-white/20">
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <img src={client.logo_url} alt={client.name || "Client Logo"} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100" />

                            {client.name && (
                                <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/50 bg-black/50 mx-2 rounded backdrop-blur-sm px-1 py-0.5">{client.name}</p>
                                </div>
                            )}
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
                            <h2 className="text-2xl font-bold mb-6">Add Client Logo</h2>

                            <form onSubmit={handleSave} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Company Name (Optional)</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-sans" placeholder="Acme Corp" />
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-400">Logo Image source</label>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* OPTION 1: URL input */}
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">1. Paste URL</span>
                                            <input
                                                type="url"
                                                value={logoUrl}
                                                onChange={(e) => setLogoUrl(e.target.value)}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-sans h-[72px]"
                                                placeholder="https://example.com/logo.png"
                                            />
                                        </div>

                                        {/* OPTION 2: File Upload */}
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">2. Or Upload File</span>
                                            <label className="relative flex items-center justify-center px-4 py-3 bg-white/5 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-500 hover:bg-white/10 transition-colors cursor-pointer group h-[72px]">
                                                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploadingImage} />

                                                {uploadingImage ? (
                                                    <div className="flex items-center gap-2 text-purple-400">
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        <span className="text-sm">Uploading...</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-purple-300">
                                                        <ImageIcon className="w-5 h-5 opacity-70" />
                                                        <span className="text-sm font-medium">Browse Computer</span>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {logoUrl && !uploadingImage && (
                                    <div className="mt-4 rounded-xl flex items-center justify-center p-6 bg-white border border-white/10">
                                        <img src={logoUrl} alt="Preview" className="max-w-full max-h-20 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={saving || !logoUrl} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors disabled:opacity-50">
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Logo"}
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
