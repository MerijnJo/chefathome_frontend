type Chef = {
    id: number;
    name: string;
    cuisine: string;
    pricePerPerson: number;
    avatarUrl?: string;
    bio?: string;
};

export default function ChefCard({ chef }: { chef: Chef }) {
    const { name, cuisine, pricePerPerson, avatarUrl, bio } = chef;

    return (
        <div className="bg-nyanza/5 border border-nyanza/10 rounded-xl p-4 hover:bg-nyanza/10 transition">
            <div className="flex items-center gap-4">
                <img
                    src={avatarUrl || "/placeholder-chef.png"}
                    alt={name}
                    className="h-16 w-16 rounded-lg object-cover ring-1 ring-nyanza/20"
                />
                <div>
                    <h3 className="text-lg font-semibold text-nyanza">{name}</h3>
                    {cuisine && <p className="text-sm text-nyanza/80">{cuisine}</p>}
                </div>
            </div>

            {bio && <p className="mt-3 text-sm text-nyanza/85 line-clamp-3">{bio}</p>}

            <div className="mt-4 text-sm text-nyanza/90">
                {typeof pricePerPerson === "number" && (
                    <span>€{pricePerPerson} per persoon</span>
                )}
            </div>
        </div>
    );
}
