"use client"
import SurveyCard from '@/components/feedback/surveys/SurveyCard'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { apiFetch } from '@/utils/apiFetch'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { IoAddOutline } from 'react-icons/io5'

const page = () => {
  const [surveys, setSurveys] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiFetch('/api/surveys', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });


      const json = await response.json();
      if (!response.ok) console.log(json)
      if (json && json.data && Array.isArray(json.data.surveys)) {
        setSurveys(json.data.surveys);
      } else {
        setSurveys([]);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <div className='flex justify-between'>
        <div className=''>
          <h1 className='x2l font-semibold'>Surveys</h1>
          <p className='text-black/60 base'>Review and manage surveys of your organisation</p>
        </div>
        <Link href="/feedback/surveys/new" prefetch>
          <PrimaryButton text='Create survey' textStyles='max-md:hidden mr-1' styles='py-3 px-2 base max-lg:py-2.5 max-md:py-2 rounded-gl' icon={<IoAddOutline className='w-5 h-auto max-md:w-4' />} />
        </Link>
      </div>
      <div className='grid gap-3 max-lg:gap-2.5 max-md:gap-2 max-sm:grid-cols-1 grid-cols-3 max-lg:grid-cols-1 max-xl:grid-cols-2 mt-6'>
        {surveys?.map((survey: any) => (
          <SurveyCard key={survey._id} survey={survey} />
        ))}
      </div>
    </div >
  )
}

export default page