import InstallButton from "@/components/install-button";
import { Badge } from "@/registry/new-york/components/badge";

export default function Page() {
  const variants = ["success", "warning", "glass", "link"];
  const shapes = ["default", "pill"];
  const sizes = ["sm", "default", "lg"];

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[450px] relative">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">Badge</h3>
          <h4 className="text-sm text-muted-foreground">
            A beautiful badge component
          </h4>
        </div>
        <InstallButton componentCode="badge" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 items-center min-h-[200px] gap-4">
        {sizes
          .map((size) =>
            shapes
              .map((shape) =>
                variants
                  .map((variant) => (
                    <Badge
                      variant={variant as any}
                      shape={shape as any}
                      size={size as any}
                      key={`${variant}-${shape}-${size}`}
                    >
                      {`${variant}-${shape}-${size}`}
                    </Badge>
                  ))
                  .flat()
              )
              .flat()
          )
          .flat()}
      </div>
    </div>
  );
}
