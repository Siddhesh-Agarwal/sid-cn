"use client";

import { CodeBlock } from "@/components/code-block";
import InstallButton from "@/components/install-button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DateTimeInput } from "@/registry/new-york/components/date-time-input";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
        <h3 className="text-xl font-semibold">Date Time Input</h3>
        <h4 className="text-sm text-muted-foreground">
          A beautiful date time input component
        </h4>
      </div>
      <section id="example">
        <div className="flex items-center justify-center min-h-[400px] border rounded-md p-4">
          <div className="flex flex-col">
            <Label className="mb-1">Enter a date and time</Label>
            <DateTimeInput onChange={(date) => setDate(date)} />
          </div>
        </div>
      </section>

      <Separator />

      <section id="installation" className="py-4">
        <h2 className="text-xl font-semibold mb-2">Installation</h2>
        <InstallButton componentCode="date-time-input" />
      </section>

      <Separator />

      <section id="usage" className="py-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock
          text={`import { DateTimeInput } from "@/components/ui/date-time-input"`}
        />
        <CodeBlock
          text={`const [date, setDate] = useState<Date | null>(null);`}
        />
        <CodeBlock
          text={`<DateTimeInput onChange={(date) => setDate(date)} />`}
        />
      </section>
    </div>
  );
}
