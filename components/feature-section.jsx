"use client"

import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { FeatureCard } from "@/components/feature-card"
import { Upload, Search, BarChart } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: Upload,
      title: "Upload CV",
      description:
        "Upload your CV and let our AI analyze your skills, experience, and preferences to find the perfect job matches.",
    },
    {
      icon: Search,
      title: "Job Matches",
      description: "Receive personalized job recommendations based on your profile, skills, and career goals.",
    },
    {
      icon: BarChart,
      title: "Profile Strength",
      description: "Get insights on how to improve your profile to increase your chances of landing your dream job.",
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features that make job hunting easier</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              CariFit provides powerful tools to help you find and land your dream job faster.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 md:gap-10">
          {features.map((feature, index) => (
            <RevealOnScroll key={index} delay={index * 100}>
              <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
