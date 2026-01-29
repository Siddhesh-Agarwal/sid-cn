"use client";

import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "./button";
import { CheckIcon, ClipboardIcon, TerminalIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

const PACKAGE_MANAGERS: PackageManager[] = ["npm", "yarn", "pnpm", "bun"];

function BashCommand({ command }: { command: string }) {
  return (
    <pre>
      <code
        className="relative font-mono text-sm leading-none before:mr-2 before:text-muted-foreground before:content-['$']"
        data-language="bash"
      >
        {command}
      </code>
    </pre>
  );
}

export function PackageManagerCommand({
  getCommand,
  className,
}: {
  getCommand(packageManager: PackageManager): string;
  className?: string;
}) {
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);
  const command = getCommand(packageManager);

  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("overflow-x-auto relative w-full border rounded-md", className)}>
      <Tabs
        value={packageManager}
        onValueChange={(val) => setPackageManager(val as PackageManager)}
        className="gap-0"
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-2 py-1">
          <div className="flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <TerminalIcon />
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
          {PACKAGE_MANAGERS.map((packageManager) => (
            <TabsContent value={packageManager} key={packageManager} className="mt-0 px-4 py-3.5">
              <BashCommand command={getCommand(packageManager)} />
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
            onClick={copyCommand}
          >
            <span className="sr-only">Copy</span>
            {copied ? <CheckIcon /> : <ClipboardIcon />}
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  );
}

PackageManagerCommand.displayName = "PackageManagerCommand";
