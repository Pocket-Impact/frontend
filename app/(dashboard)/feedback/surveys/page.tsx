import SurveyCard from '@/components/feedback/surveys/SurveyCard'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { apiFetch } from '@/utils/apiFetch'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import { IoAddOutline } from 'react-icons/io5'

const page = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');

  const response = await apiFetch('http://localhost:5000/api/surveys', {
    headers: {
      'Cookie': cookieHeader,
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();
  const surveys = json.data.surveys;

  return (
    <div>
      <div className='flex justify-between'>
        <div className=''>
          <h1 className='x2l font-bold'>Surveys</h1>
          <p className='text-black/60 base'>Review and manage surveys of you organisation</p>
        </div>
        <Link href="/feedback/surveys/new">
          <PrimaryButton text='Create a new survey' textStyles='max-md:hidden' styles='py-3 px-2 base max-lg:py-2.5 max-md:py-2 rounded-gl' icon={<IoAddOutline className='w-5 h-auto max-md:w-4' />} />
        </Link>
      </div>
      <div className='grid gap-3 max-lg:gap-2.5 max-md:gap-2 max-sm:grid-cols-1 grid-cols-3 max-lg:grid-cols-1 max-xl:grid-cols-2 mt-6'>
        {surveys.map((survey: any) => (
          <SurveyCard key={survey._id} survey={survey} />
        ))}
      </div>
    </div >
  )
}

export default page