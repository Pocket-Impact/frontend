"use client"
import InfoGrid from '@/components/feedback/InfoGrid'
import OverviewGrid from '@/components/feedback/OverviewGrid'
import React from 'react'

const page = () => {
  return (
    <div className='h-full'>
      <div className='flex flex-col h-full gap-4'>
        <div className='flex items-start justify-between max-md:flex-col gap-4'>
          <div className=''>
            <h1 className='x2l font-semibold'>Analytics</h1>
            <p className='text-black/60 base'>Welcome to the dashboard of your organisation.</p>
          </div>
          <div>
            <form action="" className='flex base items-center gap-3'>
              <input type="date" className='bg-white base p-2 border outline-0 rounded-lg focus:border-primary border-stroke' name="" id="" />
              <span>to</span>
              <input type="date" className='bg-white base p-2 border outline-0 rounded-lg focus:border-primary border-stroke' name="" id="" />
            </form>
          </div>
        </div>
        <div className='flex flex-col h-full gap-6'>
          <OverviewGrid />
          <InfoGrid />
        </div>
      </div>
      <br /><br />
    </div>
  )
}

export default page