import React from "react";
import ReactECharts from "echarts-for-react";

interface Topic {
  category?: string;
  name?: string;
  percentage?: number;
  color?: string;
  count?: number;
}

interface TopicOverviewProps {
  topTopics: Topic[];
}

const TopicOverview: React.FC<TopicOverviewProps> = ({ topTopics }) => {
  return (
    <div className="bg-white flex flex-col h-full gap-3 p-4 rounded-xl">
      <div className="flex flex-col">
        <h2 className="lg font-semibold">Trending topics</h2>
        <p className="sm -mt-1 text-black/60">
          Most mentioned topics in feedback
        </p>
      </div>
      {topTopics.length > 0 ? (
        <div className="w-full h-full">
          <ReactECharts
            option={{
              tooltip: {
                trigger: "axis",
                axisPointer: { type: "shadow" },
                formatter: function (
                  params:
                    | { name: string; value: number }[]
                    | { name: string; value: number }
                ) {
                  const p = Array.isArray(params) ? params[0] : params;
                  return `<b>${p.name}</b>: ${p.value}%`;
                },
              },
              xAxis: {
                type: "category",
                data: topTopics.map((t) => t.category || t.name),
                axisLabel: { fontWeight: "bold", fontSize: 14 },
              },
              yAxis: {
                type: "value",
                axisLabel: { formatter: "{value} %" },
                max: 100,
                splitLine: { show: false },
              },
              series: [
                {
                  name: "Percentage",
                  type: "bar",
                  data: topTopics.map((t) => t.percentage ?? 0),
                  itemStyle: {
                    color: "#3b82f6",
                    borderRadius: [6, 6, 0, 0],
                  },
                  barWidth: 32,
                  label: {
                    show: true,
                    position: "top",
                    formatter: "{c} %",
                    fontWeight: "bold",
                    fontSize: 13,
                  },
                },
              ],
            }}
            style={{
              width: "100%",
              height: Math.max(260, topTopics.length * 40),
            }}
          />
        </div>
      ) : (
        <div className="w-full h-full bg-black/5 text-black/80 rounded-sm min-h-80 flex items-center justify-center">
          No topic data available
        </div>
      )}
    </div>
  );
};

export default TopicOverview;
