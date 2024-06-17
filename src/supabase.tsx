import { createClient, Session } from '@supabase/supabase-js'
import { createContext } from 'react'
import { Database } from './supabase.types'

export const supabaseUrl = 'https://twvyrbcvrsbsaxjymrcr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3dnlyYmN2cnNic2F4anltcmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NTQwMDUsImV4cCI6MjAzMzQzMDAwNX0.PE2jnWmWTeNvwQQSDXrI3ERPkrIVYVIBoR5nqopZefY"
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export const SessionContext = createContext<Session | null>(null);
