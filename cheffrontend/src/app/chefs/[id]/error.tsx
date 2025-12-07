"use client";

import { useRouter } from "next/navigation";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-gradient-to-b from-lapis to-battleship text-nyanza">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                <button
                    onClick={() => router.back()}
                    className="mb-6 flex items-center gap-2 text-nyanza/80 hover:text-nyanza transition"
                >
                    <span>←</span>
                    <span>Terug naar overzicht</span>
                </button>

                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Er ging iets mis</h2>
                    <p className="text-nyanza/80 mb-6">
                        {error.message || "Kon de chef gegevens niet laden"}
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={reset}
                            className="bg-nyanza text-lapis px-6 py-2.5 rounded-lg font-semibold
                                     hover:bg-ash transition"
                        >
                            Probeer opnieuw
                        </button>
                        <button
                            onClick={() => router.push("/chefs")}
                            className="bg-lapis/20 text-nyanza px-6 py-2.5 rounded-lg font-semibold
                                     hover:bg-lapis/30 transition"
                        >
                            Terug naar overzicht
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

