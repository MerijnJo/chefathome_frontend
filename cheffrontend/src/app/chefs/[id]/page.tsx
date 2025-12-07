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
        <main className="min-h-screen bg-gradient-to-b from-lapis to-battleship text-nyanza">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                {/* Back button */}
                <button
                    onClick={() => router.back()}
                    className="mb-6 flex items-center gap-2 text-nyanza/80 hover:text-nyanza transition"
                >
                    <span>←</span>
                    <span>Terug naar overzicht</span>
                </button>

                {/* Loading state */}
                {loading && (
                    <div className="bg-nyanza/5 border border-nyanza/10 rounded-xl p-8">
                        <div className="animate-pulse space-y-4">
                            <div className="h-32 bg-nyanza/10 rounded-lg w-32"></div>
                            <div className="h-8 bg-nyanza/10 rounded w-1/3"></div>
                            <div className="h-4 bg-nyanza/10 rounded w-1/2"></div>
                            <div className="h-4 bg-nyanza/10 rounded w-2/3"></div>
                        </div>
                    </div>
                )}

                {/* Error state */}
                {error && !loading && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                        <p className="text-red-400">{error}</p>
                        <button
                            onClick={() => router.push("/chefs")}
                            className="mt-4 text-sm text-nyanza hover:underline"
                        >
                            Ga terug naar chef overzicht
                        </button>
                    </div>
                )}

                {/* Chef detail content */}
                {!loading && !error && chef && <ChefDetail chef={chef} />}
            </div>
        </main>
    );
}

