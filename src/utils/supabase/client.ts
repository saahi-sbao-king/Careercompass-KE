import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wiyxojvrtdqdritluklv.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable__CLemq1ttZzLYw7waDZGNg_oehgv6DY';

/**
 * Creates a Supabase client for use in Client Components.
 */
export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
