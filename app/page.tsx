import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Copy,
  Download,
  Star,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            <Star className="h-3 w-3 mr-1" />
            500+ Components
          </Badge>
          <Badge variant="outline" className="text-xs">
            shadcn/ui Compatible
          </Badge>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Beautiful components
          <br />
          <span className="text-muted-foreground">ready to copy</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A curated collection of copy-and-paste components built on top of
          shadcn/ui. Browse, preview, and add to your project in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-base">
            Browse Components
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="text-base">
            <Copy className="mr-2 h-4 w-4" />
            Quick Install
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start building faster</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers using Sidcn components in their
            projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base">
              <Download className="mr-2 h-4 w-4" />
              Browse Components
            </Button>
            <Button variant="outline" size="lg" className="text-base">
              View Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
