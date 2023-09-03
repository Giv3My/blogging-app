import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';

import { PostsProvider } from '@/contexts';
import { postsService, usersService } from '@/services';
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
      <PostsProvider postList={posts}>
        <Author author={author} postList={posts} />
      </PostsProvider>
    </>
  );
};

AuthorPage.getLayout = (page: React.ReactNode) => {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const userId = ctx.params?.id;

  const { author } = await usersService.getUserById(ctx, userId as string);

  if (!author) {
    return {
      notFound: true,
    };
  }

  const { posts, error } = await postsService.getPostsByUser(ctx, userId as string);

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
