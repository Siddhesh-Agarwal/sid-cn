import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { blockPages } from "@/lib/data";
import Link from "next/link";

export default function Page() {
  return (
    <section className="min-h-screen md:px-12">
      <h1 className="text-3xl font-bold text-center mb-6">Blocks</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {blockPages.map((page, index) => (
          <Link href={page.path} key={index}>
            <Card>
              <CardHeader>
                <CardTitle>{page.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
