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
    <div className=''>
      <div></div>
    </div>
  )
}

export default InfoGrid