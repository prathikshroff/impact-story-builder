'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signUp(prevState: any, formData: FormData) {
  const supabase = await createServerSupabaseClient()
  
  if (!supabase) {
    return { error: 'Supabase is not configured' }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const fullName = formData.get('fullName') as string
  const organizationName = formData.get('organizationName') as string

  // Validate inputs
  if (!email || !password || !confirmPassword || !fullName || !organizationName) {
    return { error: 'All fields are required' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  // Get the origin for the callback URL
  const headersList = await headers()
  const origin = headersList.get('origin') || 'http://localhost:3000'

  // Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName,
        organization_name: organizationName,
      },
    },
  })

  if (authError) {
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: 'Failed to create user' }
  }

  // Use database function to create organization and user profile
  // This bypasses RLS and prevents infinite recursion
  const { data: signupResult, error: signupError } = await supabase.rpc(
    'handle_new_user_signup',
    {
      p_user_id: authData.user.id,
      p_organization_name: organizationName,
      p_full_name: fullName,
    }
  )

  if (signupError) {
    console.error('Error during signup:', signupError)
    return { error: 'Failed to complete signup' }
  }

  if (!signupResult || !signupResult.success) {
    console.error('Signup function returned error:', signupResult)
    return { error: signupResult?.error || 'Failed to complete signup' }
  }

  // Redirect to dashboard
  redirect('/dashboard')
}

export async function signIn(prevState: any, formData: FormData) {
  const supabase = await createServerSupabaseClient()
  
  if (!supabase) {
    return { error: 'Supabase is not configured' }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validate inputs
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  // Sign in the user
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Redirect to dashboard
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createServerSupabaseClient()
  
  if (!supabase) {
    return { error: 'Supabase is not configured' }
  }

  await supabase.auth.signOut()
  redirect('/')
}

