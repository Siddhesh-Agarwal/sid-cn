"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme, ThemeProvider as NextThemesProvider } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      enableSystem={true}
    >
      {children}
    </NextThemesProvider>
  );
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
