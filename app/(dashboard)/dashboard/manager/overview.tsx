import React from 'react';

export default function ManagerOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Manager Overview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Total Cleaners</h3>
          <p className="text-3xl font-bold">18</p>
        </div>
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Active Bookings</h3>
          <p className="text-3xl font-bold">45</p>
        </div>
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Revenue</h3>
          <p className="text-3xl font-bold">$12,400</p>
        </div>
      </div>
    </div>
  );
}
