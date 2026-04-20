'use client'

import Navbar from '@/app/components/Navbar/Navbar'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import ProductCard from '@/app/components/ProductCard/productcard'

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
                            <ProductCard key={product.id} product={product} />
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