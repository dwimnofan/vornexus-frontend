import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileUp, Search, Zap } from "lucide-react";
import { AnimatedGradientBackground } from "@/components/animated-gradient-background";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { StaggeredAppear } from "@/components/staggered-appear";
import { AnimatedButton } from "@/components/animated-button";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <AnimatedGradientBackground className="py-12 md:py-24 lg:py-32 bg-background">
                    <div className="container max-w-[1600px] px-4 md:px-6 mx-auto">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mx-auto max-w-[1200px]">
                            <StaggeredAppear className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Find the Job That <span className="bg-gradient-to-r from-primary-indigo to-accent-emerald bg-clip-text text-transparent">Fits Your CV</span>
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">Let AI analyze your resume and match you to the best-fit jobs. No more endless searching.</p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link href="/register">
                                        <AnimatedButton size="lg" className="gap-1.5">
                                            Get Started <ArrowRight className="h-4 w-4" />
                                        </AnimatedButton>
                                    </Link>
                                    <Link href="/how-it-works">
                                        <Button size="lg" variant="outline">
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>
                            </StaggeredAppear>
                            {/* <div className="mx-auto lg:mx-0 relative">
                                <RevealOnScroll direction="left">
                                    <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent blur-2xl opacity-70 animate-pulse" />
                                    <Image
                                        src="/placeholder.svg?height=550&width=550"
                                        alt="CariFit AI Job Matching"
                                        className="relative mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                                        width={550}
                                        height={550}
                                    />
                                </RevealOnScroll>
                            </div> */}
                        </div>
                    </div>
                </AnimatedGradientBackground>

                {/* How It Works Section */}
                <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
                    <div className="container max-w-[1600px] px-4 md:px-6 mx-auto">
                        <RevealOnScroll>
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How CariFit Works</h2>
                                    <p className="max-w-[700px] text-muted-foreground md:text-xl">Three simple steps to find your perfect job match</p>
                                </div>
                            </div>
                        </RevealOnScroll>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-12 pt-12">
                            <RevealOnScroll delay={100}>
                                <div className="flex flex-col items-center space-y-4 text-center group">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                                        <FileUp className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold">Upload Your CV</h3>
                                        <p className="text-muted-foreground">Simply drag and drop your resume or CV in any format. Our AI will do the rest.</p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                            <RevealOnScroll delay={300}>
                                <div className="flex flex-col items-center space-y-4 text-center group">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                                        <Zap className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold">AI Analyzes Your Skills</h3>
                                        <p className="text-muted-foreground">Our AI extracts your skills, experience, and qualifications to create your profile.</p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                            <RevealOnScroll delay={500}>
                                <div className="flex flex-col items-center space-y-4 text-center group">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                                        <Search className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold">Get Matched to Jobs</h3>
                                        <p className="text-muted-foreground">Receive personalized job recommendations based on your skills and experience.</p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-12 md:py-24 lg:py-32 bg-background border-t">
                    <div className="container max-w-[1600px] px-4 md:px-6 mx-auto">
                        <RevealOnScroll>
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Find Your Perfect Job Match?</h2>
                                    <p className="max-w-[700px] text-muted-foreground md:text-xl">Join thousands of job seekers who have found their dream jobs with CariFit.</p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link href="/register">
                                        <AnimatedButton size="lg" className="gap-1.5">
                                            Get Started <ArrowRight className="h-4 w-4" />
                                        </AnimatedButton>
                                    </Link>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
