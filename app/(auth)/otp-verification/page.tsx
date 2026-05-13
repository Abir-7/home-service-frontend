"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Auth_header from "@/components/custom/common/auth_header";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    console.log("OTP Verification:", { otp });
  };

  return (
    <>
      <Auth_header
        title="Verify OTP"
        subtitle="Enter the 6-digit code sent to your phone"
      ></Auth_header>

      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            type="text"
            maxLength={6}
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="text-center tracking-[0.5em] text-lg"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-11 bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg shadow-violet-200/50 transition-all active:scale-[0.98]"
        >
          Verify Code
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <button className="font-semibold text-violet-600 hover:text-violet-800 transition-colors">
            Resend
          </button>
        </p>
      </div>
    </>
  );
}
