import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const chartData = [
    { name: 'Positive', value: 2, color: '#00FF00' },
    { name: 'Negative', value: 3, color: '#FF0000' },
    { name: 'Neutral', value: 6, color: '#efb100' },
];

const SentimentOverview = ({ sentimentAnalysis }: { sentimentAnalysis: any[] }) => {
    return (
        <div className="bg-white border p4 rounded-lg border-stroke flex flex-col min-h-0 flex-1">
            <div className='flex flex-col'>
                <h2 className='lg font-semibold'>
                    Sentimental Overview
                </h2>
                <p className='sm -mt-1 text-black/60'>Feedback sentiment analysis</p>
            </div>
            <div className="w-full flex-grow">
                <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                        <Pie
                            data={sentimentAnalysis}
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            cx="50%"
                            cy="80%"
                            innerRadius={60}
                            outerRadius={100}
                            cornerRadius={10}
                            stroke="none"
                        >
                            {sentimentAnalysis?.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SentimentOverview;
