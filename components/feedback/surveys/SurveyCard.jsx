"use client";
import { useAlertStore } from "@/stores/alertStore";
import useFetch from '@/hooks/useFetch';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiDeleteBinLine, RiEditLine, RiSurveyLine } from "react-icons/ri";

import PropTypes from 'prop-types';

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
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 relative group">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2.5 rounded-xl">
            <RiSurveyLine className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-lg text-slate-800">
            {survey.title}
          </h3>
        </div>

        {/* Delete Button */}
        <div className="relative">
          <button
            className="p-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            <RiDeleteBinLine className="w-4 h-4" />
          </button>

          {/* Confirmation Modal */}
          {showConfirm && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-20 w-80">
              <p className="text-slate-700 text-sm mb-4">
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
          )}
        </div>
      </div>

      {/* Content Section - Clickable Link */}
      <Link
        href={`/feedback/surveys/${survey.uniqueLinkId}`}
        prefetch
        className="block"
      >
        <div className="space-y-4 cursor-pointer">
          {/* Description */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-slate-600 leading-relaxed line-clamp-3">
              {survey.description}
            </p>
          </div>

          {/* Action Indicator */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-slate-400">Survey Management</div>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>Manage</span>
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
      </Link>
    </div>
  );
};

SurveyCard.propTypes = {
  survey: PropTypes.object.isRequired,
};

export default SurveyCard;
