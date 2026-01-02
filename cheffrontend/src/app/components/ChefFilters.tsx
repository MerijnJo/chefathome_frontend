"use client";

import { useState } from "react";

export type ChefFilters = {
    foodOrigin: string;
    expertise: string;
    minExperience: string;
    maxExperience: string;
    minBasePrice: string;
    maxBasePrice: string;
};

type ChefFiltersComponentProps = {
    onApplyFilters: (filters: ChefFilters) => void;
    onClearFilters: () => void;
    isLoading: boolean;
};

export default function ChefFiltersComponent({
                                                 onApplyFilters,
                                                 onClearFilters,
                                                 isLoading,
                                             }: ChefFiltersComponentProps) {
    const [filters, setFilters] = useState<ChefFilters>({
        foodOrigin: "",
        expertise: "",
        minExperience: "",
        maxExperience: "",
        minBasePrice: "",
        maxBasePrice: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleApply = () => {
        onApplyFilters(filters);
    };

    const handleClear = () => {
        setFilters({
            foodOrigin: "",
            expertise: "",
            minExperience: "",
            maxExperience: "",
            minBasePrice: "",
            maxBasePrice: "",
        });
        onClearFilters();
    };

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-3">
            <h3 className="text-lg font-semibold text-nyanza">Filters</h3>

            <div>
                <label className="block text-xs font-medium text-nyanza/80 mb-1">
                    Keuken Origine
                </label>
                <input
                    type="text"
                    name="foodOrigin"
                    value={filters.foodOrigin}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="b.v. Italiaans"
                    className="w-full px-2 py-1.5 text-sm bg-white/20 border border-nyanza/30 rounded text-nyanza placeholder-nyanza/50 focus:outline-none focus:ring-1 focus:ring-nyanza/50"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-nyanza/80 mb-1">
                    Expertise
                </label>
                <input
                    type="text"
                    name="expertise"
                    value={filters.expertise}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="b.v. Pasta"
                    className="w-full px-2 py-1.5 text-sm bg-white/20 border border-nyanza/30 rounded text-nyanza placeholder-nyanza/50 focus:outline-none focus:ring-1 focus:ring-nyanza/50"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-nyanza/80 mb-1">
                    Min. Ervaring (jaren)
                </label>
                <input
                    type="number"
                    name="minExperience"
                    value={filters.minExperience}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="0"
                    min="0"
                    className="w-full px-2 py-1.5 text-sm bg-white/20 border border-nyanza/30 rounded text-nyanza placeholder-nyanza/50 focus:outline-none focus:ring-1 focus:ring-nyanza/50"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-nyanza/80 mb-1">
                    Max. Ervaring (jaren)
                </label>
                <input
                    type="number"
                    name="maxExperience"
                    value={filters.maxExperience}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="50"
                    min="0"
                    className="w-full px-2 py-1.5 text-sm bg-white/20 border border-nyanza/30 rounded text-nyanza placeholder-nyanza/50 focus:outline-none focus:ring-1 focus:ring-nyanza/50"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-nyanza/80 mb-1">
                    Min. Prijs (€)
                </label>
                <input
                    type="number"
                    name="minBasePrice"
                    value={filters.minBasePrice}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="0"
                    min="0"
                    className="w-full px-2 py-1.5 text-sm bg-white/20 border border-nyanza/30 rounded text-nyanza placeholder-nyanza/50 focus:outline-none focus:ring-1 focus:ring-nyanza/50"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-nyanza/80 mb-1">
                    Max. Prijs (€)
                </label>
                <input
                    type="number"
                    name="maxBasePrice"
                    value={filters.maxBasePrice}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="1000"
                    min="0"
                    className="w-full px-2 py-1.5 text-sm bg-white/20 border border-nyanza/30 rounded text-nyanza placeholder-nyanza/50 focus:outline-none focus:ring-1 focus:ring-nyanza/50"
                />
            </div>

            <div className="flex flex-col gap-2 pt-2">
                <button
                    onClick={handleApply}
                    disabled={isLoading}
                    className="w-full px-3 py-1.5 text-sm bg-nyanza text-lapis font-medium rounded hover:bg-nyanza/90 transition"
                >
                    Toepassen
                </button>
                <button
                    onClick={handleClear}
                    disabled={isLoading}
                    className="w-full px-3 py-1.5 text-sm bg-transparent border border-nyanza/50 text-nyanza font-medium rounded hover:bg-white/10 transition"
                >
                    Wissen
                </button>
            </div>
        </div>
    );
}
