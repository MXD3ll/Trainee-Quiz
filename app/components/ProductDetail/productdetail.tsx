'use client'

import Link from 'next/link'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

interface Props {
  product: Product
}

export default function ProductDetail({ product }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 p-6">

      
      <div className="bg-white border-b border-slate-100 px-4 sm:px-10 py-4 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-600 transition-colors duration-200 group"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>

     
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-3xl shadow-lg border border-slate-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-10">

        
        <div className="flex items-center justify-center bg-slate-50 rounded-2xl p-6 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        
        <div className="flex flex-col h-full">

          <span className="inline-block text-[11px] tracking-widest uppercase text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full w-fit mb-4">
            {product.category}
          </span>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl font-bold text-indigo-600 tabular-nums">
              ${product.price.toFixed(2)}
            </span>

            <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 font-medium">
              In stock
            </span>
          </div>

          <div className="mb-8">
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3">

            <button className="w-full md:w-fit px-10 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-indigo-700 active:scale-95 shadow-sm hover:shadow-md">
              สั่งซื้อ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}