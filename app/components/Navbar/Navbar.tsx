'use client'

import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    // ✅ เพิ่ม state สำหรับ search
    const [search, setSearch] = useState('')
    const router = useRouter()

    // ✅ ฟังก์ชันค้นหา
    const handleSearch = () => {
        if (!search.trim()) return
        router.push(`/products?q=${search}`)
    }

    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">

                <Link href="/" className="text-2xl font-bold text-slate-800 tracking-tight">
                    💫Trainee Quiz<span>.</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm text-slate-500 hover:text-gray-500 transition-colors duration-200">
                        Home
                    </Link>
                    <Link href="/products" className="text-sm text-gray-500 font-medium">
                        Products
                    </Link>
                    <Link href="/blog" className="text-sm text-gray-500 hover:text-slate-800 transition-colors duration-200">
                        Blog
                    </Link>
                    <Link href="/" className="text-sm text-gray-500 hover:text-slate-800 transition-colors duration-200">
                        About
                    </Link>
                </div>

                <div className="flex items-center gap-3">

                    <div className="relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="pl-10 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <p className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                        </p>
                    </div>

                    <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200">
                        <svg className="w-4.5 h-4.5" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" strokeWidth={2} />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </button>

                    <button className="hidden sm:flex w-9 h-9 rounded-xl bg-indigo-50 items-center justify-center text-indigo-600 font-semibold text-sm hover:bg-indigo-100 transition-colors duration-200">
                        <FontAwesomeIcon icon={faCircleUser} />
                    </button>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200"
                    >
                        {menuOpen ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-1">
                    <Link href="/" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200">
                        Home
                    </Link>
                    <Link href="/products" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-xl text-sm text-gray-500 font-medium bg-indigo-50">
                        Products
                    </Link>
                    <Link href="/blog" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200">
                        Blog
                    </Link>
                    <Link href="/about" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200">
                        About
                    </Link>
                    <Link href="/profile" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200">
                        Profile
                    </Link>
                </div>
            )}
        </nav>
    )
}