"use client";

import {
  House,
  CalendarDays,
  ClipboardList,
  Calendar,
  Settings,
  Users,
  UserCircle,
  Wrench,
  ChevronRight,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { UserRole } from "@/lib/redux/features/auth/authSlice";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { logout } from "@/lib/actions/auth";

export function AppSidebar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <h2 className="text-xl font-bold text-violet-600">Home Service</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link href="/">
                    <House className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {user?.user_role === UserRole.CUSTOMER ? (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                    <Link href="/dashboard">
                      <CalendarDays className="w-4 h-4" />
                      <span>My Bookings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                    <Link href="/dashboard">
                      <House className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {user?.user_role === UserRole.CLEANER && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive("/dashboard/cleaner/cleaner-tasks")}
                    >
                      <Link href="/dashboard/cleaner/cleaner-tasks">
                        <ClipboardList className="w-4 h-4" />
                        <span>My Tasks</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive("/dashboard/cleaner/availability")}
                    >
                      <Link href="/dashboard/cleaner/availability">
                        <Calendar className="w-4 h-4" />
                        <span>Availability</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {(user?.user_role === UserRole.ADMIN ||
                user?.user_role === UserRole.MANAGER) && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive("/dashboard/admin/employees")}
                    >
                      <Link href="/dashboard/admin/employees">
                        <Users className="w-4 h-4" />
                        <span>Employees</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive("/dashboard/admin/customers")}
                    >
                      <Link href="/dashboard/admin/customers">
                        <UserCircle className="w-4 h-4" />
                        <span>Customers</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {user?.user_role === UserRole.ADMIN && (
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Wrench className="w-4 h-4" />
                        <span>Services</span>
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(
                              "/dashboard/admin/services/main"
                            )}
                          >
                            <Link href="/dashboard/admin/services/main">
                              <span>Main Services</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(
                              "/dashboard/admin/services/extra"
                            )}
                          >
                            <Link href="/dashboard/admin/services/extra">
                              <span>Extra Services</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/settings")}
                >
                  <Link href="/dashboard/settings">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl overflow-hidden">
              <div className="flex items-center justify-center size-8 rounded-full bg-violet-100 text-violet-600 shrink-0">
                {user?.user_image ? (
                  <img
                    src={user.user_image}
                    alt={user.full_name}
                    className="size-full rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="size-4" />
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">
                  {user?.full_name || "Guest User"}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user?.user_role}
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
