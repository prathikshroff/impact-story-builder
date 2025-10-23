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

  // Get form data
  const name = formData.get('name') as string
  const programType = formData.get('programType') as string
  const enrolledDate = formData.get('enrolledDate') as string
  const status = formData.get('status') as string || 'active'

  // Validate inputs
  if (!name || !programType || !enrolledDate) {
    return { error: 'Name, program type, and enrolled date are required' }
  }

  // Use database function to add beneficiary (bypasses RLS)
  const { data: result, error: addError } = await supabase.rpc('add_beneficiary', {
    p_name: name,
    p_program_type: programType,
    p_enrolled_date: enrolledDate,
    p_status: status,
  })

  if (addError) {
    console.error('Error calling add_beneficiary:', addError)
    return { error: 'Failed to add beneficiary. Please try again.' }
  }

  if (!result || !result.success) {
    console.error('add_beneficiary returned error:', result)
    return { error: result?.error || 'Failed to add beneficiary' }
  }

  // Revalidate the page to show new data
  revalidatePath('/beneficiaries')

  return { success: true }
}

