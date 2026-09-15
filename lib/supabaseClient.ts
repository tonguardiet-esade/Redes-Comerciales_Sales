import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim() ||
  'https://beqmydjizaxbjxkdxzuv.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ||
  'sb_publishable_k_Enpx4uiv_3ICZdSHTtqg_EiRM7YAd';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
