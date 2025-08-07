import InstallButton from "@/components/install-button";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 min-h-[450px] relative">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">Button</h3>
          <h4 className="text-sm text-muted-foreground">
            A beautiful button component
          </h4>
        </div>
        <InstallButton componentCode="button" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 items-center min-h-[200px] gap-4">
        <Button variant={"success"} shape={"default"}>
          Success + default
        </Button>
        <Button variant={"warning"} shape={"default"}>
          Warning + default
        </Button>
        <Button variant={"subtle"} shape={"default"}>
          Subtle + default
        </Button>
        <Button variant={"glass"} shape={"default"}>
          Glass + default
        </Button>

        <Button variant={"success"} shape={"pill"}>
          Success + pill
        </Button>
        <Button variant={"warning"} shape={"pill"}>
          Warning + pill
        </Button>
        <Button variant={"subtle"} shape={"pill"}>
          Subtle + pill
        </Button>
        <Button variant={"glass"} shape={"pill"}>
          Glass + pill
        </Button>

        <Button variant={"success"} shape={"square"}>
          Success + square
        </Button>
        <Button variant={"warning"} shape={"square"}>
          Warning + square
        </Button>
        <Button variant={"subtle"} shape={"square"}>
          Subtle + square
        </Button>
        <Button variant={"glass"} shape={"square"}>
          Glass + square
        </Button>
      </div>
    </div>
  );
}
