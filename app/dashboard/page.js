"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobCard } from "@/components/job-card";
import { FileUp, Briefcase, BarChart } from "lucide-react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { StaggeredAppear } from "@/components/staggered-appear";
import { AnimatedButton } from "@/components/animated-button";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { isAuthenticated, logoutUser, getUserInfo } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

// Sample job data
const recentJobs = [
    {
        id: "1",
        title: "Frontend Developer",
        company: "TechCorp",
        logo: "/placeholder.svg?height=48&width=48",
        location: "Remote",
        matchPercentage: 92,
        skills: ["React", "TypeScript", "Tailwind CSS"],
        postedDate: "2 days ago",
        url: "#",
        description: "We're looking for a Frontend Developer to join our team. You'll be responsible for building user interfaces for our web applications using React and TypeScript.",
    },
    {
        id: "2",
        title: "UX Designer",
        company: "DesignHub",
        logo: "/placeholder.svg?height=48&width=48",
        location: "New York, NY",
        matchPercentage: 85,
        skills: ["Figma", "UI/UX", "Prototyping"],
        postedDate: "1 week ago",
        url: "#",
        description: "Join our design team to create beautiful and intuitive user experiences. You'll work closely with product managers and developers to bring designs to life.",
    },
    {
        id: "3",
        title: "Full Stack Engineer",
        company: "GrowthStartup",
        logo: "/placeholder.svg?height=48&width=48",
        location: "San Francisco, CA",
        matchPercentage: 78,
        skills: ["Node.js", "React", "MongoDB"],
        postedDate: "3 days ago",
        url: "#",
        description: "We're seeking a Full Stack Engineer to help build our platform. You'll work on both frontend and backend development using Node.js, React, and MongoDB.",
    },
];

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <RevealOnScroll>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Welcome to CariFit. Let&#39;s find the perfect job for you.</p>
                </div>
            </RevealOnScroll>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <RevealOnScroll delay={100}>
                    <Card className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-medium">Upload CV</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-4">
                                <div className="mb-4 rounded-full bg-primary/10 p-3 transition-all duration-300 hover:scale-110 hover:bg-primary/20 group">
                                    <FileUp className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-6" />
                                </div>
                                <p className="mb-4 text-sm text-center text-muted-foreground">Upload your CV to get personalized job recommendations</p>
                                <Link href="/dashboard/upload">
                                    <AnimatedButton size="sm">Upload CV</AnimatedButton>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </RevealOnScroll>

                <RevealOnScroll delay={200}>
                    <Card className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-medium">Job Matches</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-4">
                                <div className="mb-4 rounded-full bg-primary/10 p-3 transition-all duration-300 hover:scale-110 hover:bg-primary/20 group">
                                    <Briefcase className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-6" />
                                </div>
                                <p className="mb-4 text-sm text-center text-muted-foreground">View all your job matches based on your CV</p>
                                <Link href="/dashboard/matches">
                                    <AnimatedButton size="sm">View Matches</AnimatedButton>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </RevealOnScroll>

                <RevealOnScroll delay={300}>
                    <Card className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-medium">Profile Strength</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-4">
                                <div className="mb-4 rounded-full bg-primary/10 p-3 transition-all duration-300 hover:scale-110 hover:bg-primary/20 group">
                                    <BarChart className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-6" />
                                </div>
                                <p className="mb-4 text-sm text-center text-muted-foreground">Improve your profile to get better job matches</p>
                                <Link href="/dashboard/profile">
                                    <AnimatedButton size="sm">Improve Profile</AnimatedButton>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </RevealOnScroll>
            </div>

            <RevealOnScroll>
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Recent Job Matches</h2>
                        <Link href="/dashboard/matches">
                            <AnimatedButton variant="outline" size="sm">
                                View All
                            </AnimatedButton>
                        </Link>
                    </div>
                    <StaggeredAppear className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerAmount={150}>
                        {recentJobs.map((job) => (
                            <div key={job.id}>
                                <JobCard job={job} />
                            </div>
                        ))}
                    </StaggeredAppear>
                </div>
            </RevealOnScroll>
        </div>
    );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login")
    } else {
      // Get user info from localStorage
      const userInfo = getUserInfo()
      setUser(userInfo)
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    logoutUser()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Your Dashboard</CardTitle>
            <CardDescription>{user ? `Hello, ${user.username}!` : "You are now logged in"}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is a protected page that only authenticated users can access.</p>
          </CardContent>
        </Card>

        {/* Add more dashboard content here */}
        <Card>
          <CardHeader>
            <CardTitle>Your Activity</CardTitle>
            <CardDescription>Recent actions and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No recent activity to display.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" variant="outline">
              Create New Note
            </Button>
            <Button className="w-full" variant="outline">
              View Profile
            </Button>
            <Button className="w-full" variant="outline">
              Account Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}