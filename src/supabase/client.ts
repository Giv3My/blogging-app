import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { SUPABASE_URL, SUPABASE_KEY } from '@/config';

export const supabase = createClientComponentClient({
  supabaseUrl: SUPABASE_URL,
  supabaseKey: SUPABASE_KEY,
});
