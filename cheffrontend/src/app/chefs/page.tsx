// app/chefs/page.tsx
export default function ChefsPage() {
    return (
        <main className="min-h-screen px-8 py-12">
            <h1 className="text-4xl font-bold mb-8">Onze Chefs</h1>

            <p className="text-gray-600 mb-6">
                Hier vind je een overzicht van alle chefs. Binnenkort kun je filteren op stijl, prijs en locatie.
            </p>

            {/* Placeholder list for now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-6 border rounded-lg shadow-sm">
                    <h2 className="font-semibold text-xl">Chef Anna</h2>
                    <p className="text-gray-500">Italiaanse keuken</p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <h2 className="font-semibold text-xl">Chef Jamal</h2>
                    <p className="text-gray-500">Midden-Oosterse gerechten</p>
                </div>
            </div>
        </main>
    );
}
