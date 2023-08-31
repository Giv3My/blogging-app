import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

import { SUPABASE_URL, SUPABASE_KEY } from './config';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient(
    { req, res },
    {
      supabaseUrl: SUPABASE_URL,
      supabaseKey: SUPABASE_KEY,
    }
  );

  const { data: {user} } = await supabase.auth.getUser();

  if (user && req.nextUrl.pathname === '/auth') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!user && req.nextUrl.pathname !== '/auth') {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return res;
};

export const config = {
  matcher: ['/', '/auth'],
};
