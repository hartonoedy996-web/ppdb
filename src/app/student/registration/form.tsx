'use client'

import { useActionState } from 'react'
import { submitRegistration } from '../actions'
import { Save } from 'lucide-react'

// Define Major type locally or import from types if we had them
type Major = {
    id: number
    name: string
    quota: number
}

const initialState = {
    error: '',
}

export default function RegistrationForm({ majors }: { majors: Major[] }) {
    const [state, formAction, isPending] = useActionState(submitRegistration, initialState)

    return (
        <form action={formAction} className="space-y-6">
            <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Formulir Pendaftaran</h3>
                    <p className="mt-1 text-sm text-gray-500">Lengkapi data berikut dengan benar.</p>
                </div>

                <div className="p-6 space-y-6">

                    {state?.error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                            {state.error}
                        </div>
                    )}

                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <h4 className="text-md font-semibold text-primary mb-2">Data Pribadi</h4>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                                <textarea name="address" rows={3} required className="mt-1 block w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border border-gray-300 rounded-md p-2"></textarea>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                                <select name="gender" required className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                    <option value="">Pilih...</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                                <input type="date" name="dob" required className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <h4 className="text-md font-semibold text-primary mb-2">Data Sekolah Asal</h4>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Nama Sekolah Asal</label>
                                <input type="text" name="schoolOrigin" required className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" placeholder="SMP..." />
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Tahun Lulus</label>
                                <input type="number" name="graduationYear" required min="2020" max="2030" className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Rata-rata Nilai Rapor/Ujian</label>
                                <input type="number" name="averageScore" step="0.01" required min="0" max="100" className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold text-primary mb-2">Pilihan Jurusan</h4>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Jurusan yang Diminati</label>
                                <select name="selectedMajorId" required className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                    <option value="">Pilih Jurusan...</option>
                                    {majors.map((major) => (
                                        <option key={major.id} value={major.id}>{major.name} (Kuota: {major.quota})</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-5 flex justify-end">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {isPending ? 'Menyimpan...' : 'Simpan & Kirim'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
