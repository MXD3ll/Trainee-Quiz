'use client'

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/app/components/Navbar/Navbar'

interface Post {
    id: number
    userId: number
    title: string
    body: string
}

interface User {
    id: number
    name: string
    email: string
    username: string
}

interface Comment {
    id: number
    postId: number
    name: string
    email: string
    body: string
}

export default function PostDetailPage() {
    const params = useParams()
    const id = params?.id as string

    const [post, setPost] = useState<Post | null>(null)
    const [author, setAuthor] = useState<User | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!id) return

        const fetchAll = async () => {
            try {
                const postRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
                const postData: Post = postRes.data
                setPost(postData)

                const [userRes, commentsRes] = await Promise.all([
                    axios.get(`https://jsonplaceholder.typicode.com/users/${postData.userId}`),
                    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
                ])

                setAuthor(userRes.data)
                setComments(commentsRes.data)
            } catch (err) {
                console.error(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchAll()
    }, [id])

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


    if (error || !post) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-4 bg-slate-50">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
                    </svg>
                </div>
                <p className="text-sm font-medium text-slate-700">Failed to load Blog</p>
                <p className="text-xs text-slate-400">Please check your connection and try again</p>
                <Link
                    href="/blog"
                    className="mt-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200"
                >
                    Back to Blog
                </Link>
            </div>
        )
    }

    return (
        <>
        <Navbar/>
            <div className="min-h-screen bg-slate-50">

                
                <div className="bg-white border-b border-slate-100 px-4 sm:px-10 py-4">
                    <div className="max-w-3xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-600 transition-colors duration-200 group"
                        >
                            <svg
                                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>
                </div>

                <main className="px-4 sm:px-10 py-8 sm:py-12 max-w-3xl mx-auto">

                    {/* Article card */}
                    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                        <div className="h-1.5 w-full bg-indigo-500" />
                        <div className="p-6 sm:p-10">


                            <span className="inline-block text-[15px] tracking-widest uppercase text-indigo-400 font-semibold bg-indigo-50 px-2.5 py-1 rounded-lg mb-5">
                                #{String(post.id).padStart(2, '0')}
                            </span>


                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-snug capitalize">
                                {post.title}
                            </h1>


                            <div className="mt-5 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
                                    {author ? author.name.charAt(0) : '?'}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">
                                        {author ? author.name : 'Unknown Author'}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {author ? author.email : ''}
                                    </p>
                                </div>
                            </div>


                            <div className="my-7 h-px bg-slate-100" />


                            <p className="text-base text-slate-600 leading-relaxed">
                                {post.body}
                            </p>

                        </div>
                    </article>

                    <section className="mt-8">
                        <div className="flex items-center gap-3 mb-5">
                            <h2 className="text-lg font-bold text-slate-800">Comments</h2>
                            <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg">
                                {comments.length}
                            </span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 "
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Avatar */}
                                        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                                            {comment.name.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2">
                                                <p className="text-sm font-semibold text-slate-700 capitalize line-clamp-1">
                                                    {comment.name}
                                                </p>
                                                <p className="text-xs text-slate-400 truncate">{comment.email}</p>
                                            </div>
                                            <p className="text-sm text-slate-500 leading-relaxed">{comment.body}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </main>

                {/* Footer */}
                <footer className="py-10 text-center border-t border-slate-400 mt-8">
                    <p className="text-xs tracking-widest uppercase text-black-300">
                        Post #{post.id} · {comments.length} comments
                    </p>
                </footer>
            </div>
        </>
    )
}