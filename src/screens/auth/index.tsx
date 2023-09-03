import React from 'react';

import { Box, Tab, Tabs } from '@mui/material';
import { LoginForm, RegisterForm } from '@/screens/auth/components';
import { CustomTabPanel } from '@/components/ui';
import styles from './auth.module.scss';

export const Auth = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChangeTab = (e: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  return (
    <main className={styles.container}>
      <Box sx={{ maxWidth: '350px', margin: '50px auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            sx={{
              '& .MuiTabs-flexContainer': {
                '& .MuiButtonBase-root': {
                  flexBasis: '50%',
                },
              },
            }}
            value={activeTab}
            onChange={handleChangeTab}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Box>
        <CustomTabPanel value={activeTab} index={0}>
          <LoginForm />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={1}>
          <RegisterForm />
        </CustomTabPanel>
      </Box>
    </main>
  );
};
