'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function verifyData(studentId: string, status: 'approved' | 'rejected') {
    const supabase = await createClient()

    if (status === 'approved') {
        await supabase.from('students').update({ status: 'awaiting_payment' }).eq('id', studentId)
    } else {
        await supabase.from('students').update({ status: 'rejected' }).eq('id', studentId)
    }

    revalidatePath('/admin/student/[id]', 'page')
    revalidatePath('/admin/dashboard')
}

export async function confirmPayment(studentId: string, status: 'accepted' | 'rejected') {
    const supabase = await createClient()

    if (status === 'accepted') {
        await supabase.from('students').update({ status: 'accepted' }).eq('id', studentId)
        await supabase.from('payments').update({ status: 'confirmed' }).eq('student_id', studentId)
    } else {
        await supabase.from('payments').update({ status: 'rejected' }).eq('student_id', studentId)
    }

    revalidatePath('/admin/student/[id]', 'page')
    revalidatePath('/admin/dashboard')
}
