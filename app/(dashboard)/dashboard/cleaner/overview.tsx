import React from 'react';

export default function CleanerOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Cleaner Overview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Today's Tasks</h3>
          <p className="text-3xl font-bold">4</p>
        </div>
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Earnings</h3>
          <p className="text-3xl font-bold">$450</p>
        </div>
      </div>
    </div>
  );
}
