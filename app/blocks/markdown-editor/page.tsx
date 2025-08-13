"use client";

import { CodeBlock } from "@/components/code-block";
import InstallButton from "@/components/install-button";
import { Separator } from "@/components/ui/separator";
import { MarkdownEditor } from "@/registry/new-york/blocks/markdown-editor/markdown-editor";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 min-h-full">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">Markdown Editor</h3>
        <h4 className="text-sm text-muted-foreground">
          A beautiful markdown editor component
        </h4>
      </div>
      <section id="example">
        <div className="flex items-center justify-center min-h-[400px] border rounded-md p-4">
          <MarkdownEditor />
        </div>
      </section>

      <Separator />

      <section id="instalation" className="py-4">
        <h2 className="text-xl font-semibold">Install</h2>
        <InstallButton componentCode="markdown-editor" />
      </section>

      <Separator />

      <section id="usage" className="py-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock
          text={`import { MarkdownEditor } from "@/components/markdown-editor"`}
        />
        <CodeBlock text={`const [markdown, setMarkdown] = useState("")]`} />
        <CodeBlock
          text={`<MarkdownEditor initialValue={markdown} onChange={setMarkdown} />`}
        />
      </section>
    </div>
  );
}
