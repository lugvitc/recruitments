import { createClient, Session } from "@supabase/supabase-js";
import { createContext } from "react";
import { Database } from "./supabase.types";

export const supabaseUrl = "https://udursxosurnyowssacft.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdXJzeG9zdXJueW93c3NhY2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNDQxMTQsImV4cCI6MjEwMjYyMDExNH0.IqmDqaJOG_xuqJ3jRlzeBvCpf6prchx1IIsvA37q_u8";
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const SessionContext = createContext<Session | null>(null);
