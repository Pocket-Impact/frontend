"use client"
import { apiFetch } from '@/utils/apiFetch';
import React, { useEffect, useState } from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    CartesianGrid,
    YAxis
} from 'recharts';

const data = [
    { day: "Mon", Feedbacks: 2 },
    { day: "Tue", Feedbacks: 5 },
    { day: "Wed", Feedbacks: 3 },
    { day: "Thu", Feedbacks: 7 },
    { day: "Fri", Feedbacks: 4 },
    { day: "Sat", Feedbacks: 6 },
    { day: "Sun", Feedbacks: 1 },
    { day: "Sun", Feedbacks: 1 },
    { day: "Sun", Feedbacks: 1 },
];

const FeedbackOverview = ({ dailyFeedbacks }: { dailyFeedbacks: any[] }) => {
    return (
        <div className='bg-white border row-span-2 lg:col-span-2 flex flex-col gap-4 border-stroke min-h-0 flex-1 p-4 rounded-lg'>
            <div className='flex items-start justify-between'>
                <div className='flex flex-col'>
                    <h2 className='lg font-semibold'>
                        Feedback Overview
                    </h2>
                    <p className='sm -mt-1 text-black/60'>Feedback trend</p>
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
            <div className="w-full h-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyFeedbacks}>
                        <XAxis
                            dataKey="day"
                            axisLine={{ stroke: '#191C1F' }}
                            tickLine={false}
                            tick={{ fill: '#0A400C' }}
                        />
                        <YAxis
                            dataKey="Feedbacks"
                            axisLine={{ stroke: '#191C1F' }}
                            tickLine={false}
                            tick={{ fill: '#0A400C' }}
                        />
                        <Tooltip cursor={{ fill: 'rgba(10, 64, 12, 0.1)' }} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <Area
                            type="monotone"
                            dataKey="Feedbacks"
                            stroke="#212121"
                            fill="#AAAAAA"
                            strokeWidth={2}
                            isAnimationActive={true}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default FeedbackOverview