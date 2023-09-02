import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { authService } from '@/services';
import { useUserSession } from '@/hooks';

import { Button } from '@mui/material';
import styles from './header.module.scss';

export const Header = () => {
  const router = useRouter();
  const session = useUserSession();

  const handleSignOut = async () => {
    if (session) {
      authService.signOut();
    }

    router.replace('/auth');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link href="/">
            <h2 className={styles.logo}>Blogging App</h2>
          </Link>
          <div>
            <p className={styles['user-email']}>{session?.user.email}</p>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#b84444',
                '&:hover': {
                  backgroundColor: '#b83b3b',
                },
              }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
