import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

import { SUPABASE_URL, SUPABASE_KEY } from '@/config';
import type { Post, User } from '@/screens/home/types';

import { RootLayout } from '@/layouts';
import { Author } from '@/screens';

interface AuthorPagePops {
  author: User;
  posts: Post[];
}

const AuthorPage: NextPage<AuthorPagePops> & {
  getLayout: (page: React.ReactNode) => React.ReactNode;
} = ({ author, posts }) => {
  return (
    <>
      <Head>
        <title>Blogging app / Author</title>
      </Head>
      <main>
        <Author author={author} postList={posts} />
      </main>
    </>
  );
};

AuthorPage.getLayout = (page: React.ReactNode) => {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const userId = ctx.params?.id;

  const supabase = createPagesServerClient(ctx, {
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_KEY,
  });

  const { data: author } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .single();

  if (!author) {
    return {
      notFound: true,
    };
  }

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, user:profiles (*), comments (*, user:profiles (*))')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .order('created_at', {
      foreignTable: 'comments',
      ascending: false,
    });

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      author,
      posts,
    },
  };
};

export default AuthorPage;
