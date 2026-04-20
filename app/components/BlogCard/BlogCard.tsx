'use client'

import Link from 'next/link'

interface Post {
  id: number
  userId: number
  title: string
  body: string
}

interface Props {
  post: Post
}

export default function BlogCard({ post }: Props) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

      
      <div className="h-1 w-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5 sm:p-6 flex flex-col flex-1 gap-3">

        
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-widest uppercase bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md font-semibold">
            {String(post.id).padStart(2, '0')}
          </span>

          <span className="text-[10px] text-slate-300 tracking-wider uppercase">
            User {post.userId}
          </span>
        </div>

        
        <h2 className="text-[15px] sm:text-base font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
          {post.title}
        </h2>

        
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {post.body}
        </p>

        <div className="h-px bg-slate-100" />
        <Link
          href={`/blog/${post.id}`}
          className="flex items-center justify-between text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-200 group/link"
        >
          <span>Read article</span>

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
  )
}