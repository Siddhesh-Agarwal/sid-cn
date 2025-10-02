import { useTheme } from "next-themes";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "./ui/button";
import { Clipboard } from "lucide-react";

export function CodeBlock({ text }: { text: string }) {
  const cleanText = text.trim();
  const highlightStyle = useTheme().theme === "dark" ? oneDark : oneLight;

  return (
    <div className="relative">
      <Button
        size="icon"
        variant="outline"
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100 border"
        onClick={() => navigator.clipboard.writeText(cleanText)}
      >
        <Clipboard />
        <span className="sr-only">Copy</span>
      </Button>
      <SyntaxHighlighter
        language="javascript"
        className="overflow-x-auto border rounded-md"
        style={highlightStyle}
        wrapLongLines={false}
      >
        {cleanText}
      </SyntaxHighlighter>
    </div>
  );
}
