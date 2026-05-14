"use client";

import BookingCard, {
  BookingStatus,
} from "@/components/custom/booking/booking_card_cleaner";
import { Booking } from "@/components/custom/booking/booking_card_cleaner";
import React, { useState } from "react";

const FILTERS: { label: string; value: "All" | BookingStatus }[] = [
  { label: "All", value: "All" },
  { label: "New", value: "New" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 1,
    serviceType: "Service Type",
    serviceSubType: "Reset Clean",
    bedrooms: 2,
    status: "New",
    date: "12-07-2026",
    time: "2:30PM",
    location: "Colorado",
    addons: [
      { icon: "🔥", label: "Oven" },
      { icon: "🏚️", label: "Basement" },
      { icon: "🐕", label: "Dog" },
    ],
    customerName: "Maria",
    customerPhone: "1234235",
    totalCost: 120,
  },
  {
    id: 2,
    serviceType: "Service Type",
    serviceSubType: "Reset Clean",
    bedrooms: 2,
    status: "In Progress",
    date: "12-07-2026",
    time: "2:30PM",
    location: "Colorado",
    addons: [{ icon: "🐱", label: "Cat" }],
    customerName: "Maria",
    customerPhone: "1234235",
    totalCost: 120,
  },
  {
    id: 3,
    serviceType: "Service Type",
    serviceSubType: "Reset Clean",
    bedrooms: 2,
    status: "Completed",
    date: "12-07-2026",
    time: "2:30PM",
    location: "Colorado",
    addons: [
      { icon: "🔥", label: "Oven" },
      { icon: "🏚️", label: "Basement" },
      { icon: "🐕", label: "Dog" },
    ],
    customerName: "Maria",
    customerPhone: "1234235",
    totalCost: 120,
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [activeFilter, setActiveFilter] = useState<"All" | BookingStatus>(
    "All",
  );

  const filtered =
    activeFilter === "All"
      ? bookings
      : bookings.filter((b) => b.status === activeFilter);

  const handleStart = (id: string | number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "In Progress" } : b)),
    );
  };

  const handleMarkComplete = (id: string | number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Completed" } : b)),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeFilter === f.value
                ? "bg-purple-500 text-white border-purple-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-purple-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 text-sm">
          No bookings found.
        </div>
      ) : (
        <div className="flex flex-wrap gap-5">
          {filtered.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onStart={handleStart}
              onMarkComplete={handleMarkComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
