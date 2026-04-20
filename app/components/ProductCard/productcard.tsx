'use client'

import Link from 'next/link'

interface Product {
  id: number
  title: string
  price: number
  image: string
}

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      
      <div className="relative bg-slate-50 h-44 sm:h-52 flex items-center justify-center p-5 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <h2 className="text-[13px] sm:text-sm text-slate-700 leading-snug line-clamp-2 flex-1 min-h-[38px]">
          {product.title}
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600 tabular-nums">
            ${product.price.toFixed(2)}
          </span>

          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-600">
            In stock
          </span>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="block text-center bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 hover:bg-indigo-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          View Detail
        </Link>
      </div>
    </div>
  )
}