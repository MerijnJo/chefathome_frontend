export default function LoadingChefs() {
    return (
        <main className="px-6 md:px-10 py-10">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-nyanza">Laden...</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-40 bg-nyanza/5 border border-nyanza/10 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
