"use client"

import { useState, useEffect } from "react"
import { TestimonialCard } from "@/components/testimonial-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content:
        "CariFit helped me find my dream job in just two weeks! The AI matching technology is incredibly accurate and saved me countless hours of searching.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateCo",
      content:
        "After struggling for months to find the right opportunity, CariFit connected me with a company that perfectly matched my skills and values.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "DesignHub",
      content:
        "The profile strength feature gave me valuable insights on how to improve my resume. Within days of making the suggested changes, I started receiving interview requests.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  useEffect(() => {
    if (!isAutoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoplay, testimonials.length])

  const handlePrev = () => {
    setIsAutoplay(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoplay(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Success Stories</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from professionals who found their dream jobs with CariFit.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-4xl py-12">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <TestimonialCard {...testimonial} />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-background p-2 shadow-md hover:bg-accent md:-left-6"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-background p-2 shadow-md hover:bg-accent md:-right-6"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoplay(false)
                  setActiveIndex(index)
                }}
                className={`h-2 w-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
