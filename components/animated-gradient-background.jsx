"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AnimatedGradientBackground({ className, children }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                width = canvas.width = entry.contentRect.width;
                height = canvas.height = entry.contentRect.height;
            }
        });

        resizeObserver.observe(canvas.parentElement);

        // Create gradient circles
        const circles = Array.from({ length: 3 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 300 + 200,
            vx: Math.random() * 0.2 - 0.1,
            vy: Math.random() * 0.2 - 0.1,
            color: Math.random() > 0.5 ? "rgba(99, 102, 241, 0.15)" : "rgba(16, 185, 129, 0.15)", // Indigo or Emerald
        }));

        const animate = () => {
            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Draw and move circles
            circles.forEach((circle) => {
                // Move circle
                circle.x += circle.vx;
                circle.y += circle.vy;

                // Bounce off edges
                if (circle.x - circle.radius < 0 || circle.x + circle.radius > width) circle.vx *= -1;
                if (circle.y - circle.radius < 0 || circle.y + circle.radius > height) circle.vy *= -1;

                // Draw circle
                const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius);
                gradient.addColorStop(0, circle.color);
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className={cn("relative overflow-hidden", className)}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" style={{ filter: "blur(80px)" }} />
            {children}
        </div>
    );
}
