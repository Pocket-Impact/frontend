import React from "react";
import ReactECharts from "echarts-for-react";

// Use blue and green for sentiment colors
const sentimentColors = {
  positive: "#22c55e", // green
  neutral: "#3b82f6", // blue
  negative: "#3b82f6", // blue
};

const ExecutiveSummaryCharts = ({
  keyMetrics,
  sentimentOverview,
}) => {
  // Donut chart for sentiment
  const sentimentOption = {
    tooltip: {
      trigger: "item",
      backgroundColor: "#1f2937",
      borderColor: "transparent",
      textStyle: { color: "#ffffff" },
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: "Sentiment",
        type: "pie",
        radius: ["60%", "85%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: "#ffffff",
          borderWidth: 3,
        },
        label: { show: false },
        emphasis: {
          scale: true,
          scaleSize: 5,
        },
        labelLine: { show: false },
        data: sentimentOverview.map((s, i) => {
          // If _id is missing, fallback to label
          const labels = ["positive", "neutral", "negative"];
          const label = s._id ? s._id : labels[i] || `sentiment${i + 1}`;
          return {
            value: s.count,
            name: label.charAt(0).toUpperCase() + label.slice(1),
            itemStyle: { color: sentimentColors[label] || "#3b82f6" },
          };
        }),
      },
    ],
  };

  // Bar chart for key metrics
  const metricsOption = {
    tooltip: {
      backgroundColor: "#1f2937",
      borderColor: "transparent",
      textStyle: { color: "#ffffff" },
    },
    xAxis: {
      type: "category",
      data: ["Surveys", "Responses", "Feedbacks", "Users"],
      axisLabel: {
        fontWeight: "600",
        color: "#64748b",
        fontSize: 12,
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#94a3b8",
        fontSize: 11,
      },
      splitLine: {
        lineStyle: {
          color: "#f1f5f9",
          width: 1,
        },
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    grid: {
      left: 40,
      right: 40,
      top: 30,
      bottom: 50,
      containLabel: true,
    },
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
          borderRadius: [12, 12, 0, 0],
          color: function (params) {
            const palette = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"];
            return palette[params.dataIndex] || "#64748b";
          },
        },
        barWidth: "60%",
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: "rgba(0, 0, 0, 0.1)",
          },
        },
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Key Metrics Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Key Metrics Overview
          </h3>
          <p className="text-sm text-slate-500">
            Total platform activity summary
          </p>
        </div>

        <div className="mb-6">
          <ReactECharts
            option={metricsOption}
            style={{ height: 280, width: "100%" }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {keyMetrics.totalSurveys}
            </div>
            <div className="text-sm font-medium text-emerald-700">Surveys</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {keyMetrics.totalResponses}
            </div>
            <div className="text-sm font-medium text-blue-700">Responses</div>
          </div>
          <div className="bg-violet-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-violet-600 mb-1">
              {keyMetrics.totalFeedbacks}
            </div>
            <div className="text-sm font-medium text-violet-700">Feedbacks</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-amber-600 mb-1">
              {keyMetrics.totalUsers}
            </div>
            <div className="text-sm font-medium text-amber-700">Users</div>
          </div>
        </div>
      </div>

      {/* Sentiment Overview Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Sentiment Analysis
          </h3>
          <p className="text-sm text-slate-500">
            Feedback sentiment distribution
          </p>
        </div>

        <div className="mb-6">
          <ReactECharts
            option={sentimentOption}
            style={{ height: 280, width: "100%" }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {sentimentOverview.map((s, i) => {
            const labels = ["positive", "neutral", "negative"];
            const label = s._id ? s._id : labels[i] || `sentiment${i + 1}`;
            const colorMap = {
              positive: { bg: "bg-emerald-50", text: "text-emerald-600" },
              neutral: { bg: "bg-blue-50", text: "text-blue-600" },
              negative: { bg: "bg-blue-50", text: "text-blue-600" },
            };
            const colors = colorMap[label] || {
              bg: "bg-blue-50",
              text: "text-blue-600",
            };
            return (
              <div
                key={label}
                className={`${colors.bg} rounded-xl p-4 text-center`}
              >
                <div className={`text-xl font-bold ${colors.text} mb-1`}>
                  {s.count}
                </div>
                <div
                  className={`text-sm font-medium ${colors.text} capitalize`}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Sentiment Count */}
        <div className="mt-4 text-center">
          <div className="text-xs text-slate-400">
            Total Analyzed:{" "}
            {sentimentOverview.reduce((sum, s) => sum + s.count, 0)} feedbacks
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummaryCharts;
