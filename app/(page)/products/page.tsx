'use client'

import Navbar from '@/app/components/Navbar/Navbar'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation' 

interface Product {
    id: number
    title: string
    price: number
    image: string
}

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const searchParams = useSearchParams() 
    const query = searchParams.get('q') || '' 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('https://fakestoreapi.com/products')
                setProducts(res.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    )

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
                        Our Collection
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-bold text-slate-800 tracking-tight">
                        All Products
                    </h1>

                    <p className="mt-3 text-sm text-slate-400">
                        {filteredProducts.length} items available
                    </p>
                </header>

                <main className="px-4 sm:px-10 py-8 sm:py-12 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

                        
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className="bg-slate-50 h-44 sm:h-52 flex items-center justify-center p-5 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <div className="p-4 flex flex-col flex-1 gap-3">
                                    <h2 className="text-[13px] sm:text-sm text-slate-700 leading-snug line-clamp-2 flex-1">
                                        {product.title}
                                    </h2>

                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-indigo-600 tabular-nums">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <span className="text-[10px] tracking-wider uppercase text-slate-300 font-medium">
                                            In stock
                                        </span>
                                    </div>

                                    <Link
                                        href={`/products/${product.id}`}
                                        className="block text-center bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 hover:bg-indigo-700 active:scale-95"
                                    >
                                        View Detail
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    
                    {filteredProducts.length === 0 && (
                        <p className="text-center text-slate-400 mt-10">
                            No products found
                        </p>
                    )}
                </main>

                <footer className="py-10 text-center border-t border-slate-100">
                    <p className="text-xs tracking-widest uppercase text-slate-300">
                        Showing all {filteredProducts.length} products
                    </p>
                </footer>
            </div>
        </>
    )
}