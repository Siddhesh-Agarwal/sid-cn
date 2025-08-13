"use client";

import { CodeBlock } from "@/components/code-block";
import InstallButton from "@/components/install-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const variants = ["success", "warning", "subtle", "glass"];
  const shapes = ["default", "pill", "square"];

  return (
    <div className="flex flex-col gap-4 p-4 min-h-full">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">Button</h3>
        <h4 className="text-sm text-muted-foreground">
          A beautiful button component
        </h4>
      </div>
      <section id="example">
        <div className="grid grid-cols-2 md:grid-cols-4 items-center min-h-[200px] gap-4 border rounded-md p-4">
          {shapes
            .map((shape) =>
              variants.map((variant) => (
                <Button
                  key={`${variant}-${shape}`}
                  variant={variant as any}
                  shape={shape as any}
                >
                  {variant}-{shape}
                </Button>
              ))
            )
            .flat()}
        </div>
      </section>

      <Separator />

      <section id="installation" className="py-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <InstallButton componentCode="button" />
      </section>

      <Separator />

      <section id="usage" className="py-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock text={`import { Button } from "@/components/ui/button"`} />
        <CodeBlock
          text={`<Button
  variant="default | success | warning| destructive | subtle | glass | link | outline | secondary | ghost"
  shape="default | pill | square"
>
  Button
</Button>`}
        />
      </section>
    </div>
  );
}
