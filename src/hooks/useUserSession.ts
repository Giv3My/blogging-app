import React from 'react';

import { supabase } from '@/supabase/client';
import type { Session } from '@supabase/supabase-js';

export const useUserSession = () => {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    getUserSession();
  }, []);

  const getUserSession = async () => {
    const { data } = await supabase.auth.getSession();

    setSession(data.session);
  };

  return session;
};
