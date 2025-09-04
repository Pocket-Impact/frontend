import React from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    CartesianGrid,
    YAxis,
    Area,
    AreaChart
} from 'recharts';

const FeedbackOverview = ({ dailyFeedbacks, analytics }: { dailyFeedbacks: any[], analytics?: boolean }) => {
    const option = {
        grid: { left: 30, right: 2, top: 20, bottom: 20 },
        tooltip: {
            trigger: 'axis'
        },
        textStyle: {
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                        { offset: 0, color: 'rgba(0, 200, 0, 0.4)' },
                        { offset: 0.4, color: 'rgba(0, 200, 0, 0)' }
                    ])
                },
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    };

    const data = {
        grid: { left: 30, right: 12, top: 20, bottom: 20 },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }
        ]
    };
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
        <div className={`bg-white ${analytics ? 'lg:col-span-2' : 'lg:col-span-2'} flex flex-col gap-4 min-h-0 flex-1 p-4 rounded-xl`}>
            <div className='flex items-start justify-between'>
                <div className='flex flex-col'>
                    <h2 className='lg font-semibold'>
                        Feedback Overview
                    </h2>
                    <p className='sm -mt-1 text-black/60'>Feedback trend</p>
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
            {dailyFeedbacks.length > 0 ? (
                <div className="w-full h-full min-h-[200px]">
                    {analytics ? (
                        <ReactECharts option={data} className='w-full h-full' />
                    ) : (
                        <ReactECharts option={option} className='w-full h-full' />
                    )}
                </div>
            ) : (
                <div className='w-full h-full bg-black/5 text-black/80 rounded-lg sm flex items-center justify-center'>No feedback data available</div>
            )}
        </div>
    );
}

export default FeedbackOverview