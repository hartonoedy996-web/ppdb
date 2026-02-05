-- 1. Modify Students Table to be Independent
-- Drop the foreign key to users/auth
ALTER TABLE public.students DROP CONSTRAINT IF EXISTS students_id_fkey;

-- Make ID auto-generate if not provided (for new direct inserts)
ALTER TABLE public.students ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Add 'users' columns directly to 'students' since we are removing the link
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS email TEXT;
-- We keep 'nisn' and 'phone' as they are already there.

-- 2. Update RLS Policies to be Public
-- Drop old policies
DROP POLICY IF EXISTS "Students can view and update their own data" ON students;
DROP POLICY IF EXISTS "Admins can view and update all students" ON students;

-- Allow anyone to INSERT (Public Registration)
CREATE POLICY "Public can register students" ON students
FOR INSERT WITH CHECK (true);

-- Allow anyone to VIEW/UPDATE/SELECT based on ID (In a real app this is insecure, but for "No Auth" requirement it's standard)
-- Ideally we would restrict this, but let's make it open for now as requested.
CREATE POLICY "Public can view/edit students" ON students
FOR ALL USING (true);

-- 3. Modify Payments for Public Access
DROP POLICY IF EXISTS "Students can view their own payments" ON payments;
DROP POLICY IF EXISTS "Students can insert their own payments" ON payments;

CREATE POLICY "Public access to payments" ON payments
FOR ALL USING (true);
