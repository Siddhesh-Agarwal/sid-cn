"use client";

import { Check, Clipboard, Terminal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/new-york/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Tooltip, TooltipTrigger } from "./ui/tooltip";

function BashCommand({ command }: { command: string }) {
  return (
    <pre>
      <code
        className="relative font-mono text-sm leading-none"
        data-language="bash"
      >
        {command}
      </code>
    </pre>
  );
}

type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export default function InstallButton({
  componentCode,
}: {
  componentCode: string;
}) {
  if (window === undefined) {
    throw new Error("window is not defined");
  }
  const base_url = window.location.origin;
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const downloadUrl = `${base_url}/r/${componentCode}.json`;

  const commands = {
    npm: `npx shadcn@latest add ${downloadUrl}`,
    yarn: `yarn shadcn@latest add ${downloadUrl}`,
    pnpm: `pnpm dlx shadcn@latest add ${downloadUrl}`,
    bun: `bunx --bun shadcn@latest add ${downloadUrl}`,
  };

  return (
    <div className="overflow-x-auto relative w-full border rounded-md">
      <Tabs
        value={packageManager}
        onValueChange={(val) => setPackageManager(val as PackageManager)}
        className="gap-0"
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-2 py-1">
          <div className="flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <Terminal />
          </div>
          <TabsList className="rounded-none bg-transparent p-0">
            <TabsTrigger
              value="npm"
              className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
            >
              npm
            </TabsTrigger>
            <TabsTrigger
              value="yarn"
              className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
            >
              yarn
            </TabsTrigger>
            <TabsTrigger
              value="pnpm"
              className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
            >
              pnpm
            </TabsTrigger>
            <TabsTrigger
              value="bun"
              className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
            >
              bun
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(commands).map(([key, value]) => (
            <TabsContent value={key} key={key} className="mt-0 px-4 py-3.5">
              <BashCommand command={value} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            data-slot="copy-button"
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100 border"
            onClick={() => copyCommand(commands[packageManager])}
          >
            <span className="sr-only">Copy</span>
            {copied ? <Check /> : <Clipboard />}
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  );
}
