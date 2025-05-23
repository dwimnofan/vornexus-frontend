"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileText, Home, LogOut, Settings, Briefcase, User, Menu, X, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Sidebar({ className }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const routes = [
        {
            label: "Dashboard",
            icon: Home,
            href: "/dashboard",
            active: pathname === "/dashboard",
        },
        {
            label: "Upload CV",
            icon: FileText,
            href: "/dashboard/upload",
            active: pathname === "/dashboard/upload",
        },
        {
            label: "Job Matches",
            icon: Briefcase,
            href: "/dashboard/matches",
            active: pathname === "/dashboard/matches",
        },
        // {
        //     label: "Profile",
        //     icon: User,
        //     href: "/dashboard/profile",
        //     active: pathname === "/dashboard/profile",
        // },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
            </div>

            {/* Sidebar for Desktop */}
            <div className={cn("hidden md:flex h-screen w-64 flex-col border-r bg-background p-6", className)}>
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-indigo to-accent-emerald bg-clip-text text-transparent">CariFit</span>
                    </Link>
                </div>
                <nav className="flex-1 space-y-2">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted", route.active ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground")}
                        >
                            <route.icon className="h-4 w-4" />
                            {route.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto pt-4 border-t">
                    <Button variant="outline" className="w-full justify-start gap-2">
                        <LogOut className="h-4 w-4" />
                        Log out
                    </Button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
                    <div className="flex flex-col h-full p-6 pt-16">
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                <span className="text-2xl font-bold bg-gradient-to-r from-primary-indigo to-accent-emerald bg-clip-text text-transparent">CariFit</span>
                            </Link>
                        </div>
                        <nav className="flex-1 space-y-2">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn("flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-all hover:bg-muted", route.active ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground")}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <route.icon className="h-5 w-5" />
                                    {route.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto pt-4 border-t">
                            <Button variant="outline" className="w-full justify-start gap-2 py-3 text-base">
                                <LogOut className="h-5 w-5" />
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
