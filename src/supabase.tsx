import { createClient, Session } from '@supabase/supabase-js'
import { createContext } from 'react'
import { Database } from './supabase.types'

export const supabaseUrl = 'https://thvwhbunursjkjbmzvsj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodndoYnVudXJzamtqYm16dnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwOTExNDgsImV4cCI6MjA5OTY2NzE0OH0.JmQks59kF0rH_vOQbVj2egaRN-XQLQwj5FZeeyrR3eg"
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export const SessionContext = createContext<Session | null>(null);
