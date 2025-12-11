"use client";

import { useState } from "react";

export interface ChefFilters {
    foodOrigin: string;
    expertise: string;
    minExperience: string;
    maxExperience: string;
    minBasePrice: string;
    maxBasePrice: string;
}

interface ChefFiltersProps {
    onApplyFilters: (filters: ChefFilters) => void;
    onClearFilters: () => void;
    isLoading?: boolean;
}

export default function ChefFiltersComponent({ onApplyFilters, onClearFilters, isLoading = false }: ChefFiltersProps) {
    const [filters, setFilters] = useState<ChefFilters>({
        foodOrigin: "",
        expertise: "",
        minExperience: "",
        maxExperience: "",
        minBasePrice: "",
        maxBasePrice: "",
    });

    const handleInputChange = (field: keyof ChefFilters, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
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

    const hasActiveFilters = Object.values(filters).some((value) => value !== "");

    return (
        <div className="bg-nyanza/5 border border-nyanza/20 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-nyanza mb-4">Filters</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Food Origin */}
                <div>
                    <label htmlFor="foodOrigin" className="block text-sm font-medium text-nyanza/90 mb-2">
                        Keuken Origine
                    </label>
                    <input
                        id="foodOrigin"
                        type="text"
                        placeholder="b.v. Italian, French"
                        value={filters.foodOrigin}
                        onChange={(e) => handleInputChange("foodOrigin", e.target.value)}
                        className="w-full px-3 py-2 bg-lapis border border-nyanza/30 rounded-lg
                                   text-nyanza placeholder:text-nyanza/50
                                   focus:outline-none focus:ring-2 focus:ring-nyanza/50"
                        disabled={isLoading}
                    />
                </div>

                {/* Expertise */}
                <div>
                    <label htmlFor="expertise" className="block text-sm font-medium text-nyanza/90 mb-2">
                        Expertise
                    </label>
                    <input
                        id="expertise"
                        type="text"
                        placeholder="b.v. Expert, Intermediate"
                        value={filters.expertise}
                        onChange={(e) => handleInputChange("expertise", e.target.value)}
                        className="w-full px-3 py-2 bg-lapis border border-nyanza/30 rounded-lg
                                   text-nyanza placeholder:text-nyanza/50
                                   focus:outline-none focus:ring-2 focus:ring-nyanza/50"
                        disabled={isLoading}
                    />
                </div>

                {/* Min Experience */}
                <div>
                    <label htmlFor="minExperience" className="block text-sm font-medium text-nyanza/90 mb-2">
                        Min. Ervaring (jaren)
                    </label>
                    <input
                        id="minExperience"
                        type="number"
                        placeholder="0"
                        min="0"
                        value={filters.minExperience}
                        onChange={(e) => handleInputChange("minExperience", e.target.value)}
                        className="w-full px-3 py-2 bg-lapis border border-nyanza/30 rounded-lg
                                   text-nyanza placeholder:text-nyanza/50
                                   focus:outline-none focus:ring-2 focus:ring-nyanza/50"
                        disabled={isLoading}
                    />
                </div>

                {/* Max Experience */}
                <div>
                    <label htmlFor="maxExperience" className="block text-sm font-medium text-nyanza/90 mb-2">
                        Max. Ervaring (jaren)
                    </label>
                    <input
                        id="maxExperience"
                        type="number"
                        placeholder="50"
                        min="0"
                        value={filters.maxExperience}
                        onChange={(e) => handleInputChange("maxExperience", e.target.value)}
                        className="w-full px-3 py-2 bg-lapis border border-nyanza/30 rounded-lg
                                   text-nyanza placeholder:text-nyanza/50
                                   focus:outline-none focus:ring-2 focus:ring-nyanza/50"
                        disabled={isLoading}
                    />
                </div>

                {/* Min Base Price */}
                <div>
                    <label htmlFor="minBasePrice" className="block text-sm font-medium text-nyanza/90 mb-2">
                        Min. Prijs (€)
                    </label>
                    <input
                        id="minBasePrice"
                        type="number"
                        placeholder="0"
                        min="0"
                        value={filters.minBasePrice}
                        onChange={(e) => handleInputChange("minBasePrice", e.target.value)}
                        className="w-full px-3 py-2 bg-lapis border border-nyanza/30 rounded-lg
                                   text-nyanza placeholder:text-nyanza/50
                                   focus:outline-none focus:ring-2 focus:ring-nyanza/50"
                        disabled={isLoading}
                    />
                </div>

                {/* Max Base Price */}
                <div>
                    <label htmlFor="maxBasePrice" className="block text-sm font-medium text-nyanza/90 mb-2">
                        Max. Prijs (€)
                    </label>
                    <input
                        id="maxBasePrice"
                        type="number"
                        placeholder="1000"
                        min="0"
                        value={filters.maxBasePrice}
                        onChange={(e) => handleInputChange("maxBasePrice", e.target.value)}
                        className="w-full px-3 py-2 bg-lapis border border-nyanza/30 rounded-lg
                                   text-nyanza placeholder:text-nyanza/50
                                   focus:outline-none focus:ring-2 focus:ring-nyanza/50"
                        disabled={isLoading}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
                <button
                    onClick={handleApply}
                    disabled={isLoading}
                    className="px-6 py-2 bg-nyanza text-lapis font-medium rounded-lg
                               hover:bg-nyanza/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Laden..." : "Filters toepassen"}
                </button>

                <button
                    onClick={handleClear}
                    disabled={isLoading || !hasActiveFilters}
                    className="px-6 py-2 bg-nyanza/10 text-nyanza font-medium rounded-lg
                               border border-nyanza/30 hover:bg-nyanza/20 transition
                               disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Filters wissen
                </button>

                {hasActiveFilters && (
                    <span className="flex items-center text-sm text-nyanza/70 ml-2">
                        <span className="inline-block w-2 h-2 bg-nyanza rounded-full mr-2"></span>
                        Filters actief
                    </span>
                )}
            </div>
        </div>
    );
}

