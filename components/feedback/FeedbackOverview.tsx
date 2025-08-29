import React from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
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
    // Use /api/dashboard format: dailyFeedbacks is array of { day, Feedbacks }
    let percentChange = 0;
    let todayCount = 0;
    let diff = 0;
    if (dailyFeedbacks && dailyFeedbacks.length > 1) {
        // Find last two non-zero feedback days
        const nonZeroDays = dailyFeedbacks.filter(d => typeof d.Feedbacks === 'number' && d.Feedbacks > 0);
        const lastIdx = nonZeroDays.length - 1;
        const last = nonZeroDays[lastIdx]?.Feedbacks ?? 0;
        const prev = nonZeroDays[lastIdx - 1]?.Feedbacks ?? 0;
        todayCount = last;
        diff = last - prev;
        if (prev !== 0) {
            percentChange = ((last - prev) / prev) * 100;
        } else {
            percentChange = last === 0 ? 0 : 100;
        }
    }
    const isDecline = diff < 0;

    return (
        <div className='bg-white border lg:col-span-2 flex flex-col gap-4 border-stroke min-h-0 flex-1 p-4 rounded-lg'>
            <div className='flex items-start justify-between'>
                <div className='flex items-center gap-2'>
                    <div className='rounded-sm bg-gray-200 p-1.5'>
                        <VscFeedback className='w-4 max-lg:w-3.5  max-md:w-3 h-auto' />
                    </div>
                    <h2 className='base font-semibold'>
                        Feedback Overview
                    </h2>
                </div>
                <div>
                    <div className='flex flex-col items-end gap-1'>
                        <div className={`${isDecline ? 'bg-light-red' : 'bg-light-green'} ${isDecline ? 'text-[#d25871]' : 'text-green'} xs w-max px-1.5 p-1 rounded-lg flex items-center gap-1`}>
                            <span>{percentChange > 0 ? `+ ${percentChange.toFixed(1)}%` : `${percentChange.toFixed(1)}%`}</span>
                            <MdOutlineArrowOutward className={`text-${isDecline ? 'red' : 'lime'}-600 ${isDecline ? 'rotate-90' : '-rotate-90'}`} />
                        </div>
                        <span className='xs'> {diff > 0 ? `+ ${diff}` : diff} today</span>                    </div>
                </div>
            </div>
            <div className="w-full h-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyFeedbacks}>
                        <defs>
                            <linearGradient id="primaryBarGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0A400C" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#0A400C" stopOpacity={0.6} />
                            </linearGradient>
                        </defs>
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
                        <Bar
                            dataKey="Feedbacks"
                            fill="url(#primaryBarGradient)"
                            radius={[6, 6, 0, 0]}
                            isAnimationActive={true}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default FeedbackOverview