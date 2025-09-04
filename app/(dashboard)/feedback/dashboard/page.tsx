"use client"
import FeedbackOverview from '@/components/feedback/FeedbackOverview'
import InfoGrid from '@/components/feedback/InfoGrid'
import OverviewGrid from '@/components/feedback/OverviewGrid'
import RecentFeedback from '@/components/feedback/RecentFeedback'
import SentimentOverview from '@/components/feedback/SentimentOverview'
import OverviewCard from '@/components/feedback/surveys/OverviewCard'
import TopicGraph from '@/components/feedback/TopicGraph'
import { apiFetch } from '@/utils/apiFetch'
import React, { useEffect, useState } from 'react'
import { HiOutlineEye } from 'react-icons/hi'
import { MdFeedback } from 'react-icons/md'
import { RiSurveyFill, RiSurveyLine } from 'react-icons/ri'
import { VscFeedback } from 'react-icons/vsc'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch('/api/dashboard');
        const data = await res.json();
        if (res.ok && data.status === 'success') {
          setDashboardData(data.data);
        } else {
          console.log(data);
          setError(data.message || 'Failed to fetch dashboard data');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);
  const overviewCards = [
    {
      value: dashboardData?.totals?.surveys?.toString().padStart(2, '0'),
      increase: 80,
      title: "Total Surveys",
      subtitle: "All surveys",
      desc: "Create a new survey",
      icon: RiSurveyFill,
    },
    {
      value: dashboardData?.totals?.feedbacks?.toString().padStart(2, '0'),
      increase: 60.5,
      title: "Total Feedback",
      subtitle: "All feedbacks",
      desc: "View feedbacks",
      icon: MdFeedback,
    },
    {
      value: dashboardData?.totals?.responses?.toString().padStart(2, '0'),
      increase: -20,
      title: "Survey Responses",
      subtitle: "All responses",
      desc: "View surveys",
      icon: RiSurveyLine,
    },
    {
      value: dashboardData?.sentimentAnalysis
        ? (
          (
            (dashboardData.sentimentAnalysis.find((s: any) => s.name === 'Positive')?.value ?? 0) /
            (dashboardData.sentimentAnalysis.reduce((acc: number, s: any) => acc + (s.value ?? 0), 0) || 1)
          ) * 100
        ).toFixed(2)
        : '0.00',
      increase: 30,
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