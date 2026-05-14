import {
  Users,
  UserRound,
  BriefcaseBusiness,
  UsersRound,
  BadgeDollarSign,
} from "lucide-react";

interface StatCard {
  value: string;
  label: string;
  change: number;
  icon: React.ReactNode;
  iconBg: string;
}

const stats: StatCard[] = [
  {
    value: "10",
    label: "Active Employee",
    change: 12,
    icon: <UserRound className="w-5 h-5 text-white" />,
    iconBg: "bg-violet-500",
  },
  {
    value: "10k",
    label: "Total Customer",
    change: -12,
    icon: <Users className="w-5 h-5 text-white" />,
    iconBg: "bg-orange-400",
  },
  {
    value: "10",
    label: "Total Services",
    change: 12,
    icon: <BriefcaseBusiness className="w-5 h-5 text-white" />,
    iconBg: "bg-sky-400",
  },
  {
    value: "10",
    label: "Total work",
    change: 12,
    icon: <UsersRound className="w-5 h-5 text-white" />,
    iconBg: "bg-pink-500",
  },
  {
    value: "100",
    label: "Total Revenue",
    change: 12,
    icon: <BadgeDollarSign className="w-5 h-5 text-white" />,
    iconBg: "bg-green-500",
  },
];

export function AdminStatsCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 flex flex-col gap-3"
        >
          {/* Value + Icon */}
          <div className="flex items-start justify-between">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              {stat.value}
            </span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}
            >
              {stat.icon}
            </div>
          </div>

          {/* Label */}
          <p className="text-xs text-gray-400 font-medium -mt-1">
            {stat.label}
          </p>

          {/* Change badge */}
          <div className="flex items-center gap-1">
            {stat.change >= 0 ? (
              <svg
                className="w-3.5 h-3.5 text-green-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 14l5-5 5 5H7z" />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5 text-red-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            )}
            <span
              className={`text-xs font-semibold ${
                stat.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.change >= 0 ? "+" : ""}
              {stat.change}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
