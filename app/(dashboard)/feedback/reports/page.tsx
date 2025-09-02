'use client'
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
import { apiFetch } from "@/utils/apiFetch";

const page = () => {
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

  // Static data matching the API structure
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
    { key: "executive", label: "Executive Summary", icon: TrendingUp },
  ];

  const getColumns = (reportType) => {
    switch (reportType) {
      case "surveys":
        return [
          { key: "_id", header: "Survey ID" },
          { key: "title", header: "Title" },
          { key: "responseCount", header: "Responses" },
          // {
          //   key: "status",
          //   header: "Question Count",
          //   render: (value) => (
          //     <span
          //       className={`px-2 py-1 rounded-full text-xs ${
          //         value === "active"
          //           ? "bg-green-100 text-green-800"
          //           : "bg-gray-100 text-gray-800"
          //       }`}
          //     >
          //       {value}
          //     </span>
          //   ),
          // },
        ];
      case "responses":
        return [
          { key: "_id", header: "Date" },
          { key: "count", header: "Response Count" },
          {
            key: "completionRate",
            header: "Completion Rate",
            render: (value) => `${value}%`,
          },
          { key: "sentiment", header: "Sentiment" },
        ];
      case "feedback":
        return [
          { key: "_id", header: "Feedback ID" },
          { key: "category", header: "Category" },
          { key: "count", header: "Count" },
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
          { key: "roles", header: "Roles" },
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
            _id: `survey-${Math.floor(Math.random() * 1000000)}`, // 🔥 add fake ID
          }));
          break;
        case "responses":
          mappedData = result.data.responseTrends || [];
          break;
        case "feedback":
          mappedData = result.data.feedbackTrends || [];
          break;
        case "users":
          const stats = result.data.userStats || {};
          const roles = result.data.roleDistribution || [];

          mappedData = [
            {
              totalUsers: stats.totalUsers ?? 0,
              activeUsers: stats.activeUsers ?? 0,
              activityRate: `${stats.activityRate ?? 0}%`,
              roles: roles.map((r) => `${r.role} (${r.count})`).join(", "),
            },
          ];
          break;
        case "executive":
          mappedData = result.data;
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
    setData((prev) => ({ ...prev, [reportType]: staticData[reportType] }));
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchReportData(selectedReport);
  }, [selectedReport]);

  useEffect(() => {
    let filtered = data[selectedReport] || [];

    // Apply filters
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = item.date || item.createdAt || item._id;
        return itemDate >= filters.startDate && itemDate <= filters.endDate;
      });
    }

    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filters.category);
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
    const execData = data.executive;
    if (!execData) return null;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Key Metrics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {execData.keyMetrics?.totalSurveys}
              </div>
              <div className="text-sm text-gray-600">Total Surveys</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">
                {execData.keyMetrics?.totalResponses}
              </div>
              <div className="text-sm text-gray-600">Total Responses</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">
                {execData.keyMetrics?.totalFeedbacks}
              </div>
              <div className="text-sm text-gray-600">Total Feedbacks</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-700">
                {execData.keyMetrics?.totalUsers}
              </div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sentiment Overview
          </h3>
          <div className="space-y-3">
            {execData.sentimentOverview?.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="capitalize text-gray-700">{item._id}</span>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-20 h-2 rounded-full ${
                      item._id === "positive"
                        ? "bg-green-500"
                        : item._id === "negative"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screens bg-gray-50 p-4 md:p-6">
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

        {/* Report Type Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <button
                key={report.key}
                onClick={() => setSelectedReport(report.key)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedReport === report.key
                    ? "border-green-700 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-25"
                }`}
              >
                <Icon className="mx-auto mb-2" size={24} />
                <div className="text-sm font-medium text-center">
                  {report.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        {selectedReport !== "executive" && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-700/40 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter size={20} className="text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              {selectedReport === "feedback" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All Categories</option>
                    <option value="product">Product</option>
                    <option value="support">Support</option>
                    <option value="ux">UX</option>
                    <option value="pricing">Pricing</option>
                  </select>
                </div>
              )}
              {selectedReport === "users" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={filters.role}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, role: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="analyst">Analyst</option>
                    <option value="researcher">Researcher</option>
                  </select>
                </div>
              )}
              <div className="flex items-end">
                <button
                  onClick={() =>
                    setFilters({
                      startDate: "",
                      endDate: "",
                      category: "",
                      role: "",
                    })
                  }
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Report Content */}
        <div className="bg-white rounded-lg shadow-sm border border-green-700/40">
          {selectedReport === "executive" ? (
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
              <ReportsTable
                data={filteredData}
                columns={getColumns(selectedReport)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading}
              />
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

export default page;
