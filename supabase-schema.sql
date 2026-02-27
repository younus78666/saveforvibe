-- ============================================
-- SaveForVibe Database Schema
-- Run this in Supabase → SQL Editor
-- ============================================

-- 1. PROFILES TABLE
-- Stores user profile data linked to auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  plan TEXT DEFAULT 'free',
  credits INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. WORKFLOWS TABLE
-- Stores user workflow progress and project details
CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  project_type TEXT NOT NULL,
  project_name TEXT NOT NULL,
  answers JSONB DEFAULT '{}',
  current_step INTEGER DEFAULT 1,
  total_steps INTEGER DEFAULT 9,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. AUTO-CREATE PROFILE TRIGGER
-- Automatically creates a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, plan, credits, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'free',
    5,
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run the function on new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only select their own row
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Profiles: Users can only update their own row
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Enable RLS on workflows table
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

-- Workflows: Users can only select their own rows
CREATE POLICY "Users can view own workflows"
  ON workflows FOR SELECT
  USING (auth.uid() = user_id);

-- Workflows: Users can only insert their own rows
CREATE POLICY "Users can create own workflows"
  ON workflows FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Workflows: Users can only update their own rows
CREATE POLICY "Users can update own workflows"
  ON workflows FOR UPDATE
  USING (auth.uid() = user_id);

-- Workflows: Users can only delete their own rows
CREATE POLICY "Users can delete own workflows"
  ON workflows FOR DELETE
  USING (auth.uid() = user_id);

-- 5. INDEXES
-- Index on profiles.id (already primary key, but explicit for clarity)
CREATE INDEX IF NOT EXISTS idx_profiles_id ON profiles(id);

-- Index on workflows.user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);

-- Index on workflows.created_at for sorting
CREATE INDEX IF NOT EXISTS idx_workflows_created_at ON workflows(created_at DESC);

-- ============================================
-- END OF SCHEMA
-- ============================================
