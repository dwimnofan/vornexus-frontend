"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function RevealOnScroll({ children, className, threshold = 0.1, delay = 0, direction = "up" }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold,
                rootMargin: "0px 0px -100px 0px",
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold]);

    const getDirectionStyles = () => {
        if (!isVisible) {
            switch (direction) {
                case "up":
                    return "translate-y-16";
                case "down":
                    return "translate-y-[-4rem]";
                case "left":
                    return "translate-x-16";
                case "right":
                    return "translate-x-[-4rem]";
                case "none":
                    return "opacity-0";
                default:
                    return "translate-y-16";
            }
        }
        return "";
    };

    return (
        <div ref={ref} className={cn("transition-all duration-700 ease-out", isVisible ? "opacity-100 transform-none" : `opacity-0 ${getDirectionStyles()}`, className)} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}
