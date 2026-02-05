import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Eye } from 'lucide-react'

export default async function AdminDashboard() {
    const supabase = await createClient()

    const { data: students } = await supabase
        .from('students')
        .select(`
        *,
        users (full_name, email),
        majors (name)
    `)
        .order('created_at', { ascending: false })

    return (
        <div className="px-4 sm:px-0">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Daftar Pendaftar</h1>

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NISN</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurusan</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th>
                                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Detail</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {students?.map((student: any) => (
                                        <tr key={student.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{student.users?.full_name || 'Tidak ada nama'}</div>
                                                <div className="text-sm text-gray-500">{student.users?.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.nisn}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.majors?.name || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${student.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                        student.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                            student.status === 'awaiting_payment' ? 'bg-blue-100 text-blue-800' :
                                                                student.status === 'pending_verification' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-gray-100 text-gray-800'}`}>
                                                    {student.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(student.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={`/admin/student/${student.id}`} className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end">
                                                    <Eye size={16} className="mr-1" /> Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {students?.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">Belum ada pendaftar.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
