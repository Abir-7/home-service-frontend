"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AddAvailabilityModal,
  AvailabilityFormData,
} from "@/components/custom/cleaner/availability_modal";

// ─── Types ────────────────────────────────────────────────────────────────────

type SlotStatus = "available" | "not_available" | "booked";

interface TimeSlot {
  time: string;
  location?: string;
}

interface DayData {
  status: SlotStatus;
  slots?: TimeSlot[];
}

type ScheduleMap = Record<string, DayData>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DAYS_FULL = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAYS_SHORT = ["M", "T", "W", "T", "F", "S", "S"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}
function buildGrid(year: number, month: number): (number | null)[] {
  const total = getDaysInMonth(year, month);
  const first = getFirstDayOfMonth(year, month);
  const grid: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= total; d++) grid.push(d);
  while (grid.length % 7 !== 0) grid.push(null);
  return grid;
}

function fmt12(time24: string) {
  if (!time24) return "";
  const [h, m] = time24.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const INITIAL_SCHEDULE: ScheduleMap = {
  "2026-4-1": {
    status: "booked",
    slots: [
      { time: "10:00AM", location: "Colorado" },
      { time: "2:00PM", location: "Colorado" },
    ],
  },
  "2026-4-2": { status: "not_available", slots: [{ time: "2:00–3:00PM" }] },
  "2026-4-3": { status: "available" },
  "2026-4-4": { status: "available" },
  "2026-4-5": { status: "available" },
  "2026-4-6": { status: "available" },
  "2026-4-7": { status: "available" },
  "2026-4-9": {
    status: "booked",
    slots: [
      { time: "11:00AM", location: "Colorado" },
      { time: "2:00PM", location: "Colorado" },
    ],
  },
  "2026-4-10": {
    status: "booked",
    slots: [{ time: "10:00AM", location: "Colorado" }],
  },
  "2026-4-11": {
    status: "booked",
    slots: [{ time: "10:00AM", location: "Colorado" }],
  },
  "2026-4-12": {
    status: "booked",
    slots: [
      { time: "10:00AM", location: "Colorado" },
      { time: "2:00PM", location: "Colorado" },
      { time: "6:00PM", location: "Colorado" },
    ],
  },
  "2026-4-13": {
    status: "booked",
    slots: [
      { time: "10:00AM", location: "Colorado" },
      { time: "2:00PM", location: "Colorado" },
    ],
  },
  "2026-4-14": {
    status: "booked",
    slots: [
      { time: "10:00AM", location: "Colorado" },
      { time: "2:00PM", location: "Colorado" },
    ],
  },
};

// ─── Day Cell ─────────────────────────────────────────────────────────────────

function DayCell({
  day,
  data,
  isToday,
}: {
  day: number | null;
  data?: DayData;
  isToday: boolean;
}) {
  if (day === null)
    return <div className="border border-gray-100 min-h-15 sm:min-h-22.5" />;

  const status = data?.status;
  const slots = data?.slots ?? [];

  return (
    <div
      className={cn(
        "border border-gray-100 min-h-15 sm:min-h-22.5 p-1 sm:p-1.5 flex flex-col gap-0.5 sm:gap-1 overflow-hidden",
        status === "booked" && "bg-purple-50",
        isToday && "ring-2 ring-inset ring-violet-400",
      )}
    >
      {/* Day number */}
      <span
        className={cn(
          "text-[10px] sm:text-xs font-semibold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full shrink-0",
          isToday ? "bg-violet-500 text-white" : "text-gray-700",
        )}
      >
        {String(day).padStart(2, "0")}
      </span>

      {/* Not Available */}
      {status === "not_available" && (
        <div className="min-w-0">
          <p className="text-[8px] sm:text-[10px] font-semibold text-red-500 leading-tight truncate">
            Not Available
          </p>
          {slots.map((s, i) => (
            <p
              key={i}
              className="text-[7px] sm:text-[9px] text-red-400 leading-tight truncate"
            >
              {s.time}
            </p>
          ))}
        </div>
      )}

      {/* Available */}
      {status === "available" && (
        <p className="text-[8px] sm:text-[10px] font-semibold text-green-500 leading-tight">
          Available
        </p>
      )}

      {/* Booked slots — hide on very small screens, show on sm+ */}
      {status === "booked" && (
        <div className="hidden sm:flex flex-col gap-0.5 min-w-0">
          {slots.map((s, i) => (
            <p
              key={i}
              className="text-[9px] text-gray-600 leading-tight truncate"
            >
              {s.time}
              {s.location ? `, ${s.location}` : ""}
            </p>
          ))}
        </div>
      )}

      {/* Booked dot indicator on mobile */}
      {status === "booked" && (
        <div className="flex sm:hidden mt-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AvailabilityPage() {
  const today = new Date();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(4);
  const [schedule, setSchedule] = useState<ScheduleMap>(INITIAL_SCHEDULE);
  const [modalOpen, setModalOpen] = useState(false);

  const grid = buildGrid(year, month);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < grid.length; i += 7) weeks.push(grid.slice(i, i + 7));

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const isToday = (day: number | null) =>
    day !== null &&
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const handleAdd = (data: AvailabilityFormData) => {
    const d = data.date;
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const timeLabel = `${fmt12(data.startTime)}–${fmt12(data.endTime)}`;

    setSchedule((prev) => {
      const existing = prev[key];
      if (data.status === "available" || data.status === "not_available") {
        return {
          ...prev,
          [key]: { status: data.status, slots: [{ time: timeLabel }] },
        };
      }
      return {
        ...prev,
        [key]: {
          status: "booked",
          slots: [...(existing?.slots ?? []), { time: fmt12(data.startTime) }],
        },
      };
    });
  };

  return (
    <div className="w-full mx-auto p-3 sm:p-4 md:p-8">
      {/* ── Calendar Card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-6">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-semibold text-gray-800">
            {MONTHS[month]} {year}
          </h3>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="w-full border border-gray-100 rounded-xl overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7">
            {DAYS_FULL.map((d, i) => (
              <div
                key={d}
                className="border border-gray-100 bg-gray-50 py-1.5 sm:py-2 text-center text-[10px] sm:text-xs font-semibold text-gray-500"
              >
                <span className="hidden sm:inline">{d}</span>
                <span className="sm:hidden">{DAYS_SHORT[i]}</span>
              </div>
            ))}
          </div>

          {/* Weeks */}
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => {
                const key = day ? `${year}-${month}-${day}` : null;
                return (
                  <DayCell
                    key={di}
                    day={day}
                    data={key ? schedule[key] : undefined}
                    isToday={isToday(day)}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-purple-100 border border-purple-200 shrink-0" />
            Booked
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500 font-bold">—</span>
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-red-500 font-bold">—</span>
            Not Available
          </span>
        </div>
      </div>

      {/* ── Modal ── */}
      <AddAvailabilityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}
