import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface RejectModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function RejectModal({ open, onClose, onConfirm }: RejectModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-xs rounded-2xl border border-gray-100 shadow-2xl">
        <AlertDialogHeader className="text-center items-center">
          <AlertDialogTitle className="text-base font-semibold text-gray-800">
            Are you sure you want to reject?
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            This action will reject the work alert.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-3 sm:gap-3 mt-2">
          <Button
            variant="outline"
            className="flex-1 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 font-medium"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
            onClick={onConfirm}
          >
            Reject
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
