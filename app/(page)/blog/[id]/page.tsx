'use client'

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/app/components/Navbar/Navbar'
import BlogDetail from '@/app/components/BlogDetail/BlogDetail'

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
        const postRes = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        )

        const postData: Post = postRes.data
        setPost(postData)

        const [userRes, commentsRes] = await Promise.all([
          axios.get(
            `https://jsonplaceholder.typicode.com/users/${postData.userId}`
          ),
          axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}/comments`
          ),
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
        <p className="text-xs tracking-widest uppercase text-slate-400">
          Loading...
        </p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4 bg-slate-50">
        <p className="text-sm font-medium text-slate-700">
          Failed to load blog
        </p>
        <Link
          href="/blog"
          className="px-5 py-2.5 bg-indigo-600 text-white text-sm rounded-xl"
        >
          Back
        </Link>
      </div>
    )
  }

  return (
    <>
      <Navbar />

      {/* back bar */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-10 py-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="text-sm text-slate-400 hover:text-indigo-600"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>

      <BlogDetail
        post={post}
        author={author}
        comments={comments}
      />

      <footer className="py-10 text-center border-t border-slate-100">
        <p className="text-xs tracking-widest uppercase text-slate-400">
          Post #{post.id} · {comments.length} comments
        </p>
      </footer>
    </>
  )
}