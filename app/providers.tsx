"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/registry/new-york/components/theme-toggle";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
