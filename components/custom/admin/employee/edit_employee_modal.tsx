/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Employee {
  id: number;
  name: string;
  phone: string;
  address: string;
  role: "Manager" | "Cleaner" | "Supervisor";
}

interface EditEmployeeModalProps {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
  onSave: (updated: Employee) => void;
}

export function EditEmployeeModal({
  open,
  employee,
  onClose,
  onSave,
}: EditEmployeeModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    role: "" as Employee["role"] | "",
  });

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        phone: employee.phone,
        address: employee.address,
        role: employee.role,
      });
    }
  }, [employee]);

  const handleSave = () => {
    if (!employee || !form.role) return;
    onSave({ ...employee, ...form, role: form.role as Employee["role"] });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-gray-900">
            Edit User Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-gray-700">Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Sarah"
              className="h-9 rounded-lg border-gray-200 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-gray-700">Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              placeholder="34898741"
              className="h-9 rounded-lg border-gray-200 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-gray-700">
              Address
            </Label>
            <Input
              value={form.address}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
              placeholder="34898743"
              className="h-9 rounded-lg border-gray-200 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-gray-700">Role</Label>
            <Select
              value={form.role}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, role: v as Employee["role"] }))
              }
            >
              <SelectTrigger className="h-9 rounded-lg border-gray-200 text-sm text-gray-400">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Cleaner">Cleaner</SelectItem>
                <SelectItem value="Supervisor">Supervisor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            variant="outline"
            className="flex-1 rounded-xl border-gray-200 text-gray-500 text-sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold"
            onClick={handleSave}
            disabled={!form.name || !form.phone || !form.role}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
