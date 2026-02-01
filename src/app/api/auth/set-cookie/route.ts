import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  // Create response
  const res = NextResponse.json({ success: true });

  // Set cookie on the response
  // Use secure only in production (HTTPS), allow in development (HTTP)
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Get the origin to set proper domain (optional, but helps in some cases)
  const origin = req.headers.get('origin') || req.headers.get('referer');
  
  res.cookies.set('accessToken', token, {
    httpOnly: true,
    secure: isProduction, // Only secure in production
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year - cookie persists across browser sessions
    // Don't set domain explicitly - let browser handle it (works better for localhost)
  });

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🍪 Cookie Set:', {
      tokenLength: token.length,
      secure: isProduction,
      path: '/',
      sameSite: 'lax',
    });
  }

  return res;
}
