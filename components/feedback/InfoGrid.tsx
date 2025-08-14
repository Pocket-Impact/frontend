"use client"
import { apiFetch } from '@/utils/apiFetch';
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
        <div className='border lg:col-span-2 border-stroke rounded-2xl flex items-center justify-center h-[450px]'>INFO</div>
        {/* <div className='border border-stroke rounded-2xl flex items-center justify-center h-[450px]'>INFO</div> */}
    </div>
  )
}

export default InfoGrid