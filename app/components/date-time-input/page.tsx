"use client";

import InstallButton from "@/components/install-button";
import { Label } from "@/components/ui/label";
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
    <div className="flex flex-col gap-4 p-4 min-h-[450px] relative">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">Date Time Input</h3>
          <h4 className="text-sm text-muted-foreground">
            A beautiful date time input component
          </h4>
        </div>
        <InstallButton componentCode="date-time-input" />
      </div>
      <div className="flex items-center justify-center min-h-[400px] relative">
        <div className="flex flex-col">
          <Label className="mb-1">Enter a date and time</Label>
          <DateTimeInput onChange={(date) => setDate(date)} />
        </div>
      </div>
    </div>
  );
}
