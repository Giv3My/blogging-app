import React from 'react';

import { Header } from '@/components/ui';

export const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
