"use client"
import Link from 'next/link';
import React from 'react'

const RecentFeedback = ({ recentFeedbacks }: { recentFeedbacks: any[] }) => {
  return (
    <div className='bg-white border-stroke flex flex-col gap-2 border p4 rounded-lg lg:col-span-3 min-h-0 flex-1'>
      <div className='flex flex-col'>
        <h2 className='lg font-semibold'>
          Recent Feedback
        </h2>
        <p className='sm -mt-1 text-black/60'>Most recent feedback received</p>
      </div>
      <div className='flex flex-col gap-2'>
        {recentFeedbacks?.map((feedback, index) => (
          <div key={index} className='p-2 rounded-sm border border-stroke cursor-default flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <div className='flex flex-col'>
                <span className='sm'>{feedback.message}</span>
                <span className='xs text-black/60 '>{feedback.date ? new Date(feedback.date).toLocaleString() : ''}</span>
              </div>
            </div>
            <div className={`bg-lime-100 p-1 px-1.5 mr-1 text-lime-500 w-max xs`}>
              {feedback.sentiment}
            </div>
          </div>
        ))}
        <Link href='/feedback/feedbacks' className='p-2.5 flex justify-center rounded-sm border border-stroke hover:bg-cblack cursor-pointer hover:text-white duration-300 items-center'>
          <span className='sm'>View all</span>
        </Link>
      </div>
    </div>
  );
}

export default RecentFeedback