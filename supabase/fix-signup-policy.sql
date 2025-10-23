-- Fix for infinite recursion during signup
-- This allows users to insert their own profile during signup

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Admins can insert users in their organization" ON users;

-- Add a policy that allows users to insert their own profile
CREATE POLICY "Users can insert their own profile"
    ON users FOR INSERT
    WITH CHECK (id = auth.uid());

-- Add a policy that allows admins to invite other users
CREATE POLICY "Admins can insert users in their organization"
    ON users FOR INSERT
    WITH CHECK (
        -- Allow if the authenticated user is an admin in the same organization
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
            AND users.organization_id = organization_id
        )
    );

