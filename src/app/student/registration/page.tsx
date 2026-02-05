import { createClient } from '@/utils/supabase/server'
import RegistrationForm from './form'

export default async function RegistrationPage() {
    const supabase = await createClient()

    // Fetch majors
    const { data: majors } = await supabase.from('majors').select('*')

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Lengkapi Data Pendaftaran</h1>
            <RegistrationForm majors={majors || []} />
        </div>
    )
}
