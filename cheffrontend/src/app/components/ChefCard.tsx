import Image from "next/image";
import Link from "next/link";
import type { ChefSummary } from "@/lib/api";

export default function ChefCard({ chef }: { chef: ChefSummary }) {
    const { id, name, profilePicture, experience, foodOrigin, expertise, basePrice } = chef;

    return (
        <Link
            href={`/chefs/${id}`}
            className="bg-nyanza/5 border border-nyanza/10 rounded-xl p-4 hover:bg-nyanza/10
                       transition cursor-pointer block"
        >
            <div className="flex items-center gap-4">
                <Image
                    src={profilePicture || "/placeholder-chef.png"}
                    alt={name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-lg object-cover ring-1 ring-nyanza/20"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-nyanza">{name}</h3>
                    <p className="text-sm text-nyanza/80">{foodOrigin}</p>
                    <p className="text-xs text-nyanza/70 mt-1">{experience} jaar ervaring</p>
                </div>
            </div>

            <div className="mt-3">
                <p className="text-sm text-nyanza/85 line-clamp-2">{expertise}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-nyanza/10 flex items-center justify-between">
                <span className="text-sm font-medium text-nyanza">€{basePrice} per persoon</span>
                <span className="text-xs text-nyanza/70 hover:text-nyanza">Bekijk details →</span>
            </div>
        </Link>
    );
}
