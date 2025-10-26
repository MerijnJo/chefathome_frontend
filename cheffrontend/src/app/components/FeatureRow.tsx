// src/app/components/FeatureRow.tsx
import PlaceholderImage from "@/app/components/PlaceholderImage";
import { ReactNode } from "react";

type FeatureRowProps = {
    imageFirst?: boolean;
    aspect?: string;
    title?: string;
    caption?: string;
    bg?: "nyanza" | "tea";
    separated?: boolean;
    children: ReactNode;
};

export default function FeatureRow({
                                       imageFirst = true,
                                       aspect = "4/3",
                                       title,
                                       caption,
                                       bg = "nyanza",
                                       separated = false,
                                       children,
                                   }: FeatureRowProps) {
    const bgClass = bg === "nyanza" ? "bg-nyanza" : "bg-tea/70";

    const ImageBlock = (
        <div className="flex flex-col items-center">
            {/* Keep width responsive, but cap height so the section fits in view */}
            <div className="w-full max-w-[520px] md:max-w-[460px]">
                <PlaceholderImage
                    aspect={aspect}
                    className="w-full aspect-[4/3] max-h-[300px] rounded-[var(--radius)] shadow-sm"
                />
            </div>
            {caption && <span className="mt-2 text-xs text-battleship">{caption}</span>}
        </div>
    );

    return (
        <section
            className={`${bgClass} ${separated ? "border-t border-battleship/15" : ""}
                  py-10 md:py-14 px-6 md:px-10`}
        >
            <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-8 md:gap-10 items-center">
                {imageFirst && ImageBlock}

                <div className="max-w-prose">
                    {title && <h3 className="text-3xl font-semibold text-lapis mb-3 md:mb-4">{title}</h3>}
                    <div className="text-battleship leading-relaxed space-y-4">
                        {children}
                    </div>
                </div>

                {!imageFirst && ImageBlock}
            </div>
        </section>
    );
}
