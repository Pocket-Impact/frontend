"use client"
import { apiFetch } from '@/utils/apiFetch';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const InfoGrid = () => {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      const surveyRes = await apiFetch('/api/surveys');
      const surveyData = await surveyRes.json();
      setSurveys(surveyData.data.surveys);
      setIsLoading(false);
    }
    fetchSurveys();
  }, []);

  return (
    <div className='mt-6 gap-4  h-full'>
      <div className='border lg:col-span-2 p-5 overflow-y-scroll border-stroke rounded-2xl flex flex-col gap-3 h-[440px]'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold xl'>Survey List</h2>
          <Link href='/dashboard/feedback/surveys'>
            <p className='base text-black/70 transition-all duration-300 hover:bg-gray-100 p-1.5 px-2 rounded-lg'>View all</p>
          </Link>
        </div>
        {loading &&
          <div className='p-3 border animate-pulse h-max w-full border-stroke'>
            <h3 className='font-semibold base w-20 bg-stroke rounded-sm h-4'></h3>
            <p className='sm text-black/50 w-50 bg-stroke rounded-sm h-4 mt-1'></p>
          </div>
        }
        {surveys && surveys.map((survey) => (
          <div key={survey._id} className='p-3 border h-max mt-3 w-full border-stroke'>
            <h3 className='font-semibold base'>{survey.title}</h3>
            <p className='sm text-black/50 mt-2'>{survey.description}</p>
          </div>
        ))}
        {surveys.length === 0 && !loading && (
          <span className='text-black/80'>No surveys found</span>
        )}
      </div>
      {/* <div className='border border-stroke rounded-2xl flex items-center justify-center h-[450px]'>INFO</div> */}
    </div>
  )
}

export default InfoGrid