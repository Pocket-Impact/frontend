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

// Dummy data: Total feedbacks per category (not daily)
const data = [
    { category: "Service", Feedbacks: 12 },
    { category: "Product", Feedbacks: 4 },
    { category: "Support", Feedbacks: 9 },
    { category: "Delivery", Feedbacks: 5 }
];

const topicColors = {
    Service: '#5B4FD0',
    Product: '#D05B8B',
    Support: '#5BD0A6',
    Delivery: '#D0A65B'
};

const TopicGraph = () => {
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
                        <XAxis
                            dataKey="category"
                            axisLine={{ stroke: '#000000' }}
                            tickLine={false}
                            tick={{ fill: '#000000' }}
                            padding={{ left: 0, right: 0 }}
                        />
                        <YAxis axisLine={{ stroke: '#000000' }} tickLine={false} tick={{ fill: '#000000' }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="Feedbacks" stroke="#848452" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default TopicGraph