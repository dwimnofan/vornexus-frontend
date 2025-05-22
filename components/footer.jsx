import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container max-w-[1600px] mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-indigo to-accent-emerald bg-clip-text text-transparent">CariFit</span>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground">AI-powered job matching platform that analyzes your CV and recommends relevant jobs.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-3">Product</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                                    How It Works
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-3">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-3">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t">
                    <p className="text-sm text-muted-foreground text-center">© {new Date().getFullYear()} CariFit. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
