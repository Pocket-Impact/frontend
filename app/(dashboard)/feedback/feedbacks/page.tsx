import FeedbackCard from '@/components/feedback/feedbacks/FeedbackCard'
import SurveyCard from '@/components/feedback/surveys/SurveyCard'
import React from 'react'

const feedbacks = [
  {
    category: "Tech",
    content: "This is the review that I'm leaving on the tech of your org. It's so back actually it needs an upgrade for real"
  },
  {
    category: "Agriculture",
    content: "This is the review that I'm leaving on the tech of your org. It's so back actually it needs an upgrade for real"
  },
]

const page = () => {
  return (
    <div className='inter flex flex-col gap-6'>
      <div className=''>
        <h1 className='x2l font-semibold'>Feedbacks</h1>
        <p className='text-black/60 base'>Review and manage feedbacks submitted to your organisation</p>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        {feedbacks.map((feedback) => (
          <FeedbackCard key={feedback.category} feedback={feedback} />
        ))}
      </div>
    </div>
  )
}

export default page