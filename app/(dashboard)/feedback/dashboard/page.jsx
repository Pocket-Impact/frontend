"use client"
import FeedbackOverview from '@/components/feedback/FeedbackOverview'
import RecentFeedback from '@/components/feedback/RecentFeedback'
import SentimentOverview from '@/components/feedback/SentimentOverview'
import OverviewCard from '@/components/feedback/surveys/OverviewCard'
import TopicGraph from '@/components/feedback/TopicGraph'
import useFetch from '@/hooks/useFetch'
import React from 'react'
import { MdFeedback } from 'react-icons/md'
import { RiSurveyFill, RiSurveyLine } from 'react-icons/ri'

const Dashboard = () => {
  const { data: dashboardResponse, loading, error } = useFetch('/api/dashboard');

  const dashboardData = dashboardResponse?.status === 'success' ? dashboardResponse.data : null;
  // Calculate percent changes for each metric
  function getPercentChange(arr, key) {
    if (!Array.isArray(arr) || arr.length < 2) return 0;
    const nonZeroDays = arr.filter(d => typeof d[key] === 'number' && d[key] > 0);
    const lastIdx = nonZeroDays.length - 1;
    const last = nonZeroDays[lastIdx]?.[key] ?? 0;
    const prev = nonZeroDays[lastIdx - 1]?.[key] ?? 0;
    if (prev !== 0) {
      return ((last - prev) / prev) * 100;
    } else {
      return last === 0 ? 0 : 100;
    }
  }

  const feedbackIncrease = getPercentChange(dashboardData?.dailyFeedbacks, 'Feedbacks');

  // If you have dailySurveys/dailyResponses, use them here. Otherwise, set to 0 or remove.
  const surveyIncrease = 0;
  const responseIncrease = 0;

  const overviewCards = [
    {
      value: dashboardData?.totals?.surveys?.toString().padStart(2, '0'),
      increase: surveyIncrease,
      title: "Total Surveys",
      subtitle: "All surveys",
      desc: "Create a new survey",
      icon: RiSurveyFill,
    },
    {
      value: dashboardData?.totals?.feedbacks?.toString().padStart(2, '0'),
      increase: feedbackIncrease,
      title: "Total Feedback",
      subtitle: "All feedbacks",
      desc: "View feedbacks",
      icon: MdFeedback,
    },
    {
      value: dashboardData?.totals?.responses?.toString().padStart(2, '0'),
      increase: responseIncrease,
      title: "Survey Responses",
      subtitle: "All responses",
      desc: "View surveys",
      icon: RiSurveyLine,
    },
    {
      value: dashboardData?.sentimentAnalysis
        ? (
          (
            (dashboardData.sentimentAnalysis.find((s) => s.name === 'Positive')?.value ?? 0) /
            (dashboardData.sentimentAnalysis.reduce((acc, s) => acc + (s.value ?? 0), 0) || 1)
          ) * 100
        ).toFixed(2)
        : '0.00',
      increase: 0,
      percent: true,
      title: "Positive sentiment",
      subtitle: "All responses",
      desc: "View surveys",
      icon: RiSurveyFill
    },
  ];

  return (
    <div className='min-h-screen overflow-x-hidden'>
      <div className='flex flex-col gap-4'>
        <div className=''>
          <h1 className='x2l font-semibold'>Dashboard</h1>
        </div>
        <div className='flex flex-col gap-6 max-lg:gap-5 max-md:gap-4'>
          {loading ? (
            <div className='text-black/60 base'>Loading dashboard...</div>
          ) : error ? (
            <div className='text-red-500 mb-4 bg-red-100 w-full p-2 border-2 border-red-400'>{error}</div>
          ) : dashboardData ? (
            <>
              <div className='grid lg:grid-cols-5 gap-6'>
                <div className='grid gap-6 lg:col-span-3 max-lg:gap-5 max-md:gap-4 grid-cols-2 grid-rows-2'>
                  {overviewCards.map((card, idx) => (
                    <OverviewCard key={idx} card={card} index={idx} />
                  ))}
                </div>
                <SentimentOverview sentimentAnalysis={dashboardData?.sentimentAnalysis} />
              </div>
              <div className='grid lg:grid-cols-5 max-lg:grid-cols-1 gap-6 max-lg:gap-5 max-md:gap-4 max-md:grid-cols-1 min-h-0 flex-1'>
                <TopicGraph topicData={dashboardData?.topTopics || []} />
                <FeedbackOverview dailyFeedbacks={dashboardData?.dailyFeedbacks} />
                <div className="lg:col-span-5">
                  <RecentFeedback recentFeedbacks={dashboardData?.recentFeedbacks} />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Dashboard