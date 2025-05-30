import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { AuthProvider } from "@/context/provider"
import { Toaster } from "@/components/ui/sonner"
import NotificationListener from "@/components/NotificationListener"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "CariFit - AI-Powered Job Matching",
    description: "Find the job that fits your CV with AI-powered job matching",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
                    <AuthProvider>
                        {children}
                        {/* Global notification listener - runs on every page */}
                        <NotificationListener />
                        {/* ShadCN Toaster component for displaying notifications */}
                        <Toaster richColors position="top-right" expand={true} closeButton={true} />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}