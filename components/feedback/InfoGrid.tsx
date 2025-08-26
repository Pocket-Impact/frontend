import React from 'react'
import FeedbackOverview from './FeedbackOverview';
import RecentFeedback from './RecentFeedback';
import SentimentOverview from './SentimentOverview';
import TopicOverview from './TopicOverview';

const InfoGrid = () => {
  return (
    <div className='grid grid-cols-3 grid-rows-2 max-lg:grid-cols-1 gap-6 max-lg:gap-2.5 max-md:gap-2 max-md:grid-cols-1 min-h-0 flex-1'>
      <FeedbackOverview />
      <SentimentOverview />
      <TopicOverview />
      <RecentFeedback />
    </div>
  )
}

export default InfoGrid