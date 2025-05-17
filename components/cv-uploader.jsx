"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AnimatedButton } from "@/components/animated-button";

export function CVUploader({ onUploadComplete, className }) {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("idle");
    const [progress, setProgress] = useState(0);
    const [isDragActive, setIsDragActive] = useState(false);

    const onDrop = useCallback(
        (acceptedFiles) => {
            const selectedFile = acceptedFiles[0];
            if (selectedFile) {
                setFile(selectedFile);
                setStatus("uploading");

                // Simulate upload progress
                let currentProgress = 0;
                const interval = setInterval(() => {
                    currentProgress += 5;
                    setProgress(currentProgress);

                    if (currentProgress >= 100) {
                        clearInterval(interval);
                        setStatus("success");
                        if (onUploadComplete) {
                            onUploadComplete(selectedFile);
                        }
                    }
                }, 150);
            }
        },
        [onUploadComplete]
    );

    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "text/plain": [".txt"],
        },
        maxFiles: 1,
        disabled: status === "uploading",
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
    });

    const resetUpload = () => {
        setFile(null);
        setStatus("idle");
        setProgress(0);
    };

    // Animation for progress bar
    useEffect(() => {
        if (status === "uploading") {
            const element = document.querySelector(".progress-pulse");
            element?.classList.add("animate-pulse");
        }
    }, [status]);

    return (
        <div className={cn("w-full", className)}>

            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer",
                    isDragActive || isDragAccept ? "border-primary bg-primary/5 scale-102 shadow-lg" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50",
                    status === "success" && "border-accent bg-accent/5",
                    status === "error" && "border-destructive bg-destructive/5"
                )}
            >
                <input {...getInputProps()} />

                {status === "idle" && (
                    <>
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 transition-transform duration-500 hover:scale-110 hover:bg-primary/20">
                            <FileUp className={cn("h-8 w-8 text-primary transition-transform duration-300", isDragActive && "scale-125")} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{isDragActive ? "Drop your CV here" : "Upload your CV"}</h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-md">Drag and drop your CV file here, or click to browse. We support PDF, DOC, DOCX, and TXT formats.</p>
                        <AnimatedButton variant="outline" size="sm">
                            Select File
                        </AnimatedButton>
                    </>
                )}

                {status === "uploading" && (
                    <>
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Uploading your CV</h3>
                        <p className="text-sm text-muted-foreground mb-4">{file?.name}</p>
                        <div className="w-full max-w-md mb-4 progress-pulse">
                            <Progress value={progress} className="h-2" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <span className="inline-block animate-pulse">Analyzing your skills and experience...</span>
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="mb-4 transform transition-all duration-500 animate-bounce-once">
                            <CheckCircle className="h-12 w-12 text-accent" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Upload Complete!</h3>
                        <p className="text-sm text-muted-foreground mb-4">{file?.name}</p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={resetUpload}>
                                Upload Another
                            </Button>
                            <AnimatedButton size="sm">Continue</AnimatedButton>
                        </div>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="mb-4 transform transition-all duration-300 animate-shake">
                            <AlertCircle className="h-12 w-12 text-destructive" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Upload Failed</h3>
                        <p className="text-sm text-muted-foreground mb-4">There was an error uploading your file. Please try again.</p>
                        <AnimatedButton variant="outline" size="sm" onClick={resetUpload}>
                            Try Again
                        </AnimatedButton>
                    </>
                )}
            </div>

            {file && status !== "error" && (
                <div className="mt-4 text-sm text-muted-foreground">
                    <p>
                        <span className="font-medium">File:</span> {file.name}
                    </p>
                    <p>
                        <span className="font-medium">Size:</span> {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                </div>
            )}
        </div>
    );
}
