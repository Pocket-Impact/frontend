import React from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    Tooltip,
    CartesianGrid,
    YAxis,
    Legend
} from 'recharts';

// Dummy data: Each topic has a count for each day
const data = [
    { day: "Mon", Service: 2, Product: 3, Support: 1, Delivery: 4 },
    { day: "Tue", Service: 5, Product: 2, Support: 2, Delivery: 3 },
    { day: "Wed", Service: 3, Product: 4, Support: 3, Delivery: 2 },
    { day: "Thu", Service: 7, Product: 1, Support: 2, Delivery: 5 },
    { day: "Fri", Service: 4, Product: 3, Support: 4, Delivery: 3 },
    { day: "Sat", Service: 6, Product: 2, Support: 3, Delivery: 4 },
    { day: "Sun", Service: 1, Product: 5, Support: 2, Delivery: 2 }
];

const topicColors = {
    Service: '#5B4FD0',
    Product: '#D05B8B',
    Support: '#5BD0A6',
    Delivery: '#D0A65B'
};

const TopicAnalysis = () => {
    return (
        <div className='bg-white border lg:col-span-3 flex flex-col gap-4 border-stroke min-h-0 flex-1 p-4 rounded-lg'>
            <div className='flex items-center gap-2 mb-2'>
                <div className='rounded-sm bg-gray-200 p-1.5'>
                    <VscFeedback className='w-4 max-lg:w-3.5  max-md:w-3 h-auto' />
                </div>
                <h2 className='base font-semibold'>
                    Category Overview
                </h2>
            </div>
            <div className="w-[calc(100%+36px)] h-full -ml-9.5 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" axisLine={{ stroke: '#000000' }} tickLine={false} tick={{ fill: '#000000' }} />
                        <YAxis axisLine={{ stroke: '#000000' }} tickLine={false} tick={{ fill: '#000000' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Service" stroke={topicColors.Service} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="Product" stroke={topicColors.Product} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="Support" stroke={topicColors.Support} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="Delivery" stroke={topicColors.Delivery} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default TopicAnalysis