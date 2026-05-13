"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Auth_header from "@/components/custom/common/auth_header";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    console.log("Forgot password request for:", phone);
  };

  return (
    <>
      {/* ── Title Section ── */}
      <Auth_header
        title="Forgot Password"
        subtitle="Enter your phone number to reset your password"
      ></Auth_header>

      {/* ── Form Section ── */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your registered phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-11 bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg shadow-violet-200/50 transition-all active:scale-[0.98]"
        >
          Send Reset Code
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Remembered your password?{" "}
          <Link
            href="/signin"
            className="font-semibold text-violet-600 hover:text-violet-800 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
