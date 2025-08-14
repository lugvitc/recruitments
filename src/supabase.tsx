import { createClient, Session } from '@supabase/supabase-js'
import { createContext } from 'react'
import { Database } from './supabase.types'

export const supabaseUrl = 'https://iwojatlubezorinlrxkg.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3b2phdGx1YmV6b3JpbmxyeGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODg1MzUsImV4cCI6MjA3MDc2NDUzNX0.neppMFelpXSCdVd2k7hOl8OI5MoJa1FJEEY0_BxxZtk"
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export const SessionContext = createContext<Session | null>(null);
