'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function PaymentUpload({ studentId }: { studentId: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleUpload = async () => {
        setLoading(true)

        // Simulate upload - In real app, upload file to Storage bucket 'payments'
        // const { data, error } = await supabase.storage.from('payments').upload(...)

        // For now, just update status and dummy URL
        const { error } = await supabase
            .from('payments')
            .insert({
                student_id: studentId,
                amount: 150000,
                status: 'pending',
                proof_image_url: 'https://placehold.co/400x600?text=Bukti+Transfer' // Dummy
            })

        if (!error) {
            await supabase.from('students').update({ status: 'payment_review' }).eq('id', studentId)
            router.refresh()
        } else {
            alert('Gagal mengupload bukti: ' + error.message)
        }

        setLoading(false)
    }

    return (
        <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Simulasi Upload (Fungsi Upload Asli Butuh Storage Bucket)</p>
            <button
                onClick={handleUpload}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
                <Upload className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                {loading ? 'Mengupload...' : 'Simulasi Upload Bukti Bayar'}
            </button>
        </div>
    )
}
