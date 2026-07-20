import { createClient, Session } from '@supabase/supabase-js'
import { createContext } from 'react'
import { Database } from './supabase.types'

export const supabaseUrl = 'https://awkxnthlsisqjotalipj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3a3hudGhsc2lzcWpvdGFsaXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1MTYyNzMsImV4cCI6MjEwMDA5MjI3M30.1zTlEgvtGya_KXYrnAO3wHmC8y6XJ5-aX3DOMn_WqNw"
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export const SessionContext = createContext<Session | null>(null);
