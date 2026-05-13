/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

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
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="border px-1 py-1 rounded-lg dark:border-gray-700 transition"
          >
            <Sun
              className={`h-4 w-4 transition-all ${isDark ? "block" : "hidden"}`}
            />
            <Moon
              className={` h-4 w-4 transition-all ${
                isDark ? "hidden" : "block"
              }`}
            />
          </button>

          {/* Login */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
