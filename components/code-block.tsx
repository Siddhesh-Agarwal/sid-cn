import { Clipboard } from "lucide-react";
import { Button } from "./ui/button";

export function CodeBlock({ text }: { text: string }) {
  const cleanText = text.trim();
  return (
    <pre className="overflow-x-auto border rounded-md p-2 mt-2 relative bg-card">
      <Button
        size="icon"
        variant="subtle"
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100 border"
        onClick={() => navigator.clipboard.writeText(cleanText)}
      >
        <Clipboard />
        <span className="sr-only">Copy</span>
      </Button>
      <code className="relative font-mono text-sm leading-none whitespace-preline">
        {cleanText}
      </code>
    </pre>
  );
}
