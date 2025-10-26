// src/app/page.tsx
import HeroSection from "@/app/components/HeroSection";
import MissionArea from "@/app/components/MissionSection";
import Footer from "@/app/components/Footer";

export default function Homepage() {
    return (
        <main>
            <HeroSection />
            <MissionArea />
            <Footer />
        </main>
    );
}
