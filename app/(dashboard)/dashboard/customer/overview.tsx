"use client";

import { useState } from "react";
import { Sparkles, Clock, CheckCircle2, XCircle, UserCheck, Flame, Building2, Dog } from "lucide-react";
import BookingCard, { Booking, BookingStatus } from "./booking_card";
import { cn } from "@/lib/utils";

// ─── Demo Data ────────────────────────────────────────────────────────────────

const BOOKINGS: Booking[] = [
  {
    id: "BK-001",
    status: "pending",
    serviceType: "Service Type",
    serviceLabel: "Reset Clean",
    bedrooms: 2,
    date: "12-07-2026",
    time: "2:30PM",
    location: "Colorado",
    addons: [
      { label: "Oven", icon: <Flame className="w-3 h-3 text-orange-500" /> },
      { label: "Basement", icon: <Building2 className="w-3 h-3 text-blue-400" /> },
      { label: "Dog", icon: <Dog className="w-3 h-3 text-amber-500" /> },
    ],
    subtotal: 100,
    serviceFee: 10,
    tax: 10,
    total: 120,
  },
  {
    id: "BK-002",
    status: "assigned",
    serviceType: "Service Type",
    serviceLabel: "Reset Clean",
    bedrooms: 2,
    date: "14-07-2026",
    time: "10:00AM",
    location: "Denver",
    addons: [
      { label: "Dog", icon: <Dog className="w-3 h-3 text-amber-500" /> },
    ],
    subtotal: 120,
    serviceFee: 10,
    tax: 12,
    total: 142,
    assignedTo: "John Smith",
  },
  {
    id: "BK-003",
    status: "completed",
    serviceType: "Service Type",
    serviceLabel: "Reset Clean",
    bedrooms: 2,
    date: "05-07-2026",
    time: "09:00AM",
    location: "Colorado",
    addons: [],
    subtotal: 90,
    serviceFee: 10,
    tax: 9,
    total: 109,
    assignedTo: "Maria Garcia",
  },
];

// ─── Filter Config ────────────────────────────────────────────────────────────

type FilterStatus = "all" | BookingStatus;

const FILTERS: { id: FilterStatus; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All", icon: <Sparkles className="w-4 h-4" /> },
  { id: "pending", label: "Pending", icon: <Clock className="w-4 h-4" /> },
  { id: "assigned", label: "Assigned", icon: <UserCheck className="w-4 h-4" /> },
  { id: "completed", label: "Completed", icon: <CheckCircle2 className="w-4 h-4" /> },
  { id: "cancelled", label: "Cancelled", icon: <XCircle className="w-4 h-4" /> },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CustomerOverview() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");

  const filteredBookings = BOOKINGS.filter((booking) => {
    if (activeFilter === "all") return true;
    return booking.status === activeFilter;
  });

  return (
    <div className="space-y-8">
      {/* ── Filter Tabs ── */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Filter Bookings</h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex bg-gray-100/80 p-1 rounded-xl w-fit">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0",
                  activeFilter === filter.id
                    ? "bg-white text-violet-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                )}
              >
                {filter.icon}
                {filter.label}
                <span className={cn(
                  "ml-1 text-[10px] px-1.5 py-0.5 rounded-full",
                  activeFilter === filter.id ? "bg-violet-100 text-violet-600" : "bg-gray-200 text-gray-500"
                )}>
                  {filter.id === "all" 
                    ? BOOKINGS.length 
                    : BOOKINGS.filter(b => b.status === filter.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bookings Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="h-full">
              <BookingCard
                booking={booking}
                onCancel={(id) => console.log("Cancel", id)}
                onReview={(id) => console.log("Review", id)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
             <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
             <p className="font-semibold text-gray-900">No {activeFilter === 'all' ? '' : activeFilter} bookings found</p>
             <p className="text-sm text-gray-500 mt-1">Check back later or try another filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
