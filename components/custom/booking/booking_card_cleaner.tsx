import React from "react";

export type BookingStatus = "New" | "In Progress" | "Completed";

export interface Addon {
  icon: string;
  label: string;
}

export interface Booking {
  id: string | number;
  serviceType: string;
  serviceSubType: string;
  bedrooms: number;
  status: BookingStatus;
  date: string;
  time: string;
  location: string;
  addons: Addon[];
  customerName: string;
  customerPhone: string;
  totalCost: number;
}

interface BookingCardProps {
  booking: Booking;
  onStart?: (id: string | number) => void;
  onMarkComplete?: (id: string | number) => void;
}

const statusConfig: Record<
  BookingStatus,
  { label: string; badgeBg: string; badgeText: string }
> = {
  New: { label: "New", badgeBg: "", badgeText: "" },
  "In Progress": {
    label: "In Progress",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-600",
  },
  Completed: {
    label: "Completed",
    badgeBg: "bg-green-100",
    badgeText: "text-green-600",
  },
};

export default function BookingCard({
  booking,
  onStart,
  onMarkComplete,
}: BookingCardProps) {
  const statusCfg = statusConfig[booking.status];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 w-full max-w-67.5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 text-xl">
            🏠
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm leading-tight">
              {booking.serviceType}
            </p>
            <p className="text-gray-400 text-xs">{booking.serviceSubType}</p>
            <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
              🛏️ {booking.bedrooms} bedrooms
            </p>
          </div>
        </div>
        {booking.status !== "New" && (
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusCfg.badgeBg} ${statusCfg.badgeText}`}
          >
            {statusCfg.label}
          </span>
        )}
      </div>

      {/* Service Details */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">
          Service Details
        </p>
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Date</span>
            <span className="text-gray-700 font-medium">{booking.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Time</span>
            <span className="text-gray-700 font-medium">{booking.time}</span>
          </div>
          <div className="flex justify-between">
            <span>Location</span>
            <span className="text-gray-700 font-medium">
              {booking.location}
            </span>
          </div>
        </div>
      </div>

      {/* Addons */}
      {booking.addons.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {booking.addons.map((addon, i) => (
            <span
              key={i}
              className="flex items-center gap-1 text-xs bg-orange-50 text-orange-500 border border-orange-100 rounded-full px-2.5 py-1"
            >
              {addon.icon} {addon.label}
            </span>
          ))}
        </div>
      )}

      {/* Customer Details */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">
          Customer Details
        </p>
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Name</span>
            <span className="text-gray-700 font-medium">
              {booking.customerName}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Phone</span>
            <span className="text-gray-700 font-medium">
              {booking.customerPhone}
            </span>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Total Cost</span>
        <span className="text-purple-600 font-bold text-sm">
          ${booking.totalCost}
        </span>
      </div>

      {/* Action Button */}
      {booking.status === "New" && (
        <button
          onClick={() => onStart?.(booking.id)}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          Start
        </button>
      )}
      {booking.status === "In Progress" && (
        <button
          onClick={() => onMarkComplete?.(booking.id)}
          className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          Mark Complete
        </button>
      )}
    </div>
  );
}
