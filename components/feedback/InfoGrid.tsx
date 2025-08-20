"use client"
import { apiFetch } from '@/utils/apiFetch';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const dummyDailyFeedbacks = [
  { day: "Mon", Feedbacks: 2 },
  { day: "Tue", Feedbacks: 5 },
  { day: "Wed", Feedbacks: 3 },
  { day: "Thu", Feedbacks: 7 },
  { day: "Fri", Feedbacks: 4 },
  { day: "Sat", Feedbacks: 6 },
  { day: "Sun", Feedbacks: 1 },
];

const InfoGrid = () => {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      const surveyRes = await apiFetch('/api/surveys');
      const surveyData = await surveyRes.json();
      setSurveys(surveyData.data.surveys);
      setIsLoading(false);
    }
    fetchSurveys();
  }, []);

  return (
    <div className='grid grid-cols-5 gap-4 h-[436px]'>
      <div className='bg-white border col-span-2 flex flex-col gap-4 border-stroke h-full p-4 pb-1 rounded-lg'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-2'>
            <div className='bg-black/10 p-2 rounded-sm'>
              <VscFeedback className='w-3.5 h-auto' />
            </div>
            <h2 className='sm font-medium'>
              Feedback Overview
            </h2>
          </div>
          <div>
            <div className='flex flex-col items-center gap-1'>
              <div className={`bg-red-100 text-red-500 xs w-max px-1.5 p-1 rounded-sm flex items-center gap-1`}>
                <span>18.5 %</span>
                <MdOutlineArrowOutward className='text-red-600 rotate-90' />
              </div>
              <span className='xs'> - 26 Today</span>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dummyDailyFeedbacks}>
              <XAxis
                dataKey="day"
                axisLine={{ stroke: '#0A400C' }}
                tickLine={false}
                tick={{ fill: '#0A400C' }}
              />
              <Tooltip cursor={{ fill: 'rgba(10, 64, 12, 0.1)' }} />
              <Bar
                dataKey="Feedbacks"
                fill="#0A400CEE"
                radius={[8, 8, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default InfoGrid