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
} from 'recharts';



const topicColors = {
    Service: '#5B4FD0',
    Product: '#D05B8B',
    Support: '#5BD0A6',
    Delivery: '#D0A65B'
};

const TopicGraph = ({ topicData }: { topicData: any[] }) => {
    return (
        <div className='bg-white border lg:col-span-3 flex flex-col gap-4 border-stroke min-h-0 flex-1 p-4 rounded-lg'>
            <div className='flex flex-col'>
                <h2 className='lg font-semibold'>
                    Category
                </h2>
                <p className='sm -mt-1 text-black/60'>Mentioned topics in feedback</p>
            </div>
            <div className="w-[calc(100%+36px)] h-full -ml-9.5 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={topicData}>
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
                        <Line type="monotone" dataKey="percentage" stroke="#848452" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default TopicGraph