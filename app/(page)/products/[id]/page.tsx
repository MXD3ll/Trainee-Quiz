'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/app/components/Navbar/Navbar'
import ProductDetail from '@/app/components/ProductDetail/productdetail'

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
        const res = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        )
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
        <p className="text-xs tracking-widest uppercase text-slate-400">
          Loading...
        </p>
      </div>
    )
  }

  if (!product) {
    return <div className="text-center mt-10">Product not found</div>
  }

  return (
    <>
      <Navbar />
      <ProductDetail product={product} />
    </>
  )
}