export default function Loading() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-lapis to-battleship text-nyanza">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                <div className="mb-6 h-6 w-32 bg-nyanza/10 rounded animate-pulse"></div>

                <div className="space-y-6">
                    {/* Header skeleton */}
                    <div className="bg-nyanza/5 border border-nyanza/10 rounded-xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="h-32 w-32 md:h-36 md:w-36 bg-nyanza/10 rounded-xl animate-pulse"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-8 bg-nyanza/10 rounded w-1/2 animate-pulse"></div>
                                <div className="h-4 bg-nyanza/10 rounded w-1/3 animate-pulse"></div>
                                <div className="h-4 bg-nyanza/10 rounded w-2/3 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Content skeletons */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-nyanza/5 border border-nyanza/10 rounded-xl p-6">
                            <div className="h-6 bg-nyanza/10 rounded w-1/4 mb-4 animate-pulse"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-nyanza/10 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-nyanza/10 rounded w-5/6 animate-pulse"></div>
                                <div className="h-4 bg-nyanza/10 rounded w-4/6 animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

