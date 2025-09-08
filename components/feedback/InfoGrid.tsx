import React from 'react'
import FeedbackOverview from './FeedbackOverview';
import RecentFeedback from './RecentFeedback';
import SentimentOverview from './SentimentOverview';
import TopicOverview from './TopicOverview';

const InfoGrid = ({ dashboard }: { dashboard: any }) => {
  return (
<<<<<<< HEAD
    <div className='grid grid-cols-3 grid-rows-2 max-lg:grid-cols-1 gap-6 max-lg:gap-2.5 max-md:gap-2 max-md:grid-cols-1 min-h-0 flex-1'>
      <FeedbackOverview dailyFeedbacks={dashboard?.dailyFeedbacks} />
      <SentimentOverview sentimentAnalysis={dashboard?.sentimentAnalysis} />
      <TopicOverview topTopics={dashboard?.topTopics} />
      <RecentFeedback recentFeedbacks={dashboard?.recentFeedbacks} />
=======
    <div className='grid lg:grid-cols-5 max-lg:grid-cols-1 gap-6 max-lg:gap-5 max-md:gap-4 max-md:grid-cols-1 min-h-0 flex-1'>
      <TopicGraph topicData={dashboard?.topTopics || []} />
      <FeedbackOverview dailyFeedbacks={dashboard?.dailyFeedbacks} />
      <div className='lg:col-span-5 grid lg:grid-cols-3 gap-6 max-lg:gap-5 max-md:gap-4'>
        <SentimentOverview sentimentAnalysis={dashboard?.sentimentAnalysis} />
        <RecentFeedback recentFeedbacks={dashboard?.recentFeedbacks} />
      </div>
>>>>>>> 7b86845a8b1cf13899b4bd13c272958ddb02b008
    </div>
  );
}

export default InfoGrid