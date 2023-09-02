import React from 'react';

import { Header } from '@/components/ui';
import styles from './root-layout.module.scss';

export const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.wrapper}>{children}</div>
      </main>
    </>
  );
};
