import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={"light"}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon role="status" aria-label="Success" className="size-4" />,
        info: <InfoIcon role="status" aria-label="Info" className="size-4" />,
        warning: <TriangleAlertIcon role="status" aria-label="Warning" className="size-4" />,
        error: <OctagonXIcon role="status" aria-label="Error" className="size-4" />,
        loading: <Loader2Icon role="status" aria-label="Loading" className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
