import { Badge } from "@/registry/new-york/components/badge";
import { Button } from "@/registry/new-york/components/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="container mx-auto px-4 py-24 text-center min-h-full">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Badge variant="outline">
          Open Source
        </Badge>
        <Badge variant="outline">
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
        <Button size="lg" className="text-base" asChild>
          <Link href={"/components"}>
            Browse Components
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="text-base" asChild>
          <Link href={"/blocks"}>
            Browse Blocks
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
