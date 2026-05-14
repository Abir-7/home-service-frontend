"use client";

import { useState, useMemo } from "react";
import { Search, Pencil, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/custom/common/pagination";
import { AddEmployeeModal } from "@/components/custom/admin/employee/add_employee_modal";
import { EditEmployeeModal } from "@/components/custom/admin/employee/edit_employee_modal";
import { DeleteEmployeeModal } from "@/components/custom/admin/employee/delete_employee_modal";

interface Employee {
  id: number;
  name: string;
  phone: string;
  address: string;
  joinedDate: string;
  role: "Manager" | "Cleaner" | "Supervisor";
}

const INITIAL_EMPLOYEES: Employee[] = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: "Sarah",
  phone: "1233456",
  address: "123 Admin Street, Dhaka",
  joinedDate: "12 June, 2023",
  role: i === 0 ? "Manager" : i % 7 === 0 ? "Supervisor" : "Cleaner",
}));

const ROLES = ["All", "Manager", "Cleaner", "Supervisor"] as const;
const PAGE_SIZE = 6;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [page, setPage] = useState(1);

  // Modal state
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "All" || e.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [employees, search, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const handleFilterChange = (role: string) => {
    setRoleFilter(role);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleAdd = (data: Omit<Employee, "id" | "joinedDate">) => {
    const newEmp: Employee = {
      ...data,
      id: Date.now(),
      joinedDate: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    setEmployees((prev) => [newEmp, ...prev]);
  };

  const handleSave = (updated: Employee) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e)),
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setEmployees((prev) => prev.filter((e) => e.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <main className="h-[calc(100vh-70px)] bg-gray-50 px-4 py-8 flex flex-col">
      <div className="flex-1 mx-auto w-full flex flex-col space-y-5">
        {/* ── Toolbar ── */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search user..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 h-10 rounded-xl border-gray-200 bg-white text-sm shadow-sm"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-4 rounded-xl border-gray-200 bg-white text-sm text-gray-600 gap-1.5 shadow-sm"
              >
                {roleFilter}
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              {ROLES.map((r) => (
                <DropdownMenuItem
                  key={r}
                  onClick={() => handleFilterChange(r)}
                  className={`text-sm ${
                    roleFilter === r ? "text-violet-600 font-semibold" : ""
                  }`}
                >
                  {r}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="h-10 px-5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-sm"
            onClick={() => setAddOpen(true)}
          >
            Add Employee
          </Button>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-violet-50 hover:bg-violet-50">
                {["Name", "Phone", "Joined Date", "Role", "Actions"].map(
                  (h) => (
                    <TableHead
                      key={h}
                      className="text-xs font-semibold text-gray-600 py-3"
                    >
                      {h}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-16 text-center text-sm text-gray-400"
                  >
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((emp) => (
                  <TableRow key={emp.id} className="hover:bg-gray-50/60">
                    <TableCell className="text-sm font-medium text-gray-800">
                      {emp.name}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {emp.phone}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {emp.joinedDate}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {emp.role}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditTarget(emp)}
                          className="text-violet-400 hover:text-violet-600 transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(emp)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

      {/* ── Modals ── */}
      <AddEmployeeModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />

      <EditEmployeeModal
        open={!!editTarget}
        employee={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleSave}
      />

      <DeleteEmployeeModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </main>
  );
}
