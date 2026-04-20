'use client'

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

interface Props {
  post: Post
  author: User | null
  comments: Comment[]
}

export default function BlogDetail({ post, author, comments }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">

      
      <main className="px-4 sm:px-10 py-8 sm:py-12 max-w-3xl mx-auto">

        <article className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

          <div className="h-1.5 w-full bg-indigo-500" />

          <div className="p-6 sm:p-10">

            
            <span className="inline-block text-xs tracking-widest uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-5">
              #{String(post.id).padStart(2, '0')}
            </span>

            
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-snug mb-6">
              {post.title}
            </h1>

            
            <div className="flex items-center gap-3 mb-7">

              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {author?.name?.charAt(0) ?? '?'}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  {author?.name ?? 'Unknown Author'}
                </p>
                <p className="text-xs text-slate-400">
                  {author?.email}
                </p>
              </div>

            </div>

            <div className="h-px bg-slate-100 mb-7" />

            
            <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {post.body}
            </p>

          </div>
        </article>

        
        <section className="mt-10">

          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-lg font-bold text-slate-800">Comments</h2>

            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              {comments.length}
            </span>
          </div>

          <div className="flex flex-col gap-4">

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6"
              >

                <div className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
                      <p className="text-sm font-semibold text-slate-700 truncate">
                        {comment.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {comment.email}
                      </p>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed">
                      {comment.body}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  )
}