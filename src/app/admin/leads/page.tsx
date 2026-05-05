"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Loader2, Trash2, Mail, Phone, Calendar, Building, FileText, CheckCircle2 } from "lucide-react";

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string | null;
    service: string;
    source_page: string | null;
    message: string | null;
    created_at: string;
}

export default function LeadsAdminPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState<string>("all");

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/admin/leads");
            if (!res.ok) throw new Error("Failed to fetch leads");
            const data = await res.json();
            setLeads(data.leads || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this lead? This action cannot be undone.")) return;

        setDeletingId(id);
        try {
            const res = await fetch(`/api/admin/leads/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete lead");
            setLeads(leads.filter(l => l.id !== id));
        } catch (err: any) {
            alert(err.message);
        } finally {
            setDeletingId(null);
        }
    };

    const filteredLeads = filter === "all" ? leads : leads.filter(l => l.service === filter);

    const services = Array.from(new Set(leads.map(l => l.service)));

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Service Leads</h1>
                    <p className="text-gray-400">Manage enquiries from your service pages.</p>
                </div>

                {/* Filters */}
                {services.length > 0 && (
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}
                        >
                            All
                        </button>
                        {services.map(s => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${filter === s ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}
                            >
                                {s.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
                    <span className="shrink-0">⚠️</span>
                    <p>{error}</p>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Leads Yet</h3>
                    <p className="text-gray-400">Incoming leads from your service pages will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredLeads.map((lead) => (
                        <div key={lead.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors group overflow-hidden">
                            {/* Header: Name + Badges + Delete */}
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                                <h3 className="text-xl font-bold text-white">{lead.name}</h3>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider capitalize border border-purple-500/20">
                                        {lead.service.replace('-', ' ')}
                                    </span>
                                    {lead.source_page && (
                                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                            Source: {lead.source_page}
                                        </span>
                                    )}
                                    <button
                                        onClick={() => handleDelete(lead.id)}
                                        disabled={deletingId === lead.id}
                                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        title="Delete Lead"
                                    >
                                        {deletingId === lead.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Left Col: Contact Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-300 text-sm">
                                        <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                                        <a href={`mailto:${lead.email}`} className="hover:text-white transition-colors truncate">{lead.email}</a>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-300 text-sm">
                                        <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                                        <a href={`tel:${lead.phone}`} className="hover:text-white transition-colors">{lead.phone}</a>
                                    </div>
                                    {lead.company && (
                                        <div className="flex items-center gap-3 text-gray-300 text-sm">
                                            <Building className="w-4 h-4 text-gray-500 shrink-0" />
                                            <span>{lead.company}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                                        <Calendar className="w-4 h-4 shrink-0" />
                                        <time>{format(new Date(lead.created_at), 'PPP ')}</time>
                                    </div>
                                </div>

                                {/* Right Col: Message */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <FileText className="w-4 h-4" /> Message
                                    </h4>
                                    <div className="bg-black/30 rounded-xl p-4 text-gray-300 text-sm leading-relaxed border border-white/5 min-h-[100px]">
                                        {lead.message || <span className="text-gray-600 italic">No additional message provided.</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
