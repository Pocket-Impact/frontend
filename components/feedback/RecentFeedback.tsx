"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import FeedbackOverview from './FeedbackOverview';
import { AiOutlineRise } from 'react-icons/ai';

const dummyRecentFeedbacks = [
  {
    userInitial: "E",
    comment: "Could be improved, but overall good.",
    timeAgo: "1h ago",
    sentiment: "Neutral",
    sentimentColor: "bg-yellow-200/70 text-yellow-500"
  },
  {
    userInitial: "C",
    comment: "Not satisfied with the experience.",
    timeAgo: "10m ago",
    sentiment: "Negative",
    sentimentColor: "bg-red-100 text-red-500"
  },
  {
    userInitial: "G",
    comment: "Not satisfied with the experience.",
    timeAgo: "10m ago",
    sentiment: "Negative",
    sentimentColor: "bg-red-100 text-red-700"
  },
  {
    userInitial: "E",
    comment: "Could be improved, but overall good.",
    timeAgo: "1h ago",
    sentiment: "Neutral",
    sentimentColor: "bg-yellow-200/70 text-yellow-700"
  },
  {
    userInitial: "G",
    comment: "Not satisfied with the experience.",
    timeAgo: "10m ago",
    sentiment: "Negative",
    sentimentColor: "bg-red-100 text-red-500"
  },
  {
    userInitial: "E",
    comment: "Could be improved, but overall good.",
    timeAgo: "1h ago",
    sentiment: "Neutral",
    sentimentColor: "bg-yellow-200/70 text-yellow-700"
  },
];

const RecentFeedback = () => {
  return (
    <div className='bg-white border-stroke flex flex-col gap-2 border p-4 rounded-lg col-span-3'>
        <div className='flex items-center -mt-1 gap-2'>
          <div className='bg-black/10 p-2 rounded-sm'>
            <AiOutlineRise className='w-3.5 h-auto' />
          </div>
          <div className='flex flex-col'>
            <h2 className='sm font-medium'>
              Recent Feedback
            </h2>
            <h2 className='xs'>
              Most recent feedback received
            </h2>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          {dummyRecentFeedbacks.map((feedback, index) => (
            <div key={index} className='p-2 rounded-sm border border-stroke cursor-default flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <div className='flex flex-col'>
                  <span className='sm'>{feedback.comment}</span>
                  <span className='xs text-black/60 '>{feedback.timeAgo}</span>
                </div>
              </div>
              <div className={`bg-lime-100 p-1 px-1.5 mr-1 text-lime-500 w-max xs ${feedback.sentimentColor}`}>
                {feedback.sentiment}
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default RecentFeedback