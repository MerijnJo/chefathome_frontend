"use client";

import { useEffect, useState } from "react";
import { getChefs, seedChef, type Chef } from "@/lib/api";

export default function ChefsPage() {
    const [chefs, setChefs] = useState<Chef[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 🔁 Fetch chefs from backend
    async function reload() {
        try {
            setLoading(true);
            const data = await getChefs();
            setChefs(data);
            setError(null);
        } catch (e: any) {
            setError(e.message ?? "Kon chefs niet laden");
        } finally {
            setLoading(false);
        }
    }

    // 🪄 Load once on page load
    useEffect(() => {
        void reload();
    }, []);

    // 🧑‍🍳 Test button to seed a demo chef
    async function handleSeed() {
        await seedChef();
        await reload();
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-lapis to-battleship text-nyanza flex flex-col">
            <div className="flex-grow max-w-7xl mx-auto px-6 md:px-10 py-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Onze Chefs</h1>
                <p className="text-nyanza/90 max-w-prose">
                    Hier vind je alle chefs, geladen vanuit onze database.
                    Je kunt filteren op stijl, locatie en beschikbaarheid.
                </p>

                {/* 👇 New interactive section */}
                <div className="mt-12 rounded-[var(--radius)] border border-nyanza/20 p-6 text-nyanza/80">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Chef lijst</h2>
                        <button
                            onClick={handleSeed}
                            className="bg-nyanza/20 hover:bg-nyanza/30 text-nyanza font-medium px-4 py-2 rounded-md transition"
                        >
                            Voeg demo chef toe
                        </button>
                    </div>

                    {loading && <p>Laden...</p>}
                    {error && <p className="text-red-400">{error}</p>}

                    {!loading && chefs.length === 0 && (
                        <p>Er zijn nog geen chefs. Voeg een demo chef toe.</p>
                    )}

                    <ul className="space-y-3 mt-4">
                        {chefs.map((c) => (
                            <li
                                key={c.id}
                                className="border border-nyanza/10 rounded-lg p-4 hover:bg-nyanza/5 transition"
                            >
                                <p className="font-semibold text-lg">{c.name}</p>
                                <p className="text-nyanza/70">{c.cuisine}</p>
                                <p className="text-sm text-nyanza/60">
                                    €{c.pricePerPerson} per persoon
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
