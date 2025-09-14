"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  MessageSquare,
  FileText,
  TrendingUp,
  Filter,
} from "lucide-react";
import EditModal from "@/components/report/EditModal";
import ReportsTable from "@/components/report/ReportsTable";
import ExecutiveSummaryCharts from "@/components/report/ExecutiveSummaryCharts";
import { apiFetch } from "@/utils/apiFetch";
import { usePathname } from "next/navigation";
import OverviewCard from "@/components/feedback/surveys/OverviewCard";

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("surveys");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [editModal, setEditModal] = useState({ isOpen: false, data: null });
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    role: "",
  });

  const staticData = {
    surveys: [
      {
        _id: "survey123",
        title: "Customer Satisfaction",
        responseCount: 45,
        status: "active",
        createdAt: "2024-01-15",
      },
      {
        _id: "survey124",
        title: "Product Feedback",
        responseCount: 32,
        status: "active",
        createdAt: "2024-01-10",
      },
      {
        _id: "survey125",
        title: "User Experience",
        responseCount: 28,
        status: "inactive",
        createdAt: "2024-01-05",
      },
    ],
    responses: [
      {
        _id: "2024-01-01",
        count: 12,
        completionRate: 85.5,
        sentiment: "positive",
      },
      {
        _id: "2024-01-02",
        count: 18,
        completionRate: 92.3,
        sentiment: "positive",
      },
      {
        _id: "2024-01-03",
        count: 15,
        completionRate: 78.9,
        sentiment: "neutral",
      },
    ],
    feedback: [
      {
        _id: "feedback1",
        category: "product",
        count: 15,
        sentiment: "positive",
        date: "2024-01-15",
      },
      {
        _id: "feedback2",
        category: "support",
        count: 12,
        sentiment: "neutral",
        date: "2024-01-14",
      },
      {
        _id: "feedback3",
        category: "ux",
        count: 8,
        sentiment: "negative",
        date: "2024-01-13",
      },
    ],
    users: [
      { _id: "role1", role: "analyst", count: 12, status: "active" },
      { _id: "role2", role: "researcher", count: 8, status: "active" },
      { _id: "role3", role: "admin", count: 5, status: "active" },
    ],
    executive: {
      keyMetrics: {
        totalSurveys: 15,
        totalResponses: 89,
        totalFeedbacks: 23,
        totalUsers: 25,
        avgResponseRate: 85.5,
      },
      sentimentOverview: [
        { _id: "positive", count: 15 },
        { _id: "neutral", count: 6 },
        { _id: "negative", count: 2 },
      ],
    },
  };

  const reportTypes = [
    { key: "surveys", label: "Survey Reports", icon: BarChart3 },
    { key: "responses", label: "Response Reports", icon: MessageSquare },
    { key: "feedback", label: "Feedback Reports", icon: FileText },
    { key: "users", label: "User Activity", icon: Users },
    { key: "executive-summary", label: "Executive Summary", icon: TrendingUp },
  ];

  const getColumns = (reportType) => {
    switch (reportType) {
      case "surveys":
        return [
          { key: "_id", header: "Survey ID" },
          { key: "title", header: "Title" },
          { key: "responseCount", header: "Responses" },
        ];
      case "responses":
        return [
          { key: "_id", header: "Survey ID" },
          { key: "title", header: "Title" },
          { key: "count", header: "Response Count" },
          {
            key: "completionRate",
            header: "Completion Rate",
            render: (value) => `${value}%`,
          },
          { key: "questionCount", header: "Questions" },
        ];
      case "feedback":
        return [
          { key: "_id", header: "Feedback ID" },
          { key: "category", header: "Category" },
          { key: "count", header: "Count" },
          { key: "percentage", header: "Percentage" },
          {
            key: "sentiment",
            header: "Sentiment",
            render: (value) => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  value === "positive"
                    ? "bg-green-100 text-green-800"
                    : value === "negative"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {value}
              </span>
            ),
          },
        ];
      case "users":
        return [
          { key: "totalUsers", header: "Total Users" },
          { key: "activeUsers", header: "Active Users" },
          { key: "activityRate", header: "Activity Rate" },
        ];
      default:
        return [];
    }
  };

  const fetchReportData = async (reportType) => {
    setLoading(true);
    try {
      const response = await apiFetch(`/api/reports/${reportType}`);
      const result = await response.json();
      console.log(result);

      let mappedData = [];

      if (result.status === "success") {
        switch (reportType) {
          case "surveys":
            mappedData = (result.data.topSurveys || []).map((survey) => ({
              ...survey,
              _id: `survey - ${survey._id.slice(-5)}`,
            }));
            break;
          case "responses":
            const responseTrends = result.data.responseTrends || [];
            const completions = result.data.completionRates || [];
            if (Array.isArray(responseTrends) && responseTrends.length > 0) {
              mappedData = completions.map((item) => ({
                _id: `survey - ${item._id.slice(-4)}`,
                title: item.title,
                count: item.responseCount,
                completionRate: item.completionRate,
                questionCount: item.questionCount,
              }));
            } else {
              mappedData = [];
            }
            break;
          case "feedback":
            const feedbackTrends = result.data.feedbackTrends || [];
            const categories = result.data.categoryDistribution || [];
            const sentimentTrends = result.data.sentimentTrends || [];
            const totalFeedback = result.data.totalFeedbackCount || 0;

            mappedData = categories.map((cat, index) => {
              const sentimentItem = sentimentTrends[index];
              return {
                _id: `fb-${cat.category}-${index}`,
                category: cat.category,
                count: cat.count,
                percentage: cat.percentage,
                sentiment: sentimentItem?._id?.sentiment || "neutral",
              };
            });
            mappedData.summary = {
              totalFeedback,
              categories,
              sentiments: sentimentTrends.map((s) => s._id?.sentiment),
            };
            break;
          case "users":
            const stats = result.data.userStats || {};
            const roles = result.data.roleDistribution || [];
            mappedData = [
              {
                totalUsers: stats.totalUsers ?? 0,
                activeUsers: stats.activeUsers ?? 0,
                activityRate: `${stats.activityRate ?? 0}%`,
                roles: roles
                  .map((r) => `${r.role} (${r.count})`)
                  .join(", "),
              },
            ];
            break;
          case "executive-summary":
            const execData = result.data;
            const sentimentLabels = ["positive", "neutral", "negative"];
            const fixedSentiments = execData.sentimentOverview?.map(
              (item, index) => ({
                _id: sentimentLabels[index] || "neutral",
                count: item.count,
              })
            );
            mappedData = {
              ...execData,
              sentimentOverview: fixedSentiments,
            };
            break;
          default:
            mappedData = [];
        }
      } else {
        mappedData = staticData[reportType];
      }

      setData((prev) => ({
        ...prev,
        [reportType]: mappedData,
      }));
    } catch (error) {
      console.error("Error fetching report data:", error);
      setData((prev) => ({
        ...prev,
        [reportType]: staticData[reportType],
      }));
    } finally {
      setLoading(false);
    }
  };

  // Fetch all report types' data on mount so cards show real values immediately
  useEffect(() => {
    async function fetchAllReports() {
      setLoading(true);
      await Promise.all(
        reportTypes.map(async (type) => {
          try {
            const response = await apiFetch(`/api/reports/${type.key}`);
            const result = await response.json();
            let mappedData = [];
            if (result.status === "success") {
              switch (type.key) {
                case "surveys":
                  mappedData = (result.data.topSurveys || []).map((survey) => ({
                    ...survey,
                    _id: `survey - ${survey._id.slice(-5)}`,
                  }));
                  break;
                case "responses":
                  const completions = result.data.completionRates || [];
                  mappedData = completions.map((item) => ({
                    _id: `survey - ${item._id.slice(-4)}`,
                    title: item.title,
                    count: item.responseCount,
                    completionRate: item.completionRate,
                    questionCount: item.questionCount,
                  }));
                  break;
                case "feedback":
                  const categories = result.data.categoryDistribution || [];
                  const sentimentTrends = result.data.sentimentTrends || [];
                  const totalFeedback = result.data.totalFeedbackCount || 0;
                  mappedData = categories.map((cat, index) => {
                    const sentimentItem = sentimentTrends[index];
                    return {
                      _id: `fb-${cat.category}-${index}`,
                      category: cat.category,
                      count: cat.count,
                      percentage: cat.percentage,
                      sentiment: sentimentItem?._id?.sentiment || "neutral",
                    };
                  });
                  mappedData.summary = {
                    totalFeedback,
                    categories,
                    sentiments: sentimentTrends.map((s) => s._id?.sentiment),
                  };
                  break;
                case "users":
                  const stats = result.data.userStats || {};
                  const roles = result.data.roleDistribution || [];
                  mappedData = [
                    {
                      totalUsers: stats.totalUsers ?? 0,
                      activeUsers: stats.activeUsers ?? 0,
                      activityRate: `${stats.activityRate ?? 0}%`,
                      roles: roles
                        .map((r) => `${r.role} (${r.count})`)
                        .join(", "),
                    },
                  ];
                  break;
                case "executive-summary":
                  const execData = result.data;
                  const sentimentLabels = ["positive", "neutral", "negative"];
                  const fixedSentiments = execData.sentimentOverview?.map(
                    (item, index) => ({
                      _id: sentimentLabels[index] || "neutral",
                      count: item.count,
                    })
                  );
                  mappedData = {
                    ...execData,
                    sentimentOverview: fixedSentiments,
                  };
                  break;
                default:
                  mappedData = [];
              }
            } else {
              mappedData = staticData[type.key];
            }
            setData((prev) => ({ ...prev, [type.key]: mappedData }));
          } catch (error) {
            setData((prev) => ({ ...prev, [type.key]: staticData[type.key] }));
          }
        })
      );
      setLoading(false);
    }
    fetchAllReports();
  }, []);

  // Still fetch selected report for filteredData, edit, etc.
  useEffect(() => {
    fetchReportData(selectedReport);
  }, [selectedReport]);

  useEffect(() => {
    let filtered = data[selectedReport] || [];

    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = item.date || item.createdAt || item._id;
        return itemDate >= filters.startDate && itemDate <= filters.endDate;
      });
    }

    if (filters.category) {
      filtered = filtered.filter(
        (item) => item.category === filters.category
      );
    }

    if (filters.role) {
      filtered = filtered.filter((item) => item.role === filters.role);
    }

    setFilteredData(filtered);
  }, [data, selectedReport, filters]);

  const handleEdit = (rowData) => {
    setEditModal({ isOpen: true, data: rowData });
  };

  const handleDelete = (rowData) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updated = data[selectedReport].filter(
        (item) => item._id !== rowData._id
      );
      setData((prev) => ({ ...prev, [selectedReport]: updated }));
    }
  };

  const handleSave = (updatedData) => {
    const updated = data[selectedReport].map((item) =>
      item._id === updatedData._id ? updatedData : item
    );
    setData((prev) => ({ ...prev, [selectedReport]: updated }));
  };

  const renderExecutiveSummary = () => {
    const execData =
      data["executive-summary"] || data.executive;
    if (!execData) return null;

    return (
      <ExecutiveSummaryCharts
        keyMetrics={execData.keyMetrics}
        sentimentOverview={execData.sentimentOverview || []}
      />
    );
  };

  // Helper to get overview cards data
  function getOverviewCardsData() {
    return reportTypes.map((type, idx) => {
      const reportData =
        data[type.key] || staticData[type.key] || [];
      let value = 0;
      switch (type.key) {
        case "surveys":
          value = Array.isArray(reportData) ? reportData.length : 0;
          break;
        case "responses":
          value = Array.isArray(reportData)
            ? reportData.reduce(
                (sum, item) => sum + (item.count || 0),
                0
              )
            : 0;
          break;
        case "feedback":
          value = Array.isArray(reportData)
            ? reportData.reduce(
                (sum, item) => sum + (item.count || 0),
                0
              )
            : 0;
          break;
        case "users":
          value = Array.isArray(reportData)
            ? reportData.reduce(
                (sum, item) => sum + (item.count || 0),
                0
              )
            : 0;
          break;
        case "users":
          value = Array.isArray(reportData)
            ? reportData.reduce(
                (sum, item) => sum + (item.count || 0),
                0
              )
            : 0;
          break;
        case "executive-summary":
          value = reportData?.keyMetrics?.totalSurveys || 0;
          break;
        default:
          value = 0;
      }
      return {
        title: type.label,
        icon: type.icon,
        value,
        increase: 0,
        index: idx,
        key: type.key,
      };
    });
  }

  const handleCardClick = (key) => {
    if (reportTypes.some((r) => r.key === key)) {
      setSelectedReport(key);
      console.log(key);
    }
  };

  return (
    <div className="min-h-screens md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reports Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive analytics and reporting for your organization
          </p>
        </div>

        {/* Overview Cards (replacing report type selection) */}
        {/* Overview Cards with Date/Time Panel */}
<div className="flex flex-col lg:flex-row gap-6 mb-8">
  {/* Cards Section - Left Side */}
  <div className="flex-1">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {getOverviewCardsData().map((card) => (
        <OverviewCard
          key={card.index}
          card={card}
          index={card.index}
          onClick={handleCardClick}
        />
      ))}
    </div>
  </div>

  {/* Date/Time Panel - Right Side */}
  <div className="w-full lg:w-80 xl:w-96">
    <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
      {/* Current Time Display */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-slate-800 mb-1">
          {new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })}
        </div>
        <div className="text-sm text-slate-500">
          Current Time
        </div>
      </div>

      {/* Date Information */}
      <div className="bg-slate-50 rounded-xl p-4 mb-6">
        <div className="text-lg font-semibold text-slate-800 mb-2">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Today</span>
        </div>
      </div>

      {/* Time Zone Info */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Time Zone</span>
          <span>{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
        </div>
      </div>
    </div>
  {/* );
}; */}
  </div>
</div>
        {/* Report Content */}
        <div className="bg-white rounded-xl shadow-sm">
          {selectedReport === "executive-summary" ? (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Executive Summary
              </h2>
              {renderExecutiveSummary()}
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {reportTypes.find((r) => r.key === selectedReport)?.label}
              </h2>
              {Array.isArray(filteredData) ? (
                <ReportsTable
                  data={filteredData}
                  columns={getColumns(selectedReport)}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  loading={loading}
                />
              ) : (
                <div className="text-gray-500">No data available.</div>
              )}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        <EditModal
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, data: null })}
          data={editModal.data}
          reportType={selectedReport}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default ReportsPage;
