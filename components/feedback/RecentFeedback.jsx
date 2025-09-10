"use client";
import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns";

import PropTypes from 'prop-types';
const RecentFeedback = ({ recentFeedbacks }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col min-h-0 flex-1">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Recent Feedback
        </h2>
        <p className="text-sm text-slate-500">
          Latest feedback received from your surveys
        </p>
      </div>

      {recentFeedbacks.length > 0 ? (
        <div className="flex flex-col flex-1">
          {/* Feedback List */}
          <div className="space-y-1 mb-4 flex-1">
            {recentFeedbacks?.slice(0, 5).map((feedback, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-800/5 hover:bg-slate-100 transition-colors duration-200 group"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 line-clamp-2 mb-2 leading-relaxed">
                      {feedback.message}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                      <span className="text-xs text-slate-500">
                        {feedback.date
                          ? formatDistanceToNow(new Date(feedback.date), {
                            addSuffix: true,
                          })
                            .charAt(0)
                            .toUpperCase() +
                          formatDistanceToNow(new Date(feedback.date), {
                            addSuffix: true,
                          }).slice(1)
                          : "No date"}
                      </span>
                    </div>
                  </div>

                  {/* Sentiment Badge */}
                  <div className="flex-shrink-0">
                    <span
                      className={`
                      inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                      ${!feedback.sentiment ? "bg-slate-100 text-slate-600" : ""
                        }
                      ${feedback.sentiment &&
                          feedback.sentiment.toLowerCase() === "positive"
                          ? "bg-emerald-100 text-emerald-700"
                          : ""
                        }
                      ${feedback.sentiment &&
                          feedback.sentiment.toLowerCase() === "negative"
                          ? "bg-red-100 text-red-700"
                          : ""
                        }
                      ${feedback.sentiment &&
                          feedback.sentiment.toLowerCase() === "neutral"
                          ? "bg-amber-100 text-amber-700"
                          : ""
                        }
                    `}
                    >
                      <div
                        className={`
                        w-1.5 h-1.5 rounded-full mr-1.5
                        ${!feedback.sentiment ? "bg-slate-400" : ""}
                        ${feedback.sentiment &&
                            feedback.sentiment.toLowerCase() === "positive"
                            ? "bg-emerald-500"
                            : ""
                          }
                        ${feedback.sentiment &&
                            feedback.sentiment.toLowerCase() === "negative"
                            ? "bg-red-500"
                            : ""
                          }
                        ${feedback.sentiment &&
                            feedback.sentiment.toLowerCase() === "neutral"
                            ? "bg-amber-500"
                            : ""
                          }
                      `}
                      ></div>
                      <span className="capitalize">
                        {feedback.sentiment || "Not analyzed"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <Link
            href="/feedback/feedbacks"
            className="group flex items-center justify-center gap-2 p-4 rounded-xl bg-slate-900 hover:bg-gray-800 text-slate-600 hover:text-white transition-all duration-200"
          >
            <span className="text-sm font-medium text-white">View all feedback</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center py-12 bg-slate-50 rounded-2xl">
          <div className="bg-slate-100 rounded-full p-4 mb-4">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-600 mb-2">
            No feedback yet
          </h3>
          <p className="text-sm text-slate-500 text-center max-w-sm">
            Feedback from your surveys will appear here once responses start
            coming in.
          </p>
        </div>
      )}
    </div>
  );
};

RecentFeedback.propTypes = {
  recentFeedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      date: PropTypes.string,
      sentiment: PropTypes.string,
    })
  ).isRequired,
};
export default RecentFeedback;
