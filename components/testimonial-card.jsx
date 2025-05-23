import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function TestimonialCard({ name, role, company, content, avatar }) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-center">
          <Quote className="h-8 w-8 text-primary/40" />
        </div>
        <p className="text-center text-muted-foreground">{content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2 pt-0">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image src={avatar || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div className="text-center">
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {role} at {company}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
