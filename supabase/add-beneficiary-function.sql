-- Function to add a beneficiary (bypasses RLS)
CREATE OR REPLACE FUNCTION public.add_beneficiary(
    p_name TEXT,
    p_program_type TEXT,
    p_enrolled_date DATE,
    p_status TEXT DEFAULT 'active'
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_org_id UUID;
    v_beneficiary_id UUID;
    v_result JSON;
BEGIN
    -- Get the user's organization_id
    SELECT organization_id INTO v_org_id
    FROM public.users
    WHERE id = auth.uid()
    LIMIT 1;
    
    IF v_org_id IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Organization not found'
        );
    END IF;
    
    -- Insert the beneficiary
    INSERT INTO public.beneficiaries (
        organization_id,
        name,
        program_type,
        enrolled_date,
        status
    ) VALUES (
        v_org_id,
        p_name,
        p_program_type,
        p_enrolled_date,
        p_status::beneficiary_status
    )
    RETURNING id INTO v_beneficiary_id;
    
    -- Return success with the beneficiary_id
    v_result := json_build_object(
        'success', true,
        'beneficiary_id', v_beneficiary_id
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.add_beneficiary(TEXT, TEXT, DATE, TEXT) TO authenticated;

