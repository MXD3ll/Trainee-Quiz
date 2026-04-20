'use client'

import Navbar from '@/app/components/Navbar/Navbar'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Post {
    id: number
    userId: number
    title: string
    body: string
}

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
                setPosts(res.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-4 bg-slate-50">
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-bounce"
                            style={{ animationDelay: `${i * 0.18}s` }}
                        />
                    ))}
                </div>
                <p className="text-xs tracking-widest uppercase text-slate-400">Loading...</p>
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50">
                <header className="bg-white border-b border-slate-100 px-4 sm:px-10 py-10 sm:py-14 text-center">
                    <span className="inline-block text-[11px] tracking-[0.3em] uppercase text-indigo-400 font-medium mb-3">
                        Our Blog
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-bold text-slate-800 tracking-tight">
                        Posts
                    </h1>
                    <p className="mt-3 text-sm text-slate-400">{posts.length} articles published</p>
                </header>

                <main className="px-4 sm:px-10 py-8 sm:py-12 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className="h-1 w-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="p-5 sm:p-6 flex flex-col flex-1 gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] tracking-widest uppercase text-black font-semibold bg-indigo-50 px-2.5 py-1 rounded-lg">
                                            #{String(post.id).padStart(2, '0')}
                                        </span>
                                        <span className="text-[10px] text-slate-300 tracking-wider uppercase">
                                            User {post.userId}
                                        </span>
                                    </div>

                                    <h2 className="text-[15px] sm:text-base font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200 capitalize">
                                        {post.title}
                                    </h2>

                                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
                                        {post.body}
                                    </p>

                                    <div className="h-px bg-slate-100" />

                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="flex items-center justify-between text-sm font-medium text-black hover:text-indigo-700 transition-colors duration-200 group/link"
                                    >
                                        <span>Read more</span>
                                        <svg
                                            className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                <footer className="py-10 text-center border-t border-slate-100">
                    <p className="text-xs tracking-widest uppercase text-slate-300">
                        Showing all {posts.length} posts
                    </p>
                </footer>
            </div>
        </>
    )
}