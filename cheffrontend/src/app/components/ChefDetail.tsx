import Image from "next/image";
import type { ChefDetail as ChefDetailType } from "@/lib/api";

export default function ChefDetail({ chef }: { chef: ChefDetailType }) {
    const {
        name,
        profilePicture,
        experience,
        foodOrigin,
        expertise,
        basePrice,
        about,
        specialties,
        setMenus,
        dishGallery,
        extraInformation,
    } = chef;

    return (
        <div className="space-y-8">
            {/* Header Section with Profile */}
            <div className="bg-nyanza/5 border border-nyanza/10 rounded-xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <Image
                        src={profilePicture || "/placeholder-chef.png"}
                        alt={name}
                        width={150}
                        height={150}
                        className="h-32 w-32 md:h-36 md:w-36 rounded-xl object-cover ring-2 ring-nyanza/30"
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-nyanza mb-2">{name}</h1>
                        <div className="flex flex-wrap gap-4 text-nyanza/80 mb-3">
                            <span className="text-sm md:text-base">🌍 {foodOrigin}</span>
                            <span className="text-sm md:text-base">⭐ {experience} jaar ervaring</span>
                        </div>
                        <p className="text-nyanza/90 font-medium">{expertise}</p>
                        <p className="text-2xl font-bold text-nyanza mt-4">€{basePrice} <span className="text-sm font-normal text-nyanza/70">per persoon</span></p>
                    </div>
                </div>
            </div>

            {/* About Section */}
            {about && (
                <div className="bg-nyanza/5 border border-nyanza/10 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-nyanza mb-3">Over {name}</h2>
                    <p className="text-nyanza/85 leading-relaxed">{about}</p>
                </div>
            )}

            {/* Specialties Section */}
            {specialties && specialties.length > 0 && (
                <div className="bg-nyanza/5 border border-nyanza/10 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-nyanza mb-4">Specialiteiten</h2>
                    <ul className="space-y-2">
                        {specialties.map((specialty, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="text-nyanza/60 mt-1">•</span>
                                <span className="text-nyanza/85 flex-1">{specialty}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Set Menus Section */}
            {setMenus && setMenus.length > 0 && (
                <div className="bg-nyanza/5 border border-nyanza/10 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-nyanza mb-4">Samenstelde Menu&apos;s</h2>
                    <div className="space-y-3">
                        {setMenus.map((menu, index) => (
                            <div key={index} className="bg-nyanza/5 rounded-lg p-4 border border-nyanza/10">
                                <p className="text-nyanza/90">{menu}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Dish Gallery Section */}
            {dishGallery && dishGallery.length > 0 && (
                <div className="bg-nyanza/5 border border-nyanza/10 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-nyanza mb-4">Foto Galerij</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dishGallery.map((imageUrl, index) => (
                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden ring-1 ring-nyanza/20">
                                <Image
                                    src={imageUrl}
                                    alt={`Gerecht ${index + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Extra Information Section */}
            {extraInformation && (
                <div className="bg-nyanza/5 border border-nyanza/10 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-nyanza mb-3">Extra Informatie</h2>
                    <p className="text-nyanza/85 leading-relaxed">{extraInformation}</p>
                </div>
            )}
        </div>
    );
}

