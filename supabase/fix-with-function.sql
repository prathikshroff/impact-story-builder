-- ============================================================
-- FINAL FIX: Use a database function to handle signup
-- This bypasses RLS entirely for the signup process
-- ============================================================

-- Step 1: Create a database function that handles the entire signup
CREATE OR REPLACE FUNCTION public.handle_new_user_signup(
    p_user_id UUID,
    p_organization_name TEXT,
    p_full_name TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER  -- This makes the function run with elevated privileges
SET search_path = public
AS $$
DECLARE
    v_org_id UUID;
    v_result JSON;
BEGIN
    -- Create the organization
    INSERT INTO public.organizations (name)
    VALUES (p_organization_name)
    RETURNING id INTO v_org_id;
    
    -- Create the user profile
    INSERT INTO public.users (id, organization_id, role, full_name)
    VALUES (p_user_id, v_org_id, 'admin', p_full_name);
    
    -- Return success with the org_id
    v_result := json_build_object(
        'success', true,
        'organization_id', v_org_id
    );
    
    RETURN v_result;
    
EXCEPTION WHEN OTHERS THEN
    -- Return error details
    RETURN json_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$$;

-- Step 2: Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.handle_new_user_signup(UUID, TEXT, TEXT) TO authenticated;

-- Step 3: Simplify RLS policies (keep them simple, function bypasses them anyway)

-- Organizations policies
DROP POLICY IF EXISTS "Users can view their own organization" ON organizations;
DROP POLICY IF EXISTS "Admins can update their organization" ON organizations;
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view their organization" ON organizations;

CREATE POLICY "Users can view their organization"
    ON organizations FOR SELECT
    USING (
        id IN (SELECT organization_id FROM users WHERE id = auth.uid())
    );

CREATE POLICY "Admins can update their organization"
    ON organizations FOR UPDATE
    USING (
        id IN (
            SELECT organization_id FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Users policies
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can view org members" ON users;
DROP POLICY IF EXISTS "Users can view users in their organization" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
DROP POLICY IF EXISTS "Admins can insert other users" ON users;
DROP POLICY IF EXISTS "Admins can insert users in their organization" ON users;

CREATE POLICY "Users can view their own profile"
    ON users FOR SELECT
    USING (id = auth.uid());

CREATE POLICY "Users can view org members"
    ON users FOR SELECT
    USING (
        organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid())
    );

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (id = auth.uid());

