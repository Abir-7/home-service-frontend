"use client";

import { Flame, Building2, Dog } from "lucide-react";
import BookingCard, { Booking } from "./booking_card";

// ─── Demo Data ────────────────────────────────────────────────────────────────

const BOOKINGS: Booking[] = [
  {
    id: "1",
    status: "pending",
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
    subtotal: 100,
    serviceFee: 10,
    tax: 10,
    total: 120,
  },
  {
    id: "2",
    status: "in_progress",
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
    subtotal: 100,
    serviceFee: 10,
    tax: 10,
    total: 120,
  },
  {
    id: "3",
    status: "assigned",
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
    subtotal: 100,
    serviceFee: 10,
    tax: 10,
    total: 120,
    assignedTo: "Maria Garcia",
  },
  {
    id: "4",
    status: "completed",
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
    subtotal: 100,
    serviceFee: 10,
    tax: 10,
    total: 120,
    assignedTo: "Maria Garcia",
  },
  {
    id: "5",
    status: "cancelled",
    serviceType: "Service Type",
    serviceLabel: "Deep Clean",
    bedrooms: 3,
    date: "10-07-2026",
    time: "10:00AM",
    location: "Denver",
    addons: [
      { label: "Oven", icon: <Flame className="w-3 h-3 text-orange-500" /> },
    ],
    subtotal: 150,
    serviceFee: 15,
    tax: 15,
    total: 180,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BookingsPage() {
  const handleCancel = (id: string) => console.log("Cancel booking:", id);
  const handleChange = (id: string) => console.log("Change booking:", id);
  const handleReview = (id: string) => console.log("Review booking:", id);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-sm text-gray-400 mt-1">
            {BOOKINGS.length} bookings total
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BOOKINGS.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancel}
              onChange={handleChange}
              onReview={handleReview}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
