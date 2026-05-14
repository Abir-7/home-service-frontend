"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type AvailabilityStatus = "available" | "not_available" | "";

export interface AvailabilityFormData {
  date: Date;
  startTime: string;
  endTime: string;
  status: AvailabilityStatus;
}

interface AddAvailabilityModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: AvailabilityFormData) => void;
}

const STATUS_OPTIONS: { value: AvailabilityStatus; label: string }[] = [
  { value: "available", label: "Available" },
  { value: "not_available", label: "Not Available" },
];

const DEFAULT_FORM = {
  date: undefined as Date | undefined,
  startTime: "",
  endTime: "",
  status: "" as AvailabilityStatus,
};

// ─── Modal ────────────────────────────────────────────────────────────────────

export function AddAvailabilityModal({
  open,
  onClose,
  onAdd,
}: AddAvailabilityModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState<AvailabilityStatus>("");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const reset = () => {
    setDate(undefined);
    setStartTime("");
    setEndTime("");
    setStatus("");
    setStatusDropdownOpen(false);
    setCalendarOpen(false);
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      reset();
      onClose();
    }
  };

  const handleAdd = () => {
    if (!date || !startTime || !endTime || !status) return;
    onAdd({ date, startTime, endTime, status });
    reset();
    onClose();
  };

  const selectedStatusLabel =
    STATUS_OPTIONS.find((o) => o.value === status)?.label ?? "";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-2xl p-7 gap-0">
        <DialogHeader className="mb-5">
          <VisuallyHidden>
            <DialogTitle>Add Availability</DialogTitle>
          </VisuallyHidden>
          <div className="text-xl font-bold text-gray-900">
            Add Availability
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* ── Date Picker ── */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-gray-700">Date</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-11 rounded-xl border-gray-200 px-4 text-sm font-normal justify-start text-left focus-visible:ring-violet-400",
                    !date && "text-gray-400",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400 shrink-0" />
                  {date ? format(date, "MM/dd/yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 rounded-xl shadow-lg"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setCalendarOpen(false);
                  }}
                  className="rounded-xl"
                  classNames={{
                    selected:
                      "bg-violet-500 text-white hover:bg-violet-600 focus:bg-violet-500 rounded-md",
                    today: "border border-violet-300 text-violet-600",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* ── Start Time ── */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-gray-700">
              Start Time
            </Label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded-xl border-gray-200 focus-visible:ring-violet-400 text-sm h-11"
            />
          </div>

          {/* ── End Time ── */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-gray-700">
              End Time
            </Label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded-xl border-gray-200 focus-visible:ring-violet-400 text-sm h-11"
            />
          </div>

          {/* ── Status ── */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-gray-700">Status</Label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setStatusDropdownOpen((o) => !o)}
                className={cn(
                  "w-full border border-gray-200 rounded-xl px-4 h-11 text-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-violet-400 transition bg-white",
                  status ? "text-gray-700" : "text-gray-400",
                )}
              >
                {selectedStatusLabel || "Select your availability"}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-gray-400 transition-transform",
                    statusDropdownOpen && "rotate-180",
                  )}
                />
              </button>

              {statusDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setStatus(opt.value);
                        setStatusDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                          status === opt.value
                            ? "border-violet-500"
                            : "border-gray-300",
                        )}
                      >
                        {status === opt.value && (
                          <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                        )}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex gap-3 mt-1">
            <Button
              variant="outline"
              className="flex-1 rounded-xl h-11 border-gray-200 text-gray-600 hover:bg-gray-50 font-medium"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 rounded-xl h-11 bg-violet-500 hover:bg-violet-600 text-white font-medium"
              onClick={handleAdd}
            >
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
