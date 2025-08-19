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
    <div className='grid grid-cols-5'>
      <div className='bg-white border col-span-3 border-stroke p-5 rounded-lg'>
      <h2 className='lg font-medium'>Feedback Overview</h2>
      </div>
    </div>
  )
}

export default InfoGrid