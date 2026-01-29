"use client";

import { PackageManager, PackageManagerCommand } from "@/registry/new-york/components/package-manager-command";
import { useEffect, useState } from "react";


export default function InstallButton({
  componentCode,
}: {
  componentCode: string;
}) {
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  if (!baseUrl) {
    return null;
  }

  const base_url = baseUrl;

  const downloadUrl = `${base_url}/r/${componentCode}.json`;

  const commands = {
    npm: `npx shadcn@latest add ${downloadUrl}`,
    yarn: `yarn shadcn@latest add ${downloadUrl}`,
    pnpm: `pnpm dlx shadcn@latest add ${downloadUrl}`,
    bun: `bunx --bun shadcn@latest add ${downloadUrl}`,
  };

  function getCommand(packageManager: PackageManager): string {
    return commands[packageManager];
  }

  return (
    <PackageManagerCommand getCommand={getCommand} />
  );
}
