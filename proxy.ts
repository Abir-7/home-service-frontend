import { NextRequest, NextResponse } from 'next/server';

// 1. Define protected and public routes
const protectedRoutes = ['/(dashboard)', '/my-bookings']; 
const authRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password', '/otp-verification'];
const publicRoutes = ['/'];

export function proxy(req: NextRequest) {
  // 2. Extract path and auth token
  const path = req.nextUrl.pathname;
  
  // Note: Adjust the cookie name 'auth_token' to match what your auth system uses
  const token = req.cookies.get('auth_token')?.value;
  const role = req.cookies.get('user_role')?.value;

  // 3. Check if the current route is protected or an auth route
  const isProtectedRoute = 
    path.startsWith('/dashboard') || 
    path.startsWith('/my-bookings') ||
    protectedRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.includes(path);

  // 4. Redirect Logic
  
  // If accessing a protected route without a token, redirect to signin
  if (isProtectedRoute && !token) {
    const signInUrl = new URL('/signin', req.nextUrl.origin);
    // Optional: add a redirect parameter to return the user after login
    signInUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(signInUrl);
  }

  // If accessing an auth route (like /signin) while already logged in, redirect to dashboard
  if (isAuthRoute && token) {
    if (role === 'customer') {
      return NextResponse.redirect(new URL('/my-bookings', req.nextUrl.origin));
    }
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
  }

  // Ensure customer is redirected to /my-bookings if they land on /dashboard
  if (path === '/dashboard' && role === 'customer') {
      return NextResponse.redirect(new URL('/my-bookings', req.nextUrl.origin));
  }

  return NextResponse.next();
}

// 5. Configure Matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
