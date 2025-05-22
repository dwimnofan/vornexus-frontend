"use client";

import { useState } from "react";
import Link from "next/link";
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { StaggeredAppear } from "@/components/staggered-appear";
import { Badge } from "@/components/ui/badge";

// Sample job data
const jobs = [
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
    description:
      "We're looking for a Frontend Developer to join our team. You'll be responsible for building user interfaces for our web applications using React and TypeScript.",
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
    description:
      "Join our design team to create beautiful and intuitive user experiences. You'll work closely with product managers and developers to bring designs to life.",
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
    description:
      "We're seeking a Full Stack Engineer to help build our platform. You'll work on both frontend and backend development using Node.js, React, and MongoDB.",
  },
  {
    id: "4",
    title: "Product Manager",
    company: "InnovateCo",
    logo: "/placeholder.svg?height=48&width=48",
    location: "Boston, MA",
    matchPercentage: 73,
    skills: ["Product Strategy", "Agile", "User Research"],
    postedDate: "5 days ago",
    url: "#",
    description:
      "As a Product Manager, you'll be responsible for defining product strategy and roadmap. You'll work with cross-functional teams to deliver products that meet user needs.",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudTech",
    logo: "/placeholder.svg?height=48&width=48",
    location: "Remote",
    matchPercentage: 68,
    skills: ["AWS", "Docker", "Kubernetes"],
    postedDate: "1 week ago",
    url: "#",
    description:
      "We're looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You'll work with AWS, Docker, and Kubernetes to ensure our systems are reliable and scalable.",
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "DataInsights",
    logo: "/placeholder.svg?height=48&width=48",
    location: "Chicago, IL",
    matchPercentage: 65,
    skills: ["Python", "Machine Learning", "SQL"],
    postedDate: "2 weeks ago",
    url: "#",
    description:
      "Join our data science team to build machine learning models that drive business decisions. You'll work with large datasets and use Python to extract insights.",
  },
];

const FilterButton = ({ filter, isActive, toggleFilter }) => (
  <Button
    variant={isActive ? "default" : "outline"}
    size="sm"
    onClick={toggleFilter}
    className="h-8"
  >
    {filter}
  </Button>
);

export default function MatchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("match");
  const [filters, setFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobs
    .filter((job) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .filter((job) => {
      // Applied filters
      if (filters.length === 0) return true;
      return filters.some((filter) => {
        if (filter === "Remote") return job.location.includes("Remote");
        if (filter === "High Match") return job.matchPercentage >= 80;
        return job.skills.includes(filter);
      });
    })
    .sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "recent") {
        if (a.postedDate.includes("day") && b.postedDate.includes("week"))
          return -1;
        if (a.postedDate.includes("week") && b.postedDate.includes("day"))
          return 1;
        return 0;
      }
      if (sortBy === "company") return a.company.localeCompare(b.company);
      return 0;
    });

  const toggleFilter = (filter) => {
    setFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  return (
    <div className="space-y-8">
      <RevealOnScroll>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Matches</h1>
          <p className="text-muted-foreground mt-2">
            Jobs that match your skills and experience
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={200}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search jobs..."
              className="pl-9 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] transition-all duration-300 hover:border-primary/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Match Percentage</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="icon"
              className="transition-all duration-300 hover:bg-primary/10 hover:border-primary/50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
      </RevealOnScroll>

      {showFilters && (
        <RevealOnScroll>
          <div className="bg-muted/30 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filters</h3>
              <Button variant="ghost" size="sm" onClick={() => setFilters([])}>
                Clear all
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Location</h4>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    filter="Remote"
                    isActive={filters.includes("Remote")}
                    toggleFilter={() => toggleFilter("Remote")}
                  />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Match</h4>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    filter="High Match (80%+)"
                    isActive={filters.includes("High Match")}
                    toggleFilter={() => toggleFilter("High Match")}
                  />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "Node.js",
                    "Python",
                    "UI/UX",
                    "AWS",
                  ].map((skill) => (
                    <FilterButton
                      key={skill}
                      filter={skill}
                      isActive={filters.includes(skill)}
                      toggleFilter={() => toggleFilter(skill)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      )}

      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1 py-1.5 pr-1 pl-3"
            >
              {filter}
              <button
                onClick={() => toggleFilter(filter)}
                className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {filter}</span>
              </button>
            </Badge>
          ))}
        </div>
      )}

      {filteredJobs.length > 0 ? (
        <StaggeredAppear
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          staggerAmount={150}
        >
          {filteredJobs.map((job) => (
            <div key={job.id}>
              <JobCard job={job} />
            </div>
          ))}
        </StaggeredAppear>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No matching jobs found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setFilters([]);
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
