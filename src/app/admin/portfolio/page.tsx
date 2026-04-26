"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Loader2, BookOpen, ArrowLeft, CheckCircle2, Target, Lightbulb, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type CaseStudy = {
    id: number;
    title: string;
    slug: string;
    client_name: string;
    client_logo: string;
    description: string;
    challenge: string;
    solution: string;
    results: string;
    content: string;
    image_url: string;
    metrics: string; // JSON string
    created_at: string;
};

export default function PortfolioAdminPage() {
    const [studies, setStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form State
    const [id, setId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [clientName, setClientName] = useState("");
    const [clientLogo, setClientLogo] = useState("");
    const [description, setDescription] = useState("");
    const [challenge, setChallenge] = useState("");
    const [solution, setSolution] = useState("");
    const [results, setResults] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [metrics, setMetrics] = useState<{label: string, value: number}[]>([{label: "", value: 0}]);

    useEffect(() => {
        fetchStudies();
    }, []);

    const fetchStudies = async () => {
        try {
            const res = await fetch("/api/admin/portfolio");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setStudies(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (s?: CaseStudy) => {
        if (s) {
            setId(s.id);
            setTitle(s.title);
            setSlug(s.slug);
            setClientName(s.client_name || "");
            setClientLogo(s.client_logo || "");
            setDescription(s.description || "");
            setChallenge(s.challenge || "");
            setSolution(s.solution || "");
            setResults(s.results || "");
            setContent(s.content || "");
            setImageUrl(s.image_url);
            try {
                setMetrics(JSON.parse(s.metrics || '[{"label":"", "value":0}]'));
            } catch {
                setMetrics([{label: "", value: 0}]);
            }
        } else {
            setId(null);
            setTitle("");
            setSlug("");
            setClientName("");
            setClientLogo("");
            setDescription("");
            setChallenge("");
            setSolution("");
            setResults("");
            setContent("");
            setImageUrl("");
            setMetrics([{label: "", value: 0}]);
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = { 
            title, slug, client_name: clientName, client_logo: clientLogo, 
            description, challenge, solution, results, content, 
            image_url: imageUrl, metrics: JSON.stringify(metrics) 
        };

        try {
            const method = id ? "PUT" : "POST";
            const url = id ? `/api/admin/portfolio/${id}` : "/api/admin/portfolio";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Save failed");
            await fetchStudies();
            setIsModalOpen(false);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (deleteId: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`/api/admin/portfolio/${deleteId}`, { method: "DELETE" });
            await fetchStudies();
        } catch (err) {
            alert("Delete failed");
        }
    };

    const addMetric = () => setMetrics([...metrics, {label: "", value: 0}]);
    const updateMetric = (index: number, field: string, val: any) => {
        const newMetrics = [...metrics];
        newMetrics[index] = { ...newMetrics[index], [field]: val };
        setMetrics(newMetrics);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
                        <p className="text-gray-400 mt-1">Manage detailed success stories for the main page.</p>
                    </div>
                </div>
                <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl">
                    <Plus size={18} /> Add Case Study
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-20"><Loader2 className="animate-spin text-purple-500" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {studies.map(s => (
                        <div key={s.id} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 group relative">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <img src={s.client_logo} className="w-12 h-12 object-contain bg-white/5 rounded-lg p-2" />
                                    <div>
                                        <h3 className="font-bold text-white leading-tight">{s.client_name}</h3>
                                        <p className="text-xs text-purple-400">{s.title}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleOpenModal(s)} className="p-2 text-gray-400 hover:text-white"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(s.id)} className="p-2 text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2">{s.description}</p>
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl custom-scrollbar">
                            <h2 className="text-2xl font-bold mb-8">{id ? "Edit" : "New"} Case Study</h2>
                            <form onSubmit={handleSave} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Client Name</label>
                                        <input value={clientName} onChange={e => setClientName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none" placeholder="e.g. Emaar" /></div>
                                        <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Case Title</label>
                                        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none" placeholder="e.g. Luxury ROI Boost" /></div>
                                    </div>
                                    <div className="space-y-4">
                                        <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Slug (URL)</label>
                                        <input value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none" placeholder="emaar-case-study" /></div>
                                        <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Client Logo URL</label>
                                        <input value={clientLogo} onChange={e => setClientLogo(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none" placeholder="https://..." /></div>
                                    </div>
                                </div>

                                <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Quick Description (for Home Page)</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none resize-none" /></div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                                        <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold text-sm"><Target size={16} /> Challenge</div>
                                        <textarea value={challenge} onChange={e => setChallenge(e.target.value)} rows={4} className="w-full bg-transparent outline-none text-sm text-gray-300 resize-none" placeholder="The problem..." />
                                    </div>
                                    <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
                                        <div className="flex items-center gap-2 mb-4 text-purple-400 font-bold text-sm"><Lightbulb size={16} /> Solution</div>
                                        <textarea value={solution} onChange={e => setSolution(e.target.value)} rows={4} className="w-full bg-transparent outline-none text-sm text-gray-300 resize-none" placeholder="How we fixed it..." />
                                    </div>
                                    <div className="p-6 bg-green-500/5 border border-green-500/10 rounded-2xl">
                                        <div className="flex items-center gap-2 mb-4 text-green-400 font-bold text-sm"><CheckCircle2 size={16} /> Results</div>
                                        <textarea value={results} onChange={e => setResults(e.target.value)} rows={4} className="w-full bg-transparent outline-none text-sm text-gray-300 resize-none" placeholder="The outcome..." />
                                    </div>
                                </div>

                                <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Performance Metrics</label>
                                    <div className="space-y-4">
                                        {metrics.map((m, idx) => (
                                            <div key={idx} className="flex gap-4 items-center">
                                                <input value={m.label} onChange={e => updateMetric(idx, 'label', e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm" placeholder="Label (e.g. ROI Boost)" />
                                                <input type="number" value={m.value} onChange={e => updateMetric(idx, 'value', parseInt(e.target.value))} className="w-24 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm" />
                                                <button type="button" onClick={() => setMetrics(metrics.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={addMetric} className="text-xs font-bold text-purple-400 hover:text-purple-300">+ Add Metric</button>
                                    </div>
                                </div>

                                <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Hero Image URL</label>
                                <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none" /></div>

                                <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Main Content (Rich Text / Story)</label>
                                <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none resize-none" placeholder="Write the full story here..." /></div>

                                <div className="flex justify-end gap-4 sticky bottom-0 bg-[#0a0a0a] pt-6 border-t border-white/10">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-gray-400 font-bold">Cancel</button>
                                    <button type="submit" disabled={saving} className="px-10 py-3 bg-purple-600 rounded-xl font-bold flex items-center gap-2">
                                        {saving ? <Loader2 className="animate-spin" size={18} /> : "Save Case Study"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
