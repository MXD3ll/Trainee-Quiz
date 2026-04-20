import Link from 'next/link'
import React from 'react'
import Navbar from './components/Navbar/Navbar'

function page() {
  return (
    <div>
      <Navbar />
      <Link href='ProductListPage'>
        <div className='flex'>
          ProductListPage
        </div>
      </Link>
    </div>
  )
}

export default page