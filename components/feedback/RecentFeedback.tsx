"use client"
import Link from 'next/link';
import React from 'react'
import { formatDistanceToNow } from 'date-fns';

const RecentFeedback = ({ recentFeedbacks, analytics }: { recentFeedbacks: any[], analytics?: boolean }) => {
  return (
    <div className={`bg-white flex flex-col gap-2 p4 rounded-xl min-h-0 flex-1`}>
      <div className='flex flex-col'>
        <h2 className='lg font-semibold'>
          Recent Feedback
        </h2>
        <p className='sm -mt-1 text-black/60'>Most recent feedback received</p>
      </div>
      {recentFeedbacks.length > 0 ? (
        <div className='flex flex-col'>
          {recentFeedbacks?.slice(0, 5).map((feedback, index, arr) => (
            <div
              key={index}
              className={`p-2 border-stroke cursor-default flex justify-between items-center ${index !== arr.length - 1 ? 'border-b' : 'mb-1'}`}
            >
              <div className='flex items-center gap-2'>
                <div className='flex flex-col'>
                  <span className='sm line-clamp-1'>{feedback.message}</span>
                  <span className='xs text-black/60 '>
                    {feedback.date ? (formatDistanceToNow(new Date(feedback.date), { addSuffix: true })).charAt(0).toUpperCase() + (formatDistanceToNow(new Date(feedback.date), { addSuffix: true })).slice(1) : ''}
                  </span>
                </div>
              </div>
              <div
                className={`
                        ${!feedback.sentiment ? "bg-gray-100" : ""}
                        ${feedback.sentiment && feedback.sentiment.toLowerCase() === 'positive' ? "bg-lime-200/70 text-lime-500" : ""}
                        ${feedback.sentiment && feedback.sentiment.toLowerCase() === 'negative' ? "bg-orange-200/70 text-orange-500" : ""}
                        ${feedback.sentiment && feedback.sentiment.toLowerCase() === 'neutral' ? "bg-yellow-200/70 text-yellow-500" : ""}
                        xs px-1.5 p-1 rounded-sm font-semibold flex items-center gap-1 capitalize
                        `}
              >
                <span>{feedback.sentiment || 'Not analyzed'}</span>
              </div>
            </div>
          ))}
          {recentFeedbacks.length > 0 && (
            <Link href='/feedback/feedbacks' className='p-2.5 flex justify-center rounded-sm border border-stroke hover:bg-cblack cursor-pointer hover:text-white duration-300 items-center'>
              <span className='sm'>View all</span>
            </Link>
          )}
        </div>
      ) : (
        <div className='w-full h-full bg-black/5 text-black/80 rounded-sm min-h-80 flex items-center justify-center'>No feedback data available</div>
      )}
    </div>
  );
}

export default RecentFeedback