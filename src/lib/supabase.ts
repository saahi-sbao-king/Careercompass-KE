
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wiyxojvrtdqdritluklv.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable__CLemq1ttZzLYw7waDZGNg_oehgv6DY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
