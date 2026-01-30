"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Button } from "@/registry/new-york/components/button";
import { SearchIcon } from "lucide-react";
import { blockPages, componentPages } from "@/data";
import { isMac } from "@/registry/new-york/lib/utils";
import { Kbd, KbdGroup } from "./ui/kbd";

export function SearchButton() {
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpenSearch(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    console.log(openSearch);
  }, [openSearch]);

  return (
    <>
      <Button variant="ghost" onClick={() => setOpenSearch(true)} className="gap-2">
        <SearchIcon />
        <KbdGroup>
          <Kbd>{isMac() ? "⌘" : "Ctrl"}</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <Command className="w-full rounded-lg border">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Components">
              {componentPages.map((page) => (
                <CommandItem key={page.path}>{page.name}</CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Blocks">
              {blockPages.map((page) => (
                <CommandItem key={page.path}>{page.name}</CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
