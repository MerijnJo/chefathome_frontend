"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-nyanza text-lapis shadow-sm sticky top-0 z-50">
            {/* 👇 Slightly closer to the left and right edges */}
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
                <div className="hidden md:flex gap-8 font-medium">
                    <Link href="/" className="hover:text-battleship transition">
                        Home
                    </Link>
                    <Link href="/register" className="hover:text-battleship transition">
                        Register
                    </Link>
                    <Link href="/chefs" className="hover:text-battleship transition">
                        Chefs
                    </Link>
                    <Link href="/about" className="hover:text-battleship transition">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-battleship transition">
                        Contact
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-lapis"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile dropdown */}
            {isOpen && (
                <div className="md:hidden flex flex-col bg-nyanza text-lapis px-6 pb-4 gap-3 shadow-inner">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <Link href="/chefs" onClick={() => setIsOpen(false)}>
                        Chefs
                    </Link>
                    <Link href="/about" onClick={() => setIsOpen(false)}>
                        About
                    </Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                        Contact
                    </Link>
                </div>
            )}
        </header>
    );
}
