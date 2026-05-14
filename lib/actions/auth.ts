"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole } from "@/lib/redux/features/auth/authSlice";

export async function demoLogin() {
  const cookieStore = await cookies();

  // Set a mock auth token
  cookieStore.set("auth_token", "demo-token-123", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  const role = UserRole.CUSTOMER;

  // Set the user role to 'customer' using enum
  cookieStore.set("user_role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // Redirect based on role
  if (role === UserRole.CUSTOMER) {
    redirect('/my-bookings');
  } else {
    redirect('/dashboard');
  }
}

  export async function logout() {
  const cookieStore = await cookies();

  // Clear the cookies
  cookieStore.delete('auth_token');
  cookieStore.delete('user_role');

  // Redirect to the home page or signin
  redirect('/signin');
  }
