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
              <a href="/">
                <Square />
                Sidcn
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <a href="/components">
              <SidebarGroupLabel>Components</SidebarGroupLabel>
            </a>
            <SidebarGroupContent>
              {componentPages.map((page, index) => (
                <SidebarMenuButton key={index}>
                  <a href={page.path}>{page.name}</a>
                </SidebarMenuButton>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <a href="/blocks">
              <SidebarGroupLabel>Blocks</SidebarGroupLabel>
            </a>
            <SidebarGroupContent>
              {blockPages.map((page, index) => (
                <SidebarMenuButton key={index}>
                  <a href={page.path}>{page.name}</a>
                </SidebarMenuButton>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-col w-full">
        <nav className="bg-sidebar flex justify-between items-center px-4">
          <SidebarTrigger />
          <ThemeToggle />
        </nav>
        <div className="w-full h-full overflow-y-auto overflow-x-hidden p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
