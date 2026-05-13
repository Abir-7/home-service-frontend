"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Auth_header from "@/component/custom/common/auth_header";
export default function SignInPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log("Sign in:", { phone, password, remember });
  };

  return (
    <>
      {/* ── Title Section ── */}
      <Auth_header
        title="Sign In"
        subtitle="Sign in to access your account"
      ></Auth_header>

      {/* ── Form Section ── */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={remember}
              onCheckedChange={(val) => setRemember(!!val)}
            />
            <Label
              htmlFor="remember"
              className="text-sm text-muted-foreground font-normal cursor-pointer"
            >
              Remember me
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-violet-600 hover:text-violet-800 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-11 bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg shadow-violet-200/50 transition-all active:scale-[0.98]"
        >
          Sign In
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-violet-600 hover:text-violet-800 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
