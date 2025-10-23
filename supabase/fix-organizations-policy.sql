-- Fix organizations table RLS policy to allow signup
-- This allows authenticated users to create their own organization during signup

-- Drop existing INSERT policies
DROP POLICY IF EXISTS "Users can create organizations" ON organizations;
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON organizations;

-- Create a policy that allows any authenticated user to create an organization
CREATE POLICY "Authenticated users can create organizations"
    ON organizations FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- The existing SELECT and UPDATE policies should remain as they are
-- (Users can view and admins can update their own organization)

