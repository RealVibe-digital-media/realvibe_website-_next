'use client';

interface FilterBarProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    onSearch: (query: string) => void;
}

export default function FilterBar({ categories, activeCategory, onCategoryChange, onSearch }: FilterBarProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-6 mb-12 w-full">
            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center items-center w-full max-w-3xl mx-auto">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 ${activeCategory === category
                            ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white border-transparent shadow-xl shadow-pink-500/40'
                            : 'bg-black/40 text-gray-300 border-white/20 hover:border-pink-500/60 hover:text-white hover:bg-black/60'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search tags..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full bg-white/5 border-2 border-white/20 rounded-full py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all placeholder:text-gray-500"
                />
            </div>
        </div>
    );
}
