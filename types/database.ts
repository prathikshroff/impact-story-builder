export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          mission: string | null
          focus_areas: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          mission?: string | null
          focus_areas?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          mission?: string | null
          focus_areas?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          organization_id: string
          role: 'admin' | 'staff' | 'volunteer'
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          organization_id: string
          role?: 'admin' | 'staff' | 'volunteer'
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          role?: 'admin' | 'staff' | 'volunteer'
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      beneficiaries: {
        Row: {
          id: string
          organization_id: string
          name: string
          program_type: string
          enrolled_date: string
          demographics: Json | null
          status: 'active' | 'graduated' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          program_type: string
          enrolled_date: string
          demographics?: Json | null
          status?: 'active' | 'graduated' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          program_type?: string
          enrolled_date?: string
          demographics?: Json | null
          status?: 'active' | 'graduated' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      story_updates: {
        Row: {
          id: string
          beneficiary_id: string
          date: string
          photo_url: string | null
          notes: string
          metrics: Json | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          beneficiary_id: string
          date: string
          photo_url?: string | null
          notes: string
          metrics?: Json | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          beneficiary_id?: string
          date?: string
          photo_url?: string | null
          notes?: string
          metrics?: Json | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          organization_id: string
          title: string
          report_type: 'donor' | 'grant' | 'board' | 'social'
          content: Json
          generated_at: string
          generated_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          title: string
          report_type: 'donor' | 'grant' | 'board' | 'social'
          content: Json
          generated_at?: string
          generated_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          title?: string
          report_type?: 'donor' | 'grant' | 'board' | 'social'
          content?: Json
          generated_at?: string
          generated_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'admin' | 'staff' | 'volunteer'
      beneficiary_status: 'active' | 'graduated' | 'inactive'
      report_type: 'donor' | 'grant' | 'board' | 'social'
    }
  }
}

