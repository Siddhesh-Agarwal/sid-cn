import InstallButton from "@/components/install-button";
import { Button } from "@/components/ui/button";

export default function Page() {
  const variants = ["success", "warning", "subtle", "glass"];
  const shapes = ["default", "pill", "square"];

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
        {variants
          .map((variant) =>
            shapes.map((shape) => (
              <Button
                key={`${variant}-${shape}`}
                variant={variant as any}
                shape={shape as any}
              >
                {variant}-{shape}
              </Button>
            ))
          )
          .flat()}
      </div>
    </div>
  );
}
