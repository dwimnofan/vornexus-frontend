"use client";


import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedButton } from "@/components/animated-button";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { useAuth } from "@/context/provider";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSuccessParticles, setShowSuccessParticles] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            console.log('Starting login process...');
            const result = await login(email, password);
            console.log('Login result:', result);

            // Immediate redirect instead of waiting
            console.log('Redirecting to dashboard...');
            setIsLoading(false); // Reset loading state
            router.push("/dashboard");
            
            // Fallback redirect in case router.push doesn't work
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 500);

        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || "An error occurred during login. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <RevealOnScroll>
                    <Card className="border-none shadow-lg">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link href="/forgot-password" className="text-xs text-primary hover:underline transition-colors">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember" className="text-sm font-normal">
                                        Remember me for 30 days
                                    </Label>
                                </div>
                                {error && <div className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">{error}</div>}
                                <AnimatedButton type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                        </>
                                    ) : (
                                        "Sign in"
                                    )}
                                </AnimatedButton>
                            </form>


                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="text-primary hover:underline transition-colors">
                                    Sign up
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </RevealOnScroll>
            </div>
        </div>
    );
}
