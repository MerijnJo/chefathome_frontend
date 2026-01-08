"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getChefById, type ChefDetail as ChefDetailType } from "@/lib/api";
import ChefDetail from "@/app/components/ChefDetail";

export default function ChefDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [chef, setChef] = useState<ChefDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadChef() {
            try {
                setLoading(true);
                const id = parseInt(params.id as string, 10);
                if (isNaN(id)) {
                    throw new Error("Invalid chef ID");
                }
                const data = await getChefById(id);
                setChef(data);
                setError(null);
            } catch (e: unknown) {
                setError(e instanceof Error ? e.message : "Kon chef gegevens niet laden");
            } finally {
                setLoading(false);
            }
        }

        if (params.id) {
            void loadChef();
        }
    }, [params.id]);

    return (
        <main className="min-h-screen bg-white">
            {/* Back button */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-lapis hover:text-lapis/80 transition"
                >
                    <span>←</span>
                    <span>Terug naar overzicht</span>
                </button>
            </div>

            {/* Loading state */}
            {loading && (
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                    <div className="animate-pulse space-y-8">
                        <div className="h-96 bg-ash/20 rounded-lg"></div>
                        <div className="h-64 bg-ash/20 rounded-lg"></div>
                        <div className="h-48 bg-ash/20 rounded-lg"></div>
                    </div>
                </div>
            )}

            {/* Error state */}
            {error && !loading && (
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={() => router.push("/chefs")}
                            className="mt-4 text-sm text-lapis hover:underline"
                        >
                            Ga terug naar chef overzicht
                        </button>
                    </div>
                </div>
            )}

            {/* Chef.ts detail content */}
            {!loading && !error && chef && <ChefDetail chef={chef} />}
        </main>
    );
}

