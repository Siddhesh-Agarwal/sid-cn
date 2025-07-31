import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

function BashCommand({ command }: { command: string }) {
  return (
    <code
      className="font-mono text-sm border px-1 py-0.5 line-clamp-1 overflow-clip"
      lang="bash"
    >
      {command}
    </code>
  );
}

export default function InstallButton({
  componentCode,
}: {
  componentCode: string;
}) {
  if (typeof window === "undefined") {
    return null;
  }
  const downloadUrl = `${window.location.protocol}//${window.location.host}/r/${componentCode}.json`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <Download />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-3xl w-full">
        <div>
          <p>Run the following command</p>
          <Tabs>
            <TabsList defaultValue={"npm"}>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="bun">bun</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <BashCommand command={`npm install ${downloadUrl}`} />
            </TabsContent>
            <TabsContent value="yarn">
              <BashCommand command={`yarn add ${downloadUrl}`} />
            </TabsContent>
            <TabsContent value="pnpm">
              <BashCommand command={`pnpm add ${downloadUrl}`} />
            </TabsContent>
            <TabsContent value="bun">
              <BashCommand command={`bun add ${downloadUrl}`} />
            </TabsContent>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  );
}
