"use client";

import { useState } from "react";
import { CVUploader } from "@/components/cv-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function UploadPage() {
    const [uploadResult, setUploadResult] = useState(null);

    const handleUploadComplete = (file, result) => {
        setUploadResult({
            file,
            ...result
        });
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Upload Your CV</h1>
                <p className="text-muted-foreground mt-2">Upload your CV to get personalized job recommendations</p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <CVUploader className="mb-6" onUploadComplete={handleUploadComplete} />

                    <div className="border-t pt-6">
                        <h3 className="font-medium mb-2">What happens next?</h3>
                        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                            <li>Our AI will analyze your CV to extract your skills and experience</li>
                            <li>We&apos;ll match your profile with job requirements from thousands of listings</li>
                            <li>You&apos;ll receive personalized job recommendations based on your qualifications</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Link href="/dashboard/matches">
                    <Button className="gap-1.5" disabled={!uploadResult}>
                        View Matches <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
