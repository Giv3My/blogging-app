import { GetServerSidePropsContext } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

import { SUPABASE_URL, SUPABASE_KEY } from '@/config';
import { User } from '@/screens/home/types';

export const getUserById = async (ctx: GetServerSidePropsContext, userId: string) => {
  const supabase = createPagesServerClient(ctx, {
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_KEY,
  });

  const { data: author, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .single();

  return {
    author: author as User,
    error,
  };
};
