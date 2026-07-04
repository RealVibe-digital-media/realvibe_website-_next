'use client';

import { useState, useEffect } from 'react';
import { PortfolioItem } from '@/data/projects';
import toast from 'react-hot-toast';
import ConfirmDialog from '@/components/portfolio/ConfirmDialog';
import { getAutoThumbnail } from '@/lib/portfolio/videoUtils';

interface SubProjectItem {
    id: string;
    name: string;
    slug: string;
    clientId: string;
    thumbnail: string;
    description?: string;
    videoUrl?: string;
    priority: number;
}

interface ClientItem {
    id: string;
    name: string;
    slug: string;
    logo: string;
    type: 'Developer' | 'Broker';
    priority: number;
}

interface CategoryItem {
    id: string;
    name: string;
    priority: number;
}

export default function AdminDashboard() {
    const [projects, setProjects] = useState<PortfolioItem[]>([]);
    const [clients, setClients] = useState<ClientItem[]>([]);
    const [subProjects, setSubProjects] = useState<SubProjectItem[]>([]);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form State
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedSubProject, setSelectedSubProject] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Creatives');
    const [tags, setTags] = useState('');
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [assetPriority, setAssetPriority] = useState(0);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Client Management
    const [newClientName, setNewClientName] = useState('');
    const [newClientType, setNewClientType] = useState<'Developer' | 'Broker'>('Developer');

    const [newInitialProjectName, setNewInitialProjectName] = useState('');
    const [newInitialProjectDescription, setNewInitialProjectDescription] = useState('');
    const [newInitialProjectVideoUrl, setNewInitialProjectVideoUrl] = useState('');
    const [initialProjectThumbnailFile, setInitialProjectThumbnailFile] = useState<File | null>(null);
    const [clientLogoFile, setClientLogoFile] = useState<File | null>(null);
    const [isAddingClient, setIsAddingClient] = useState(false);

    // Editing State
    const [editingClient, setEditingClient] = useState<ClientItem | null>(null);
    const [editingSubProject, setEditingSubProject] = useState<SubProjectItem | null>(null);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editPriority, setEditPriority] = useState(0);
    const [editingAsset, setEditingAsset] = useState<PortfolioItem | null>(null);
    const [editAssetCategory, setEditAssetCategory] = useState('');
    const [isSavingEdit, setIsSavingEdit] = useState(false);

    // SubProject Management
    const [newSubProjectName, setNewSubProjectName] = useState('');
    const [newSubProjectClientId, setNewSubProjectClientId] = useState('');
    const [subProjectDescription, setSubProjectDescription] = useState('');
    const [newSubProjectVideoUrl, setNewSubProjectVideoUrl] = useState('');

    const [newSubProjectThumbnailFile, setNewSubProjectThumbnailFile] = useState<File | null>(null);
    const [isAddingSubProject, setIsAddingSubProject] = useState(false);

    // Category Management
    const [newCategoryName, setNewCategoryName] = useState('');

    const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    // Confirm Dialog State
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
    });

    // Filter State
    const [filterClient, setFilterClient] = useState<string>('All');
    const [filterSubProject, setFilterSubProject] = useState<string>('All');
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

    // Active Tab
    const [activeTab, setActiveTab] = useState<'upload' | 'clients' | 'categories' | 'priorities'>('upload');

    // Priority editing state for the dedicated Priorities tab
    const [priorityEdits, setPriorityEdits] = useState<Record<string, number>>({});
    const [isSavingPriorities, setIsSavingPriorities] = useState(false);

    useEffect(() => {
        fetchProjects();
        fetchClients();
        fetchSubProjects();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedClient) {
            const clientProjects = subProjects.filter(sp => sp.clientId === selectedClient);
            if (clientProjects.length > 0) {
                // Only auto-select if current selection is not in the new client's projects
                const currentStillValid = clientProjects.some(sp => sp.id === selectedSubProject);
                if (!currentStillValid) {
                    setSelectedSubProject(clientProjects[0].id);
                }
            } else {
                setSelectedSubProject('');
            }
        } else {
            setSelectedSubProject('');
        }
    }, [selectedClient, subProjects]);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/portfolio/projects');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            if (Array.isArray(data)) {
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects', error);
            toast.error('Failed to load projects');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchClients = async () => {
        try {
            const res = await fetch('/api/portfolio/clients');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            if (Array.isArray(data)) {
                setClients(data);
            }
        } catch (error) {
            console.error('Failed to fetch clients', error);
        }
    };

    const fetchSubProjects = async () => {
        try {
            const res = await fetch('/api/portfolio/sub-projects');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            if (Array.isArray(data)) {
                setSubProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch sub-projects', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/portfolio/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
                if (data.length > 0 && !selectedCategory) {
                    setSelectedCategory(data[0].name);
                }
            }
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        setIsAddingCategory(true);
        try {
            const res = await fetch('/api/portfolio/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategoryName }),
            });
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
                setNewCategoryName('');
                toast.success('Category added!');
            }
        } catch (error) {
            toast.error('Failed to add category');
        } finally {
            setIsAddingCategory(false);
        }
    };


    const handleDeleteCategory = async (id: string, name: string) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Category',
            message: `Are you sure you want to delete "${name}"? Items in this category will remain but their category name might become invalid.`,
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/portfolio/categories?id=${id}`, { method: 'DELETE' });
                    if (res.ok) {
                        const data = await res.json();
                        setCategories(data);
                        toast.success('Category deleted!');
                    }
                } catch (error) {
                    toast.error('Failed to delete category');
                }
            },
        });
    };

    const handleSaveAllPriorities = async () => {
        const editsCount = Object.keys(priorityEdits).length;
        if (editsCount === 0) {
            toast('No changes to save');
            return;
        }

        setIsSavingPriorities(true);
        try {
            const promises = Object.entries(priorityEdits).map(([id, priority]) =>
                fetch(`/api/portfolio/clients`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, priority })
                })
            );

            await Promise.all(promises);
            toast.success(`Updated ${editsCount} priorities!`);
            setPriorityEdits({});
            fetchClients();
        } catch (error) {
            console.error('Error saving priorities', error);
            toast.error('Failed to save some priorities');
        } finally {
            setIsSavingPriorities(false);
        }
    };

    // --- Client Management ---

    const handleAddClient = async () => {
        if (!newClientName.trim()) {
            toast.error('Client name is required');
            return;
        }

        setIsAddingClient(true);

        try {
            let logoUrl = '';
            let initialProjectThumbnailUrl = '';

            // Upload logo if provided
            if (clientLogoFile) {
                const formData = new FormData();
                formData.append('file', clientLogoFile);
                const uploadRes = await fetch('/api/portfolio/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (uploadRes.ok) {
                    const { url } = await uploadRes.json();
                    logoUrl = url;
                } else {
                    toast.error('Failed to upload logo');
                    setIsAddingClient(false);
                    return;
                }
            }

            // Upload initial project thumbnail if provided
            if (initialProjectThumbnailFile) {
                const formData = new FormData();
                formData.append('file', initialProjectThumbnailFile);
                const uploadRes = await fetch('/api/portfolio/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (uploadRes.ok) {
                    const { url } = await uploadRes.json();
                    initialProjectThumbnailUrl = url;
                } else {
                    toast.error('Failed to upload project thumbnail');
                    setIsAddingClient(false);
                    return;
                }
            }

            // Auto-thumbnail if video URL provided and no thumbnail uploaded
            if (!initialProjectThumbnailUrl && newInitialProjectVideoUrl) {
                const autoThumb = getAutoThumbnail(newInitialProjectVideoUrl);
                if (autoThumb) {
                    initialProjectThumbnailUrl = autoThumb;
                }
            }

            const res = await fetch('/api/portfolio/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newClientName,
                    logo: logoUrl,
                    type: newClientType,
                    initialProjectName: newInitialProjectName,
                    initialProjectDescription: newInitialProjectDescription,
                    initialProjectThumbnail: initialProjectThumbnailUrl,
                    videoUrl: newInitialProjectVideoUrl,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(`Client "${newClientName}" added!`);
                setNewClientName('');
                setNewInitialProjectName('');
                setNewInitialProjectDescription('');
                setNewInitialProjectVideoUrl('');
                setInitialProjectThumbnailFile(null);
                setClientLogoFile(null);
                fetchClients();
                fetchSubProjects();
            } else {
                toast.error(data.error || 'Failed to add client');
            }
        } catch (error) {
            console.error('Error adding client:', error);
            toast.error('Failed to add client');
        } finally {
            setIsAddingClient(false);
        }
    };

    const handleDeleteClient = async (id: string, name: string) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Client',
            message: `Are you sure you want to delete "${name}"? All projects and assets associated with this client will be unreachable.`,
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/portfolio/clients?id=${id}`, { method: 'DELETE' });
                    if (res.ok) {
                        toast.success(`Client "${name}" deleted!`);
                        fetchClients();
                    } else {
                        toast.error('Failed to delete client');
                    }
                } catch (error) {
                    toast.error('Failed to delete client');
                }
            },
        });
    };

    const handleEditClient = async () => {
        if (!editingClient || !editName) return;
        setIsSavingEdit(true);
        try {
            const res = await fetch('/api/portfolio/clients', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingClient.id,
                    name: editName,
                }),
            });
            if (res.ok) {
                toast.success('Client updated!');
                setEditingClient(null);
                fetchClients();
            } else {
                toast.error('Failed to update client');
            }
        } catch (error) {
            toast.error('Failed to update client');
        } finally {
            setIsSavingEdit(false);
        }
    };

    const handleEditSubProject = async () => {
        if (!editingSubProject || !editName) return;
        setIsSavingEdit(true);
        try {
            const res = await fetch('/api/portfolio/sub-projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingSubProject.id,
                    name: editName,
                    description: editDescription,
                }),
            });
            if (res.ok) {
                toast.success('Project updated!');
                setEditingSubProject(null);
                fetchSubProjects();
            } else {
                toast.error('Failed to update project');
            }
        } catch (error) {
            toast.error('Error updating project');
        } finally {
            setIsSavingEdit(false);
        }
    };

    const handleEditCategory = async () => {
        if (!editingCategory || !editName) return;
        setIsSavingEdit(true);
        try {
            const res = await fetch('/api/portfolio/categories', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingCategory.id,
                    name: editName,
                }),
            });
            if (res.ok) {
                toast.success('Category updated!');
                setEditingCategory(null);
                fetchCategories();
            } else {
                toast.error('Failed to update category');
            }
        } catch (error) {
            toast.error('Failed to update category');
        } finally {
            setIsSavingEdit(false);
        }
    };

    const handleEditAsset = async () => {
        if (!editingAsset || !editName.trim()) return;
        setIsSavingEdit(true);
        try {
            const res = await fetch('/api/portfolio/projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingAsset.id,
                    title: editName,
                    category: editAssetCategory,
                }),
            });
            if (res.ok) {
                toast.success('Asset updated!');
                setEditingAsset(null);
                fetchProjects();
            } else {
                toast.error('Failed to update asset');
            }
        } catch (error) {
            toast.error('Failed to update asset');
        } finally {
            setIsSavingEdit(false);
        }
    };

    // --- SubProject Management ---

    const handleAddSubProject = async () => {
        if (!newSubProjectName.trim() || !newSubProjectClientId) {
            toast.error('Project name and client are required');
            return;
        }

        setIsAddingSubProject(true);

        try {
            let thumbnailUrl = '';

            if (newSubProjectThumbnailFile) {
                const formData = new FormData();
                formData.append('file', newSubProjectThumbnailFile);
                const uploadRes = await fetch('/api/portfolio/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (uploadRes.ok) {
                    const { url } = await uploadRes.json();
                    thumbnailUrl = url;
                } else {
                    toast.error('Failed to upload thumbnail');
                    setIsAddingSubProject(false);
                    return;
                }
            }

            // Auto-thumbnail if video URL provided and no thumbnail uploaded
            if (!thumbnailUrl && newSubProjectVideoUrl) {
                const autoThumb = getAutoThumbnail(newSubProjectVideoUrl);
                if (autoThumb) {
                    thumbnailUrl = autoThumb;
                }
            }

            const res = await fetch('/api/portfolio/sub-projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newSubProjectName,
                    clientId: newSubProjectClientId,
                    description: subProjectDescription,
                    thumbnail: thumbnailUrl,
                    videoUrl: newSubProjectVideoUrl,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(`Project "${newSubProjectName}" added!`);
                setNewSubProjectName('');
                setSubProjectDescription('');
                setNewSubProjectVideoUrl('');
                setNewSubProjectThumbnailFile(null);
                fetchSubProjects();
            } else {
                toast.error(data.error || 'Failed to add project');
            }
        } catch (error) {
            console.error('Error adding project:', error);
            toast.error('Failed to add project');
        } finally {
            setIsAddingSubProject(false);
        }
    };

    const handleDeleteSubProject = async (id: string, name: string) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Project',
            message: `Are you sure you want to delete "${name}"? Assets linked to this project will remain but won't appear on the project page.`,
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/portfolio/sub-projects?id=${id}`, { method: 'DELETE' });
                    if (res.ok) {
                        toast.success(`Project "${name}" deleted!`);
                        fetchSubProjects();
                    } else {
                        toast.error('Failed to delete project');
                    }
                } catch (error) {
                    toast.error('Failed to delete project');
                }
            },
        });
    };

    // --- File Upload ---

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const newImages: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);

            try {
                const res = await fetch('/api/portfolio/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (res.ok) {
                    const { url } = await res.json();
                    newImages.push(url);
                }
            } catch (error) {
                console.error('Upload error', error);
                toast.error('Failed to upload image');
            }
        }

        setUploadedImages(prev => [...prev, ...newImages]);
        setIsUploading(false);
        if (newImages.length > 0) {
            toast.success(`Uploaded ${newImages.length} image(s)`);
        }
    };

    // --- Project CRUD ---

    const handleDelete = async (id: string) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Content',
            message: 'Are you sure you want to delete this item? This action cannot be undone.',
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/portfolio/projects?id=${id}`, { method: 'DELETE' });
                    if (res.ok) {
                        toast.success('Deleted successfully!');
                        fetchProjects();
                        setSelectedProjects(prev => prev.filter(pid => pid !== id));
                    } else {
                        toast.error('Failed to delete');
                    }
                } catch (error) {
                    toast.error('Failed to delete');
                }
            },
        });
    };

    const toggleSelectProject = (id: string) => {
        setSelectedProjects(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const filteredProjects = filterClient === 'All'
        ? projects
        : projects.filter(p => p.clientId === filterClient);

    const toggleSelectAll = () => {
        if (selectedProjects.length === filteredProjects.length) {
            setSelectedProjects([]);
        } else {
            setSelectedProjects(filteredProjects.map(p => p.id));
        }
    };

    const handleBulkDelete = () => {
        if (selectedProjects.length === 0) {
            toast.error('No items selected');
            return;
        }

        setConfirmDialog({
            isOpen: true,
            title: 'Delete Multiple Items',
            message: `Are you sure you want to delete ${selectedProjects.length} item(s)?`,
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/portfolio/projects?ids=${encodeURIComponent(JSON.stringify(selectedProjects))}`, {
                        method: 'DELETE',
                    });
                    if (res.ok) {
                        toast.success(`Deleted ${selectedProjects.length} item(s)!`);
                        setSelectedProjects([]);
                        fetchProjects();
                    }
                } catch (error) {
                    toast.error('Failed to delete some items');
                }
            },
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedClient) {
            toast.error('Please select a client');
            return;
        }

        if (!selectedSubProject) {
            toast.error('Please select a project');
            return;
        }

        if (selectedCategory === 'Creatives' && uploadedImages.length === 0) {
            toast.error('Please upload at least one image');
            return;
        }
        if (selectedCategory !== 'Creatives' && !title) {
            toast.error('Title is required');
            return;
        }
        if (selectedCategory !== 'Creatives' && uploadedImages.length === 0) {
            // Check if we can auto-generate a thumbnail
            const autoThumb = getAutoThumbnail(link);
            if (!autoThumb) {
                toast.error('Image is required (or provide a valid video link)');
                return;
            }
        }

        setIsSubmitting(true);

        try {
            if (selectedCategory === 'Creatives') {
                const newItems = uploadedImages.map(img => ({
                    category: 'Creatives',
                    image: img,
                    tags: tags,
                    title: tags || 'Creative',
                    link: link,
                    clientId: selectedClient,
                    subProjectId: selectedSubProject,
                }));

                for (const item of newItems) {
                    await fetch('/api/portfolio/projects', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item),
                    });
                }
            } else {
                let imageUrl = uploadedImages[0];

                // Auto-thumbnail for videos if no image uploaded
                if (!imageUrl && link) {
                    const autoThumb = getAutoThumbnail(link);
                    if (autoThumb) {
                        imageUrl = autoThumb;
                    }
                }

                if (!imageUrl) {
                    toast.error('Please upload an image or provide a valid video link');
                    setIsSubmitting(false);
                    return;
                }

                const newItem = {
                    category: selectedCategory,
                    image: imageUrl,
                    title: title,
                    link: link,
                    tags: tags,
                    clientId: selectedClient,
                    subProjectId: selectedSubProject,
                };

                await fetch('/api/portfolio/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newItem),
                });
            }

            toast.success('Successfully uploaded content!');
            setLink('');
            setTitle('');
            setTags('');
            setAssetPriority(0);
            setUploadedImages([]);
            fetchProjects();

        } catch (error) {
            console.error('Error saving', error);
            toast.error('Failed to save');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper helpers
    const getClientName = (clientId?: string) => {
        if (!clientId) return 'No Client';
        const client = clients.find(c => c.id === clientId);
        return client ? client.name : 'Unknown';
    };

    const getSubProjectName = (subProjectId?: string) => {
        if (!subProjectId) return 'No Project';
        const sp = subProjects.find(s => s.id === subProjectId);
        return sp ? sp.name : 'Unknown';
    };

    if (isLoading) return <div className="p-10 text-white">Loading...</div>;

    return (
        <div className="text-white relative">

            <div className="pt-4 pb-20 max-w-7xl mx-auto">
                <div className="flex justify-center mb-12">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient-x drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] font-['Outfit']">
                        ADMIN
                    </h1>
                </div>

                <div className="flex justify-center gap-4 mb-10">
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 ${activeTab === 'upload'
                            ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white border-transparent shadow-xl'
                            : 'bg-black/40 text-gray-300 border-white/20 hover:border-pink-500/60'
                            }`}
                    >
                        Upload Content
                    </button>
                    <button
                        onClick={() => setActiveTab('clients')}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 ${activeTab === 'clients'
                            ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white border-transparent shadow-xl'
                            : 'bg-black/40 text-gray-300 border-white/20 hover:border-pink-500/60'
                            }`}
                    >
                        Manage Clients ({clients.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 ${activeTab === 'categories'
                            ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white border-transparent shadow-xl'
                            : 'bg-black/40 text-gray-300 border-white/20 hover:border-pink-500/60'
                            }`}
                    >
                        Categories ({categories.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('priorities')}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 ${activeTab === 'priorities'
                            ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white border-transparent shadow-xl'
                            : 'bg-black/40 text-gray-300 border-white/20 hover:border-pink-500/60'
                            }`}
                    >
                        Set Priorities
                    </button>
                </div>

                {activeTab === 'clients' ? (
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Add Client */}
                        <div className="bg-gray-900 p-8 rounded-xl border border-white/10 shadow-2xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                Add New Client
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Client Name</label>
                                        <input
                                            type="text"
                                            value={newClientName}
                                            onChange={(e) => setNewClientName(e.target.value)}
                                            placeholder="e.g. Signature Global"
                                            className="w-full bg-black border border-white/20 rounded px-5 .5 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Client Type</label>
                                        <select
                                            value={newClientType}
                                            onChange={(e) => setNewClientType(e.target.value as 'Developer' | 'Broker')}
                                            className="w-full bg-black border border-white/20 rounded pl-4 pr-10 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        >
                                            <option value="Developer">Developer</option>
                                            <option value="Broker">Broker</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Client Logo</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setClientLogoFile(e.target.files?.[0] || null)}
                                            className="w-full bg-black border border-white/20 rounded px-5 .5 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 bg-black/30 p-4 rounded-lg border border-white/5">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Initial Project (Optional)</h3>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Project Name</label>
                                    <input
                                        type="text"
                                        value={newInitialProjectName}
                                        onChange={(e) => setNewInitialProjectName(e.target.value)}
                                        placeholder="e.g. Signature Global"
                                        className="w-full bg-black border border-white/10 rounded px-5 .5 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Description</label>
                                    <textarea
                                        value={newInitialProjectDescription}
                                        onChange={(e) => setNewInitialProjectDescription(e.target.value)}
                                        placeholder="Brief project summary..."
                                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Project Video URL (Optional)</label>
                                    <input
                                        type="text"
                                        value={newInitialProjectVideoUrl}
                                        onChange={(e) => setNewInitialProjectVideoUrl(e.target.value)}
                                        placeholder="YouTube or Google Drive link..."
                                        className="w-full bg-black border border-white/10 rounded px-5 .5 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleAddClient}
                                disabled={isAddingClient}
                                className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(5,150,105,0.4)] transition-all disabled:opacity-50"
                            >
                                {isAddingClient ? 'Adding...' : 'Add Client & Project'}
                            </button>
                        </div>

                        {/* Combined Client & Project List */}
                        <div className="bg-gray-900 p-8 rounded-xl border border-white/10">
                            <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
                                Clients & Projects ({clients.length})
                                <span className="text-sm font-normal text-gray-500">Integrated Management</span>
                            </h2>
                            <div className="space-y-6">
                                {clients.map(client => (
                                    <div key={client.id} className="bg-black/40 rounded-xl border border-white/10 overflow-hidden">
                                        {/* Client Header */}
                                        <div className="flex items-center gap-4 p-5 bg-black/60 border-b border-white/5">
                                            <img
                                                src={client.logo || '/logo.png'}
                                                alt={client.name}
                                                className="w-14 h-14 object-cover rounded-lg border border-white/10"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-bold text-lg">{client.name}</h3>
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-gray-400 border border-white/10 uppercase tracking-wider">{client.type}</span>
                                                </div>
                                                <p className="text-gray-500 text-xs mt-1 tracking-widest uppercase">SLUG: {client.slug}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingClient(client);
                                                        setEditName(client.name);
                                                    }}
                                                    className="px-4 py-2 bg-blue-600/10 text-blue-400 text-xs font-bold rounded hover:bg-blue-600/20 transition-all border border-blue-600/20"
                                                >
                                                    Edit Client
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClient(client.id, client.name)}
                                                    className="px-4 py-2 bg-red-600/10 text-red-400 text-xs font-bold rounded hover:bg-red-600/20 transition-all border border-red-600/20"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        {/* Projects Sub-list */}
                                        <div className="p-5 bg-black/20">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Projects</h4>
                                                <button
                                                    onClick={() => {
                                                        setNewSubProjectClientId(client.id);
                                                        setIsAddingSubProject(true);
                                                    }}
                                                    className="text-[10px] font-bold text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 bg-green-400/5 px-2 py-1 rounded border border-green-500/20"
                                                >
                                                    + New Project
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                {subProjects.filter(sp => sp.clientId === client.id).map(sp => (
                                                    <div key={sp.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 group hover:border-white/10 transition-colors">
                                                        <div>
                                                            <span className="text-sm font-medium text-gray-200">{sp.name}</span>
                                                            <p className="text-[10px] text-gray-500 mt-0.5">/{sp.slug}</p>
                                                        </div>
                                                        <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingSubProject(sp);
                                                                    setEditName(sp.name);
                                                                    setEditDescription(sp.description || '');
                                                                }}
                                                                className="text-[10px] font-bold text-gray-400 hover:text-blue-400 transition-colors bg-white/5 px-2 py-1 rounded"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteSubProject(sp.id, sp.name)}
                                                                className="text-[10px] font-bold text-gray-400 hover:text-red-400 transition-colors bg-white/5 px-2 py-1 rounded"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {subProjects.filter(sp => sp.clientId === client.id).length === 0 && (
                                                    <p className="text-[10px] text-gray-600 italic">No projects added yet.</p>
                                                )}
                                            </div>

                                            {/* Inline Add Project Form */}
                                            {isAddingSubProject && newSubProjectClientId === client.id && (
                                                <div className="mt-4 p-4 bg-green-400/5 border border-green-500/20 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <h5 className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-3">Adding Project for {client.name}</h5>
                                                    <div className="space-y-3">
                                                        <input
                                                            type="text"
                                                            value={newSubProjectName}
                                                            onChange={(e) => setNewSubProjectName(e.target.value)}
                                                            placeholder="Project Name..."
                                                            className="w-full bg-black/50 border border-green-500/20 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500/40"
                                                        />
                                                        <textarea
                                                            value={subProjectDescription}
                                                            onChange={(e) => setSubProjectDescription(e.target.value)}
                                                            placeholder="Optional description..."
                                                            className="w-full bg-black/50 border border-green-500/20 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500/40 h-16"
                                                        />
                                                        <div className="space-y-1">
                                                            <label className="block text-[10px] text-gray-500 ml-1">Video URL (Optional)</label>
                                                            <input
                                                                type="text"
                                                                value={newSubProjectVideoUrl}
                                                                onChange={(e) => setNewSubProjectVideoUrl(e.target.value)}
                                                                placeholder="Paste link for auto-thumbnail..."
                                                                className="w-full bg-black/50 border border-green-500/20 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500/40"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="block text-[10px] text-gray-500 ml-1">Thumbnail (Optional)</label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => setNewSubProjectThumbnailFile(e.target.files?.[0] || null)}
                                                                className="w-full bg-black/50 border border-green-500/20 rounded px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-green-500/40"
                                                            />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={handleAddSubProject}
                                                                className="flex-1 bg-green-600 text-white text-[10px] font-bold py-2 rounded hover:bg-green-500 transition-colors"
                                                            >
                                                                Confirm Add
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setIsAddingSubProject(false);
                                                                    setNewSubProjectClientId('');
                                                                    setNewSubProjectName('');
                                                                    setSubProjectDescription('');
                                                                }}
                                                                className="px-4 bg-white/10 text-gray-400 text-[10px] font-bold py-2 rounded hover:bg-white/20 transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {clients.length === 0 && (
                                    <p className="text-gray-500 text-sm text-center py-12">No clients found. Add your first client above.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'categories' ? (
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Add Category */}
                        <div className="bg-gray-900 p-8 rounded-xl border border-white/10 shadow-2xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                Add New Category
                            </h2>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="e.g. 3D Animation"
                                    className="flex-[2] bg-black border border-white/20 rounded px-5 .5 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                                />
                                <button
                                    onClick={handleAddCategory}
                                    disabled={isAddingCategory || !newCategoryName.trim()}
                                    className="px-8 bg-green-600 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(5,150,105,0.4)] transition-all disabled:opacity-50"
                                >
                                    {isAddingCategory ? 'Adding...' : 'Add'}
                                </button>
                            </div>
                        </div>

                        {/* Category List */}
                        <div className="bg-gray-900 p-8 rounded-xl border border-white/10">
                            <h2 className="text-xl font-bold mb-6">Existing Categories ({categories.length})</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {categories.map(category => (
                                    <div key={category.id} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/10 group hover:border-white/20 transition-all">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg">{category.name}</h3>
                                            <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">ID: {category.id}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingCategory(category);
                                                    setEditName(category.name);
                                                }}
                                                className="px-3 py-1.5 bg-blue-600/10 text-blue-400 text-xs font-bold rounded hover:bg-blue-600/20 transition-all border border-blue-600/20"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category.id, category.name)}
                                                className="px-3 py-1.5 bg-red-600/10 text-red-400 text-xs font-bold rounded hover:bg-red-600/20 transition-all border border-red-600/20"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {categories.length === 0 && (
                                <p className="text-gray-500 text-sm text-center py-12">No categories found. Add your first category above.</p>
                            )}
                        </div>
                    </div>
                ) : activeTab === 'priorities' ? (
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="bg-gray-900 p-8 rounded-xl border border-white/10 shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Set Priorities</h2>
                                    <p className="text-gray-400 text-sm mt-1">Lower numbers appear first on the website.</p>
                                </div>
                                <button
                                    onClick={handleSaveAllPriorities}
                                    disabled={isSavingPriorities}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isSavingPriorities ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : 'Save All Priorities'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Developers Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                        <h3 className="text-lg font-bold text-gray-200">Developers</h3>
                                        <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 uppercase font-bold uppercase tracking-widest">Client Type</span>
                                    </div>
                                    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                        {clients.filter(c => c.type === 'Developer').map(client => (
                                            <div key={client.id} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <img src={client.logo || '/logo.png'} className="w-10 h-10 object-cover rounded shadow-lg" alt="" />
                                                    <span className="font-bold text-sm text-gray-200">{client.name}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Priority</span>
                                                    <input
                                                        type="number"
                                                        value={priorityEdits[client.id] ?? client.priority ?? 0}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            setPriorityEdits(prev => ({ ...prev, [client.id]: isNaN(val) ? 0 : val }));
                                                        }}
                                                        className="w-16 bg-black border border-white/20 rounded px-2 py-1.5 text-center text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Brokers Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                        <h3 className="text-lg font-bold text-gray-200">Brokers</h3>
                                        <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 uppercase font-bold uppercase tracking-widest">Client Type</span>
                                    </div>
                                    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                        {clients.filter(c => c.type === 'Broker').map(client => (
                                            <div key={client.id} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 group hover:border-purple-500/30 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <img src={client.logo || '/logo.png'} className="w-10 h-10 object-cover rounded shadow-lg" alt="" />
                                                    <span className="font-bold text-sm text-gray-200">{client.name}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Priority</span>
                                                    <input
                                                        type="number"
                                                        value={priorityEdits[client.id] ?? client.priority ?? 0}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            setPriorityEdits(prev => ({ ...prev, [client.id]: isNaN(val) ? 0 : val }));
                                                        }}
                                                        className="w-16 bg-black border border-white/20 rounded px-2 py-1.5 text-center text-sm focus:outline-none focus:border-purple-500 transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* ===== UPLOAD CONTENT TAB ===== */
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Upload Form */}
                        <div className="bg-gray-900 p-8 rounded-xl border border-white/10">
                            <h2 className="text-xl font-bold mb-6">Upload Content</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Client Selection */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Client <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={selectedClient}
                                        onChange={(e) => setSelectedClient(e.target.value)}
                                        className="w-full bg-black border border-white/20 rounded pl-4 pr-10 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        required
                                    >
                                        <option value="" disabled>Select a client...</option>
                                        {clients.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    {clients.length === 0 && (
                                        <p className="text-xs text-yellow-400 mt-1">No clients yet. Add a client in the "Manage Clients" tab first.</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Project <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={selectedSubProject}
                                        onChange={(e) => setSelectedSubProject(e.target.value)}
                                        className="w-full bg-black border border-white/20 rounded pl-4 pr-10 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        required
                                        disabled={!selectedClient}
                                    >
                                        <option value="" disabled>Select a project...</option>
                                        {subProjects
                                            .filter(sp => sp.clientId === selectedClient)
                                            .map(sp => (
                                                <option key={sp.id} value={sp.id}>{sp.name}</option>
                                            ))}
                                    </select>
                                    {selectedClient && subProjects.filter(sp => sp.clientId === selectedClient).length === 0 && (
                                        <p className="text-xs text-yellow-400 mt-1">No projects found for this client. Add one in the "Manage Clients" tab under the client's row.</p>
                                    )}
                                </div>

                                {/* Category Selection */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => {
                                            setSelectedCategory(e.target.value);
                                            setUploadedImages([]);
                                        }}
                                        className="w-full bg-black border border-white/20 rounded pl-4 pr-10 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                                    >
                                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>

                                {/* Conditional Fields */}
                                {selectedCategory === 'Creatives' ? (
                                    <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30">
                                        <h3 className="text-blue-400 text-sm font-bold mb-2">Bulk Upload Mode</h3>
                                        <p className="text-xs text-gray-400 mb-4">Upload multiple images. Each image will be a separate item.</p>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="w-full bg-black border border-white/20 rounded px-5 .5 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Title</label>
                                            <input
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="w-full bg-black border border-white/20 rounded px-5 .5 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">External Link</label>
                                            <input
                                                value={link}
                                                onChange={(e) => setLink(e.target.value)}
                                                className="w-full bg-black border border-white/20 rounded px-5 .5 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Thumbnail Image</label>
                                            <div className="text-[10px] text-blue-400 mb-1">Optional if External Link is a YouTube/Drive video</div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                                className="w-full bg-black border border-white/20 rounded px-5 .5 py-3 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Image Previews */}
                                {uploadedImages.length > 0 && (
                                    <div className="space-y-4 mt-4">
                                        <div className="grid grid-cols-4 gap-2">
                                            {uploadedImages.map((img, idx) => (
                                                <div key={idx} className="relative aspect-square">
                                                    <img src={img} alt="Preview" className="w-full h-full object-cover rounded border border-white/20" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isUploading}
                                    className="w-full mt-4 bg-[var(--accent)] text-white font-bold py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? 'Uploading Images...' : (isSubmitting ? 'Saving...' : 'Save Content')}
                                </button>
                            </form>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-900 p-8 rounded-xl border border-white/10">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold">Existing Content ({filteredProjects.length})</h2>
                                    <div className="flex items-center gap-3">
                                        <select
                                            value={filterClient}
                                            onChange={(e) => {
                                                setFilterClient(e.target.value);
                                                setSelectedProjects([]);
                                            }}
                                            className="bg-black border border-white/20 rounded pl-4 pr-10 py-2 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        >
                                            <option value="All">All Clients</option>
                                            {clients.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>

                                        <select
                                            value={filterSubProject}
                                            onChange={(e) => {
                                                setFilterSubProject(e.target.value);
                                                setSelectedProjects([]);
                                            }}
                                            className="bg-black border border-white/20 rounded pl-4 pr-10 py-2 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        >
                                            <option value="All">All Projects</option>
                                            {subProjects
                                                .filter(sp => filterClient === 'All' || sp.clientId === filterClient)
                                                .map(sp => (
                                                    <option key={sp.id} value={sp.id}>{sp.name}</option>
                                                ))}
                                        </select>

                                        {selectedProjects.length > 0 && (
                                            <button
                                                onClick={handleBulkDelete}
                                                className="px-4 py-1.5 bg-red-600/20 text-red-400 text-sm rounded hover:bg-red-600/30 transition-colors border border-red-600/30 font-medium"
                                            >
                                                Delete ({selectedProjects.length})
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {filteredProjects.length > 0 && (
                                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
                                        <input
                                            type="checkbox"
                                            checked={selectedProjects.length === filteredProjects.length && filteredProjects.length > 0}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 accent-[var(--accent)] cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-400">Select All</span>
                                    </div>
                                )}

                                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                    {filteredProjects.map(p => (
                                        <div key={p.id} className="flex items-center gap-3 p-4 bg-black rounded border border-white/10">
                                            <input
                                                type="checkbox"
                                                checked={selectedProjects.includes(p.id)}
                                                onChange={() => toggleSelectProject(p.id)}
                                                className="w-4 h-4 accent-[var(--accent)] cursor-pointer flex-shrink-0"
                                            />
                                            <div className="flex items-center justify-between flex-1">
                                                <div className="flex items-center gap-4">
                                                    <img src={p.image} alt={p.title} className="w-12 h-12 object-cover rounded" />
                                                    <div>
                                                        <h3 className="font-bold text-sm">{p.title || 'Untitled'}</h3>
                                                        <div className="flex gap-2 text-xs text-gray-500">
                                                            <span className="uppercase text-[var(--accent)]">{p.category}</span>
                                                            <span>•</span>
                                                            <span className="text-purple-400">{getClientName(p.clientId)}</span>
                                                            <span>•</span>
                                                            <span className="text-blue-400">{getSubProjectName(p.subProjectId)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingAsset(p);
                                                            setEditName(p.title || '');
                                                            setEditAssetCategory(p.category || '');
                                                        }}
                                                        className="p-2 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20 transition-colors border border-blue-500/20"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(p.id)}
                                                        className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors border border-red-500/20"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modals outside the conditional content */}
                {editingClient && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
                        <div className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                            <h2 className="text-xl font-bold mb-6 text-white">Edit Client</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Client Name</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full bg-black border border-white/20 rounded px-5 .5 py-3 text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleEditClient}
                                    disabled={isSavingEdit}
                                    className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                                >
                                    {isSavingEdit ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    onClick={() => setEditingClient(null)}
                                    className="px-6 bg-white/10 text-gray-300 font-bold py-3 rounded-lg hover:bg-white/20 transition-all border border-white/10"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {editingSubProject && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
                        <div className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                            <h2 className="text-xl font-bold mb-6 text-white">Edit Project</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Project Name</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full bg-black border border-white/20 rounded px-5 .5 py-3 text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Description</label>
                                    <textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="w-full bg-black border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-500 h-32"
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleEditSubProject}
                                        disabled={isSavingEdit}
                                        className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                                    >
                                        {isSavingEdit ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={() => setEditingSubProject(null)}
                                        className="px-6 bg-white/10 text-gray-300 font-bold py-3 rounded-lg hover:bg-white/20 transition-all border border-white/10"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {editingAsset && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
                        <div className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                            <h2 className="text-xl font-bold mb-6 text-white">Edit Content Asset</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Asset Title</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full bg-black border border-white/20 rounded px-5 .5 py-3 text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Category</label>
                                    <select
                                        value={editAssetCategory}
                                        onChange={(e) => setEditAssetCategory(e.target.value)}
                                        className="w-full bg-black border border-white/20 rounded pl-4 pr-10 py-3 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleEditAsset}
                                        disabled={isSavingEdit}
                                        className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                                    >
                                        {isSavingEdit ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={() => setEditingAsset(null)}
                                        className="px-6 bg-white/10 text-gray-300 font-bold py-3 rounded-lg hover:bg-white/20 transition-all border border-white/10"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {editingCategory && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
                        <div className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                            <h2 className="text-xl font-bold mb-6 text-white">Edit Category</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Category Name</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full bg-black border border-white/20 rounded px-5 .5 py-3 text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleEditCategory}
                                    disabled={isSavingEdit}
                                    className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                                >
                                    {isSavingEdit ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    onClick={() => setEditingCategory(null)}
                                    className="px-6 bg-white/10 text-gray-300 font-bold py-3 rounded-lg hover:bg-white/20 transition-all border border-white/10"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <ConfirmDialog
                    isOpen={confirmDialog.isOpen}
                    title={confirmDialog.title}
                    message={confirmDialog.message}
                    onConfirm={confirmDialog.onConfirm}
                    onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                />
            </div>
        </div >
    );
}
