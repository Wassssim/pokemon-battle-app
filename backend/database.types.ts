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
      pokemon: {
        Row: {
          id: number
          image: string | null
          life: number | null
          name: string
          power: number | null
          type: number | null
        }
        Insert: {
          id?: number
          image?: string | null
          life?: number | null
          name: string
          power?: number | null
          type?: number | null
        }
        Update: {
          id?: number
          image?: string | null
          life?: number | null
          name?: string
          power?: number | null
          type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pokemon_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "pokemon_type"
            referencedColumns: ["id"]
          },
        ]
      }
      pokemon_type: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      team: {
        Row: {
          created_at: string | null
          id: number
          name: string
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      team_pokemon: {
        Row: {
          id: number
          pokemon_id: number | null
          position: number | null
          team_id: number | null
        }
        Insert: {
          id?: number
          pokemon_id?: number | null
          position?: number | null
          team_id?: number | null
        }
        Update: {
          id?: number
          pokemon_id?: number | null
          position?: number | null
          team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team_pokemon_pokemon_id_fkey"
            columns: ["pokemon_id"]
            isOneToOne: false
            referencedRelation: "pokemon"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_pokemon_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: number
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          username?: string
        }
        Relationships: []
      }
      weakness: {
        Row: {
          factor: number
          id: number
          type1: number
          type2: number | null
        }
        Insert: {
          factor: number
          id?: number
          type1: number
          type2?: number | null
        }
        Update: {
          factor?: number
          id?: number
          type1?: number
          type2?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "weakness_type1_fkey"
            columns: ["type1"]
            isOneToOne: false
            referencedRelation: "pokemon_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weakness_type2_fkey"
            columns: ["type2"]
            isOneToOne: false
            referencedRelation: "pokemon_type"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
