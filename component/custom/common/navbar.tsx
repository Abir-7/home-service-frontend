import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">Logo</div>

        {/* Nav Links */}
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>

          <li>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
          </li>

          <li>
            <Link href="/services" className="hover:text-blue-600">
              Services
            </Link>
          </li>

          <li>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </li>
        </ul>

        {/* Login Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
