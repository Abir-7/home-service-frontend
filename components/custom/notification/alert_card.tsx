import { Button } from "@/components/ui/button";
import { WorkAlert } from "@/types/notification.types";

interface AlertCardProps {
  alert: WorkAlert;
  onView: (alert: WorkAlert) => void;
  onReject: (alert: WorkAlert) => void;
}

export function AlertCard({ alert, onView, onReject }: AlertCardProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-gray-200">
      {/* Left: Icon + Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{alert.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-lg border border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 text-xs font-semibold px-4 h-8"
          onClick={() => onView(alert)}
        >
          View
        </Button>
        {alert.canReject && (
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 text-xs font-semibold px-4 h-8"
            onClick={() => onReject(alert)}
          >
            Reject
          </Button>
        )}
      </div>
    </div>
  );
}
