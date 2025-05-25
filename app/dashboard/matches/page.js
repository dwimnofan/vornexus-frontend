"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter, SortAsc } from "lucide-react";
import { JobCard } from "@/components/job-card";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { StaggeredAppear } from "@/components/staggered-appear";
import Link from "next/link";

export default function JobMatchesPage() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("match"); // match, date, company

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch("/api/recommendations");

                if (!response.ok) {
                    throw new Error("Failed to fetch job recommendations");
                }

                const result = await response.json();
                const jobsData = result.data || [];
                setJobs(jobsData);
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredAndSortedJobs = jobs
        .filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "match":
                    return b.matchPercentage - a.matchPercentage;
                case "date":
                    return new Date(b.postedDate) - new Date(a.postedDate);
                case "company":
                    return a.company.localeCompare(b.company);
                default:
                    return 0;
            }
        });

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Job Matches</h1>
                        <p className="text-muted-foreground">Finding your perfect job opportunities...</p>
                    </div>
                </div>
                <div className="flex items-center justify-center h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Job Matches</h1>
                        <p className="text-muted-foreground">Your personalized job recommendations</p>
                    </div>
                </div>
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold">Unable to load job matches</h2>
                    <p className="text-muted-foreground mt-2">{error}</p>
                    <Button asChild className="mt-4">
                        <Link href="/dashboard/upload">Upload CV to get matches</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <RevealOnScroll>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Job Matches</h1>
                        <p className="text-muted-foreground">
                            {jobs.length} personalized job recommendations based on your profile
                        </p>
                    </div>
                </div>
            </RevealOnScroll>

            {jobs.length === 0 ? (
                <RevealOnScroll delay={100}>
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold">No job matches yet</h2>
                        <p className="text-muted-foreground mt-2">
                            Upload your CV to get personalized job recommendations
                        </p>
                        <Button asChild className="mt-4">
                            <Link href="/dashboard/upload">Upload CV</Link>
                        </Button>
                    </div>
                </RevealOnScroll>
            ) : (
                <>
                    <RevealOnScroll delay={100}>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex md:flex-row gap-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                            <input
                                                type="text"
                                                placeholder="Search jobs, companies, or locations..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                                        >
                                            <option value="match">Sort by Match %</option>
                                            <option value="date">Sort by Date</option>
                                            <option value="company">Sort by Company</option>
                                        </select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <div className="flex flex-col gap-12 md:flex-row md:gap-12">
                            <StaggeredAppear staggerAmount={150}>
                                {filteredAndSortedJobs.map((job) => (
                                    <div key={job.id}>
                                        <JobCard job={job} />
                                    </div>
                                ))}
                            </StaggeredAppear>
                        </div>
                    </RevealOnScroll>

                    {filteredAndSortedJobs.length === 0 && searchTerm && (
                        <RevealOnScroll delay={300}>
                            <div className="text-center py-8">
                                <h3 className="text-lg font-medium">No jobs found</h3>
                                <p className="text-muted-foreground mt-2">
                                    Try adjusting your search terms or filters
                                </p>
                            </div>
                        </RevealOnScroll>
                    )}
                </>
            )}
        </div>
    );
}