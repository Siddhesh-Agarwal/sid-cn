"use client";

import { CodeBlock } from "@/components/code-block";
import InstallButton from "@/components/install-button";
import { Separator } from "@/components/ui/separator";
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
      <section id="example">
        <div className="flex items-center justify-center min-h-100 border rounded-md p-4">
          <SpinningWheel
            rewardDetails={[{ reward: "Yes!" }, { reward: "No!" }]}
            setReward={setReward}
          />
        </div>
      </section>

      <Separator />

      <section id="installation">
        <h2 className="text-xl font-semibold">Installation</h2>
        <InstallButton componentCode="spinning-wheel" />
      </section>

      <Separator />

      <section id="usage">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock
          text={`import { type Reward, SpinningWheel } from "@/components/spinning-wheel"`}
        />
        <CodeBlock
          text={`
const [reward, setReward] = useState<string | null>(null);
const rewards: Reward[] = [
  { reward: "Yes!" },
  { reward: "No!" },
];
        `}
        />
        <CodeBlock
          text={`<SpinningWheel rewardDetails={rewards} setReward={setReward} />`}
        />
      </section>
    </div>
  );
}
