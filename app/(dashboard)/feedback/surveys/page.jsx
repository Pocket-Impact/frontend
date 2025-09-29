"use client";
import LoadingCard from "@/components/feedback/feedbacks/LoadingCard";
import SurveyCard from "@/components/feedback/surveys/SurveyCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { apiFetch } from "@/utils/apiFetch";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  IoAddOutline,
  IoDocumentText,
  IoStatsChart,
  IoPeople,
} from "react-icons/io5";

const Page = () => {
  const [surveys, setSurveys] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFetch("/api/surveys", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const json = await response.json();
        if (!response.ok) {
          setError(json.message || "Could not fetch surveys.");
          setSurveys([]);
        } else if (json && json.data && Array.isArray(json.data.surveys)) {
          setSurveys(json.data.surveys);
        } else {
          setSurveys([]);
        }
      } catch (err) {
        setError("Server error. Please try again later.");
        setSurveys([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalSurveys = surveys.length;
  const activeSurveys = surveys.filter((s) => s.status === "active").length;
  const totalResponses = surveys.reduce(
    (sum, survey) => sum + (survey.responses || 0),
    0
  );

  return (
    <div className="flex flex-col gap-8 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Survey Management
            </h1>
            <p className="text-slate-600 text-lg">
              Create, manage and analyze your organization's surveys
            </p>
          </div>
          <Link href="/feedback/surveys/new" prefetch>
            <button className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium">
              <IoAddOutline className="text-xl" />
              <span className="max-md:hidden">Create Survey</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Statistics Overview */}
      {!loading && totalSurveys > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <IoDocumentText className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {totalSurveys}
                </h3>
                <p className="text-slate-600 font-medium">Total Surveys</p>
                <p className="text-blue-600 text-sm font-medium">
                  {activeSurveys} active
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <IoPeople className="text-2xl text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {totalResponses}
                </h3>
                <p className="text-slate-600 font-medium">Total Responses</p>
                <p className="text-emerald-600 text-sm font-medium">
                  {totalSurveys > 0
                    ? Math.round(totalResponses / totalSurveys)
                    : 0}{" "}
                  avg per survey
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <IoStatsChart className="text-2xl text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {activeSurveys}
                </h3>
                <p className="text-slate-600 font-medium">Active Surveys</p>
                <p className="text-slate-500 text-sm">
                  {totalSurveys - activeSurveys} inactive
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 rounded-2xl p-6 shadow-sm border-l-4 border-red-400">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <div className="w-5 h-5 bg-red-500 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Surveys Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Your Surveys
          </h2>
          <p className="text-slate-600">
            Manage and track your survey performance
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-slate-100 rounded-xl p-6 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
                    <div>
                      <div className="h-4 bg-slate-200 rounded mb-2 w-32"></div>
                      <div className="h-3 bg-slate-200 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                  <div className="h-8 w-20 bg-slate-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : surveys.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IoDocumentText className="text-2xl text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Surveys Yet
              </h3>
              <p className="text-slate-600 max-w-md mx-auto mb-6">
                Create your first survey to start collecting valuable feedback
                from your audience.
              </p>
            </div>
            <Link href="/feedback/surveys/new" prefetch>
              <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium">
                <IoAddOutline />
                Create Your First Survey
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {surveys.map((survey) => (
              <SurveyCard key={survey._id} survey={survey} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
