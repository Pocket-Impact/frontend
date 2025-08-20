import React from 'react'
import FeedbackOverview from './FeedbackOverview';
import RecentFeedback from './RecentFeedback';

const InfoGrid = () => {
  return (
    <div className='grid grid-cols-5 gap-6 max-lg:gap-5 max-md:grid-cols-1 h-[436px]'>
      <FeedbackOverview />
      <RecentFeedback />
    </div>
  )
}

export default InfoGrid