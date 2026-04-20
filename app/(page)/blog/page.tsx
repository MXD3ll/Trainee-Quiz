'use client'

import BlogCard from '@/app/components/BlogCard/BlogCard'
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
                            <BlogCard key={post.id} post={post} />
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