"use client"
import InfoGrid from '@/components/feedback/InfoGrid'
import OverviewGrid from '@/components/feedback/OverviewGrid'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='h-full'>
      <div className='flex flex-col h-full gap-4'>
        <div className='min-h-8'>
          <h1 className='x2l font-semibold'>Dashboard</h1>
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

export default Dashboard