import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { HomeClient } from '@/components/home-client';

/**
 * Server-side Home Page component.
 * Fetches the user session server-side to prevent UI flickering on load.
 */
export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();

  return <HomeClient initialUser={user} />;
}
