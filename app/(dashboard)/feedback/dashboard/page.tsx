import InfoGrid from '@/components/feedback/InfoGrid'
import OverviewGrid from '@/components/feedback/OverviewGrid'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <div className=''>
        <h1 className='x2l font-bold'>Dashboard</h1>
        <p className='text-black/60 base'>Welcome to the dashboard, <span className='font-bold'>admin</span></p>
      </div>
      {/* Overview */}
      <div className='flex flex-col gap-6'>
        <OverviewGrid />
        <InfoGrid />
      </div>
    </div>
  )
}

export default Dashboard