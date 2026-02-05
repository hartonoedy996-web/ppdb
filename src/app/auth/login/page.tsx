'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '../actions'

const initialState = {
    error: '',
}

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, initialState)

    return (
        <div className="min-h-screen bg-academic-gradient flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="bg-primary p-6 text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">SMK Azzahra Sepatan</h1>
                    <p className="text-blue-100 text-sm">Portal Penerimaan Peserta Didik Baru</p>
                </div>

                <div className="p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Masuk ke Akun</h2>

                    {state?.error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-200">
                            {state.error}
                        </div>
                    )}

                    <form action={formAction} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                placeholder="nama@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                placeholder="********"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-secondary hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 shadow-md disabled:opacity-50"
                        >
                            {isPending ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Belum punya akun?{' '}
                        <Link href="/auth/register" className="text-primary hover:underline font-medium">
                            Daftar Sekarang
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
