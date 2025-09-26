export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applicants: {
        Row: {
          contact: string
          created_at: string
          dep: string
          email: string
          formdata: Json
          id: number
          name: string
          regno: string
          selected: boolean
          shortlisted: boolean
          slot: number | null
        }
        Insert: {
          contact?: string
          created_at?: string
          dep: string
          email?: string
          formdata?: Json
          id?: number
          name?: string
          regno?: string
          selected?: boolean
          shortlisted?: boolean
          slot?: number | null
        }
        Update: {
          contact?: string
          created_at?: string
          dep?: string
          email?: string
          formdata?: Json
          id?: number
          name?: string
          regno?: string
          selected?: boolean
          shortlisted?: boolean
          slot?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "applicants_slot_fkey"
            columns: ["slot"]
            isOneToOne: false
            referencedRelation: "slots"
            referencedColumns: ["id"]
          },
        ]
      }
      applicants_archive: {
        Row: {
          contact: string
          created_at: string
          dep: string
          email: string
          formdata: Json
          id: number
          name: string
          regno: string
          shortlisted: boolean
          slot: number | null
        }
        Insert: {
          contact?: string
          created_at?: string
          dep: string
          email?: string
          formdata?: Json
          id?: number
          name?: string
          regno?: string
          shortlisted?: boolean
          slot?: number | null
        }
        Update: {
          contact?: string
          created_at?: string
          dep?: string
          email?: string
          formdata?: Json
          id?: number
          name?: string
          regno?: string
          shortlisted?: boolean
          slot?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "applicants_archive_slot_fkey"
            columns: ["slot"]
            isOneToOne: false
            referencedRelation: "slots"
            referencedColumns: ["id"]
          },
        ]
      }
      bookedpvt: {
        Row: {
          contact: string | null
          dep: string | null
          email: string | null
          id: number
          name: string | null
          regno: string | null
          timing: string | null
        }
        Insert: {
          contact?: string | null
          dep?: string | null
          email?: string | null
          id?: number
          name?: string | null
          regno?: string | null
          timing?: string | null
        }
        Update: {
          contact?: string | null
          dep?: string | null
          email?: string | null
          id?: number
          name?: string | null
          regno?: string | null
          timing?: string | null
        }
        Relationships: []
      }
      levels: {
        Row: {
          completed: boolean | null
          created_at: string
          email: string
          id: number
          level: number
          tg: boolean | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          email: string
          id?: number
          level?: number
          tg?: boolean | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          email?: string
          id?: number
          level?: number
          tg?: boolean | null
        }
        Relationships: []
      }
      slots: {
        Row: {
          capacity: number
          dep: string
          id: number
          timing: string
        }
        Insert: {
          capacity?: number
          dep: string
          id?: number
          timing: string
        }
        Update: {
          capacity?: number
          dep?: string
          id?: number
          timing?: string
        }
        Relationships: []
      }
      stages: {
        Row: {
          id: number
          level: number
          password: string
          redirect: string
          username: string
        }
        Insert: {
          id?: number
          level: number
          password: string
          redirect?: string
          username: string
        }
        Update: {
          id?: number
          level?: number
          password?: string
          redirect?: string
          username?: string
        }
        Relationships: []
      }
      tg: {
        Row: {
          email: string
        }
        Insert: {
          email: string
        }
        Update: {
          email?: string
        }
        Relationships: []
      }
      penguin_contacts: {
        Row: {
          email: string
          operative_1: string
          operative_2: string
          browser: string
          thread_id: string
          system_model: string
          submitted_at: string // ISO timestamp
        }
        Insert: {
          email: string
          operative_1: string
          operative_2: string
          browser: string
          thread_id: string
          system_model: string
          submitted_at?: string
        }
        Update: {
          email?: string
          operative_1?: string
          operative_2?: string
          browser?: string
          thread_id?: string
          system_model?: string
          submitted_at?: string
        }
        Relationships: []
      }
      penguin_contacts_attempts: {
        Row: {
          email: string
          operative_1: string
          operative_2: string
          browser: string
          thread_id: string
          system_model: string
          submitted_at: string // ISO timestamp
        }
        Insert: {
          email: string
          operative_1: string
          operative_2: string
          browser: string
          thread_id: string
          system_model: string
          submitted_at?: string
        }
        Update: {
          email?: string
          operative_1?: string
          operative_2?: string
          browser?: string
          thread_id?: string
          system_model?: string
          submitted_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bookslot: {
        Args: {
          slot_id: number
          applicant: number
        }
        Returns: boolean
      }
      get_level: {
        Args: {
          p_username: string
          p_password: string
          p_email: string
        }
        Returns: number
      }
      returnbookings: {
        Args: {
          department: string
        }
        Returns: {
          email: string
          contact: string
          regno: string
        }[]
      }
      update_level_redirect: {
        Args: {
          username_param: string
          password_param: string
          email_param: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
