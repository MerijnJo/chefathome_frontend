"use client";

import { useEffect, useState } from "react";
import { getChefs, type ChefSummary, type ChefFilterParams } from "@/lib/api";
import ChefCard from "../components/ChefCard";
import PlaceholderImage from "../components/PlaceholderImage";
import ChefFiltersComponent, { type ChefFilters } from "../components/ChefFilters";

export default function ChefsPage() {
    const [chefs, setChefs] = useState<ChefSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function reload(filters?: ChefFilterParams) {
        try {
            setLoading(true);
            const data = await getChefs(filters);
            setChefs(data);
            setError(null);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Kon chefs niet laden");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void reload();
    }, []);

    const handleApplyFilters = (filters: ChefFilters) => {
        // Convert string values to appropriate types
        const apiFilters: ChefFilterParams = {
            foodOrigin: filters.foodOrigin || undefined,
            expertise: filters.expertise || undefined,
            minExperience: filters.minExperience ? parseInt(filters.minExperience) : undefined,
            maxExperience: filters.maxExperience ? parseInt(filters.maxExperience) : undefined,
            minBasePrice: filters.minBasePrice ? parseInt(filters.minBasePrice) : undefined,
            maxBasePrice: filters.maxBasePrice ? parseInt(filters.maxBasePrice) : undefined,
        };

        void reload(apiFilters);
    };

    const handleClearFilters = () => {
        void reload();
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-lapis to-battleship text-nyanza flex flex-col">
            <div className="flex-grow max-w-7xl mx-auto px-6 md:px-10 py-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Onze Chefs</h1>
                <p className="text-nyanza/90 max-w-prose mb-8">
                    Hier vind je alle chefs, geladen vanuit onze database.
                    Je kunt filteren op stijl, locatie en beschikbaarheid.
                </p>

                {/* Filter Component */}
                <ChefFiltersComponent
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                    isLoading={loading}
                />

                <div className="rounded-[var(--radius)] border border-nyanza/20 p-6 text-nyanza/80">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Chef lijst</h2>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {[...Array(6)].map((_, i) => (
                                <PlaceholderImage key={i} />
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {error && !loading && (
                        <p className="text-red-400">{error}</p>
                    )}

                    {/* Empty state */}
                    {!loading && !error && chefs.length === 0 && (
                        <p>Er zijn nog geen chefs.</p>
                    )}

                    {/* Cards grid */}
                    {!loading && !error && chefs.length > 0 && (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {chefs.map((c) => (
                                <ChefCard key={c.id} chef={c} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
