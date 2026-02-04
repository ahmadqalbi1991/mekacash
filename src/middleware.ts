import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { PROTECTED_ROUTES } from '@/constant';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get all cookies for debugging
  const allCookies = req.cookies.getAll();
  const token = req.cookies.get('accessToken')?.value;
  
  
  // Also try getting cookie from headers (alternative method)
  const cookieHeader = req.headers.get('cookie');
  const tokenFromHeader = cookieHeader?.split(';')
    .find(c => c.trim().startsWith('accessToken='))
    ?.split('=')[1];

  // Debug logging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Middleware Debug:', {
      pathname,
      hasToken: !!token,
      tokenFromCookieAPI: token?.substring(0, 20) + '...' || 'NOT FOUND',
      tokenFromHeader: tokenFromHeader?.substring(0, 20) + '...' || 'NOT FOUND',
      tokenLength: token?.length || 0,
      allCookies: allCookies.map(c => ({ name: c.name, value: c.value.substring(0, 20) + '...' })),
      cookieHeaderExists: !!cookieHeader,
      cookieHeaderPreview: cookieHeader?.substring(0, 100) || 'NO HEADER',
    });
  }

  // Use token from cookie API first, fallback to header parsing
  const finalToken = token || tokenFromHeader;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to home if accessing protected route without token
  if (isProtectedRoute && !finalToken) {
    if (process.env.NODE_ENV === 'development') {
      console.log('❌ Redirecting: No token found for protected route');
      console.log('   Cookie API result:', token ? 'FOUND' : 'NOT FOUND');
      console.log('   Header parsing result:', tokenFromHeader ? 'FOUND' : 'NOT FOUND');
    }
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow logged-in users to access public routes
  // Removed automatic redirect to /auction-sheets to allow home page access

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/merchant/dashboard',
    '/merchant/embed-code',
    '/merchant/api-keys',
    '/merchant/payment-link'
  ],
};
