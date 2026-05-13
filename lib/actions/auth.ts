"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  // Set the user role to 'customer'
  cookieStore.set("user_role", "customer", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // Redirect to the dashboard
  redirect('/dashboard');
  }

  export async function logout() {
  const cookieStore = await cookies();

  // Clear the cookies
  cookieStore.delete('auth_token');
  cookieStore.delete('user_role');

  // Redirect to the home page or signin
  redirect('/signin');
  }
