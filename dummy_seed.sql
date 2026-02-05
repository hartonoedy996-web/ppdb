-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Create ADMIN Account
-- email_confirmed_at = now() forces the account to be active immediately without email verification.
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'srtcreativedesign@gmail.com',
  crypt('password123', gen_salt('bf')),
  now(), -- <--- This confirms the email immediately!
  '{"provider":"email","providers":["email"]}',
  '{"full_name": "Admin Utama", "role": "admin"}',
  now(),
  now()
);

-- 2. Create STUDENT Account
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'siswa@sekolah.com',
  crypt('password123', gen_salt('bf')),
  now(), -- <--- This confirms the email immediately!
  '{"provider":"email","providers":["email"]}',
  '{"full_name": "Budi Santoso", "role": "student", "nisn": "0012345678", "phone": "081234567890"}',
  now(),
  now()
);
