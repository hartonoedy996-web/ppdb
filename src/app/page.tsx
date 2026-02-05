import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle, GraduationCap } from 'lucide-react'

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <GraduationCap className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold text-gray-900">SMK Azzahra Sepatan</span>
                    </div>
                    <div className="space-x-4">
                        <Link href="/auth/login" className="text-gray-600 hover:text-primary font-medium transition">
                            Masuk
                        </Link>
                        <Link href="/auth/register" className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-md font-medium transition shadow-md">
                            Daftar Sekarang
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-grow">
                <div className="relative bg-academic-gradient overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
                        <div className="text-center">
                            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                <span className="block">Penerimaan Peserta Didik Baru</span>
                                <span className="block text-secondary">Tahun Ajaran 2026/2027</span>
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Bergabunglah dengan SMK Azzahra Sepatan. Sekolah kejuruan unggulan yang mencetak lulusan siap kerja, kompeten, dan berakhlak mulia.
                            </p>
                            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                    <Link href="/auth/register" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-lg transform transition hover:-translate-y-0.5">
                                        Daftar Sekarang
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                    <Link href="/auth/login" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-amber-500 md:py-4 md:text-lg md:px-10 shadow-lg transform transition hover:-translate-y-0.5">
                                        Login Siswa
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features / Steps */}
                <div className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Alur Pendaftaran</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                Mudah dan Cepat
                            </p>
                        </div>

                        <div className="mt-10">
                            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                            <BookOpen className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">1. Isi Biodata</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        Lengkapi formulir pendaftaran secara online dari mana saja. Pastikan data yang Anda masukkan benar.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                            <CheckCircle className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">2. Verifikasi Data</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        Admin kami akan memverifikasi data Anda. Pantau status pendaftaran melalui dashboard siswa.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                            <GraduationCap className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">3. Pembayaran & Diterima</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        Lakukan pembayaran biaya pendaftaran dan upload bukti bayar. Anda siap menjadi siswa SMK Azzahra!
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-400 text-sm">
                        &copy; 2026 SMK Azzahra Sepatan. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
