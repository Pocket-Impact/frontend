import React, { useEffect, useState } from 'react'

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
import { apiFetch } from '@/utils/apiFetch';

type DailyCategoryData = {
    day: string;
    [category: string]: string | number;
};

const topicColors: Record<string, string> = {
    Product: '#D05B8B',
    Ux: '#5B4FD0',
    Support: '#5BD0A6',
    Pricing: '#D0A65B',
    Features: '#A65BD0',
    Performance: '#5BD0D0',
    Other: '#D05B5B',
};


const TopicAnalysis = () => {
    const [data, setData] = useState<DailyCategoryData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiFetch('/api/dashboard/daily-categories');
                const result = await response.json();
                if (result.status === 'success') {
                    setData(result.data);
                } else {
                    setError(result.message || 'Failed to fetch data');
                }
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Get all categories from topicColors that exist in the data
    const categories = Object.keys(topicColors).filter(cat =>
        data.some(d => Object.keys(d).includes(cat))
    );

    return (
        <div className='bg-white border lg:col-span-3 flex flex-col gap-4 border-stroke min-h-0 flex-1 p-4 rounded-lg'>
            <div className='flex flex-col'>
                <h2 className='lg font-semibold'>
                    Category
                </h2>
                <p className='sm -mt-1 text-black/60'>Mentioned topics in feedback</p>
            </div>
            <div className="w-[calc(100%+36px)] h-full -ml-8 min-h-[300px]">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-gray-500">Loading...</div>
                ) : error ? (
                    <div className="flex items-center justify-center h-full text-red-500">{error}</div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" axisLine={{ stroke: '#000000' }} tickLine={false} tick={{ fill: '#000000' }} />
                            <YAxis axisLine={{ stroke: '#000000' }} tickLine={false} tick={{ fill: '#000000' }} />
                            <Tooltip />
                            <Legend />
                            {categories.map(category => (
                                <Line
                                    key={category}
                                    type="monotone"
                                    dataKey={category}
                                    stroke={topicColors[category]}
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}

export default TopicAnalysis