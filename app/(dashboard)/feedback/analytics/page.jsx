"use client"
import FeedbackOverview from '@/components/feedback/FeedbackOverview'
import RecentFeedback from '@/components/feedback/RecentFeedback'
import SentimentOverview from '@/components/feedback/SentimentOverview'
import OverviewCard from '@/components/feedback/surveys/OverviewCard'
import TopicAnalysis from '@/components/feedback/TopicAnalysis'
import TopicOverview from '@/components/feedback/TopicOverview'
import { apiFetch } from '@/utils/apiFetch'
import React, { useEffect, useState } from 'react'
import { MdFeedback } from 'react-icons/md'
import { RiSurveyFill, RiSurveyLine } from 'react-icons/ri'

const page = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch('/api/dashboard');
        const data = await res.json();
        if (res.ok && data.status === 'success') {
          console.log(data);
          setDashboardData(data.data);
        } else {
          console.log(data.data.dailyFeedbacks);
          setError(data.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Server error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className='min-h-screen'>
      <div className='flex flex-col h-full gap-4'>
        <div className=''>
          <h1 className='x2l font-semibold'>Analytics</h1>
        </div>
        <div className='flex flex-col h-full gap-6'>
          {loading ? (
            <div className='text-black/60 base'>Loading analytics...</div>
          ) : error ? (
            <div className='text-red-500 mb-4 bg-red-100 w-full p-2 border-2 border-red-400'>{error}</div>
          ) : dashboardData ? (
            <>
              <div className='grid gap-6 max-lg:gap-2.5 max-md:gap-2 grid-cols-4 max-[1241px]:grid-cols-2 max-md:grid-cols-1'>
                {overviewCards.map((card, index) => (
                  <OverviewCard analysis={true} key={index} card={card} index={index} />
                ))}
              </div >
              <div className='grid lg:grid-cols-5 max-lg:grid-cols-1 gap-6 max-lg:gap-2.5 max-md:gap-2 max-md:grid-cols-1 min-h-0 flex-1'>
                <div className='lg:col-span-3'>
                  <TopicAnalysis />
                </div>
                <div className='lg:col-span-2'>
                  <SentimentOverview analytics={true} sentimentAnalysis={dashboardData?.sentimentAnalysis} />
                </div>
                <div className='lg:col-span-2'>
                  <TopicOverview topTopics={dashboardData?.topTopics} />
                </div>
                <div className='lg:col-span-3'>
                  <FeedbackOverview analytics={true} dailyFeedbacks={dashboardData?.dailyFeedbacks} />
                </div>
                <div className='lg:col-span-5'>
                  <RecentFeedback analytics={true} recentFeedbacks={dashboardData?.recentFeedbacks} />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default page