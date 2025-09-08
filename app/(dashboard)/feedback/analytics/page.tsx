"use client"
import FeedbackOverview from '@/components/feedback/FeedbackOverview'
import InfoGrid from '@/components/feedback/InfoGrid'
import OverviewGrid from '@/components/feedback/OverviewGrid'
import RecentFeedback from '@/components/feedback/RecentFeedback'
import SentimentOverview from '@/components/feedback/SentimentOverview'
import OverviewCard from '@/components/feedback/surveys/OverviewCard'
import TopicAnalysis from '@/components/feedback/TopicAnalysis'
import TopicOverview from '@/components/feedback/TopicOverview'
import { apiFetch } from '@/utils/apiFetch'
import React, { useEffect, useState } from 'react'
import { HiOutlineEye } from 'react-icons/hi2'
import { IoAdd } from 'react-icons/io5'
import { MdFeedback } from 'react-icons/md'
import { RiSurveyFill, RiSurveyLine } from 'react-icons/ri'
import { VscFeedback } from 'react-icons/vsc'

const page = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      } catch (err: any) {
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
                <div className='lg:col-span-5 grid lg:grid-cols-3 lg:gap-6'>
                  <div className='lg:col-span-3'>
                    <FeedbackOverview analytics={true} dailyFeedbacks={dashboardData?.dailyFeedbacks} />
                  </div>
                  <div className='lg:col-span-2'>
                    <TopicOverview topTopics={dashboardData?.topTopics} />
                  </div>
                  <div className='lg:col-span-5'>
                    <RecentFeedback analytics={true} recentFeedbacks={dashboardData?.recentFeedbacks} />
                  </div>
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