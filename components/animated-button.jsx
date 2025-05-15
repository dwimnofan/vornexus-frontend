"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AnimatedButton({ children, className, animateOnHover = true, ...props }) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Button
            className={cn("relative overflow-hidden transition-all duration-300", animateOnHover && "hover:shadow-lg hover:scale-105", className)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            {...props}
        >
            {animateOnHover && isHovering && (
                <span className="absolute inset-0 w-full h-full">
                    <span className="absolute top-0 left-0 w-full h-full bg-white/20 animate-shine" />
                </span>
            )}
            {children}
        </Button>
    );
}
