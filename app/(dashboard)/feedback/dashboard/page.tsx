"use client"
import InfoGrid from '@/components/feedback/InfoGrid'
import OverviewGrid from '@/components/feedback/OverviewGrid'
import { apiFetch } from '@/utils/apiFetch'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch('/api/dashboard');
        const data = await res.json();
        if (res.ok && data.status === 'success') {
          setDashboardData(data.data);
        } else {
          console.log(data);
          setError(data.message || 'Failed to fetch dashboard data');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className='min-h-screen overflow-x-hidden'>
      <div className='flex flex-col gap-4'>
        <div className=''>
          <h1 className='x2l font-semibold'>Dashboard</h1>
        </div>
        <div className='flex flex-col gap-6 max-lg:gap-5 max-md:gap-4'>
          {loading ? (
            <div className='text-black/60 base'>Loading dashboard...</div>
          ) : error ? (
            <div className='text-red-500 mb-4 bg-red-100 w-full p-2 border-2 border-red-400'>{error}</div>
          ) : dashboardData ? (
            <>
              <OverviewGrid dashboard={dashboardData} />
              <InfoGrid dashboard={dashboardData} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Dashboard