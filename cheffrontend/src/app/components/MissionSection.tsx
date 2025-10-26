// src/app/components/MissionArea.tsx
import PlaceholderImage from "@/app/components/PlaceholderImage";
import FeatureRow from "@/app/components/FeatureRow";

export default function MissionSection() {
    return (
        <>
            {/* Top split */}
            <section className="bg-tea py-14 md:py-16 px-6 md:px-10">
                <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10 items-center">
                    <div className="flex flex-col gap-5 max-w-prose">
                        <h2 className="text-4xl md:text-5xl font-bold text-lapis">Onze Missie</h2>
                        <p className="text-battleship leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                        <p className="text-battleship leading-relaxed">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full max-w-[520px] md:max-w-[460px]">
                            <PlaceholderImage
                                aspect="4/3"
                                className="w-full aspect-[4/3] max-h-[300px] rounded-[var(--radius)]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Row 1 — very light green */}
            <FeatureRow imageFirst aspect="4/3" bg="nyanza">
                <h2 className="text-4xl md:text-5xl font-bold text-lapis">Ontmoet de Chefs</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur.
                </p>
            </FeatureRow>

            {/* Row 2 — alternating layout, with subtle divider */}
            <FeatureRow imageFirst={false} aspect="4/3" bg="nyanza" separated>
                <h2 className="text-4xl md:text-5xl font-bold text-lapis">Over ons</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
                <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </FeatureRow>
        </>
    );
}
