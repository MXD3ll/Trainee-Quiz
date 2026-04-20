'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/app/components/Navbar/Navbar'
import Link from 'next/link'

interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
}

export default function ProductDetailPage() {
    const params = useParams()
    const id = params?.id

    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
                setProduct(res.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
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

    if (!product) {
        return <div className="text-center mt-10">Product not found</div>
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 p-6">

                <div className="bg-white border-b border-slate-100 px-4 sm:px-10 py-4">
                    <div className="max-w-3xl mx-auto">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-600 transition-colors duration-200 group"
                        >
                            <svg
                                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Product
                        </Link>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-96 object-contain"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col h-full">

                        {/* Category */}
                        <span className="text-xs tracking-widest uppercase text-indigo-500 mb-3">
                            {product.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug mb-4">
                            {product.title}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl font-bold text-indigo-600">
                                ${product.price}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-8">
                            {product.description}
                        </p>

                        {/* Button */}
                        <button className="self-center w-fit px-10 py-3 bg-blue-600 text-white rounded-full text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-indigo-700 active:scale-95">
                            สั่งซื้อ
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}
