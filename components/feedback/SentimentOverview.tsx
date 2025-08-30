import React from 'react';
import { VscFeedback } from 'react-icons/vsc';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Sector, SectorProps } from 'recharts';

type Coordinate = {
    x: number;
    y: number;
};

type PieSectorData = {
    percent?: number;
    name?: string | number;
    midAngle?: number;
    middleRadius?: number;
    tooltipPosition?: Coordinate;
    value?: number;
    paddingAngle?: number;
    dataKey?: string;
    payload?: any;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;

const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
}: PieSectorDataItem) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={(outerRadius ?? 0) + 6}
                outerRadius={(outerRadius ?? 0) + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${(value !== undefined ? value.toString().padStart(2, '0') : '00')}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${((percent ?? 1) * 100).toFixed(1)}%)`}
            </text>
        </g>
    );
};

const chartData = [
    { name: 'Positive', value: 2, color: '#47b89b' },
    { name: 'Negative', value: 3, color: '#d25871' },
    { name: 'Neutral', value: 6, color: '#efb100' },
];

const SentimentOverview = ({ sentimentAnalysis, analytics }: { sentimentAnalysis: any[], analytics?: boolean }) => {
    return (
        <div className={`bg-white border w-full p4 rounded-lg border-stroke flex flex-col min-h-0 flex-1 ${analytics ? 'lg:col-span-2' : ''}`}>
            <div className='flex flex-col'>
                <h2 className='lg font-semibold'>
                    Sentimental distribution
                </h2>
                <p className='sm -mt-1 text-black/60'>Feedback sentiment analysis</p>
            </div>
            <div className="w-full h-full flex flex-col items-center">
                {sentimentAnalysis.length > 0 ? (
                    <>
                        <div className='flex items-center px-2 justify-between w-full my-4 gap-2'>
                            <div className='flex flex-col gap-1 relative min-h-6'>
                                <span className='xs border-l-3 border-green text-black/60 px-2'>Positive</span>
                                <div className='flex items-center gap-2'>
                                    <VscFeedback className='w-4 text-black/70 max-lg:w-3.5  max-md:w-3 h-auto' />
                                    <span className='lg font-semibold'>{(sentimentAnalysis.find(entry => entry.name === 'Positive')?.value)?.toString().padStart(2, '0')}</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 relative min-h-6'>
                                <span className='xs border-l-3 border-red text-black/60 px-2'>Negative</span>
                                <div className='flex items-center gap-2'>
                                    <VscFeedback className='w-4 text-black/70 max-lg:w-3.5  max-md:w-3 h-auto' />
                                    <span className='lg font-semibold'>{(sentimentAnalysis.find(entry => entry.name === 'Negative')?.value)?.toString().padStart(2, '0')}</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 relative min-h-6'>
                                <span className='xs border-l-3 border-yellow-600 text-black/60 px-2'>Neutral</span>
                                <div className='flex items-center gap-2'>
                                    <VscFeedback className='w-4 text-black/70 max-lg:w-3.5  max-md:w-3 h-auto' />
                                    <span className='lg font-semibold'>{(0).toString().padStart(2, '0')}</span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    activeShape={renderActiveShape}
                                    data={sentimentAnalysis}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {sentimentAnalysis?.map((entry) => (
                                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </>
                ) : (
                    <div className='w-full h-full mt-4 py-3 bg-black/5 text-black/80 rounded-sm flex items-center justify-center'>No sentimental data available</div>
                )}
            </div>
        </div>
    );
};

export default SentimentOverview;
