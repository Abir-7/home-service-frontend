import { CustomerGrowthChart } from "@/components/custom/admin/customer_groth_chart";
import { ProvidedWorkingGrowthChart } from "@/components/custom/admin/provider_working_chart";
import { AdminStatsCards } from "@/components/custom/admin/state_card";
import { YearlyRevenueChart } from "@/components/custom/admin/yearly_revenue_chart";
import React from "react";

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <AdminStatsCards></AdminStatsCards>
      <div className="flex gap-4 w-full ">
        <CustomerGrowthChart></CustomerGrowthChart>
        <ProvidedWorkingGrowthChart></ProvidedWorkingGrowthChart>
      </div>
      <div>
        <YearlyRevenueChart></YearlyRevenueChart>
      </div>
    </div>
  );
}
