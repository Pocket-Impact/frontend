import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { apiFetch } from '@/utils/apiFetch';


const topicColors = {
    Product: '#D05B8B',
    Ux: '#5B4FD0',
    Support: '#5BD0A6',
    Pricing: '#D0A65B',
    Features: '#A65BD0',
    Performance: '#5BD0D0',
    Other: '#D05B5B',
};


const TopicAnalysis = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Prepare dynamic chart option from fetched data
    const days = data.map(d => d.day);
    const categories = Object.keys(topicColors).filter(cat =>
        data.some(d => Object.keys(d).includes(cat))
    );
    const series = categories.map(category => ({
        name: category,
        type: 'line',
        stack: 'Total',
        emphasis: { focus: 'series' },
        lineStyle: { color: topicColors[category] },
        itemStyle: { color: topicColors[category] },
        data: data.map(d => typeof d[category] === 'number' ? d[category] : 0)
    }));

    const option = {
        grid: { left: 70, right: 12, top: 40, bottom: 20 },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: days
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        legend: {
            orient: 'horizontal',
            data: categories
        },
        series: series
    };
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


    return (
        <div className='bg-white h-full lg:col-span-3 flex flex-col gap-4 min-h-0 flex-1 p-4 rounded-lg'>
            <div className='flex flex-col'>
                <h2 className='lg font-semibold'>
                    Category
                </h2>
                <p className='sm -mt-1 text-black/60'>Mentioned topics in feedback</p>
            </div>
            {data.length > 0 ? (
                <div className="w-[calc(100%+36px)] h-full -ml-8 min-h-[300px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-full text-gray-500">Loading...</div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-full text-red-500">{error}</div>
                    ) : (
                        <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
                    )}
                </div>
            ) : (
                <div className='w-full h-full bg-black/5 text-black/80 rounded-lg sm flex items-center justify-center'>No topic data available</div>
            )}
        </div>
    );
}

export default TopicAnalysis