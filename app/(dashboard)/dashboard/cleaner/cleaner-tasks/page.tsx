"use client";

import { useState } from "react";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  Flame,
  Building2,
  Dog,
  Cat,
} from "lucide-react";
import CleanerBookingCard, {
  CleanerBooking,
  CleanerBookingStatus,
} from "@/components/custom/booking/booking_card_cleaner";
import { cn } from "@/lib/utils";

// ─── Demo Data ────────────────────────────────────────────────────────────────

const BOOKINGS: CleanerBooking[] = [
  {
    id: "BK-001",
    status: "new",
    priority: ["kitchen"],
    serviceType: "Service Type",
    serviceLabel: "Reset Clean",
    bedrooms: 2,
    date: "12-07-2026",
    time: "2:30PM",
    location: "Colorado",
    addons: [
      { label: "Oven", icon: <Flame className="w-3 h-3 text-orange-500" /> },
      {
        label: "Basement",
        icon: <Building2 className="w-3 h-3 text-blue-400" />,
      },
      { label: "Dog", icon: <Dog className="w-3 h-3 text-amber-500" /> },
    ],
    customerName: "Maria",
    customerPhone: "1234235",
    subtotal: 100,
    serviceFee: 10,
    tax: 10,
    total: 120,
  },
  {
    id: "BK-002",
    status: "in_progress",
    priority: ["bedroom"],
    serviceType: "Service Type",
    serviceLabel: "Reset Clean",
    bedrooms: 2,
    date: "14-07-2026",
    time: "10:00AM",
    location: "Denver",
    addons: [
      { label: "Cat", icon: <Cat className="w-3 h-3 text-purple-400" /> },
    ],
    customerName: "Sarah",
    customerPhone: "9876543",
    subtotal: 120,
    serviceFee: 10,
    tax: 12,
    total: 142,
  },
  {
    id: "BK-003",
    status: "completed",
    priority: ["kitchen", "bedroom"],
    serviceType: "Service Type",
    serviceLabel: "Deep Clean",
    bedrooms: 2,
    date: "13-07-2026",
    time: "11:30AM",
    location: "Colorado",
    addons: [
      { label: "Oven", icon: <Flame className="w-3 h-3 text-orange-500" /> },
      { label: "Dog", icon: <Dog className="w-3 h-3 text-amber-500" /> },
    ],
    customerName: "James",
    customerPhone: "5556789",
    subtotal: 150,
    serviceFee: 15,
    tax: 15,
    total: 180,
  },
  {
    id: "BK-004",
    status: "cancelled",
    priority: ["bedroom"],
    serviceType: "Service Type",
    serviceLabel: "Reset Clean",
    bedrooms: 2,
    date: "05-07-2026",
    time: "09:00AM",
    location: "Colorado",
    addons: [],
    customerName: "Emma",
    customerPhone: "1112233",
    subtotal: 90,
    serviceFee: 10,
    tax: 9,
    total: 109,
  },
];

// ─── Filter Config ────────────────────────────────────────────────────────────

type FilterStatus = "all" | CleanerBookingStatus;

const FILTERS: { id: FilterStatus; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All", icon: <Sparkles className="w-4 h-4" /> },
  { id: "new", label: "New", icon: <Clock className="w-4 h-4" /> },
  {
    id: "in_progress",
    label: "In Progress",
    icon: <Play className="w-4 h-4" />,
  },
  {
    id: "completed",
    label: "Completed",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  {
    id: "cancelled",
    label: "Cancelled",
    icon: <XCircle className="w-4 h-4" />,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CleanerMyBookingsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const [bookings, setBookings] = useState<CleanerBooking[]>(BOOKINGS);

  const filteredBookings = bookings.filter((booking) => {
    if (activeFilter === "all") return true;
    return booking.status === activeFilter;
  });

  const handleStart = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "in_progress" } : b)),
    );
  };

  const handleMarkComplete = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "completed" } : b)),
    );
  };

  const handleViewDetails = (id: string) => {
    console.log("View details", id);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 min-h-screen">
      {/* ── Filter Tabs ── */}
      <div className="flex flex-col gap-4">
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
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50",
                )}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bookings Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch pb-10">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="h-full">
              <CleanerBookingCard
                booking={booking}
                onStart={handleStart}
                onMarkComplete={handleMarkComplete}
                onViewDetails={handleViewDetails}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="font-semibold text-gray-900 text-lg">
              No {activeFilter === "all" ? "" : activeFilter} bookings found
            </p>
            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
              You don&apos;t have any{" "}
              {activeFilter === "all" ? "" : activeFilter} jobs at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
