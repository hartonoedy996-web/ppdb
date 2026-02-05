import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft, Check, X, CreditCard } from 'lucide-react'
import { verifyData, confirmPayment } from '../../actions'

export default async function StudentDetail({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    const { data: student } = await supabase
        .from('students')
        .select(`
        *,
        users (full_name, email, role),
        majors (name)
    `)
        .eq('id', id)
        .single()

    const { data: payment } = await supabase
        .from('payments')
        .select('*')
        .eq('student_id', id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    if (!student) {
        return <div>Student not found</div>
    }

    const approveData = verifyData.bind(null, id, 'approved')
    const rejectData = verifyData.bind(null, id, 'rejected')
    const acceptPayment = confirmPayment.bind(null, id, 'accepted')
    const rejectPayment = confirmPayment.bind(null, id, 'rejected')

    return (
        <div className="px-4 sm:px-0">
            <div className="mb-6 flex items-center">
                <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-2xl font-semibold text-gray-900">Detail Pendaftar</h1>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Informasi Siswa</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Detail lengkap pendaftaran dan status.</p>
                    </div>
                    <div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${student.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                student.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                    student.status === 'awaiting_payment' ? 'bg-blue-100 text-blue-800' :
                                        student.status === 'pending_verification' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'}`}>
                            {student.status.replace('_', ' ').toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.users?.full_name}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.users?.email}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">NISN</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.nisn}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">No. Telepon</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.phone}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Jurusan Pilihan</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.majors?.name}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Sekolah Asal</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.school_origin} ({student.graduation_year})</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Nilai Rata-rata</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.average_score}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            {/* Actions Section */}
            <div className="mt-6 flex space-x-4">
                {student.status === 'pending_verification' && (
                    <>
                        <form action={approveData}>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <Check className="mr-2 -ml-1 h-5 w-5" /> Verifikasi & Terima Data
                            </button>
                        </form>
                        <form action={rejectData}>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                <X className="mr-2 -ml-1 h-5 w-5" /> Tolak Data
                            </button>
                        </form>
                    </>
                )}
            </div>

            {payment && (
                <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Bukti Pembayaran</h3>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Nominal Transfer</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Rp {payment.amount?.toLocaleString()}</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Status Pembayaran</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{payment.status}</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Lampiran</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={payment.proof_image_url} alt="Bukti Transfer" className="h-64 object-contain border rounded-md" />
                                </dd>
                            </div>
                        </dl>
                        <div className="bg-gray-50 px-4 py-4 sm:px-6 flex space-x-4">
                            {student.status === 'payment_review' && (
                                <>
                                    <form action={acceptPayment}>
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            <CreditCard className="mr-2 -ml-1 h-5 w-5" /> Konfirmasi Pembayaran
                                        </button>
                                    </form>
                                    <form action={rejectPayment}>
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                            <X className="mr-2 -ml-1 h-5 w-5" /> Tolak Pembayaran
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
