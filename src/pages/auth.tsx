import Head from 'next/head';

import { Auth } from '@/screens';

const AuthPage = () => {
  return (
    <>
      <Head>
        <title>Blogging app / Auth</title>
      </Head>
      <Auth />
    </>
  );
};

export default AuthPage;
