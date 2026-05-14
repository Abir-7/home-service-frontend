"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { UserRole } from "@/lib/redux/features/auth/authSlice";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

import CleanerOverview from "./cleaner/overview";
import ManagerOverview from "./manager/overview";
import AdminOverview from "./admin/overview";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.is_loading);

  if (isLoading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  const renderOverview = () => {
    switch (user?.user_role) {
      case UserRole.CLEANER:
        return <CleanerOverview />;
      case UserRole.MANAGER:
        return <ManagerOverview />;
      case UserRole.ADMIN:
        return <AdminOverview />;
      default:
        return (
          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            User role not recognized. Please contact support.
          </div>
        );
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase">
            {user?.user_role === UserRole.CUSTOMER
              ? "My Bookings"
              : `${user?.user_role} Dashboard`}
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.full_name || "User"}
          </p>
        </div>
        <form action={logout}>
          <Button variant="destructive">Logout</Button>
        </form>
      </div>

      {renderOverview()}
    </div>
  );
}
