"use client"
import InfoGrid from '@/components/feedback/InfoGrid'
import OverviewGrid from '@/components/feedback/OverviewGrid'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='h-max'>
      <div className='flex flex-col h-full gap-4'>
        <div className=''>
          <h1 className='x2l font-semibold'>Dashboard</h1>
          <p className='text-black/60 base'>Welcome to the dashboard of your organisation.</p>
        </div>
        <div className='flex flex-col h-full gap-6'>
          <OverviewGrid />
          <InfoGrid />
        </div>
      </div>
    </div>
  )
}

export default Dashboard