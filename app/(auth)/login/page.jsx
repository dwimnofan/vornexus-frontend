"use client";


import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ParticleEngine } from "@/components/ui/particles/particle-engine";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = (useState < string) | (null > null);
    const [showSuccessParticles, setShowSuccessParticles] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // For demo purposes, let's show success particles
            setShowSuccessParticles(true);

            // Redirect after a short delay to see the particles
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
        } catch (err) {
            setError("Invalid email or password. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <>
            <ParticleEngine
                active={showSuccessParticles}
                options={{
                    type: "sparkles",
                    particleCount: 100,
                    duration: 2000,
                }}
            />

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

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="transition-all hover:bg-blue-50 dark:hover:bg-blue-950">
                                    <svg className="mr-2 h-4 w-4" fill="#4285F4" viewBox="0 0 24 24">
                                        <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" />
                                        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#34A853" />
                                        <path
                                            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24 12.0004 24Z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Google
                                </Button>
                                <Button variant="outline" className="transition-all hover:bg-blue-50 dark:hover:bg-blue-950">
                                    <svg className="mr-2 h-4 w-4" fill="#0A66C2" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    LinkedIn
                                </Button>
                            </div>
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
        </>
    );
}
