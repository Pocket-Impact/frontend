import React from 'react';
import { VscFeedback } from 'react-icons/vsc';
import ReactECharts from 'echarts-for-react';

const SentimentOverview = ({ sentimentAnalysis, analytics }: { sentimentAnalysis: any[], analytics?: boolean }) => {
    const option = {
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        series: [
            {
                name: 'Sentiment',
                type: 'pie',
                radius: ['30%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 5,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                data: sentimentAnalysis.map(entry => ({
                    value: entry.value,
                    name: entry.name,
                    itemStyle: entry.color ? { color: entry.color } : undefined
                }))
            }
        ]
    };

    return (
        <div className={`bg-white w-full lg:col-span-2 p5 rounded-xl flex flex-col min-h-0 flex-1 ${analytics ? 'lg:col-span-2' : ''}`}>
            <div className='flex flex-col'>
                <h2 className='lg font-semibold'>
                    Sentimental distribution
                </h2>
                <p className='sm -mt-1 text-black/60'>Feedback sentiment analysis</p>
            </div>
            <div className="w-full h-full flex flex-col items-center">
                {sentimentAnalysis.length > 0 ? (
                    <div className='grid grid-cols-2 h-full gap-2 w-full'>
                        <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
                        <div className='flex justify-center items-center'>
                            <div className='flex flex-col items-start px-2 w-max justify-center my-4 gap-2'>
                                <div className='flex items-center gap-2 font-medium relative min-h-6'>
                                    <div className='bg-green rounded-full h-2 w-2'></div>
                                    <span className='sm'>Positive - {(sentimentAnalysis.find(entry => entry.name === 'Positive')?.value)?.toString().padStart(2, '0')} feedbacks</span>
                                </div>
                                {/* Neutral */}
                                <div className='flex items-center gap-2 font-medium relative min-h-6'>
                                    <div className='bg-yellow-600 rounded-full h-2 w-2'></div>
                                    <span className='sm'>Neutral - {(sentimentAnalysis.find(entry => entry.name === 'Neutral')?.value)?.toString().padStart(2, '0')} feedbacks</span>
                                </div>
                                {/* Negative */}
                                <div className='flex items-center gap-2 font-medium relative min-h-6'>
                                    <div className='bg-red rounded-full h-2 w-2'></div>
                                    <span className='sm'>Negative - {(sentimentAnalysis.find(entry => entry.name === 'Negative')?.value)?.toString().padStart(2, '0')} feedbacks</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-full mt-4 py-3 bg-black/5 text-black/80 rounded-sm flex items-center justify-center'>No sentimental data available</div>
                )}
            </div>
        </div>
    );
};

export default SentimentOverview;
