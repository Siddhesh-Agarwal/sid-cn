"use client";

import InstallButton from "@/components/install-button";
import { SpinningWheel } from "@/registry/new-york/blocks/spinning-wheel/spinning-wheel";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [reward, setReward] = useState<string | null>(null);

  useEffect(() => {
    if (reward) {
      toast.success("Reward", { description: reward });
    }
  }, [reward]);

  return (
    <div className="flex flex-col gap-4 p-4 min-h-full">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">Spinning Wheel</h3>
        <h4 className="text-sm text-muted-foreground">
          A lottery-like spinning wheel component
        </h4>
      </div>
      <div className="flex items-center justify-center min-h-[400px] border rounded-md p-4">
        <SpinningWheel
          rewardDetails={[{ reward: "Yes!" }, { reward: "No!" }]}
          setReward={setReward}
        />
      </div>
      <h2 className="text-xl font-semibold">Install</h2>
      <InstallButton componentCode="spinning-wheel" />
    </div>
  );
}
