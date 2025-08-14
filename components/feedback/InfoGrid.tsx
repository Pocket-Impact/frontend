"use client"
import { apiFetch } from '@/utils/apiFetch';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const InfoGrid = () => {
  const [surveys, setSurveys] = useState<any[]>([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const surveyRes = await apiFetch('/api/surveys');
      const surveyData = await surveyRes.json();
      setSurveys(surveyData.data.surveys);
    }
    fetchSurveys();
  }, []);

  return (
    <div className='mt-3 gap-4  h-full'>
      <div className='border lg:col-span-2 p-3 overflow-y-scroll border-stroke rounded-2xl flex flex-col gap-2 h-[450px]'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold xl'>Survey List</h2>
          <Link href='/dashboard/feedback/surveys'>
            <p className='base text-black/70 transition-all duration-300 hover:bg-gray-100 p-1.5 px-2 rounded-lg'>View all</p>
          </Link>
        </div>
        {surveys.map((survey) => (
          <div key={survey._id} className='p-3 border h-max w-full border-stroke'>
            <h3 className='font-semibold base'>{survey.title}</h3>
            <p className='sm text-black/50'>{survey.description}</p>
          </div>
        ))}
      </div>
      {/* <div className='border border-stroke rounded-2xl flex items-center justify-center h-[450px]'>INFO</div> */}
    </div>
  )
}

export default InfoGrid