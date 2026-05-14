/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Moon, Sun, LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { UserRole } from "@/lib/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    console.log("Toggling theme from", resolvedTheme, "to", newTheme);
    setTheme(newTheme);
  };

  const isDark = resolvedTheme === "dark";
  const dashboardPath = user?.user_role === UserRole.CUSTOMER ? "/my-bookings" : "/dashboard";

  return (
    <nav className="bg-white dark:bg-black shadow-md px-6 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">Logo</div>

        {/* Nav Links */}
        <ul className="flex gap-6 text-gray-700 dark:text-gray-200 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="border px-2 py-2 rounded-lg border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-yellow-500" />
            ) : (
              <Moon className="h-4 w-4 text-gray-700" />
            )}
          </button>

          {/* Login/Logout/Dashboard */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href={dashboardPath}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hidden sm:block"
              >
                {user?.user_role === UserRole.CUSTOMER ? "My Bookings" : "Go to Dashboard"}
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="flex items-center gap-2 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/signin"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
