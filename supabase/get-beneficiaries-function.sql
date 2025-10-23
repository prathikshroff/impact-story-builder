-- Function to get beneficiaries for the current user's organization (bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_beneficiaries()
RETURNS TABLE (
    id UUID,
    organization_id UUID,
    name TEXT,
    program_type TEXT,
    enrolled_date DATE,
    status beneficiary_status,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_org_id UUID;
BEGIN
    -- Get the user's organization_id
    SELECT u.organization_id INTO v_org_id
    FROM public.users u
    WHERE u.id = auth.uid()
    LIMIT 1;
    
    -- Return beneficiaries for this organization
    RETURN QUERY
    SELECT 
        b.id,
        b.organization_id,
        b.name,
        b.program_type,
        b.enrolled_date,
        b.status,
        b.created_at,
        b.updated_at
    FROM public.beneficiaries b
    WHERE b.organization_id = v_org_id
    ORDER BY b.created_at DESC;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_beneficiaries() TO authenticated;

