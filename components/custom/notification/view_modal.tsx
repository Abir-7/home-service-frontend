/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WorkAlert } from "@/types/notification.types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ViewModalProps {
  alert: WorkAlert | null;
  open: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
}

export function ViewModal({ alert, open, onClose, onApprove }: ViewModalProps) {
  if (!alert) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden shadow-2xl border border-gray-100">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Booking Details</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        <div className="p-5">
          {/* Service Type Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-violet-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                Service Type
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {alert.serviceType}
              </p>
              <p className="text-xs text-gray-400">{alert.serviceSubtype}</p>
            </div>
          </div>

          <Separator className="mb-4" />

          {/* Service Details */}
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-800 mb-2">
              Service Details
            </p>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Date</span>
                <span className="text-xs text-gray-700 font-medium">
                  {alert.date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Time</span>
                <span className="text-xs text-gray-700 font-medium">
                  {alert.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Location</span>
                <span className="text-xs text-gray-700 font-medium">
                  {alert.location}
                </span>
              </div>
            </div>
          </div>

          <Separator className="mb-4" />

          {/* Customer Details */}
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-800 mb-2">
              Customer Details
            </p>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Name</span>
                <span className="text-xs text-gray-700 font-medium">
                  {alert.customerName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Phone</span>
                <span className="text-xs text-gray-700 font-medium">
                  {alert.customerPhone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Total Cost</span>
                <span className="text-sm font-bold text-violet-600">
                  ${alert.totalCost}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-5">
            <Button
              variant="outline"
              className="flex-1 rounded-xl text-sm font-medium border-gray-200 text-gray-500 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold"
              onClick={() => {
                onApprove(alert.id);
                onClose();
              }}
            >
              Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
