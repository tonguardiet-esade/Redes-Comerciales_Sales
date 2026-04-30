import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://beqmydjizaxbjxkdxzuv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_k_Enpx4uiv_3ICZdSHTtqg_EiRM7YAd';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);