"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/custom/common/pagination";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  joinedDate: string;
  serviceTaken: number;
  totalPayment: string;
}

const ALL_CUSTOMERS: Customer[] = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: "Sarah",
  phone: "1233456",
  email: "a@gmail.com",
  joinedDate: "12 June, 2023",
  serviceTaken: i % 3 === 0 ? 1 : 3,
  totalPayment: "10k",
}));

const PAGE_SIZE = 6;

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_CUSTOMERS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q),
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 flex flex-col">
      <div className="flex-1 mx-auto w-full flex flex-col space-y-5">
        {/* ── Search ── */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search user..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl border-gray-200 bg-white text-sm shadow-sm"
          />
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-violet-50 hover:bg-violet-50">
                {[
                  "Name",
                  "Phone",
                  "Email",
                  "Joined Date",
                  "Service Taken",
                  "Total Payment",
                ].map((h) => (
                  <TableHead
                    key={h}
                    className="text-xs font-semibold text-gray-600 py-3"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-16 text-center text-sm text-gray-400"
                  >
                    No customers found.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50/60">
                    <TableCell className="text-sm font-medium text-gray-800">
                      {customer.name}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {customer.email}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {customer.joinedDate}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {customer.serviceTaken}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {customer.totalPayment}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* ── Pagination pinned to bottom ── */}
        <div className="mt-auto pt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </main>
  );
}
