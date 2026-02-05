-- Drop Triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop Tables (Order matters due to foreign keys)
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS users; -- This was our custom users table, not auth.users
DROP TABLE IF EXISTS majors;

-- Drop Types
DROP TYPE IF EXISTS student_status;
DROP TYPE IF EXISTS app_role;
