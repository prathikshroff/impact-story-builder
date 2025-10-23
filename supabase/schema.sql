-- Impact Story Builder Database Schema
-- This file contains all the tables, types, and RLS policies for the application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'staff', 'volunteer');
CREATE TYPE beneficiary_status AS ENUM ('active', 'graduated', 'inactive');
CREATE TYPE report_type AS ENUM ('donor', 'grant', 'board', 'social');

-- =====================================================
-- ORGANIZATIONS TABLE
-- =====================================================
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    mission TEXT,
    focus_areas TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- USERS TABLE (extends Supabase auth.users)
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    role user_role DEFAULT 'staff',
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BENEFICIARIES TABLE
-- =====================================================
CREATE TABLE beneficiaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    program_type TEXT NOT NULL,
    enrolled_date DATE NOT NULL,
    demographics JSONB,
    status beneficiary_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- STORY UPDATES TABLE
-- =====================================================
CREATE TABLE story_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    beneficiary_id UUID NOT NULL REFERENCES beneficiaries(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    photo_url TEXT,
    notes TEXT NOT NULL,
    metrics JSONB,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- REPORTS TABLE
-- =====================================================
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    report_type report_type NOT NULL,
    content JSONB NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    generated_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES for better query performance
-- =====================================================
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_beneficiaries_organization ON beneficiaries(organization_id);
CREATE INDEX idx_beneficiaries_status ON beneficiaries(status);
CREATE INDEX idx_story_updates_beneficiary ON story_updates(beneficiary_id);
CREATE INDEX idx_story_updates_date ON story_updates(date DESC);
CREATE INDEX idx_reports_organization ON reports(organization_id);
CREATE INDEX idx_reports_type ON reports(report_type);

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_beneficiaries_updated_at BEFORE UPDATE ON beneficiaries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_story_updates_updated_at BEFORE UPDATE ON story_updates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Organizations Policies
CREATE POLICY "Users can view their own organization"
    ON organizations FOR SELECT
    USING (id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Admins can update their organization"
    ON organizations FOR UPDATE
    USING (
        id IN (
            SELECT organization_id FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Users Policies
CREATE POLICY "Users can view users in their organization"
    ON users FOR SELECT
    USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (id = auth.uid());

-- Allow users to insert their own profile during signup
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

-- Beneficiaries Policies
CREATE POLICY "Users can view beneficiaries in their organization"
    ON beneficiaries FOR SELECT
    USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Staff and admins can insert beneficiaries"
    ON beneficiaries FOR INSERT
    WITH CHECK (
        organization_id IN (
            SELECT organization_id FROM users 
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Staff and admins can update beneficiaries"
    ON beneficiaries FOR UPDATE
    USING (
        organization_id IN (
            SELECT organization_id FROM users 
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Admins can delete beneficiaries"
    ON beneficiaries FOR DELETE
    USING (
        organization_id IN (
            SELECT organization_id FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Story Updates Policies
CREATE POLICY "Users can view story updates in their organization"
    ON story_updates FOR SELECT
    USING (
        beneficiary_id IN (
            SELECT id FROM beneficiaries 
            WHERE organization_id IN (
                SELECT organization_id FROM users WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can insert story updates"
    ON story_updates FOR INSERT
    WITH CHECK (
        beneficiary_id IN (
            SELECT id FROM beneficiaries 
            WHERE organization_id IN (
                SELECT organization_id FROM users WHERE id = auth.uid()
            )
        )
        AND created_by = auth.uid()
    );

CREATE POLICY "Users can update their own story updates"
    ON story_updates FOR UPDATE
    USING (created_by = auth.uid());

CREATE POLICY "Admins can delete story updates"
    ON story_updates FOR DELETE
    USING (
        beneficiary_id IN (
            SELECT id FROM beneficiaries 
            WHERE organization_id IN (
                SELECT organization_id FROM users 
                WHERE id = auth.uid() AND role = 'admin'
            )
        )
    );

-- Reports Policies
CREATE POLICY "Users can view reports in their organization"
    ON reports FOR SELECT
    USING (organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can insert reports"
    ON reports FOR INSERT
    WITH CHECK (
        organization_id IN (SELECT organization_id FROM users WHERE id = auth.uid())
        AND generated_by = auth.uid()
    );

CREATE POLICY "Users can update their own reports"
    ON reports FOR UPDATE
    USING (generated_by = auth.uid());

CREATE POLICY "Admins can delete reports"
    ON reports FOR DELETE
    USING (
        organization_id IN (
            SELECT organization_id FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =====================================================
-- STORAGE BUCKETS (for photos)
-- =====================================================
-- Note: Run these commands in Supabase Storage section, not in SQL Editor

-- Create storage bucket for story photos
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('story-photos', 'story-photos', true);

-- Storage policies for story-photos bucket
-- CREATE POLICY "Users can upload photos to their organization"
--     ON storage.objects FOR INSERT
--     WITH CHECK (
--         bucket_id = 'story-photos'
--         AND auth.uid() IN (SELECT id FROM users)
--     );

-- CREATE POLICY "Users can view photos from their organization"
--     ON storage.objects FOR SELECT
--     USING (bucket_id = 'story-photos');

-- CREATE POLICY "Users can update their own photos"
--     ON storage.objects FOR UPDATE
--     USING (bucket_id = 'story-photos' AND owner = auth.uid());

-- CREATE POLICY "Users can delete their own photos"
--     ON storage.objects FOR DELETE
--     USING (bucket_id = 'story-photos' AND owner = auth.uid());

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get organization stats
CREATE OR REPLACE FUNCTION get_organization_stats(org_id UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_beneficiaries', (
            SELECT COUNT(*) FROM beneficiaries 
            WHERE organization_id = org_id
        ),
        'active_beneficiaries', (
            SELECT COUNT(*) FROM beneficiaries 
            WHERE organization_id = org_id AND status = 'active'
        ),
        'total_updates', (
            SELECT COUNT(*) FROM story_updates su
            JOIN beneficiaries b ON su.beneficiary_id = b.id
            WHERE b.organization_id = org_id
        ),
        'total_reports', (
            SELECT COUNT(*) FROM reports 
            WHERE organization_id = org_id
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a new organization with admin user
CREATE OR REPLACE FUNCTION create_organization_with_admin(
    org_name TEXT,
    org_mission TEXT,
    user_full_name TEXT
)
RETURNS UUID AS $$
DECLARE
    new_org_id UUID;
BEGIN
    -- Insert organization
    INSERT INTO organizations (name, mission)
    VALUES (org_name, org_mission)
    RETURNING id INTO new_org_id;
    
    -- Insert user as admin
    INSERT INTO users (id, organization_id, role, full_name)
    VALUES (auth.uid(), new_org_id, 'admin', user_full_name);
    
    RETURN new_org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Uncomment the following to insert sample data for testing

-- INSERT INTO organizations (id, name, mission) VALUES
-- ('00000000-0000-0000-0000-000000000001', 'Hope Foundation', 'Empowering youth through education and mentorship');

-- Note: You'll need to create a user in Supabase Auth first, then insert into users table with that user's ID

