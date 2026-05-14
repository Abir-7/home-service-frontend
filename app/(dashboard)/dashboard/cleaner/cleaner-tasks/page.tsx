"use client";

import React, { useState } from "react";

import { Flame, BedDouble, Dog, Cat, ChefHat } from "lucide-react";
import CleanerBookingCard, {
  CleanerBooking,
  CleanerBookingStatus,
} from "@/components/custom/booking/booking_card_cleaner";

// ─── Filter Config ────────────────────────────────────────────────────────────

const FILTERS: { label: string; value: "All" | CleanerBookingStatus }[] = [
  { label: "All", value: "All" },
  { label: "New", value: "new" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];

// ─── Sample Data ──────────────────────────────────────────────────────────────

const INITIAL_BOOKINGS: CleanerBooking[] = [
  {
    id: "1",
    status: "new",
    priority: ["kitchen"],
    serviceType: "Service Type",
    serviceLabel: "Reset Clean",
    bedrooms: 2,
    date: "12-07-2026",
    time: "2:30 PM",
    location: "Colorado",
    addons: [
      { label: "Oven", icon: <Flame className="w-3 h-3" /> },
      { label: "Basement", icon: <BedDouble className="w-3 h-3" /> },
      { label: "Dog", icon: <Dog className="w-3 h-3" /> },
    ],
    customerName: "Maria",
    customerPhone: "1234235",
    subtotal: 100,
    serviceFee: 10,
    tax: 10,
    total: 120,
  },
  {
    id: "2",
    status: "in_progress",
    priority: ["bedroom"],
    serviceType: "Service Type",
    serviceLabel: "Reset Clean",
    bedrooms: 2,
    date: "12-07-2026",
    time: "2:30 PM",
    location: "Colorado",
    addons: [{ label: "Cat", icon: <Cat className="w-3 h-3" /> }],
    customerName: "Sarah",
    customerPhone: "9876543",
    subtotal: 100,
    serviceFee: 10,
    tax: 10,
    total: 120,
  },
  {
    id: "3",
    status: "completed",
    priority: ["kitchen", "bedroom"],
    serviceType: "Service Type",
    serviceLabel: "Reset Clean",
    bedrooms: 2,
    date: "12-07-2026",
    time: "2:30 PM",
    location: "Colorado",
    addons: [
      { label: "Oven", icon: <Flame className="w-3 h-3" /> },
      { label: "Kitchen", icon: <ChefHat className="w-3 h-3" /> },
      { label: "Dog", icon: <Dog className="w-3 h-3" /> },
    ],
    customerName: "James",
    customerPhone: "5556789",
    subtotal: 100,
    serviceFee: 10,
    tax: 10,
    total: 120,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CleanerBookingsPage() {
  const [bookings, setBookings] = useState<CleanerBooking[]>(INITIAL_BOOKINGS);
  const [activeFilter, setActiveFilter] = useState<
    "All" | CleanerBookingStatus
  >("All");

  const filtered =
    activeFilter === "All"
      ? bookings
      : bookings.filter((b) => b.status === activeFilter);

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
    console.log("View details for booking", id);
    // navigate or open modal
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ── Page Title ── */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage your assigned jobs
        </p>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeFilter === f.value
                ? "bg-violet-500 text-white border-violet-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
            }`}
          >
            {f.label}
            {f.value !== "All" && (
              <span className="ml-1.5 text-xs opacity-70">
                ({bookings.filter((b) => b.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Cards Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 text-sm">
          No bookings found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start">
          {filtered.map((booking) => (
            <CleanerBookingCard
              key={booking.id}
              booking={booking}
              onStart={handleStart}
              onMarkComplete={handleMarkComplete}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}
