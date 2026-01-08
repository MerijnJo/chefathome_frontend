"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";
import LeaderboardModal from "./LeaderboardModal";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

    return (
        <>
            <header className="bg-nyanza text-lapis shadow-sm sticky top-0 z-50">
                <nav className="w-full px-3 md:px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 hover:opacity-80 transition"
                    >
                        <Image
                            src="/cah-logo.png"
                            alt="Chef Aan Huis logo"
                            width={60}
                            height={60}
                            priority
                        />
                        <span className="text-2xl font-bold tracking-tight">
                            Chef Aan Huis
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex gap-8 font-medium items-center">
                        <Link href="/" className="hover:text-battleship transition">
                            Home
                        </Link>
                        <Link href="/register" className="hover:text-battleship transition">
                            Register
                        </Link>
                        <Link href="/chefs" className="hover:text-battleship transition">
                            Chefs
                        </Link>
                        <Link href="/profile" className="hover:text-battleship transition">
                            Profile
                        </Link>

                        {/* Leaderboard button (desktop) */}
                        <button
                            onClick={() => setIsLeaderboardOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                            aria-label="Open chef leaderboard"
                            title="View top chefs"
                        >
                            <Trophy size={20} />
                            <span>Top Chefs</span>
                        </button>
                    </div>

                    {/* Mobile buttons */}
                    <div className="md:hidden flex items-center gap-3">
                        {/* Leaderboard button (mobile) */}
                        <button
                            onClick={() => setIsLeaderboardOpen(true)}
                            className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                            aria-label="Open chef leaderboard"
                            title="View top chefs"
                        >
                            <Trophy size={20} />
                        </button>
                    </div>
                </nav>


            </header>

            {/* Leaderboard Modal */}
            <LeaderboardModal
                isOpen={isLeaderboardOpen}
                onClose={() => setIsLeaderboardOpen(false)}
            />
        </>
    );
}
