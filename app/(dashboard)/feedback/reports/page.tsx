import PrimaryButton from '@/components/ui/PrimaryButton'
import Link from 'next/link'
import React from 'react'
import { IoAddOutline } from 'react-icons/io5'

const page = () => {
  return (
    <div><div className='flex justify-between'>
      <div className=''>
        <h1 className='x2l font-semibold'>Reports</h1>
        <p className='text-black/60 base'>Review and manage reports of your organisation</p>
      </div>
      <Link href="/feedback/surveys/new" prefetch>
        <button className='bg-white border border-stroke transition duration-300 cursor-pointer hover:bg-primary/10 rounded-lg p-2 flex gap-2'>
          <div className='bg-primary flex items-center justify-center px-0.5 rounded-sm w-max text-white'>
            <IoAddOutline className='w-5 h-auto max-md:w-4' />
          </div>
          New analysis
        </button>
      </Link>
    </div></div>
  )
}

export default page