import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

export function SkillMatch({ name, match, size = "md", className }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "flex items-center gap-1 transition-all duration-300 hover:scale-105",
        match ? "bg-primary/10 hover:bg-primary/20" : "bg-muted hover:bg-muted/80",
        size === "sm" && "text-xs py-0 px-2",
        size === "lg" && "text-sm py-1.5 px-3",
        className,
      )}
    >
      {name}
      {match ? <Check className="h-3 w-3 text-primary ml-1" /> : <X className="h-3 w-3 text-muted-foreground ml-1" />}
    </Badge>
  )
}
