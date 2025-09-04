import React from "react";
import ReactECharts from "echarts-for-react";

export interface ExecutiveSummaryChartsProps {
  keyMetrics: {
    totalSurveys: number;
    totalResponses: number;
    totalFeedbacks: number;
    totalUsers: number;
    avgResponseRate?: number;
  };
  sentimentOverview: Array<{ _id: string; count: number }>;
}

const sentimentColors: Record<string, string> = {
  positive: "#22c55e",
  neutral: "#64748b",
  negative: "#ef4444",
};

const ExecutiveSummaryCharts: React.FC<ExecutiveSummaryChartsProps> = ({
  keyMetrics,
  sentimentOverview,
}) => {
  // Donut chart for sentiment
  const sentimentOption = {
    tooltip: { trigger: "item" },
    legend: { top: "5%", left: "center" },
    series: [
      {
        name: "Sentiment",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { show: false, position: "center" },
        emphasis: {
          label: { show: true, fontSize: 18, fontWeight: "bold" },
        },
        labelLine: { show: false },
        data: sentimentOverview.map((s) => ({
          value: s.count,
          name: s._id.charAt(0).toUpperCase() + s._id.slice(1),
          itemStyle: { color: sentimentColors[s._id] || "#64748b" },
        })),
      },
    ],
  };

  // Bar chart for key metrics
  const metricsOption = {
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["Surveys", "Responses", "Feedbacks", "Users"],
      axisLabel: { fontWeight: "bold", color: "#64748b" },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#64748b" },
      splitLine: { show: false },
    },
    grid: { left: 30, right: 30, top: 40, bottom: 30 },
    series: [
      {
        data: [
          keyMetrics.totalSurveys,
          keyMetrics.totalResponses,
          keyMetrics.totalFeedbacks,
          keyMetrics.totalUsers,
        ],
        type: "bar",
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: function (params: any) {
            const palette = ["#22c55e", "#3b82f6", "#a855f7", "#f59e42"];
            return palette[params.dataIndex] || "#64748b";
          },
        },
        barWidth: 40,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Key Metrics Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Key Metrics
        </h3>
        <ReactECharts
          option={metricsOption}
          style={{ height: 320, width: "100%" }}
        />
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">
              {keyMetrics.totalSurveys}
            </div>
            <div className="text-sm text-gray-600">Surveys</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">
              {keyMetrics.totalResponses}
            </div>
            <div className="text-sm text-gray-600">Responses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">
              {keyMetrics.totalFeedbacks}
            </div>
            <div className="text-sm text-gray-600">Feedbacks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-700">
              {keyMetrics.totalUsers}
            </div>
            <div className="text-sm text-gray-600">Users</div>
          </div>
        </div>
      </div>
      {/* Sentiment Donut Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Sentiment Overview
        </h3>
        <ReactECharts
          option={sentimentOption}
          style={{ height: 320, width: "100%" }}
        />
        <div className="flex justify-center gap-6 mt-4">
          {sentimentOverview.map((s) => (
            <div key={s._id} className="text-center">
              <div
                className="text-lg font-bold"
                style={{ color: sentimentColors[s._id] || "#64748b" }}
              >
                {s.count}
              </div>
              <div className="text-sm text-gray-600 capitalize">{s._id}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummaryCharts;
