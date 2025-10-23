import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if Supabase is properly configured
  if (
    !supabaseUrl || 
    !supabaseKey || 
    supabaseUrl === 'your-project-url' ||
    supabaseKey === 'your-anon-key'
  ) {
    // Return a mock client when Supabase is not configured
    // This allows the app to run without Supabase for UI development
    return null as any
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}

