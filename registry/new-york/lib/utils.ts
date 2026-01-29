import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMac() {
  const navigator_ = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const macRegex = /mac|iphone|ipad|ipod/i;

  return (
    navigator_.userAgentData?.platform?.toLowerCase().includes("mac") ??
    macRegex.test(navigator_.userAgent)
  );
}
