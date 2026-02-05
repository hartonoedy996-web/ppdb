'use client'

import { useState, useActionState } from 'react'
import { signup } from '../actions'
import Link from 'next/link'
import { RotateCcw } from 'lucide-react'

const initialState = {
    error: '',
}

export default function RegisterPage() {
    const [step, setStep] = useState(1)
    const [formDataState, setFormDataState] = useState({
        fullName: '',
        nisn: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    // useActionState for the actual submission
    const [state, formAction, isPending] = useActionState(signup, initialState)
    const [localError, setLocalError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDataState({ ...formDataState, [e.target.name]: e.target.value })
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formDataState.fullName || !formDataState.nisn || !formDataState.email || !formDataState.phone) {
            setLocalError('Mohon lengkapi semua data diri.')
            return
        }
        setLocalError(null)
        setStep(2)
    }

    const handleSubmit = (formData: FormData) => {
        if (formDataState.password !== formDataState.confirmPassword) {
            setLocalError('Password tidak sama.')
            return
        }
        // Proceed to call server action
        formAction(formData)
    }

    const displayError = localError || state?.error

    return (
        <div className="min-h-screen bg-academic-gradient flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">
                <div className="bg-primary p-6 text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">Pendaftaran Siswa Baru</h1>
                    <p className="text-blue-100 text-sm">Lengkapi data diri untuk membuat akun</p>
                </div>

                <div className="p-8">
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center mb-6 space-x-2">
                        <div className={`h-2 w-12 rounded-full ${step >= 1 ? 'bg-secondary' : 'bg-gray-200'}`}></div>
                        <div className={`h-2 w-12 rounded-full ${step >= 2 ? 'bg-secondary' : 'bg-gray-200'}`}></div>
                    </div>

                    {displayError && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-200">
                            {displayError}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-4">

                        {/* Hidden inputs to pass data from Step 1 when submitting on Step 2 */}
                        <input type="hidden" name="fullName" value={formDataState.fullName} />
                        <input type="hidden" name="nisn" value={formDataState.nisn} />
                        <input type="hidden" name="email" value={formDataState.email} />
                        <input type="hidden" name="phone" value={formDataState.phone} />
                        <input type="hidden" name="password" value={formDataState.password} />

                        {step === 1 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                    <input
                                        name="fullName"
                                        value={formDataState.fullName}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="Sesuai Ijazah SMP"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
                                    <input
                                        name="nisn"
                                        value={formDataState.nisn}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="Nomor Induk Siswa Nasional"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Aktif</label>
                                    <input
                                        name="email"
                                        value={formDataState.email}
                                        onChange={handleChange}
                                        type="email"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="email@contoh.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp</label>
                                    <input
                                        name="phone"
                                        value={formDataState.phone}
                                        onChange={handleChange}
                                        type="tel"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="0812xxxx"
                                    />
                                </div>
                                <button
                                    onClick={handleNext}
                                    className="w-full bg-primary hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-200 shadow-md mt-4"
                                >
                                    Lanjut
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="bg-blue-50 p-4 rounded-md mb-4 border border-blue-100">
                                    <p className="text-sm text-gray-700"><strong>Halo, {formDataState.fullName}</strong></p>
                                    <p className="text-xs text-gray-500 mt-1">Silakan buat password untuk mengamankan akun pendaftaran Anda.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        name="password"
                                        value={formDataState.password}
                                        onChange={handleChange}
                                        type="password"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="Minimal 6 karakter"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                                    <input
                                        name="confirmPassword"
                                        value={formDataState.confirmPassword}
                                        onChange={handleChange}
                                        type="password"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="Ulangi password"
                                    />
                                </div>

                                <div className="flex space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2 px-3 rounded-md transition"
                                    >
                                        <RotateCcw size={20} />
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="flex-1 bg-secondary hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 shadow-md disabled:opacity-50"
                                    >
                                        {isPending ? 'Memproses...' : 'Buat Akun'}
                                    </button>
                                </div>
                            </div>
                        )}

                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Sudah punya akun?{' '}
                        <Link href="/auth/login" className="text-primary hover:underline font-medium">
                            Masuk disini
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
