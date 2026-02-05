# Role
Act as a Senior Full Stack Developer. You are an expert in [Pilih Stack Anda: Laravel/Filament/Livewire OR Next.js/Supabase/Tailwind].

# Project Goal
Build a "New Student Admission System" (PPDB) for a vocational school named "SMK Azzahra Sepatan". The system must manage the registration workflow from landing page, student data entry, administration verification, payment, to final acceptance status.

# Core Tech Stack
- Frontend + Backend: next.js+tailwindcss
- Database: supabase

# Detailed Features & Flow Requirements

## 2. Authentication & Role Management
- **Roles:**
  - `admin`: Full access to manage students, approvals, and payments.
  - `student`: Access to fill forms, view status, and upload payment proof.
- **Login Page:** Single login portal that detects role or separate tabs for Admin/Student.

## 3. Student Registration Flow (The Critical Path)
The user requested a specific flow: "Biodata Fill -> Account Creation".
- **Step 1 (Pre-Auth):** User clicks "Daftar". Show a form to collect initial basic biodata (Name, NISN, Email, Phone).
- **Step 2 (Account Creation):** After basic data is valid, ask user to create a Password to finalize account creation.
- **Step 3 (Post-Login Wizard):** Once logged in, the student status is `DRAFT`. They must complete a multi-step form:
  - **Personal Data:** Full biodata (Address, DOB, Gender, Religion, etc.).
  - **School Origin:** Previous school name, graduation year, average score.
  - **Major Selection:** Dropdown to select desired major (Jurusan).
- **Step 4 (Submission):** Student locks the data for Admin review. Status changes to `PENDING_VERIFICATION`.

## 4. Admin Verification & Payment Logic
- **Admin Dashboard:**
  - Table showing all registered students with statuses.
  - Action: "View Details" to see student data.
  - Action: "Approve Data" or "Reject Data".
- **Payment Trigger:**
  - IF Admin approves data -> Student status becomes `AWAITING_PAYMENT`.
  - Student Dashboard updates: Shows "Data Verified. Please proceed to payment" with bank details and an upload form for transfer proof.
- **Final Validation:**
  - Student uploads proof -> Status `PAYMENT_REVIEW`.
  - Admin checks proof -> Clicks "Confirm Payment".
  - Status becomes `ACCEPTED` (Diterima) or `REJECTED` (Ditolak) based on final decision (or separate logic for academic filtering).

## 5. Student Dashboard (Status Checker)
- The dashboard must prominently display the current status using color-coded badges:
  - Draft (Grey)
  - Pending Verification (Yellow)
  - Data Rejected (Red - with reason)
  - Awaiting Payment (Blue)
  - Payment Review (Purple)
  - Accepted (Green) / Rejected (Red)

# Database Schema Guidance (Draft)
- `users`: id, name, email, password, role (enum: admin, student).
- `students`: user_id, nisn, phone, address, gender, dob, school_origin, graduation_year, selected_major_id, status (enum described above).
- `majors`: id, name, quota.
- `payments`: student_id, amount, proof_image_url, status, admin_note.

# UI/UX Constraints
- Use a clean, academic, and professional color scheme (Blue/White/Gold).
- Ensure the forms are responsive (mobile-friendly).
- Use SweetAlert or Toasts for success/error notifications.

supabase password: Ppdb2026!@#