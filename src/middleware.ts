import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_KEY, SUPABASE_URL } from './config';

import { authService } from './services';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const {
    data: { user },
  } = await authService.checkAuth({ req, res });

  if (user && req.nextUrl.pathname === '/auth') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!user && req.nextUrl.pathname !== '/auth') {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return res;
};

export const config = {
  matcher: ['/', '/author/:id*', '/auth'],
};
