"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { MatchPercentage } from "@/components/match-percentage";
import { cn } from "@/lib/utils";
import { AnimatedButton } from "@/components/animated-button";

export function JobCard({ job }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md h-full", isHovered && "transform-gpu scale-[1.02]")} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                        <div className={cn("h-12 w-12 rounded-md overflow-hidden bg-muted flex items-center justify-center transition-transform duration-300", isHovered && "scale-110")}>
                            <img src={job.logo || "/placeholder.svg"} alt={job.company} className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg line-clamp-1">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                            <p className="text-sm text-muted-foreground mt-1">{job.location}</p>
                        </div>
                    </div>
                    <div className={cn("transition-transform duration-300", isHovered && "scale-110")}>
                        <MatchPercentage percentage={job.matchPercentage} />
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mt-4">
                        {job.skills.map((skill, index) => (
                            <Badge
                                key={skill}
                                variant="secondary"
                                className={cn("font-normal transition-all duration-300", isHovered && "bg-primary/10")}
                                style={{
                                    transitionDelay: `${index * 50}ms`,
                                    transform: isHovered ? "translateY(-2px)" : "none",
                                }}
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>

                {job.description && (
                    <div className={cn("mt-4 overflow-hidden transition-all duration-300", isExpanded ? "max-h-48" : "max-h-0")}>
                        <p className="text-sm text-muted-foreground">{job.description}</p>
                    </div>
                )}

                {job.description && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsExpanded(!isExpanded);
                        }}
                        className="mt-4 text-sm text-primary flex items-center hover:underline"
                    >
                        {isExpanded ? (
                            <>
                                Show less <ChevronUp className="ml-1 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Show more <ChevronDown className="ml-1 h-4 w-4" />
                            </>
                        )}
                    </button>
                )}
            </CardContent>
            <CardFooter className="flex items-center justify-between p-6 pt-0 border-t mt-auto">
                <p className="text-sm text-muted-foreground">Posted {job.postedDate}</p>
                <AnimatedButton size="sm" className="gap-1.5" onClick={(e) => e.preventDefault()}>
                    View Job <ExternalLink className="h-3.5 w-3.5" />
                </AnimatedButton>
            </CardFooter>
        </Card>
    );
}
