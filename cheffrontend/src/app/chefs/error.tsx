"use client";

export default function ChefsError({
                                       error,
                                       reset,
                                   }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="px-6 md:px-10 py-10">
            <div className="max-w-3xl mx-auto text-nyanza">
                <h2 className="text-2xl font-semibold mb-2">Kan chefs niet laden</h2>
                <p className="text-nyanza/70 mb-4">
                    {error?.message ?? "Onbekende fout."}
                </p>
                <button
                    className="rounded-xl px-4 py-2 bg-nyanza/10 hover:bg-nyanza/20 transition"
                    onClick={() => reset()}
                >
                    Opnieuw proberen
                </button>
            </div>
        </main>
    );
}
