import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { AlertCircle, CheckCircle, Clock, FileText, Upload } from 'lucide-react'
import { PaymentUpload } from './payment-upload'

export default async function StudentDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: student } = await supabase
        .from('students')
        .select('status, nisn')
        .eq('id', user.id)
        .single()

    const status = student?.status || 'draft'

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'draft':
                return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">Draft (Belum Submit)</span>
            case 'pending_verification':
                return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Menunggu Verifikasi Data</span>
            case 'awaiting_payment':
                return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Menunggu Pembayaran</span>
            case 'payment_review':
                return <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Pembayaran Sedang Di-review</span>
            case 'accepted':
                return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Diterima</span>
            case 'rejected':
                return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">Data Ditolak</span>
            default:
                return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{status}</span>
        }
    }

    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Status Pendaftaran</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Pantau proses penerimaan Anda di sini.</p>
                    </div>
                    <div>
                        {getStatusBadge(status)}
                    </div>
                </div>
            </div>

            {status === 'draft' && (
                <div className="bg-blue-50 border-l-4 border-primary p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                Data Anda belum lengkap. Silakan lengkapi formulir pendaftaran untuk melanjutkan ke tahap verifikasi.
                            </p>
                            <div className="mt-4">
                                <Link
                                    href="/student/registration"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    <FileText className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                                    Lengkapi Formulir
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {status === 'awaiting_payment' && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <Upload className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">Data Terverifikasi</h3>
                            <div className="mt-2 text-sm text-green-700">
                                <p>Silakan lakukan pembayaran biaya pendaftaran ke Rekening <strong>BCA 1234567890 a.n SMK Azzahra</strong> sebesar <strong>Rp 150.000</strong>.</p>
                                <p className="mt-2">Setelah transfer, upload bukti pembayaran Anda.</p>
                            </div>
                            <div className="mt-4">
                                <PaymentUpload studentId={user.id} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {status === 'accepted' && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-lg font-medium text-green-800">Selamat! Anda Diterima.</h3>
                            <div className="mt-2 text-sm text-green-700">
                                <p>Selamat bergabung menjadi keluarga besar SMK Azzahra Sepatan. Silakan lakukan daftar ulang pada tanggal yang ditentukan.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
