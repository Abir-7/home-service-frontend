"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center gap-1 justify-center">
      {/* Prev */}
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8 rounded-lg border-gray-200 text-gray-400 hover:text-gray-700"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Pages */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-8 h-8 flex items-center justify-center text-sm text-gray-400"
          >
            ...
          </span>
        ) : (
          <Button
            key={p}
            variant="outline"
            size="icon"
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              currentPage === p
                ? "bg-violet-600 border-violet-600 text-white hover:bg-violet-700 hover:text-white"
                : "border-gray-200 text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </Button>
        ),
      )}

      {/* Next */}
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8 rounded-lg border-gray-200 text-gray-400 hover:text-gray-700"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
