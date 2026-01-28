import { blockPages, componentPages } from "@/lib/data";
import { ThemeToggle } from "@/registry/new-york/components/theme-toggle";
import { Square } from "lucide-react";
import Link from "next/link";
import { GitHubLink } from "./github-link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";

export default function AppSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-1">
      <Sidebar className="overflow-x-hidden">
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
              {componentPages.map((page) => (
                <Link href={page.path} key={page.name} passHref>
                  <SidebarMenuItem className="hover:cursor-pointer">
                    <SidebarMenuButton>{page.name}</SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <Link href="/blocks">
              <SidebarGroupLabel>Blocks</SidebarGroupLabel>
            </Link>
            <SidebarGroupContent>
              {blockPages.map((page) => (
                <Link href={page.path} key={page.name} passHref>
                  <SidebarMenuItem className="hover:cursor-pointer">
                    <SidebarMenuButton>{page.name}</SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
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
