'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addBeneficiary(prevState: any, formData: FormData) {
  const supabase = await createServerSupabaseClient()
  
  if (!supabase) {
    return { error: 'Supabase is not configured' }
  }

  // Get current user's organization
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Get user's organization_id
  const { data: userProfile } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (!userProfile?.organization_id) {
    return { error: 'Organization not found' }
  }

  // Get form data
  const name = formData.get('name') as string
  const programType = formData.get('programType') as string
  const enrolledDate = formData.get('enrolledDate') as string
  const status = formData.get('status') as string

  // Validate inputs
  if (!name || !programType || !enrolledDate) {
    return { error: 'Name, program type, and enrolled date are required' }
  }

  // Insert beneficiary
  const { error } = await supabase
    .from('beneficiaries')
    .insert({
      organization_id: userProfile.organization_id,
      name,
      program_type: programType,
      enrolled_date: enrolledDate,
      status: status || 'active',
    })

  if (error) {
    console.error('Error adding beneficiary:', error)
    return { error: 'Failed to add beneficiary' }
  }

  // Revalidate the page to show new data
  revalidatePath('/beneficiaries')

  return { success: true }
}

