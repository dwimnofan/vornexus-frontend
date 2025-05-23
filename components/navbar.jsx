'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings } from 'lucide-react';

export function Navbar() {
    const router = useRouter();
    const user = AuthService.getUser();

    const handleLogout = () => {
        AuthService.logout();
        router.push('/login');
    };

    return (
        <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link href="/dashboard" className="text-xl font-bold text-primary">
                            CariFit
                        </Link>
                        
                        <div className="hidden md:flex space-x-6">
                            <Link 
                                href="/dashboard" 
                                className="text-gray-600 hover:text-primary transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link 
                                href="/dashboard/matches" 
                                className="text-gray-600 hover:text-primary transition-colors"
                            >
                                Job Matches
                            </Link>
                            <Link 
                                href="/dashboard/upload" 
                                className="text-gray-600 hover:text-primary transition-colors"
                            >
                                Upload CV
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex flex-col space-y-1 leading-none">
                                        <p className="font-medium">{user?.name}</p>
                                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/profile">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/settings">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
}