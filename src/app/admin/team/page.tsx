"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Loader2, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TeamMember = {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_url: string;
    social_links: any;
    created_at: string;
};

export default function TeamAdminPage() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form State
    const [id, setId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [bio, setBio] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // Simple Social Links (LinkedIn, Twitter, etc)
    const [linkedin, setLinkedin] = useState("");
    const [twitter, setTwitter] = useState("");

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const res = await fetch("/api/admin/team");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setTeam(data);
        } catch (err: any) {
            setError(err.message || "Error connecting to database. Please check your config.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (member?: TeamMember) => {
        if (member) {
            setId(member.id);
            setName(member.name);
            setRole(member.role);
            setBio(member.bio || "");
            setImageUrl(member.image_url || "");

            const socials = typeof member.social_links === 'string'
                ? JSON.parse(member.social_links)
                : (member.social_links || {});

            setLinkedin(socials.linkedin || "");
            setTwitter(socials.twitter || "");
        } else {
            setId(null);
            setName("");
            setRole("");
            setBio("");
            setImageUrl("");
            setLinkedin("");
            setTwitter("");
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const social_links = JSON.stringify({ linkedin, twitter });
        const payload = { name, role, bio, image_url: imageUrl, social_links };

        try {
            const method = id ? "PUT" : "POST";
            const url = id ? `/api/admin/team/${id}` : "/api/admin/team";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save");

            await fetchTeam();
            setIsModalOpen(false);
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (deleteId: number) => {
        if (!confirm("Are you sure you want to delete this team member?")) return;

        try {
            const res = await fetch(`/api/admin/team/${deleteId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            await fetchTeam();
        } catch (err: any) {
            alert("Error deleting: " + err.message);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-gray-400 mt-2">Manage profiles displayed in the About/Team section.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20"
                >
                    <Plus size={18} />
                    Add Member
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
            ) : team.length === 0 ? (
                <div className="text-center p-20 border border-white/5 rounded-2xl bg-white/[0.02]">
                    <h3 className="text-lg font-medium text-white mb-2">No Team Members Found</h3>
                    <p className="text-gray-400 text-sm">You haven't added any team profiles yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {team.map((member) => (
                        <motion.div key={member.id} layout className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative group flex flex-col items-center text-center">

                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleOpenModal(member)} className="p-2 text-gray-400 hover:text-white bg-black/50 hover:bg-white/10 backdrop-blur-md rounded-lg transition-colors border border-white/10">
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={() => handleDelete(member.id)} className="p-2 text-gray-400 hover:text-red-400 bg-black/50 hover:bg-red-500/10 backdrop-blur-md rounded-lg transition-colors border border-white/10">
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            {member.image_url ? (
                                <img src={member.image_url} alt={member.name} className="w-24 h-24 rounded-full object-cover bg-gray-800 mb-4 border-2 border-white/10" />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 text-2xl font-bold border-2 border-purple-500/30 mb-4">
                                    {member.name.charAt(0)}
                                </div>
                            )}

                            <h3 className="font-bold text-white text-xl leading-tight">{member.name}</h3>
                            <p className="text-sm text-purple-400 font-medium mb-3">{member.role}</p>

                            {member.bio && (
                                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
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
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 z-[101] shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <h2 className="text-2xl font-bold mb-6">{id ? "Edit" : "Add"} Team Member</h2>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-sans" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Job Role</label>
                                    <input type="text" required value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-sans" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Bio (Optional)</label>
                                    <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-sans resize-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Profile Image URL</label>
                                    <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-sans" placeholder="https://example.com/avatar.jpg" />
                                </div>

                                <div className="pt-4 border-t border-white/5 space-y-4">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2"><LinkIcon size={14} /> Social Links</h3>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">LinkedIn URL</label>
                                        <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 text-sm font-sans" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Twitter/X URL</label>
                                        <input type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 text-sm font-sans" />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors disabled:opacity-50">
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile"}
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
