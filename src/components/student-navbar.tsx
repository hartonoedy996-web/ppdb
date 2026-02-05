'use client'

import Link from 'next/link'
import { logout } from '@/app/auth/actions'
import { LogOut, User } from 'lucide-react'

export function StudentNavbar() {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-primary font-bold text-lg">PPDB Azzahra</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-700">
                            <User size={18} className="mr-2" />
                            <span className="text-sm font-medium">Siswa</span>
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
