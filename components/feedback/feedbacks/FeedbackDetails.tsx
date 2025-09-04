import React from "react";
import { IoClose } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";

const FeedbackDetails: React.FC<{
  feedback: any;
  open: boolean;
  close: Function;
}> = ({ feedback, open, close }) => {
  return (
    <div
      className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="w-full max-w-2xl">
        {/* Close Button */}
        <div className="flex justify-end mb-3">
          <button
            className="bg-white/90 hover:bg-white shadow-sm rounded-full p-2 transition-all duration-200 hover:shadow-md"
            onClick={() => close(true)}
          >
            <IoClose className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-slate-50 px-6 py-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2.5 rounded-xl">
                  <VscFeedback className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg uppercase tracking-wide">
                    {feedback.category}
                  </h3>
                </div>
              </div>

              {/* Sentiment Badge */}
              <div
                className={`
                px-3 py-1.5 rounded-full text-sm font-medium
                ${!feedback.sentiment ? "bg-slate-100 text-slate-600" : ""}
                ${
                  feedback.sentiment &&
                  feedback.sentiment.toLowerCase() === "positive"
                    ? "bg-emerald-100 text-emerald-700"
                    : ""
                }
                ${
                  feedback.sentiment &&
                  feedback.sentiment.toLowerCase() === "negative"
                    ? "bg-red-100 text-red-700"
                    : ""
                }
                ${
                  feedback.sentiment &&
                  feedback.sentiment.toLowerCase() === "neutral"
                    ? "bg-amber-100 text-amber-700"
                    : ""
                }
              `}
              >
                <span className="capitalize">
                  {feedback.sentiment || "Not analyzed"}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white px-6 py-6">
            <p className="text-slate-700 leading-relaxed text-base">
              {feedback.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetails;
