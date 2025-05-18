"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Building,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  DollarSign,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MatchPercentage } from "@/components/match-percentage"
import { AnimatedButton } from "@/components/animated-button"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { StaggeredAppear } from "@/components/staggered-appear"
import { SkillMatch } from "@/components/skill-match"
import { JobCard } from "@/components/job-card"
import { ChatBot } from "@/components/chat/chat-bot"

// mock data job details
const jobsData = {
  "1": {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Remote",
    locationType: "Remote",
    jobType: "Full-time",
    salary: "$90,000 - $120,000",
    postedDate: "2 days ago",
    applicationDeadline: "30 days",
    experience: "3-5 years",
    matchPercentage: 92,
    skills: [
      { name: "React", match: true },
      { name: "TypeScript", match: true },
      { name: "Tailwind CSS", match: true },
      { name: "Next.js", match: true },
      { name: "GraphQL", match: false },
      { name: "Jest", match: true },
      { name: "Webpack", match: false },
    ],
    description: `
      <h3>About the Role</h3>
      <p>We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications using React and TypeScript.</p>
      
      <h3>Responsibilities</h3>
      <ul>
        <li>Develop new user-facing features using React.js</li>
        <li>Build reusable components and front-end libraries for future use</li>
        <li>Translate designs and wireframes into high-quality code</li>
        <li>Optimize components for maximum performance across a vast array of web-capable devices and browsers</li>
        <li>Collaborate with the design team to implement visual elements</li>
      </ul>
      
      <h3>Requirements</h3>
      <ul>
        <li>3+ years of experience with React.js</li>
        <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model</li>
        <li>Experience with TypeScript</li>
        <li>Experience with modern CSS frameworks like Tailwind CSS</li>
        <li>Familiarity with RESTful APIs and GraphQL</li>
        <li>Understanding of server-side rendering and its benefits</li>
        <li>Good understanding of SEO principles and ensuring that applications are accessible</li>
      </ul>
      
      <h3>Benefits</h3>
      <ul>
        <li>Competitive salary</li>
        <li>Health, dental, and vision insurance</li>
        <li>401(k) matching</li>
        <li>Flexible working hours</li>
        <li>Remote work options</li>
        <li>Professional development budget</li>
      </ul>
    `,
    companyDescription:
      "TechCorp is a leading technology company specializing in web and mobile application development. We work with clients across various industries to deliver high-quality software solutions.",
    companySize: "51-200 employees",
    companyIndustry: "Software Development",
    companyWebsite: "https://techcorp.example.com",
    applicationUrl: "#",
  },
  "2": {
    id: "2",
    title: "UX Designer",
    company: "DesignHub",
    logo: "/placeholder.svg?height=80&width=80",
    location: "New York, NY",
    locationType: "On-site",
    jobType: "Full-time",
    salary: "$85,000 - $110,000",
    postedDate: "1 week ago",
    applicationDeadline: "21 days",
    experience: "2-4 years",
    matchPercentage: 85,
    skills: [
      { name: "Figma", match: true },
      { name: "UI/UX", match: true },
      { name: "Prototyping", match: true },
      { name: "User Research", match: false },
      { name: "Adobe XD", match: true },
      { name: "Sketch", match: false },
    ],
    description: `
      <h3>About the Role</h3>
      <p>We are seeking a talented UX Designer to create amazing user experiences for our products. You will work closely with product managers and developers to design intuitive interfaces.</p>
      
      <h3>Responsibilities</h3>
      <ul>
        <li>Create user flows, wireframes, prototypes, and high-fidelity designs</li>
        <li>Conduct user research and usability testing</li>
        <li>Collaborate with product managers to define product requirements</li>
        <li>Work with developers to ensure designs are implemented correctly</li>
        <li>Create and maintain design systems</li>
      </ul>
      
      <h3>Requirements</h3>
      <ul>
        <li>2+ years of experience in UX/UI design</li>
        <li>Proficiency with design tools such as Figma, Adobe XD, or Sketch</li>
        <li>Experience with prototyping tools</li>
        <li>Understanding of user-centered design principles</li>
        <li>Ability to work in a fast-paced environment</li>
        <li>Strong communication and presentation skills</li>
      </ul>
      
      <h3>Benefits</h3>
      <ul>
        <li>Competitive salary</li>
        <li>Health insurance</li>
        <li>Flexible working hours</li>
        <li>Professional development opportunities</li>
        <li>Creative work environment</li>
      </ul>
    `,
    companyDescription:
      "DesignHub is a creative agency that specializes in user experience design, branding, and digital marketing. We help businesses create memorable and effective digital experiences.",
    companySize: "11-50 employees",
    companyIndustry: "Design",
    companyWebsite: "https://designhub.example.com",
    applicationUrl: "#",
  },
  "3": {
    id: "3",
    title: "Full Stack Engineer",
    company: "GrowthStartup",
    logo: "/placeholder.svg?height=80&width=80",
    location: "San Francisco, CA",
    locationType: "Hybrid",
    jobType: "Full-time",
    salary: "$100,000 - $140,000",
    postedDate: "3 days ago",
    applicationDeadline: "14 days",
    experience: "4-6 years",
    matchPercentage: 78,
    skills: [
      { name: "Node.js", match: true },
      { name: "React", match: true },
      { name: "MongoDB", match: true },
      { name: "Express", match: false },
      { name: "AWS", match: false },
      { name: "Docker", match: true },
    ],
    description: `
      <h3>About the Role</h3>
      <p>We're looking for a Full Stack Engineer to help build our platform. You'll work on both frontend and backend development using Node.js, React, and MongoDB.</p>
      
      <h3>Responsibilities</h3>
      <ul>
        <li>Design and implement new features and functionality</li>
        <li>Build reusable code and libraries for future use</li>
        <li>Optimize applications for maximum speed and scalability</li>
        <li>Collaborate with other team members and stakeholders</li>
        <li>Ensure the technical feasibility of UI/UX designs</li>
      </ul>
      
      <h3>Requirements</h3>
      <ul>
        <li>4+ years of experience in full stack development</li>
        <li>Proficiency with React.js and Node.js</li>
        <li>Experience with MongoDB or similar NoSQL databases</li>
        <li>Understanding of server-side templating languages</li>
        <li>Familiarity with AWS services</li>
        <li>Experience with Docker and containerization</li>
      </ul>
      
      <h3>Benefits</h3>
      <ul>
        <li>Competitive salary and equity</li>
        <li>Health, dental, and vision insurance</li>
        <li>Unlimited PTO</li>
        <li>Home office stipend</li>
        <li>Professional development budget</li>
        <li>Flexible work arrangements</li>
      </ul>
    `,
    companyDescription:
      "GrowthStartup is a fast-growing tech company focused on building innovative solutions for the financial services industry. We're backed by top-tier investors and are expanding our team.",
    companySize: "11-50 employees",
    companyIndustry: "FinTech",
    companyWebsite: "https://growthstartup.example.com",
    applicationUrl: "#",
  },
  "4": {
    id: "4",
    title: "Product Manager",
    company: "InnovateCo",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Boston, MA",
    locationType: "Hybrid",
    jobType: "Full-time",
    salary: "$110,000 - $150,000",
    postedDate: "5 days ago",
    applicationDeadline: "30 days",
    experience: "5+ years",
    matchPercentage: 73,
    skills: [
      { name: "Product Strategy", match: true },
      { name: "Agile", match: true },
      { name: "User Research", match: false },
      { name: "Data Analysis", match: true },
      { name: "Roadmapping", match: true },
      { name: "A/B Testing", match: false },
    ],
    description: `
      <h3>About the Role</h3>
      <p>As a Product Manager, you'll be responsible for defining product strategy and roadmap. You'll work with cross-functional teams to deliver products that meet user needs.</p>
      
      <h3>Responsibilities</h3>
      <ul>
        <li>Define the product vision, strategy, and roadmap</li>
        <li>Gather and prioritize product requirements</li>
        <li>Work closely with engineering, design, and marketing teams</li>
        <li>Ensure products align with company goals</li>
        <li>Analyze market trends and competition</li>
      </ul>
      
      <h3>Requirements</h3>
      <ul>
        <li>5+ years of product management experience</li>
        <li>Experience with Agile development methodologies</li>
        <li>Strong analytical and problem-solving skills</li>
        <li>Excellent communication and presentation abilities</li>
        <li>Experience with data-driven decision making</li>
        <li>Technical background preferred</li>
      </ul>
      
      <h3>Benefits</h3>
      <ul>
        <li>Competitive salary</li>
        <li>Comprehensive benefits package</li>
        <li>Flexible work arrangements</li>
        <li>Professional development opportunities</li>
        <li>Collaborative work environment</li>
      </ul>
    `,
    companyDescription:
      "InnovateCo is a technology company that develops software solutions for healthcare providers. Our mission is to improve patient care through innovative technology.",
    companySize: "201-500 employees",
    companyIndustry: "Healthcare Technology",
    companyWebsite: "https://innovateco.example.com",
    applicationUrl: "#",
  },
  "5": {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudTech",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Remote",
    locationType: "Remote",
    jobType: "Full-time",
    salary: "$95,000 - $130,000",
    postedDate: "1 week ago",
    applicationDeadline: "21 days",
    experience: "3-5 years",
    matchPercentage: 68,
    skills: [
      { name: "AWS", match: true },
      { name: "Docker", match: true },
      { name: "Kubernetes", match: false },
      { name: "CI/CD", match: true },
      { name: "Terraform", match: false },
      { name: "Linux", match: true },
    ],
    description: `
      <h3>About the Role</h3>
      <p>We're looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You'll work with AWS, Docker, and Kubernetes to ensure our systems are reliable and scalable.</p>
      
      <h3>Responsibilities</h3>
      <ul>
        <li>Design, implement, and maintain CI/CD pipelines</li>
        <li>Manage cloud infrastructure using AWS services</li>
        <li>Implement containerization using Docker and Kubernetes</li>
        <li>Automate infrastructure provisioning with Terraform</li>
        <li>Monitor system performance and troubleshoot issues</li>
      </ul>
      
      <h3>Requirements</h3>
      <ul>
        <li>3+ years of experience in DevOps or SRE roles</li>
        <li>Strong knowledge of AWS services</li>
        <li>Experience with Docker and container orchestration</li>
        <li>Familiarity with infrastructure as code tools</li>
        <li>Understanding of networking and security concepts</li>
        <li>Experience with monitoring and logging tools</li>
      </ul>
      
      <h3>Benefits</h3>
      <ul>
        <li>Competitive salary</li>
        <li>Remote work</li>
        <li>Flexible hours</li>
        <li>Health insurance</li>
        <li>Professional development budget</li>
        <li>Home office stipend</li>
      </ul>
    `,
    companyDescription:
      "CloudTech specializes in cloud infrastructure and DevOps solutions. We help companies build and maintain scalable, reliable systems on AWS and other cloud platforms.",
    companySize: "11-50 employees",
    companyIndustry: "Cloud Computing",
    companyWebsite: "https://cloudtech.example.com",
    applicationUrl: "#",
  },
  "6": {
    id: "6",
    title: "Data Scientist",
    company: "DataInsights",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Chicago, IL",
    locationType: "Hybrid",
    jobType: "Full-time",
    salary: "$100,000 - $140,000",
    postedDate: "2 weeks ago",
    applicationDeadline: "30 days",
    experience: "3-5 years",
    matchPercentage: 65,
    skills: [
      { name: "Python", match: true },
      { name: "Machine Learning", match: false },
      { name: "SQL", match: true },
      { name: "Data Visualization", match: true },
      { name: "Statistics", match: false },
      { name: "TensorFlow", match: false },
    ],
    description: `
      <h3>About the Role</h3>
      <p>Join our data science team to build machine learning models that drive business decisions. You'll work with large datasets and use Python to extract insights.</p>
      
      <h3>Responsibilities</h3>
      <ul>
        <li>Develop machine learning models to solve business problems</li>
        <li>Analyze large datasets to extract insights</li>
        <li>Create data visualizations to communicate findings</li>
        <li>Collaborate with product and engineering teams</li>
        <li>Stay up-to-date with the latest ML research and techniques</li>
      </ul>
      
      <h3>Requirements</h3>
      <ul>
        <li>3+ years of experience in data science or related field</li>
        <li>Strong programming skills in Python</li>
        <li>Experience with machine learning libraries and frameworks</li>
        <li>Proficiency in SQL and data manipulation</li>
        <li>Knowledge of statistics and experimental design</li>
        <li>Experience with data visualization tools</li>
      </ul>
      
      <h3>Benefits</h3>
      <ul>
        <li>Competitive salary</li>
        <li>Health, dental, and vision insurance</li>
        <li>401(k) matching</li>
        <li>Flexible work arrangements</li>
        <li>Professional development opportunities</li>
        <li>Collaborative work environment</li>
      </ul>
    `,
    companyDescription:
      "DataInsights is a data analytics company that helps businesses make data-driven decisions. We specialize in machine learning, data visualization, and predictive analytics.",
    companySize: "51-200 employees",
    companyIndustry: "Data Analytics",
    companyWebsite: "https://datainsights.example.com",
    applicationUrl: "#",
  },
}

// Similar jobs data (simplified)
const similarJobs = [
  {
    id: "7",
    title: "Senior Frontend Developer",
    company: "WebTech",
    logo: "/placeholder.svg?height=48&width=48",
    location: "Remote",
    matchPercentage: 88,
    skills: ["React", "TypeScript", "Redux"],
    postedDate: "1 day ago",
    url: "#",
  },
  {
    id: "8",
    title: "React Developer",
    company: "AppWorks",
    logo: "/placeholder.svg?height=48&width=48",
    location: "New York, NY",
    matchPercentage: 85,
    skills: ["React", "JavaScript", "CSS"],
    postedDate: "3 days ago",
    url: "#",
  },
  {
    id: "9",
    title: "Frontend Engineer",
    company: "TechStart",
    logo: "/placeholder.svg?height=48&width=48",
    location: "San Francisco, CA",
    matchPercentage: 82,
    skills: ["React", "TypeScript", "HTML"],
    postedDate: "1 week ago",
    url: "#",
  },
]

export default function JobDetailPage({ params }) {
  const router = useRouter()
  const [job, setJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [showApplySuccess, setShowApplySuccess] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const jobData = jobsData[params.id]
        if (jobData) {
          setJob(jobData)
        } else {
          router.push("/dashboard/matches")
        }
      } catch (error) {
        console.error("Error fetching job details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [params.id, router])

  const handleApply = () => {
    setShowApplySuccess(true)
    setTimeout(() => {
      setShowApplySuccess(false)
    }, 3000)
  }

  const handleSaveJob = () => {
    setIsSaved(!isSaved)
  }

  const handleShare = () => {
    setShowShareOptions(!showShareOptions)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Job not found</h2>
        <p className="text-muted-foreground mt-2">The job you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/matches">Back to job matches</Link>
        </Button>
      </div>
    )
  }

  return (
    <>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="gap-1">
            <Link href="/dashboard/matches">
              <ArrowLeft className="h-4 w-4" /> Back to matches
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare} className="relative">
              <Share2 className="h-4 w-4 mr-1" /> Share
              {showShareOptions && (
                <div className="absolute top-full right-0 mt-2 bg-background border rounded-md shadow-lg p-2 z-10">
                  <div className="flex flex-col gap-2">
                    <Button variant="ghost" size="sm" className="justify-start">
                      Copy link
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start">
                      Email
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start">
                      LinkedIn
                    </Button>
                  </div>
                </div>
              )}
            </Button>
            <Button
              variant={isSaved ? "default" : "outline"}
              size="sm"
              onClick={handleSaveJob}
              className={isSaved ? "bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary" : ""}
            >
              <Bookmark className={`h-4 w-4 mr-1 ${isSaved ? "fill-primary" : ""}`} />
              {isSaved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RevealOnScroll>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      <img
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold">{job.title}</h1>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" /> {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {job.location}
                        </span>
                        <Badge variant="outline" className="ml-1">
                          {job.locationType}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Posted {job.postedDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Apply within {job.applicationDeadline}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{job.jobType}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:self-center">
                      <MatchPercentage percentage={job.matchPercentage} size="lg" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {job.skills.map((skill) => (
                      <SkillMatch key={skill.name} name={skill.name} match={skill.match} />
                    ))}
                  </div>

                  <div className="mt-6">
                    <AnimatedButton onClick={handleApply} className="w-full sm:w-auto">
                      Apply Now <ExternalLink className="ml-1 h-4 w-4" />
                    </AnimatedButton>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <div
                    className="prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>

          <div className="space-y-6">
            <RevealOnScroll delay={200}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">About {job.company}</h2>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                      <img
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{job.company}</h3>
                      <a
                        href={job.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center"
                      >
                        Visit website <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{job.companyDescription}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry</span>
                      <span>{job.companyIndustry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company size</span>
                      <span>{job.companySize}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Match Analysis</h2>
                  <div className="flex justify-center mb-4">
                    <MatchPercentage percentage={job.matchPercentage} size="lg" animated={false} />
                  </div>
                  <p className="text-sm text-center mb-4">
                    Your profile matches <span className="font-semibold">{job.matchPercentage}%</span> of the
                    requirements for this job.
                  </p>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Skills Match</h3>
                    <div className="space-y-2">
                      {job.skills.map((skill) => (
                        <div key={skill.name} className="flex justify-between items-center">
                          <span className="text-sm">{skill.name}</span>
                          {skill.match ? (
                            <Badge className="bg-green-500 hover:bg-green-600">Match</Badge>
                          ) : (
                            <Badge variant="outline">Missing</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>
        </div>

        <RevealOnScroll delay={400}>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Similar Jobs</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggeredAppear staggerAmount={150}>
                {similarJobs.map((job) => (
                  <div key={job.id}>
                    <JobCard job={job} />
                  </div>
                ))}
              </StaggeredAppear>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <ChatBot
        jobTitle={job.title}
        jobDescription={job.description}
        companyName={job.company}
        initialSuggestedQuestions={[
          { id: "1", text: "What skills are required for this job?" },
          { id: "2", text: `What experience is needed for the ${job.title} role?` },
          { id: "3", text: `Is this a ${job.locationType} position?` },
          { id: "4", text: "What are the main responsibilities?" },
        ]}
      />
    </>
  )
}
