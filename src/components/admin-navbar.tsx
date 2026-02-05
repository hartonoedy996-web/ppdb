'use client'

import { logout } from '@/app/auth/actions'
import { LogOut, Shield } from 'lucide-react'
import Link from 'next/link'

export function AdminNavbar() {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-primary font-bold text-lg">PPDB Admin</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/admin/dashboard" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Dashboard
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-700">
                            <Shield size={18} className="mr-2" />
                            <span className="text-sm font-medium">Administrator</span>
                        </div>
                        <form action={logout}>
                            <button className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition">
                                <LogOut size={18} className="mr-1" />
                                Keluar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}
