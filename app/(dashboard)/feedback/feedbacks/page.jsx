"use client";
import FeedbackCard from "@/components/feedback/feedbacks/FeedbackCard";
import { useAuthStore } from "@/stores/authStores";
import React, { useState, useEffect } from "react";
import { BiCopy } from "react-icons/bi";
import { apiFetch } from "@/utils/apiFetch";
import LoadingCard from "@/components/feedback/feedbacks/LoadingCard";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { PiFlask, PiChartBar, PiUsers, PiTrendUp } from "react-icons/pi";
import { useAlertStore } from "@/stores/alertStore";
import { redirect, useRouter } from "next/navigation";

const page = () => {
  const [copied, setCopied] = useState(false);
  const { organisationId, hasHydrated } = useAuthStore((state) => state);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setMessage, clearMessage } = useAlertStore((state) => state);
  const router = useRouter();

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!organisationId) {
        setError("Organisation ID is required.");
        setLoading(false);
        return;
      }
      const res = await apiFetch(
        `/api/feedbacks?organisationId=${organisationId}`
      );
      const data = await res.json();
      if (!res.ok || data.status === "fail") {
        setError(data.message || "Could not fetch feedbacks.");
      } else {
        setFeedbacks(data.data || []);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [organisationId]);

  const handleCopy = () => {
    if (hasHydrated) {
      navigator.clipboard.writeText(
        `${window.location.origin}/feedbacks/${organisationId}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleAnalyzeFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/api/feedbacks/analyze-sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setMessage("Feedbacks analyzed successfully.");
        fetchFeedbacks();
        setTimeout(() => {
          clearMessage();
        }, 3000);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate feedback statistics
  const totalFeedbacks = feedbacks.length;
  const positiveFeedbacks = feedbacks.filter(
    (f) => f.sentiment === "positive"
  ).length;
  const negativeFeedbacks = feedbacks.filter(
    (f) => f.sentiment === "negative"
  ).length;
  const neutralFeedbacks = feedbacks.filter(
    (f) => f.sentiment === "neutral"
  ).length;
  const analyzedFeedbacks = feedbacks.filter((f) => f.sentiment).length;
  const positivePercentage =
    totalFeedbacks > 0
      ? Math.round((positiveFeedbacks / totalFeedbacks) * 100)
      : 0;

  return (
    <div className="inter flex flex-col gap-8 px-6 py-1 min-h-screen">
      {/* Header Section */}
      <div className="rounded-2xl p-6 shadow-sm bg-white">
        <div className="flex max-md:flex-col gap-4 justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Feedback
            </h1>
            <p className="text-slate-600 text-lg">
              Manage and analyze customer feedback for your organisation
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex bg-slate-100 hover:bg-slate-200 items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer text-slate-700 hover:text-slate-900"
              onClick={handleCopy}
              type="button"
            >
              <BiCopy className="text-lg" />
              <span className="font-medium">
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </button>
            {!feedbacks.every((feedback) => feedback.sentiment) && (
              <button
                onClick={handleAnalyzeFeedback}
                className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl transition-all duration-300 font-medium"
              >
                <PiFlask className="text-lg" />
                Analyze Feedback
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      {!loading && totalFeedbacks > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <PiUsers className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {totalFeedbacks}
                </h3>
                <p className="text-slate-600 font-medium">Total Feedbacks</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <PiTrendUp className="text-2xl text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {positivePercentage}%
                </h3>
                <p className="text-slate-600 font-medium">Positive Rate</p>
                <p className="text-emerald-600 text-sm font-medium">
                  +{positiveFeedbacks} positive
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <PiChartBar className="text-2xl text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {analyzedFeedbacks}
                </h3>
                <p className="text-slate-600 font-medium">Analyzed</p>
                <p className="text-slate-500 text-sm">
                  of {totalFeedbacks} total
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"></div>
              </div>
              <div>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="text-emerald-600">{positiveFeedbacks}</span>
                  <span className="text-amber-600">{neutralFeedbacks}</span>
                  <span className="text-red-500">{negativeFeedbacks}</span>
                </div>
                <p className="text-slate-600 font-medium">Sentiment Split</p>
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

      {/* Feedback Cards Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Recent Feedback
          </h2>
          <p className="text-slate-600">
            Review and manage feedback submissions
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-slate-100 rounded-xl p-6 animate-pulse"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/5"></div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
                  <div className="h-4 w-20 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PiUsers className="text-2xl text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Feedback Yet
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Share your organisation link to start collecting feedback from
                your customers.
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium"
            >
              <BiCopy />
              {copied ? "Link Copied!" : "Copy Organisation Link"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {feedbacks.map((feedback) => (
              <FeedbackCard key={feedback._id} feedback={feedback} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
