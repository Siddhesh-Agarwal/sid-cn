import InstallButton from "@/components/install-button";
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
      <div className="flex items-center justify-center min-h-[400px] border rounded-md p-4">
        <MarkdownEditor />
      </div>
      <h2 className="text-xl font-semibold">Install</h2>
      <InstallButton componentCode="markdown-editor" />
    </div>
  );
}
