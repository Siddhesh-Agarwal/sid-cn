import { Square } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "./ui/sidebar";
import { ThemeToggle } from "@/registry/new-york/components/theme-toggle";
import { blockPages, componentPages } from "@/lib/data";
import Link from "next/link";
import { GitHubLink } from "./github-link";

export default function AppSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-1">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild>
              <Link href="/">
                <Square />
                Sidcn
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <Link href="/components">
              <SidebarGroupLabel>Components</SidebarGroupLabel>
            </Link>
            <SidebarGroupContent>
              {componentPages.map((page, index) => (
                <SidebarMenuButton key={index}>
                  <Link href={page.path}>{page.name}</Link>
                </SidebarMenuButton>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <Link href="/blocks">
              <SidebarGroupLabel>Blocks</SidebarGroupLabel>
            </Link>
            <SidebarGroupContent>
              {blockPages.map((page, index) => (
                <SidebarMenuButton key={index}>
                  <Link href={page.path}>{page.name}</Link>
                </SidebarMenuButton>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-col w-full">
        <nav className="bg-sidebar flex justify-between items-center px-4">
          <SidebarTrigger />
          <div className="div">
            <GitHubLink />
            <ThemeToggle />
          </div>
        </nav>
        <div className="w-full h-full overflow-y-auto overflow-x-hidden p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
