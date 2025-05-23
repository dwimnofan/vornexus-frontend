"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedButton } from "@/components/animated-button";
import { Progress } from "@/components/ui/progress";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

export default function RegisterPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState ( null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Password strength checker
    useEffect(() => {
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password),
        };
        setPasswordChecks(checks);

        // Calculate strength
        const passedChecks = Object.values(checks).filter(Boolean).length;
        setPasswordStrength((passedChecks / 5) * 100);
    }, [password]);

    const getPasswordStrengthText = () => {
        if (passwordStrength === 0) return "No password";
        if (passwordStrength <= 20) return "Very weak";
        if (passwordStrength <= 40) return "Weak";
        if (passwordStrength <= 60) return "Medium";
        if (passwordStrength <= 80) return "Strong";
        return "Very strong";
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 20) return "bg-destructive";
        if (passwordStrength <= 40) return "bg-orange-500";
        if (passwordStrength <= 60) return "bg-yellow-500";
        if (passwordStrength <= 80) return "bg-blue-500";
        return "bg-green-500";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (passwordStrength < 60) {
            setError("Please choose a stronger password");
            return;
        }

        if (!agreedToTerms) {
            setError("You must agree to the terms and conditions");
            return;
        }

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
            setError("An error occurred during registration. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="w-full max-w-md">
                <RevealOnScroll>
                    <Card className="border-none shadow-lg">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                            <CardDescription className="text-center">Enter your information to create your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First name</Label>
                                        <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="transition-all duration-300 focus:ring-2 focus:ring-primary/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last name</Label>
                                        <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="transition-all duration-300 focus:ring-2 focus:ring-primary/20" />
                                    </div>
                                </div>
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
                                    <Label htmlFor="password">Password</Label>
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
                                    {password && (
                                        <div className="space-y-2 mt-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs">{getPasswordStrengthText()}</span>
                                                <span className="text-xs">{passwordStrength.toFixed(0)}%</span>
                                            </div>
                                            <Progress value={passwordStrength} className={`h-1 ${getPasswordStrengthColor()}`} />
                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                <div className="flex items-center gap-1 text-xs">
                                                    {passwordChecks.length ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-muted-foreground" />}
                                                    <span className={passwordChecks.length ? "text-green-500" : "text-muted-foreground"}>At least 8 characters</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs">
                                                    {passwordChecks.uppercase ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-muted-foreground" />}
                                                    <span className={passwordChecks.uppercase ? "text-green-500" : "text-muted-foreground"}>Uppercase letter</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs">
                                                    {passwordChecks.lowercase ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-muted-foreground" />}
                                                    <span className={passwordChecks.lowercase ? "text-green-500" : "text-muted-foreground"}>Lowercase letter</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs">
                                                    {passwordChecks.number ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-muted-foreground" />}
                                                    <span className={passwordChecks.number ? "text-green-500" : "text-muted-foreground"}>Number</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs">
                                                    {passwordChecks.special ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-muted-foreground" />}
                                                    <span className={passwordChecks.special ? "text-green-500" : "text-muted-foreground"}>Special character</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className={`pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${confirmPassword && password !== confirmPassword ? "border-destructive focus:ring-destructive/20" : ""}`}
                                        />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                                        </button>
                                    </div>
                                    {confirmPassword && password !== confirmPassword && <p className="text-xs text-destructive mt-1">Passwords do not match</p>}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked)} />
                                    <Label htmlFor="terms" className="text-sm font-normal">
                                        I agree to the{" "}
                                        <Link href="/terms" className="text-primary hover:underline transition-colors">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-primary hover:underline transition-colors">
                                            Privacy Policy
                                        </Link>
                                    </Label>
                                </div>
                                {error && <div className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">{error}</div>}
                                <AnimatedButton type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                        </>
                                    ) : (
                                        "Create account"
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
                                Already have an account?{" "}
                                <Link href="/login" className="text-primary hover:underline transition-colors">
                                    Sign in
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </RevealOnScroll>
            </div>
        </>
    );
}
