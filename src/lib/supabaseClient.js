import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient('https://rxyeerbjgbpzajgrpdof.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eWVlcmJqZ2JwemFqZ3JwZG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5MDY3NjYsImV4cCI6MjAxMTQ4Mjc2Nn0.MYHbOHvKXwhX5eOsfHrKzUvCD-Dwa5Z_rtNQZ-pJKOM')

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)