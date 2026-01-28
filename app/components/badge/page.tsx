"use client";

import { CodeBlock } from "@/components/code-block";
import InstallButton from "@/components/install-button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/registry/new-york/components/badge";

export default function Page() {
  const variants = ["success", "warning", "glass", "link"];
  const shapes = ["default", "pill"];
  const sizes = ["sm", "default", "lg"];

  return (
    <div className="flex flex-col gap-4 p-4 min-h-full">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">Badge</h3>
        <h4 className="text-sm text-muted-foreground">
          A beautiful badge component
        </h4>
      </div>
      <section id="example">
        <div className="grid grid-cols-2 md:grid-cols-4 items-center min-h-50 gap-4 border rounded-md p-4">
          {sizes
            .map((size) =>
              shapes
                .map((shape) =>
                  variants
                    .map((variant) => (
                      <Badge
                        variant={variant as any}
                        shape={shape as any}
                        size={size as any}
                        key={`${variant}-${shape}-${size}`}
                      >
                        {`${variant}-${shape}-${size}`}
                      </Badge>
                    ))
                    .flat(),
                )
                .flat(),
            )
            .flat()}
        </div>
      </section>

      <Separator />

      <section id="instalation" className="py-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <InstallButton componentCode="badge" />
      </section>

      <Separator />

      <section id="usage" className="py-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock text={`import { Badge } from "@/components/ui/badge"`} />
        <CodeBlock
          text={`<Badge
  variant="default | success | warning | destructive | glass | link | outline | secondary"
  shape="default | pill"
  size="default | sm | lg"
>
  Badge
</Badge>`}
        />
      </section>
    </div>
  );
}
