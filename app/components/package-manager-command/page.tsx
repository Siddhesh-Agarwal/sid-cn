"use client";

import { CodeBlock } from "@/components/code-block";
import { DisplayPreviewAndCode } from "@/components/display-preview-and-code";
import InstallButton from "@/components/install-button";
import { Separator } from "@/components/ui/separator";
import { type PackageManager, PackageManagerCommand } from "@/registry/new-york/components/package-manager-command";

export default function Page() {

  function getCommand(packageManager: PackageManager) {
    return `${packageManager} install`
  }

  return (
    <div className="flex flex-col gap-4 p-4 min-h-full">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">Package Manager Command</h3>
        <h4 className="text-sm text-muted-foreground">
          A simple component to display commands for different package managers.
        </h4>
      </div>
      <section id="example">
        <DisplayPreviewAndCode>
            <PackageManagerCommand getCommand={getCommand} />
        </DisplayPreviewAndCode>
      </section>

      <Separator />

      <section id="installation" className="py-4">
        <h2 className="text-xl font-semibold mb-2">Installation</h2>
        <InstallButton componentCode="package-manager-command" />
      </section>

      <Separator />

            <section id="usage" className="py-4">
              <h2 className="text-xl font-semibold">Usage</h2>
              <CodeBlock
                text={`import { type PackageManager, PackageManagerCommand } from "@/registry/new-york/components/package-manager-command"`}
              />
              <CodeBlock
                text={"function getCommand(packageManager: PackageManager) {\n    return `${packageManager} install`\n  }"}
              />
              <CodeBlock
                text={"<PackageManagerCommand getCommand={getCommand} />"}
              />
            </section>
    </div>
  )
}
