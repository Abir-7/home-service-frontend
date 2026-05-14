"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteEmployeeModal({
  open,
  onClose,
  onConfirm,
}: DeleteEmployeeModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-xs rounded-2xl p-6">
        <AlertDialogHeader className="items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <AlertDialogTitle className="text-sm font-semibold text-gray-800">
            Are you sure you want to Delete the user?
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row gap-3 sm:gap-3 mt-2">
          <Button
            variant="outline"
            className="flex-1 rounded-xl border-gray-200 text-gray-600 text-sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
