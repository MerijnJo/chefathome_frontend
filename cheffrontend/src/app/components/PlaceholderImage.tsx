type PlaceholderImageProps = {
    aspect?: string;   // e.g. "4/3", "16/9"
    className?: string;
};

export default function PlaceholderImage({
                                             aspect = "4/3",
                                             className = "",
                                         }: PlaceholderImageProps) {
    const [w, h] = aspect.split("/").map(Number);
    const style: React.CSSProperties = {
        aspectRatio: `${w} / ${h}`,
        width: "100%",
        minHeight: 180,
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
    };

    return (
        <div style={style} className={`shadow-md ${className}`}>
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--color-lapis)", // brand fill
                }}
            />
            <svg
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0.45,
                    pointerEvents: "none",
                }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <line x1="0" y1="0" x2="100" y2="100" stroke="var(--color-ash)" strokeWidth="3" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="var(--color-ash)" strokeWidth="3" />
                <rect x="1" y="1" width="98" height="98" fill="none" stroke="var(--color-ash)" strokeWidth="3" />
            </svg>
        </div>
    );
}
