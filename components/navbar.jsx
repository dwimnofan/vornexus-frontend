"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full max-w-full px-8 grid grid-cols-3 items-center h-16 mx-auto" style={{ maxWidth: "1600px" }}>
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-indigo to-accent-emerald bg-clip-text text-transparent">CariFit</span>
                    </Link>
                </div>

                {/* Nav center */}
                <nav className="hidden md:flex justify-center items-center gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link href="/how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
                        How It Works
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
                        Pricing
                    </Link>
                    <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                        About
                    </Link>
                </nav>

                {/* Tombol kanan */}
                <div className="hidden md:flex justify-end items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="sm">Get Started</Button>
                    </Link>
                    <ModeToggle />
                </div>

                {/* Mobile Menu Button (tetap flex, hanya muncul di md:hidden) */}
                <div className="flex md:hidden items-center gap-4 col-span-3 justify-between px-4">
                    <ModeToggle />
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t">
                    <div className="container py-4 flex flex-col gap-4">
                        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                        <Link href="/how-it-works" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            How It Works
                        </Link>
                        <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            Pricing
                        </Link>
                        <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            About
                        </Link>
                        <div className="flex flex-col gap-2 mt-2">
                            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="outline" className="w-full">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
