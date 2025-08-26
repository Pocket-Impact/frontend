import React from 'react';
import { MdSentimentVerySatisfied } from 'react-icons/md';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const chartData = [
  { name: 'Positive', value: 2, color: '#7ccf00' },
  { name: 'Negative', value: 3, color: '#ff6900' },
  { name: 'Neutral', value: 6, color: '#efb100' },
];

const SentimentOverview = () => {
  return (
    <div className="bg-white border p4 rounded-lg border-stroke flex flex-col min-h-0 flex-1">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-black/10 p-2 rounded-sm">
          <MdSentimentVerySatisfied className="w-4 h-auto max-lg:w-3.5 max-md:w-3" />
        </div>
        <h2 className="font-medium text-sm base">Sentimental Overview</h2>
      </div>

      <div className="w-full flex-grow">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
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
              {chartData.map((entry) => (
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
