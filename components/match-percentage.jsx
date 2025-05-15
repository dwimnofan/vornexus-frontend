"use client";

import { useState, useEffect } from "react";

export function MatchPercentage({ percentage, size = "md", animated = true }) {
    const [currentPercentage, setCurrentPercentage] = useState(0);

    // Animate the percentage on mount
    useEffect(() => {
        if (!animated) {
            setCurrentPercentage(percentage);
            return;
        }

        const start = 0;
        const end = percentage;
        const duration = 1500;
        const startTime = Date.now();

        const animateValue = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setCurrentPercentage(Math.floor(progress * end));

            if (progress < 1) {
                requestAnimationFrame(animateValue);
            }
        };

        requestAnimationFrame(animateValue);
    }, [percentage, animated]);

    // Calculate the stroke dash offset based on the percentage
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (currentPercentage / 100) * circumference;

    // Determine color based on match percentage
    const getColor = () => {
        if (currentPercentage >= 80) return "text-accent";
        if (currentPercentage >= 60) return "text-primary";
        return "text-muted-foreground";
    };

    // Determine size
    const getSize = () => {
        switch (size) {
            case "sm":
                return "h-12 w-12";
            case "lg":
                return "h-20 w-20";
            default:
                return "h-16 w-16";
        }
    };

    const getFontSize = () => {
        switch (size) {
            case "sm":
                return "text-xs";
            case "lg":
                return "text-lg";
            default:
                return "text-sm";
        }
    };

    return (
        <div className={`relative flex items-center justify-center ${getSize()}`}>
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
                {/* Progress circle with animation */}
                <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className={`${getColor()} transition-all duration-300`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`font-semibold ${getFontSize()}`}>{currentPercentage}%</span>
            </div>
        </div>
    );
}
