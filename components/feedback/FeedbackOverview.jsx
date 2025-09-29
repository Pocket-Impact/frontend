import { percentChange } from '../../utils/mathUtils';
import React from 'react';
import PropTypes from 'prop-types';
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

const FeedbackOverview = ({ dailyFeedbacks, analytics }) => {
    let xLabels = [];
    let yValues = [];
    try {
        xLabels = dailyFeedbacks.map(d => d.day);
        yValues = dailyFeedbacks.map(d => typeof d.Feedbacks === 'number' ? d.Feedbacks : 0);
    } catch (err) {
        console.error('FeedbackOverview: Error preparing chart data', err, dailyFeedbacks);
        xLabels = [];
        yValues = [];
    }

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
            data: xLabels
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
                data: yValues,
                type: 'bar'
            }
        ]
    };

    const lineOption = {
        grid: { left: 30, right: 12, top: 20, bottom: 20 },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xLabels
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: yValues,
                type: 'line',
                areaStyle: {}
            }
        ]
    };
    let percentChangeValue = 0;
    let todayCount = 0;
    let diff = 0;
    if (dailyFeedbacks && dailyFeedbacks.length > 1) {
        const nonZeroDays = dailyFeedbacks.filter(d => typeof d.Feedbacks === 'number' && d.Feedbacks > 0);
        const lastIdx = nonZeroDays.length - 1;
        const last = nonZeroDays[lastIdx]?.Feedbacks ?? 0;
        const prev = nonZeroDays[lastIdx - 1]?.Feedbacks ?? 0;
        todayCount = last;
        diff = last - prev;
        percentChangeValue = percentChange(last, prev);
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
                            <span>{percentChangeValue > 0 ? `+ ${percentChangeValue.toFixed(1)}%` : `${percentChangeValue.toFixed(1)}%`}</span>
                            <MdOutlineArrowOutward className={`text-${isDecline ? 'red' : 'lime'}-600 ${isDecline ? 'rotate-90' : '-rotate-90'}`} />
                        </div>
                        <span className='xs'> {diff > 0 ? `+ ${diff}` : diff} today</span>                    </div>
                </div>
            </div>
            {dailyFeedbacks.length > 0 ? (
                <div className="w-full h-full min-h-[200px]">
                    {analytics ? (
                        <ReactECharts option={lineOption} className='w-full h-full' />
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

FeedbackOverview.propTypes = {
    dailyFeedbacks: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            Feedbacks: PropTypes.number,
        })
    ).isRequired,
    analytics: PropTypes.bool,
};

export default FeedbackOverview;