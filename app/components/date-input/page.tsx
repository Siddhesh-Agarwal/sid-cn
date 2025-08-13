"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import InstallButton from "@/components/install-button";
import { Label } from "@/components/ui/label";
import { DateInput } from "@/registry/new-york/components/date-input";
import { CodeBlock } from "@/components/code-block";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (date) {
      toast.info("Date Selected", { description: date.toUTCString() });
    }
  }, [date]);

  return (
    <div className="flex flex-col gap-4 p-4 min-h-full">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">Date Input</h3>
        <h4 className="text-sm text-muted-foreground">
          A beautiful date input component
        </h4>
      </div>
      <section id="example">
        <div className="flex items-center justify-center min-h-[400px] border rounded-md p-4">
          <div className="flex flex-col">
            <Label className="mb-1">Enter a date</Label>
            <DateInput onChange={setDate} />
          </div>
        </div>
      </section>

      <Separator />

      <section id="installation" className="py-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <InstallButton componentCode="date-input" />
      </section>

      <Separator />

      <section id="usage" className="py-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock
          text={`import { DateInput } from "@/components/ui/date-input"`}
        />
        <CodeBlock
          text={`const [date, setDate] = useState<Date | null>(null);`}
        />
        <CodeBlock text={`<DateInput onChange={setDate} />`} />
      </section>
    </div>
  );
}
