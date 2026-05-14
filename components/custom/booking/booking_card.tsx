"use client";

import { Home, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export type BookingStatus =
  | "pending"
  | "in_progress"
  | "assigned"
  | "completed"
  | "cancelled";

export interface Addon {
  label: string;
  icon: React.ReactNode;
}

export interface Booking {
  id: string;
  status: BookingStatus;
  serviceType: string;
  serviceLabel: string;
  bedrooms: number;
  date: string;
  time: string;
  location: string;
  addons: Addon[];
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
  assignedTo?: string;
}

// ─── Status Config ────────────────────────────────────────────────────────────

const statusConfig: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  assigned: {
    label: "Assigned",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

// ─── BookingCard ─────────────────────────────────────────────────────────────

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
  onReview?: (id: string) => void;
}

export default function BookingCard({
  booking,
  onCancel,
  onReview,
}: BookingCardProps) {
  const { label, className } = statusConfig[booking.status];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 h-full min-h-[420px]">
      {/* ── Header ── */}
      <div className="flex items-start justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <Home className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">
              {booking.serviceType}
            </p>
            <p className="text-xs text-gray-400">{booking.serviceLabel}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              🛏 {booking.bedrooms} bedrooms
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "text-xs font-medium rounded-full px-3 py-0.5 border shrink-0",
            className,
          )}
        >
          {label}
        </Badge>
      </div>

      <Separator className="shrink-0" />

      {/* ── Main Content (Scrollable if too long, but flex-grow pushes actions down) ── */}
      <div className="flex flex-col gap-4 flex-grow">
        {/* ── Cleaner Details (assigned / completed) ── */}
        {booking.assignedTo &&
          (booking.status === "assigned" || booking.status === "completed") ? (
            <>
              <div className="shrink-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Cleaner Details
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Assigned to</span>
                  <span className="font-medium text-gray-800">
                    {booking.assignedTo}
                  </span>
                </div>
              </div>
              <Separator className="shrink-0" />
            </>
          ) : (
            // Empty placeholder to maintain some vertical consistency if needed, 
            // but flex-grow will handle the height alignment.
            null
          )}

        {/* ── Service Details ── */}
        <div className="shrink-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Service Details
          </p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Date</span>
              <span className="text-gray-700">{booking.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time</span>
              <span className="text-gray-700">{booking.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Location</span>
              <span className="text-gray-700">{booking.location}</span>
            </div>
          </div>

          {/* Add-ons */}
          {booking.addons.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {booking.addons.map((addon) => (
                <span
                  key={addon.label}
                  className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1"
                >
                  {addon.icon}
                  {addon.label}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Separator className="shrink-0 mb-4" />

          {/* ── Pricing ── */}
          <div className="space-y-1.5 text-sm mb-4">
            <div className="flex justify-between text-gray-400">
              <span>Sub Total</span>
              <span>${booking.subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Service Fee</span>
              <span>${booking.serviceFee}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Tax</span>
              <span>${booking.tax}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 pt-1">
              <span>Total Cost</span>
              <span className="text-violet-600">${booking.total}</span>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="min-h-11 flex items-end">
            {booking.status === "pending" && (
              <Button
                variant="outline"
                className="w-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl h-11"
                onClick={() => onCancel?.(booking.id)}
              >
                Cancel Booking
              </Button>
            )}

            {booking.status === "completed" && (
              <Button
                className="w-full bg-violet-500 hover:bg-violet-600 text-white rounded-xl h-11 font-medium"
                onClick={() => onReview?.(booking.id)}
              >
                <Star className="w-4 h-4 mr-2" />
                Review
              </Button>
            )}
            
            {/* If no button is shown, the min-h-11 div keeps the card height consistent */}
          </div>
        </div>
      </div>
    </div>
  );
}
