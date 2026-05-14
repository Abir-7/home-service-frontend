"use client";

import { Home, Play, CheckCircle, Eye, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CleanerBookingStatus =
  | "new"
  | "in_progress"
  | "completed"
  | "cancelled";

export type Priority = "kitchen" | "bedroom";

export interface Addon {
  label: string;
  icon: React.ReactNode;
}

export interface CleanerBooking {
  id: string;
  status: CleanerBookingStatus;
  priority: Priority[];
  serviceType: string;
  serviceLabel: string;
  bedrooms: number;
  date: string;
  time: string;
  location: string;
  addons: Addon[];
  customerName: string;
  customerPhone: string;
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
}

// ─── Status Config ────────────────────────────────────────────────────────────

const statusConfig: Record<
  CleanerBookingStatus,
  { label: string; className: string }
> = {
  new: {
    label: "New",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-blue-100 text-blue-700 border-blue-200",
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

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  kitchen: {
    label: "Kitchen",
    className: "bg-orange-100 text-orange-700 border-orange-200",
  },
  bedroom: {
    label: "Bedroom",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
};

// ─── CleanerBookingCard ───────────────────────────────────────────────────────

interface CleanerBookingCardProps {
  booking: CleanerBooking;
  onStart?: (id: string) => void;
  onMarkComplete?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function CleanerBookingCard({
  booking,
  onStart,
  onMarkComplete,
  onViewDetails,
}: CleanerBookingCardProps) {
  const { label, className } = statusConfig[booking.status];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 h-full min-h-[520px]">
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

      {/* ── Main Content ── */}
      <div className="flex flex-col gap-4 flex-grow">
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

          {/* ── Customer Details ── */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Customer Details
            </p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Name
                </span>
                <span className="text-gray-700">{booking.customerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Phone className="w-3 h-3" /> Phone
                </span>
                <span className="text-gray-700">{booking.customerPhone}</span>
              </div>
            </div>
          </div>

          <Separator className="shrink-0 mb-4" />

          {/* ── Priority ── */}
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-gray-400">Priority Scope</span>
            <div className="flex gap-1">
              {booking.priority.map((p) => (
                <Badge
                  key={p}
                  variant="outline"
                  className={cn(
                    "capitalize font-medium",
                    priorityConfig[p].className,
                  )}
                >
                  {p}
                </Badge>
              ))}
            </div>
          </div>

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
          <div className="min-h-11 flex items-end gap-2">
            {booking.status === "new" && (
              <>
                <Button
                  className="flex-1 bg-violet-500 hover:bg-violet-600 text-white rounded-xl h-11 font-medium"
                  onClick={() => onStart?.(booking.id)}
                >
                  <Play className="w-4 h-4 mr-1.5" />
                  Start
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl h-11"
                  onClick={() => onViewDetails?.(booking.id)}
                >
                  <Eye className="w-4 h-4 mr-1.5" />
                  Details
                </Button>
              </>
            )}

            {booking.status === "in_progress" && (
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-11 font-medium"
                onClick={() => onMarkComplete?.(booking.id)}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            )}

            {booking.status === "completed" && (
              <Button
                variant="outline"
                className="w-full border-gray-200 text-gray-500 rounded-xl h-11"
                onClick={() => onViewDetails?.(booking.id)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
