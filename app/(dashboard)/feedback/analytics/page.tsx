"use client"
import InfoGrid from '@/components/feedback/InfoGrid'
import OverviewGrid from '@/components/feedback/OverviewGrid'
import { apiFetch } from '@/utils/apiFetch'
import React, { useEffect, useState } from 'react'

const page = () => {
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
        setError('Server error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className='min-h-screen'>
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
          {loading ? (
            <div className='text-black/60 base'>Loading analytics...</div>
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
  );
}

export default page