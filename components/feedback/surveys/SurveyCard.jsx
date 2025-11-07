"use client";
import { useAlertStore } from "@/stores/alertStore";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiDeleteBinLine, RiEditLine, RiSurveyLine } from "react-icons/ri";

import PropTypes from "prop-types";
import { VscFeedback } from "react-icons/vsc";

const SurveyCard = ({ survey }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { setMessage, clearMessage } = useAlertStore((state) => state);
  const router = useRouter();

  const handleConfirm = () => {
    const deleteSurvey = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/surveys/${survey._id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          setMessage("Survey deleted successfully.");
          router.refresh();
          setTimeout(() => {
            clearMessage();
          }, 3000);
        } else {
          console.log("Failed to delete survey.");
        }
      } catch (err) {
        console.log("Failed to delete survey.", err);
      }
    };
    deleteSurvey();
  };

  return (
    <div className="w-full flex flex-col border border-green-600/10 shadow rounded-xl p-5">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2.5 rounded-md">
            <RiSurveyLine className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg text-slate-800 line-clamp-1">
            {survey.title}
          </h3>
        </div>

        {/* Delete Button */}
        <div className="relative px-1">
          <button
            className="p-2.5 cursor-pointer rounded-md bg-red-600/20 hover:bg-red-600 group transition-colors duration-200"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            <RiDeleteBinLine className="w-4 h-4 text-red-600 group-hover:text-white" />
          </button>

          {/* Confirmation Modal */}
          {showConfirm && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
              <div className="w-full max-w-2xl bg-white p-3 rounded-xl">
                <div className="flex items-center gap-3 bg-blue-600/20 p-3 rounded-xl">
                  <div className="bg-blue-500 p-2.5 rounded-xl">
                    <VscFeedback className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg uppercase tracking-wide">
                      Confirmation
                    </h3>
                  </div>
                </div>
                <p className="text-slate-700 text-md mb-4 px-1 py-3">
                  Are you sure you want to delete this survey?
                </p>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
                    onClick={handleConfirm}
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section - Clickable Link */}
      <Link
        href={`/feedback/surveys/${survey.uniqueLinkId}`}
        prefetch
        className="block flex-auto"
      >
        <div className="h-full cursor-pointer flex flex-col justify-between">
          {/* Description */}
          <div className="bg-gray-900/5 rounded-md p-2">
            <p className="text-black leading-relaxed line-clamp-3">
              {survey.description}
            </p>
          </div>

          {/* Action Indicator */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-slate-800">Survey Management</div>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-800 transition-opacity duration-200 group">
              <span>Manage</span>
              <div className="group-hover:translate-x-1 duration-300">
                <svg
                  className="w-4 h-4"
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
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

SurveyCard.propTypes = {
  survey: PropTypes.object.isRequired,
};

export default SurveyCard;
