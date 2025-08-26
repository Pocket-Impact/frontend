"use client"
import FeedbackCard from '@/components/feedback/feedbacks/FeedbackCard'
import { useAuthStore } from '@/stores/authStores'
import React, { useState } from 'react'
import { BiCopy } from 'react-icons/bi'

const feedbacks = [
  {
    sentiment: "Positive",
    category: "Improvement",
    content: "This is the review asdfe adfawe gdthdr bgysets grts tsergserg that I'm leaving on the tech of your org. It's so back actually it needs an upgrade for real"
  },
  {
    sentiment: "Negative",
    category: "Business",
    content: "This is the review that I'm leaving on the tech of your org. It's so back actually it needs an upgrade for real"
  },
  {
    sentiment: "Neutral",
    category: "Agriculture",
    content: "This is the review that I'm leaving on the tech of your org. It's so back actually it needs an upgrade for real"
  },
]

const page = () => {
  const [copied, setCopied] = useState(false);
  const { organisationId, hasHydrated } = useAuthStore((state) => state)

  const handleCopy = () => {
    if (hasHydrated) {
      navigator.clipboard.writeText(`${window.location.origin}/surveys/unique/${organisationId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className='inter flex flex-col gap-6'>
      <div className='flex justify-between'>
        <div>
          <h1 className='x2l font-semibold'>Feedbacks</h1>
          <p className='text-black/60 base'>Review and manage feedbacks submitted to your organisation</p>
        </div>
        <div>
          <button
            className='flex bg-primary/10 items-center gap-2 hover:bg-primary/20 p-2 rounded-sm hover:text-black transition duration-300 cursor-pointer base'
            onClick={handleCopy}
            type="button"
          >
            <BiCopy className='' />
            <span className='sm'>{copied ? 'Copied' : 'Copy feedback link'}</span>
          </button>
        </div>
      </div>
      <div className='grid grid-cols-3 max-lg:grid-cols-1 gap-6 max-md:gap-4'>
        {feedbacks.map((feedback) => (
          <FeedbackCard key={feedback.category} feedback={feedback} />
        ))}
      </div>
    </div>
  )
}

export default page