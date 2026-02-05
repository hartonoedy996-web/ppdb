'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function submitRegistration(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Not authenticated')

    const address = formData.get('address') as string
    const gender = formData.get('gender') as string
    const dob = formData.get('dob') as string
    const schoolOrigin = formData.get('schoolOrigin') as string
    const graduationYear = formData.get('graduationYear') as string
    const averageScore = formData.get('averageScore') as string
    const selectedMajorId = formData.get('selectedMajorId') as string

    const { error } = await supabase
        .from('students')
        .upsert({
            id: user.id,
            address,
            gender,
            dob,
            school_origin: schoolOrigin,
            graduation_year: parseInt(graduationYear),
            average_score: parseFloat(averageScore),
            selected_major_id: parseInt(selectedMajorId),
            status: 'pending_verification',
            updated_at: new Date().toISOString(),
        })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/student/dashboard')
    redirect('/student/dashboard')
}

export async function uploadPaymentProof(formData: FormData) {
    // Placeholder for payment upload logic
}
