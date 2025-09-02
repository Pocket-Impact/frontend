import React from 'react'
import FeedbackOverview from './FeedbackOverview';
import RecentFeedback from './RecentFeedback';
import SentimentOverview from './SentimentOverview';
import TopicOverview from './TopicOverview';
import TopicGraph from './TopicGraph';

const InfoGrid = ({ dashboard }: { dashboard: any }) => {
  return (
    <div className='grid lg:grid-cols-5 max-lg:grid-cols-1 gap-6 max-lg:gap-5 max-md:gap-4 max-md:grid-cols-1 min-h-0 flex-1'>
      <TopicGraph />
      <FeedbackOverview dailyFeedbacks={dashboard?.dailyFeedbacks} />
      <div className='lg:col-span-5 grid lg:grid-cols-3 gap-6 max-lg:gap-5 max-md:gap-4'>
        <SentimentOverview sentimentAnalysis={dashboard?.sentimentAnalysis} />
        <RecentFeedback recentFeedbacks={dashboard?.recentFeedbacks} />
      </div>
    </div>
  );
}

export default InfoGrid