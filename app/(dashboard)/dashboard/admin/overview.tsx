import React from 'react';

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Admin Overview</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">1,240</p>
        </div>
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">System Health</h3>
          <p className="text-3xl font-bold text-green-600">99.9%</p>
        </div>
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">New Reports</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
}
