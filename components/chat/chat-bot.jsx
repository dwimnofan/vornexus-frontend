"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ChatBot({ jobTitle, jobDescription, companyName, initialSuggestedQuestions }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [suggestedQuestions, setSuggestedQuestions] = useState(
        initialSuggestedQuestions || [
            { id: "1", text: "What skills are required for this job?" },
            { id: "2", text: "What is the expected experience level?" },
            { id: "3", text: "Is remote work available for this position?" },
            { id: "4", text: "What are the main responsibilities?" },
        ]
    );

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Scroll to bottom of messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    }, [isOpen]);

    // Add welcome message when chat first opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                setMessages([
                    {
                        id: "welcome",
                        content: `Hi there! I'm the CariFit Assistant for the ${jobTitle} position at ${companyName}. How can I help you with your job application?`,
                        role: "assistant",
                        timestamp: new Date(),
                    },
                ]);
                setIsTyping(false);
            }, 1000);
        }
    }, [isOpen, messages.length, jobTitle, companyName]);

    const handleSendMessage = async (content) => {
        if (!content.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            content,
            role: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const response = generateResponse(content, jobTitle, jobDescription, companyName);

            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                content: response,
                role: "assistant",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setIsTyping(false);

            // Generate new suggested questions based on the conversation
            setSuggestedQuestions(generateSuggestedQuestions(content, jobTitle));
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputValue);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-full sm:w-96 bg-background border rounded-lg shadow-lg flex flex-col overflow-hidden"
                        style={{ height: "500px", maxHeight: "calc(100vh - 120px)" }}
                    >
                        {/* Chat header */}
                        <div className="p-4 border-b flex items-center justify-between bg-primary/5">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 bg-primary">
                                    <div className="text-xs font-semibold">AI</div>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-sm">CariFit Assistant</h3>
                                    <p className="text-xs text-muted-foreground">Ask about job requirements</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Chat messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                                    <div className={cn("max-w-[80%] rounded-lg p-3", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                                        <p className="text-sm">{message.content}</p>
                                        <p className="text-xs opacity-70 mt-1 text-right">{formatTime(message.timestamp)}</p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested questions */}
                        {suggestedQuestions.length > 0 && (
                            <div className="p-2 border-t bg-muted/30">
                                <p className="text-xs text-muted-foreground mb-2 px-2">Suggested questions:</p>
                                <div className="flex flex-wrap gap-2 px-2">
                                    {suggestedQuestions.map((question) => (
                                        <Badge key={question.id} variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors py-1.5" onClick={() => handleSendMessage(question.text)}>
                                            {question.text}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Chat input */}
                        <div className="p-4 border-t">
                            <div className="flex items-center gap-2">
                                <Input ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your question..." className="flex-1" />
                                <Button size="icon" onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping}>
                                    {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat toggle button */}
            <motion.button
                className={cn("flex items-center gap-2 rounded-full shadow-lg p-4 text-white transition-colors", isOpen ? "bg-primary/80 hover:bg-primary/70" : "bg-primary hover:bg-primary/90")}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? (
                    <X className="h-5 w-5" />
                ) : (
                    <>
                        <MessageSquare className="h-5 w-5" />
                        <span className="font-medium">Job Assistant</span>
                    </>
                )}
            </motion.button>
        </div>
    );
}

// Helper function to format time
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Function to generate AI responses based on the job details
function generateResponse(question, jobTitle, jobDescription, companyName) {
    const lowerQuestion = question.toLowerCase();

    // Extract skills from job description
    const skillsMatch = jobDescription?.match(/experience with ([^.]+)/gi) || [];
    const skills = skillsMatch.map((match) => match.replace("Experience with ", "").trim());

    // Extract responsibilities from job description
    const responsibilitiesMatch = jobDescription.match(/<li>([^<]+)<\/li>/g) || [];
    const responsibilities = responsibilitiesMatch
        .map((match) => match.replace(/<li>|<\/li>/g, "").trim())
        .filter((resp) => resp.length > 10)
        .slice(0, 5);

    // Check for common questions and provide appropriate responses
    if (lowerQuestion.includes("skill") || lowerQuestion.includes("requirement")) {
        return `For the ${jobTitle} position at ${companyName}, the key skills required include: ${skills.join(", ")}. The job also requires strong problem-solving abilities and good communication skills.`;
    }

    if (lowerQuestion.includes("experience") || lowerQuestion.includes("years")) {
        const experienceMatch = jobDescription.match(/(\d+\+?\s*years?|entry level|senior|junior)/i);
        const experience = experienceMatch ? experienceMatch[0] : "3-5 years";
        return `This position typically requires ${experience} of relevant experience in the field. The exact requirements may vary based on your specific skills and background.`;
    }

    if (lowerQuestion.includes("remote") || lowerQuestion.includes("work from home") || lowerQuestion.includes("location")) {
        if (jobDescription.toLowerCase().includes("remote")) {
            return `Yes, this position offers remote work options. You can work from anywhere with a reliable internet connection.`;
        } else if (jobDescription.toLowerCase().includes("hybrid")) {
            return `This position offers a hybrid work arrangement, combining some days in the office and some remote work.`;
        } else {
            return `Based on the job description, this appears to be an on-site position. However, you can always ask about flexible work arrangements during the interview process.`;
        }
    }

    if (lowerQuestion.includes("responsibilit") || lowerQuestion.includes("role") || lowerQuestion.includes("do")) {
        return `As a ${jobTitle} at ${companyName}, your main responsibilities would include:\n\n${responsibilities.map((r) => `• ${r}`).join("\n")}`;
    }

    if (lowerQuestion.includes("salary") || lowerQuestion.includes("pay") || lowerQuestion.includes("compensation")) {
        const salaryMatch = jobDescription.match(/\$[\d,]+-\$[\d,]+|\$[\d,]+/);
        const salary = salaryMatch ? salaryMatch[0] : "competitive";
        return `The salary range for this position is ${salary}. This may be negotiable based on your experience and qualifications.`;
    }

    if (lowerQuestion.includes("interview") || lowerQuestion.includes("process")) {
        return `The interview process at ${companyName} typically involves an initial screening call, followed by a technical assessment, and finally an interview with the team. The entire process usually takes 2-3 weeks.`;
    }

    if (lowerQuestion.includes("apply") || lowerQuestion.includes("application")) {
        return `To apply for this position, click the "Apply Now" button on the job details page. You'll need to submit your resume and possibly answer a few screening questions. Make sure your resume highlights the skills and experience relevant to this role.`;
    }

    if (lowerQuestion.includes("benefit") || lowerQuestion.includes("perks") || lowerQuestion.includes("insurance")) {
        const benefitsMatch = jobDescription.match(/<h3>Benefits<\/h3>[\s\S]*?<\/ul>/i);
        if (benefitsMatch) {
            const benefitsList = benefitsMatch[0].match(/<li>([^<]+)<\/li>/g) || [];
            const benefits = benefitsList.map((match) => match.replace(/<li>|<\/li>/g, "").trim());
            return `${companyName} offers the following benefits:\n\n${benefits.map((b) => `• ${b}`).join("\n")}`;
        } else {
            return `${companyName} typically offers competitive benefits which may include health insurance, retirement plans, paid time off, and professional development opportunities. Specific details would be discussed during the interview process.`;
        }
    }

    // Default response for other questions
    return `That's a great question about the ${jobTitle} position at ${companyName}. While I don't have the specific information in the job posting, this is something you could ask during the interview process or reach out to the recruiter for more details.`;
}

// Function to generate suggested questions based on the conversation
function generateSuggestedQuestions(lastQuestion, jobTitle) {
    const lowerQuestion = lastQuestion.toLowerCase();

    // Default questions
    const defaultQuestions = [
        { id: "1", text: "What skills are required for this job?" },
        { id: "2", text: "What is the expected experience level?" },
        { id: "3", text: "Is remote work available for this position?" },
        { id: "4", text: "What are the main responsibilities?" },
    ];

    // If user asked about skills, suggest related questions
    if (lowerQuestion.includes("skill") || lowerQuestion.includes("requirement")) {
        return [
            { id: "s1", text: "What tools or technologies are used?" },
            { id: "s2", text: "Are there any certifications required?" },
            { id: "s3", text: "How important is prior experience?" },
            { id: "s4", text: "What soft skills are valued?" },
        ];
    }

    // If user asked about experience, suggest related questions
    if (lowerQuestion.includes("experience") || lowerQuestion.includes("years")) {
        return [
            { id: "e1", text: "Do you consider equivalent experience?" },
            { id: "e2", text: "What level of education is required?" },
            { id: "e3", text: "Is this a junior or senior position?" },
            { id: "e4", text: "What growth opportunities are there?" },
        ];
    }

    // If user asked about remote work, suggest related questions
    if (lowerQuestion.includes("remote") || lowerQuestion.includes("location")) {
        return [
            { id: "r1", text: "Is relocation assistance provided?" },
            { id: "r2", text: "Are there specific working hours?" },
            { id: "r3", text: "How often would I need to be in office?" },
            { id: "r4", text: "Is there a home office stipend?" },
        ];
    }

    // If user asked about responsibilities, suggest related questions
    if (lowerQuestion.includes("responsibilit") || lowerQuestion.includes("role")) {
        return [
            { id: "j1", text: "What does a typical day look like?" },
            { id: "j2", text: "What team would I be working with?" },
            { id: "j3", text: "What are the key performance metrics?" },
            { id: "j4", text: "What challenges might I face in this role?" },
        ];
    }

    // If user asked about salary, suggest related questions
    if (lowerQuestion.includes("salary") || lowerQuestion.includes("pay")) {
        return [
            { id: "p1", text: "What benefits are offered?" },
            { id: "p2", text: "Is there a bonus structure?" },
            { id: "p3", text: "How often are performance reviews?" },
            { id: "p4", text: "Are there opportunities for raises?" },
        ];
    }

    // If user asked about the interview process, suggest related questions
    if (lowerQuestion.includes("interview") || lowerQuestion.includes("process")) {
        return [
            { id: "i1", text: "How should I prepare for the interview?" },
            { id: "i2", text: "What's the timeline for hiring?" },
            { id: "i3", text: "Will there be a technical assessment?" },
            { id: "i4", text: "Who will I be interviewing with?" },
        ];
    }

    // If user asked about applying, suggest related questions
    if (lowerQuestion.includes("apply") || lowerQuestion.includes("application")) {
        return [
            { id: "a1", text: "What should I highlight in my resume?" },
            { id: "a2", text: "Is a cover letter required?" },
            { id: "a3", text: "How long is the application process?" },
            { id: "a4", text: "When can I expect to hear back?" },
        ];
    }

    // If user asked about benefits, suggest related questions
    if (lowerQuestion.includes("benefit") || lowerQuestion.includes("perks")) {
        return [
            { id: "b1", text: "Is there a retirement plan?" },
            { id: "b2", text: "How much paid time off is offered?" },
            { id: "b3", text: "Are there professional development benefits?" },
            { id: "b4", text: "What health insurance options are available?" },
        ];
    }

    // Return default questions if no specific category is detected
    return defaultQuestions;
}
