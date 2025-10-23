-- Complete fix for RLS infinite recursion issues (Version 2)
-- This version uses public schema instead of auth schema

-- ==================================================
-- STEP 1: Drop all existing policies on users table
-- ==================================================
DROP POLICY IF EXISTS "Users can view users in their organization" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
DROP POLICY IF EXISTS "Admins can insert users in their organization" ON users;

-- ==================================================
-- STEP 2: Create a helper function in public schema
-- This function runs with SECURITY DEFINER to bypass RLS
-- ==================================================
CREATE OR REPLACE FUNCTION public.get_user_organization_id()
RETURNS UUID
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT organization_id FROM public.users WHERE id = auth.uid() LIMIT 1;
$$;

-- ==================================================
-- STEP 3: Create new policies that don't cause recursion
-- ==================================================

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile"
    ON users FOR SELECT
    USING (id = auth.uid());

-- Allow users to view other users in their organization
CREATE POLICY "Users can view org members"
    ON users FOR SELECT
    USING (organization_id = public.get_user_organization_id());

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (id = auth.uid());

-- Allow users to insert their own profile (for signup)
CREATE POLICY "Users can insert their own profile"
    ON users FOR INSERT
    WITH CHECK (id = auth.uid());

-- Allow admins to insert users in their organization (for inviting team members)
CREATE POLICY "Admins can insert users in their organization"
    ON users FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
            AND users.organization_id = organization_id
        )
    );

