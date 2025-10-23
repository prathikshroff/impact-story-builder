import { Database } from './database'

// Type aliases for easier usage
export type Organization = Database['public']['Tables']['organizations']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type Beneficiary = Database['public']['Tables']['beneficiaries']['Row']
export type StoryUpdate = Database['public']['Tables']['story_updates']['Row']
export type Report = Database['public']['Tables']['reports']['Row']

// Insert types
export type OrganizationInsert = Database['public']['Tables']['organizations']['Insert']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type BeneficiaryInsert = Database['public']['Tables']['beneficiaries']['Insert']
export type StoryUpdateInsert = Database['public']['Tables']['story_updates']['Insert']
export type ReportInsert = Database['public']['Tables']['reports']['Insert']

// Update types
export type OrganizationUpdate = Database['public']['Tables']['organizations']['Update']
export type UserUpdate = Database['public']['Tables']['users']['Update']
export type BeneficiaryUpdate = Database['public']['Tables']['beneficiaries']['Update']
export type StoryUpdateUpdate = Database['public']['Tables']['story_updates']['Update']
export type ReportUpdate = Database['public']['Tables']['reports']['Update']

// Enum types
export type UserRole = Database['public']['Enums']['user_role']
export type BeneficiaryStatus = Database['public']['Enums']['beneficiary_status']
export type ReportType = Database['public']['Enums']['report_type']

// Custom types for metrics
export interface Metrics {
  [key: string]: string | number | boolean
}

// Extended types with relations
export interface BeneficiaryWithUpdates extends Beneficiary {
  story_updates?: StoryUpdate[]
}

export interface StoryUpdateWithBeneficiary extends StoryUpdate {
  beneficiary?: Beneficiary
}

