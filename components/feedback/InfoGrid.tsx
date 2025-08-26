import React from 'react'
import FeedbackOverview from './FeedbackOverview';
import RecentFeedback from './RecentFeedback';
import SentimentOverview from './SentimentOverview';

const InfoGrid = () => {
  return (
    <div className='grid grid-cols-3 grid-rows-2 max-lg:grid-cols-1 gap-6 max-lg:gap-5 max-md:grid-cols-1 min-h-0 flex-1'>
      <FeedbackOverview />
      <SentimentOverview />
      <div>
        a
      </div>
      <RecentFeedback />
    </div>
  )
}

export default InfoGrid