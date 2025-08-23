import FeedbackCard from '@/components/feedback/feedbacks/FeedbackCard'
import SurveyCard from '@/components/feedback/surveys/SurveyCard'
import React from 'react'

const page = () => {
  return (
    <div className='inter flex flex-col gap-6'>
      <div className=''>
        <h1 className='x2l font-semibold'>Feedbacks</h1>
        <p className='text-black/60 base'>Review and manage feedbacks submitted to your organisation</p>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <FeedbackCard />
      </div>
    </div>
  )
}

export default page