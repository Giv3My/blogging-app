import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

import { supabase } from '@/supabase/client';
import { SUPABASE_URL, SUPABASE_KEY } from '@/config';
import { LoginFormValues } from '@/screens/auth/components/login-form/types';
import { RegisterFormValues } from '@/screens/auth/components/register-form/types';

export const signIn = async (values: LoginFormValues) => {
  return supabase.auth.signInWithPassword(values);
};

export const signUp = async (values: RegisterFormValues) => {
  const { profileType, ...credentials } = values;

  return supabase.auth.signUp({
    ...credentials,
    options: {
      data: {
        profileType,
      },
    },
  });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const checkAuth = async (ctx: { req: NextRequest; res: NextResponse }) => {
  const supabase = createMiddlewareClient(ctx, {
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_KEY,
  });

  return supabase.auth.getUser();
};
