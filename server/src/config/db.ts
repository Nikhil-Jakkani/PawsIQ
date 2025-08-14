import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or service role key in environment variables');
}

export const db = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

// Helper function to handle Supabase errors
const handleSupabaseError = (error: any, defaultMessage = 'Database error') => {
  console.error('Supabase Error:', error);
  throw new Error(error?.message || defaultMessage);
};

// Helper function to execute a query and handle errors
export const executeQuery = async (query: any) => {
  const { data, error } = await query;
  if (error) {
    handleSupabaseError(error);
  }
  return data;
};

export default db;
