"use client";

import InstallButton from "@/components/install-button";
import { Label } from "@/components/ui/label";
import { DateInput } from "@/registry/new-york/components/date-input";
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
        <h3 className="text-xl font-semibold">Date Input</h3>
        <h4 className="text-sm text-muted-foreground">
          A beautiful date input component
        </h4>
      </div>
      <div className="flex items-center justify-center min-h-[400px] border rounded-md p-4">
        <div className="flex flex-col">
          <Label className="mb-1">Enter a date</Label>
          <DateInput onChange={setDate} />
        </div>
      </div>
      <h2 className="text-xl font-semibold">Install</h2>
      <InstallButton componentCode="date-input" />
    </div>
  );
}
