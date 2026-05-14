"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import { UserRole } from "@/lib/redux/features/auth/authSlice";

import CleanerOverview from "./cleaner/overview";
import ManagerOverview from "./manager/overview";
import AdminOverview from "./admin/overview";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.is_loading);
  const router = useRouter();

  useEffect(() => {
    if (user?.user_role === UserRole.CUSTOMER) {
      router.push("/my-bookings");
    }
  }, [user, router]);

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

  return <div className="p-8">{renderOverview()}</div>;
}
