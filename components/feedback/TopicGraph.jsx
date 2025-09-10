import React from 'react';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const topicColors = {
    Service: '#5B4FD0',
    Product: '#D05B8B',
    Support: '#5BD0A6',
    Delivery: '#D0A65B'
};

const TopicGraph = ({ topicData }) => {
    const xLabels = topicData.map(item => item.category ?? '');
    const yValues = topicData.map(item => item.percentage);

    const option = {
        tooltip: {
            trigger: 'axis'
        },
        textStyle: {
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
        },
        grid: { left: 30, right: 40, top: 20, bottom: 20 },
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
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                        { offset: 0, color: 'rgba(0, 200, 0, 0.4)' },
                        { offset: 0.4, color: 'rgba(0, 200, 0, 0)' }
                    ])
                },
                lineStyle: {
                    color: '#00c000'
                },
                itemStyle: {
                    color: '#00c000'
                }
            }
        ]
    };

    return (
        <div className='bg-white lg:col-span-3 flex flex-col gap-4 min-h-0 flex-1 p-4 rounded-lg'>
            <div className='flex flex-col'>
                <h2 className='lg font-semibold'>
                    Category
                </h2>
                <p className='sm -mt-1 text-black/60'>Mentioned topics in feedback</p>
            </div>
            <div className="w-full h-full">
                <ReactECharts option={option} className='w-full h-full' />
            </div>
        </div>
    );
}

TopicGraph.propTypes = {
    topicData: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.string,
            percentage: PropTypes.number,
        })
    ).isRequired,
};
export default TopicGraph;