"use client";

import { AppSidebar } from "@/components/custom/common/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getTitle = () => {
    switch (pathname) {
      case "/dashboard/cleaner/cleaner-tasks":
        return "My Tasks";
      case "/dashboard/cleaner/availability":
        return "Your Schedule";
      case "/dashboard/settings":
        return "Settings";
      case "/dashboard/admin/employees":
        return "Employees";
      case "/dashboard/admin/customers":
        return "Customers";
      case "/dashboard/admin/services/main":
        return "Main Services";
      case "/dashboard/admin/services/extra":
        return "Extra Services";
      default:
        return "Dashboard";
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold flex-grow">{getTitle()}</h1>
          <form action={logout}>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </form>
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
