import { logout } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <form action={logout}>
          <Button variant="destructive">Logout</Button>
        </form>
      </div>
      <p className="text-muted-foreground">
        Welcome to your dashboard. This page is protected and only accessible to logged-in customers.
      </p>
      
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">My Bookings</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Pending Requests</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 border rounded-xl bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Support Tickets</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
