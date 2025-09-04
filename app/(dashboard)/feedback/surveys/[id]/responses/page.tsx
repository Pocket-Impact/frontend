"use client";
import { apiFetch } from "@/utils/apiFetch";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoPerson,
  IoStatsChart,
  IoTime,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { RxCaretLeft } from "react-icons/rx";

const Page = () => {
  const { id } = useParams();
  const [expandedResponses, setExpandedResponses] = useState<{
    [key: string]: boolean;
  }>({});
  const [responses, setResponses] = useState<
    Array<{
      _id?: string;
      user?: { fullname?: string };
      createdAt?: string;
      responses?: Array<{
        questionText?: string;
        questionId?: string;
        answer?: string;
        sentiment?: string;
      }>;
    }>
  >([]);
  const [surveyData, setSurveyData] = useState<{
    title?: string;
    description?: string;
    totalQuestions?: number;
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      setLoading(true);
      try {
        const res = await apiFetch(`/api/responses/survey/${id}`);
        if (res.ok) {
          const data = await res.json();
          setResponses(data.data);
          // You might want to fetch survey details too
          setSurveyData({
            title: "Customer Feedback Survey", // This should come from your API
            description: "Responses collected from participants",
            totalQuestions: data.data?.[0]?.responses?.length || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [id]);

  const toggleResponse = (responseId: string) => {
    setExpandedResponses((prev) => ({
      ...prev,
      [responseId]: !prev[responseId],
    }));
  };

  const getSentimentStyles = (sentiment: string | undefined) => {
    if (!sentiment) return "bg-slate-100 text-slate-500";
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-emerald-100 text-emerald-700";
      case "negative":
        return "bg-red-100 text-red-700";
      case "neutral":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  const totalResponses = responses.length;
  const completedResponses = responses.filter(
    (r) => r.responses && r.responses.length > 0
  ).length;
  const averageResponseTime = "2.5 min"; // This would come from your data

  return (
    <div className="flex flex-col gap-8 p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <Link
            href="/feedback/surveys"
            className="flex items-center gap-2 hover:gap-3 transition-all cursor-pointer duration-300"
          >
            <div className="bg-slate-900 hover:bg-slate-800 transition duration-300 text-white rounded-xl p-2">
              <RxCaretLeft className="w-6 h-6" />
            </div>
            <span className="text-slate-600 font-medium">Back to Surveys</span>
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {surveyData.title || "Survey Responses"}
          </h1>
          <p className="text-slate-600 text-lg">
            {surveyData.description ||
              "Analyze responses and gather insights from your survey"}
          </p>
        </div>
      </div>

      {/* Statistics Overview */}
      {!loading && totalResponses > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <IoPerson className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {totalResponses}
                </h3>
                <p className="text-slate-600 font-medium">Total Responses</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <IoCheckmarkCircle className="text-2xl text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {completedResponses}
                </h3>
                <p className="text-slate-600 font-medium">Completed</p>
                <p className="text-emerald-600 text-sm font-medium">
                  {totalResponses > 0
                    ? Math.round((completedResponses / totalResponses) * 100)
                    : 0}
                  % completion rate
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <IoTime className="text-2xl text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {averageResponseTime}
                </h3>
                <p className="text-slate-600 font-medium">Avg. Time</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <IoStatsChart className="text-2xl text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {surveyData.totalQuestions || 0}
                </h3>
                <p className="text-slate-600 font-medium">Questions</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responses Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Survey Responses
              </h2>
              <p className="text-slate-600">
                Individual participant responses and feedback
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
              <span className="text-lg font-bold text-slate-900">
                {responses.length.toString().padStart(2, "0")}
              </span>
              <span className="text-sm text-slate-600">responses</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-slate-100 rounded-xl p-6 animate-pulse"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded mb-2 w-32"></div>
                    <div className="h-3 bg-slate-200 rounded w-48"></div>
                  </div>
                  <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : responses.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IoPerson className="text-2xl text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Responses Yet
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Share your survey link to start collecting responses from
                participants.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {responses.map((response, idx) => (
              <div
                key={response._id || idx}
                className="bg-slate-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleResponse(response._id || idx.toString())}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                        {response.user?.fullname
                          ? response.user.fullname[0].toUpperCase()
                          : "A"}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {response.user?.fullname || "Anonymous Participant"}
                        </h3>
                        <p className="text-slate-600">
                          {response.createdAt
                            ? `Submitted ${formatDistanceToNow(
                                new Date(response.createdAt),
                                { addSuffix: true }
                              )}`
                            : "Recently submitted"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-200 px-3 py-1.5 rounded-lg">
                        <span className="text-sm font-medium text-slate-700">
                          {response.responses?.length || 0} answers
                        </span>
                      </div>
                      <div className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                        {expandedResponses[response._id || idx.toString()] ? (
                          <IoChevronUpOutline className="w-5 h-5 text-slate-600" />
                        ) : (
                          <IoChevronDownOutline className="w-5 h-5 text-slate-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedResponses[response._id || idx.toString()] && (
                  <div className="px-6 pb-6 space-y-4 border-t border-slate-200 pt-6">
                    {response.responses?.map((answer, qidx) => (
                      <div key={qidx} className="bg-white rounded-xl p-4">
                        <div className="mb-3">
                          <h4 className="font-semibold text-slate-900 mb-2">
                            {answer.questionText || `Question ${qidx + 1}`}
                          </h4>
                          <p className="text-slate-700 leading-relaxed">
                            {answer.answer}
                          </p>
                        </div>
                        {answer.sentiment && (
                          <div className="flex justify-end">
                            <div
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentStyles(
                                answer.sentiment
                              )}`}
                            >
                              {answer.sentiment}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Page;