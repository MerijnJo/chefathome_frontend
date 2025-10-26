// src/app/components/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-ash/25 text-battleship">
            <div className="mx-auto max-w-7xl px-6 md:px-10 py-8 border-t border-battleship/20 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm">
                <p>© {new Date().getFullYear()} Chef Aan Huis. Alle rechten voorbehouden.</p>
                <nav className="flex gap-4">
                    <a href="#" className="hover:text-lapis">Privacy</a>
                    <a href="#" className="hover:text-lapis">Voorwaarden</a>
                    <a href="#" className="hover:text-lapis">Contact</a>
                </nav>
            </div>
        </footer>
    );
}
