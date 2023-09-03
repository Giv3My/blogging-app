import { GetServerSidePropsContext } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

import { supabase } from '@/supabase/client';
import { SUPABASE_URL, SUPABASE_KEY } from '@/config';
import { Post } from '@/screens/home/types';

export const createPost = async (newPost: Post) => {
  const { data: post, error } = await supabase
    .from('posts')
    .insert(newPost)
    .select('*, user:profiles (*), comments (*)')
    .single();

  return {
    post: post as Post,
    error,
  };
};

export const getPosts = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx, {
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_KEY,
  });

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, user:profiles (*), comments (*, user:profiles (*))')
    .order('created_at', { ascending: false })
    .order('created_at', {
      foreignTable: 'comments',
      ascending: false,
    });

  return {
    posts: (posts as Post[]) ?? [],
    error,
  };
};

export const getPostsByUser = async (ctx: GetServerSidePropsContext, userId: string) => {
  const supabase = createPagesServerClient(ctx, {
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_KEY,
  });

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, user:profiles (*), comments (*, user:profiles (*))')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .order('created_at', {
      foreignTable: 'comments',
      ascending: false,
    });

  return {
    posts: (posts as Post[]) ?? [],
    error,
  };
};
