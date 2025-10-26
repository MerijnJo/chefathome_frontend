// src/app/page.tsx
import HeroSection from "@/app/components/HeroSection";
import MissionArea from "@/app/components/MissionSection";

export default function Homepage() {
    return (
        <main>
            <HeroSection />
            <MissionArea />
        </main>
    );
}
