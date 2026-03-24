-- SUPABASE SCHEMA FOR EDITORS ROOM AGENCY

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    display_id TEXT NOT NULL, -- e.g., '01', '02'
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    year TEXT NOT NULL,
    description TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT NOT NULL,
    image_url TEXT NOT NULL,
    linkedin_url TEXT,
    twitter_url TEXT,
    github_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    content TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'Target',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- POLICIES

-- Projects: Public Read, Admin Write
DROP POLICY IF EXISTS "Allow public read access on projects" ON projects;
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin write access on projects" ON projects;
CREATE POLICY "Allow admin write access on projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Team Members: Public Read, Admin Write
DROP POLICY IF EXISTS "Allow public read access on team_members" ON team_members;
CREATE POLICY "Allow public read access on team_members" ON team_members FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin write access on team_members" ON team_members;
CREATE POLICY "Allow admin write access on team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials: Public Read, Admin Write
DROP POLICY IF EXISTS "Allow public read access on testimonials" ON testimonials;
CREATE POLICY "Allow public read access on testimonials" ON testimonials FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin write access on testimonials" ON testimonials;
CREATE POLICY "Allow admin write access on testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- Services: Public Read, Admin Write
DROP POLICY IF EXISTS "Allow public read access on services" ON services;
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin write access on services" ON services;
CREATE POLICY "Allow admin write access on services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- INDEXES FOR OPTIMIZATION
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_team_sort ON team_members(sort_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_sort ON testimonials(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_sort ON services(sort_order);

-- 4. STORAGE BUCKETS SETUP
-- Note: These require the 'storage' extension to be enabled (default in Supabase)

INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('projects', 'projects', true),
  ('team', 'team', true),
  ('testimonials', 'testimonials', true),
  ('blog', 'blog', true)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES (Allow public read, admin write)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id IN ('projects', 'team', 'testimonials', 'blog') );
DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id IN ('projects', 'team', 'testimonials', 'blog') AND auth.role() = 'authenticated' );
DROP POLICY IF EXISTS "Admin Update" ON storage.objects;
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING ( bucket_id IN ('projects', 'team', 'testimonials', 'blog') AND auth.role() = 'authenticated' );
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING ( bucket_id IN ('projects', 'team', 'testimonials', 'blog') AND auth.role() = 'authenticated' );
