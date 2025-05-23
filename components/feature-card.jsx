import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
