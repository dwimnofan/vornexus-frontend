"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatedButton } from "@/components/animated-button"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div
            className={`space-y-4 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              AI-Powered Job Matching
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Find Your Dream Job with CariFit
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Our AI-powered platform matches your skills and preferences with the perfect job opportunities. Upload
              your CV and let CariFit do the rest.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <AnimatedButton href="/dashboard">Get Started</AnimatedButton>
              <Link
                href="#features"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div
            className={`flex items-center justify-center transition-all duration-700 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="relative w-full h-[350px] md:h-[400px] lg:h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="CariFit Dashboard Preview"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
