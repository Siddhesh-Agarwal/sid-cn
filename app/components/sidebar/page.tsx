import InstallButton from "@/components/install-button";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 min-h-full">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">Sidebar</h3>
        <h4 className="text-sm text-muted-foreground">
          A simple sidebar component
        </h4>
      </div>

      <section id="installation" className="py-4">
        <h2 className="text-xl font-semibold mb-2">Installation</h2>
        <InstallButton componentCode="sidebar" />
      </section>

      <Separator />

      <section id="usage" className="py-4">
        <p>
          This component is used exactly like the original shadcn sidebar
          component so please refer to the{" "}
          <a
            href="https://ui.shadcn.com/docs/components/sidebar"
            target="_blank"
          >
            documentation
          </a>
          . The difference is in the way cookies are handled.
        </p>
      </section>
    </div>
  );
}
